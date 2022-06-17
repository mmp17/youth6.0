<template>
  <div class="suggest-comments">
    <div class="btns">
      <el-button class="first" @click="handleSuggest({type: 'edit'})">
        수정
      </el-button>
      <el-button class="second btn" @click="handleSuggest({type:'remove'})">
        삭제
      </el-button>
      <el-button class="third" @click="goPage('/suggest-list')">
        목록으로
      </el-button>
    </div>
    <div v-show="hasSuggestAnswer" class="suggest-answer">
      <div class="title">
        제안 답변
      </div>
      <div class="paragraph">
        {{ getSuggestDetail.ans_con }}
      </div>
    </div>
    <template v-if="writeComment">
      <section class="write-comment">
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="4"
          placeholder="의견을 달아주세요!"
        />
        <el-button class="comment-btn" @click="addComment">
          댓글 작성
        </el-button>
      </section>
      <section class="comment-list">
        <ul>
          <li v-for="(comment, index) in suggest.comments" :key="index" class="comment">
            <div class="comment-title">
              <span>{{ comment.com_name }}</span> | {{ comment.editdate }}
            </div>
            <template v-if="editCommentIdx == comment.idx">
              <el-input
                v-model="editCommentValue"
                class="edit-comment"
                type="textarea"
                :rows="4"
                placeholder="의견을 달아주세요!"
              />
            </template>
            <template v-else>
              <div class="comment-text">
                {{ comment.comment }}
              </div>
            </template>
            <div v-if="editCommentIdx == comment.idx" class="comment-list__btns">
              <el-button @click="handleEditComment({type: 'edit', comment})">
                수정완료
              </el-button>
              <el-button @click="handleEditComment({type:'cancel', comment})">
                취소
              </el-button>
            </div>
            <div v-else class="comment-list__btns">
              <el-button @click="handleComment({type: 'edit', comment})">
                수정
              </el-button>
              <el-button @click="handleComment({type:'remove', comment})">
                삭제
              </el-button>
            </div>
          </li>
        </ul>
      </section>
      <section class="go-list">
        <!-- <nuxt-link to="/suggest-list">
          목록으로
        </nuxt-link> -->
      </section>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  props: {
  },
  data () {
    return {
      textarea: '',
      writeComment: true,
      editCommentIdx: null,
      editCommentValue: null
    }
  },
  computed: {
    ...mapState({
      suggest: state => state.suggestDetail
    }),
    ...mapGetters([
      'isLoggedIn',
      'getUserInfo',
      'getSuggestDetail'
    ]),
    hasSuggestAnswer () {
      return !!this.getSuggestDetail.ans_con
    }
  },
  methods: {
    ...mapActions([
      'GET_SUGGEST_DETAIL'
    ]),
    handleSuggest ({ type }) {
      if (!this.isLoggedIn) { return alert('로그인 해주세요.') }
      const isOwnWriter = this.getUserInfo.idx === this.getSuggestDetail.pro_user_idx
      if (!isOwnWriter) { return alert('제안의 작성자만 수정 및 삭제를 할 수 있습니다.') }
      if (type === 'remove') { return this.removeSuggest() }
      const isChildrenType = this.$route.query.type === 'children'
      const url = isChildrenType ? `/suggest-register?idx=${this.$route.query.idx}&type=children` : `/suggest-register?idx=${this.$route.query.idx}`
      this.$router.push(url)
    },
    handleEditComment ({ type, comment }) {
      if (type === 'cancel') {
        this.editCommentIdx = null
        this.editCommentValue = null
        return
      }
      this.updateComment({ comment })
    },
    async updateComment ({ comment }) {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$axios.$get('/commnet/update_comment.do', {
          params: {
            idx: this.editCommentIdx,
            comment: this.editCommentValue,
            user_idx: this.getUserInfo.idx
          }
        })
        this.editCommentIdx = null
        this.editCommentValue = null
        await this.GET_SUGGEST_DETAIL({ idx: this.$route.query.idx })
      } catch (e) {}
    },
    handleComment ({ type, comment }) {
      if (!this.isLoggedIn) { return alert('로그인 해주세요.') }
      const isOwnWriter = comment.com_user_idx === this.getUserInfo.idx
      if (!isOwnWriter) { return alert('댓글의 작성자만 삭제할 수 있습니다.') }
      if (type === 'remove') { return this.removeComment({ comment }) }
      this.editComment({ comment })
    },
    editComment ({ comment }) {
      this.editCommentIdx = comment.idx
      this.editCommentValue = comment.comment
    },
    async removeComment ({ comment }) {
      try {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) { return }
        await this.$axios.$get('/commnet/delete_comment.do', {
          params: {
            idx: comment.idx,
            user_idx: this.getUserInfo.idx
          }
        })
        await this.GET_SUGGEST_DETAIL({ idx: this.$route.query.idx })
      } catch (e) {
        console.error(e)
      }
    },
    async removeSuggest () {
      try {
        if (window.confirm('제안을 삭제하시겠습니까?')) {
          const isNotOwnSuggest = this.getSuggestDetail.pro_user_idx !== this.getUserInfo.idx
          if (isNotOwnSuggest) { return alert('제안의 작성자만 삭제할 수 있습니다.') }
          const res = await this.$axios.$get('/proposal/delete_proposal.do', {
            params: {
              idx: this.$route.query.idx,
              user_idx: this.getUserInfo.idx
            }
          })
          const isChildrenType = this.$route.query.type === 'children'
          const url = isChildrenType ? '/suggest-list?type=children' : '/suggest-list'
          const isSuccessRemove = typeof res === 'string' && res.includes('삭제되었')
          if (isSuccessRemove) {
            alert('제안이 삭제되었습니다.')
            this.$router.push(url)
            return
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    async addComment () {
      if (!this.textarea.length) { return alert('의견을 입력해주세요.') }
      if (!this.isLoggedIn) { return alert('로그인 해주세요') }
      const res = await this.$axios.$get('/commnet/insert_comment.do', {
        params: {
          comment: this.textarea,
          com_name: this.getUserInfo.user_name,
          com_user_idx: this.getUserInfo.idx,
          com_pro_idx: this.$route.query.idx
        }
      })
      const REQUEST_SUCCESS = 0
      if (res === REQUEST_SUCCESS) {
        await this.GET_SUGGEST_DETAIL({ idx: this.$route.query.idx })
        this.textarea = ''
      }
    },
    goPage (path) {
      const isChildrenType = this.$route.query.type === 'children'
      if (isChildrenType) { return this.$router.push(`${path}?type=children`) }
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>
