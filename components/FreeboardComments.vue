<template>
  <div class="suggest-comments">
    <div class="btns">
      <el-button class="first" @click="handleFreeboard({type: 'edit'})">
        수정
      </el-button>
      <el-button class="second btn" @click="handleFreeboard({type:'remove'})">
        삭제
      </el-button>
      <!-- <el-button class="third" @click="goPage('/freeboard-list')">
        목록으로
      </el-button> -->
    </div>
    <div v-show="hasFreeboardAnswer" class="suggest-answer">
      <div class="title">
        게시글 답변
      </div>
      <!-- <div class="paragraph">
        {{ getFreeboardDetail.comment }}
      </div> -->
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
          <li v-for="(comment, index) in freeboard.comments" :key="index" class="comment">
            <div class="comment-title">
              <span>{{ comment.com_name }}</span> | {{ comment.regdate }}
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
      freeboard: state => state.freeboardDetail
    }),
    ...mapGetters([
      'isLoggedIn',
      'getUserInfo',
      'getFreeboardDetail'
    ]),
    hasFreeboardAnswer () {
      return !!this.getFreeboardDetail.comment
    }
  },
  methods: {
    ...mapActions([
      'GET_FREEBOARD_DETAIL'
    ]),
    handleFreeboard ({ type }) {
      console.log('FreeboardDetail', this.getFreeboardDetail.commu_user_idx)
      console.log('UserInfo', this.getUserInfo.idx)
      if (!this.isLoggedIn) { return alert('로그인 해주세요.') }
      const isOwnWriter = this.getUserInfo.user_idx !== this.getFreeboardDetail.commu_user_idx
      if (!isOwnWriter) { return alert('게시글의 작성자만 수정 및 삭제를 할 수 있습니다.') }
      if (type === 'remove') { return this.removeFreeboard() }
      const isChildrenType = this.$route.query.type !== 'children'
      const url = isChildrenType ? `/freeboard-register?idx=${this.$route.query.idx}` : `/freeboard-register?idx=${this.$route.query.idx}`
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
        const res = await this.$axios.$get('/community/community_comment_update.do', {
          params: {
            idx: this.editCommentIdx,
            comment: this.editCommentValue,
            user_idx: this.getUserInfo.idx
          }
        })
        this.editCommentIdx = null
        this.editCommentValue = null
        await this.GET_FREEBOARD_DETAIL({ idx: this.$route.query.idx })
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
        await this.$axios.$get('/community/community_comment_delete.do', {
          params: {
            idx: comment.idx,
            user_idx: this.getUserInfo.idx
          }
        })
        await this.GET_FREEBOARD_DETAIL({ idx: this.$route.query.idx })
      } catch (e) {
        console.error(e)
      }
    },
    async removeFreeboard () {
      try {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
          const isNotOwnFreeboard = this.getFreeboardDetail.commu_user_idx === this.getUserInfo.user_idx
          if (isNotOwnFreeboard) { return alert('게시글의 작성자만 삭제할 수 있습니다.') }
          const res = await this.$axios.$get('/community/community_delete.do', {
            params: {
              idx: this.$route.query.idx,
              user_idx: this.getUserInfo.idx
            }
          })
          const url = '/freeboard-list'
          const isSuccessRemove = typeof res
          if (isSuccessRemove) {
            alert('게시글이 삭제되었습니다.')
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
      const res = await this.$axios.$get('/community/community_comment_insert.do', {
        params: {
          comment: this.textarea,
          com_name: this.getUserInfo.user_name,
          user_idx: this.getUserInfo.idx,
          commu_idx: this.$route.query.idx
        }
      })
      const REQUEST_SUCCESS = 0
      if (res === REQUEST_SUCCESS) {
        await this.GET_FREEBOARD_DETAIL({ idx: this.$route.query.idx })
        this.textarea = ''
      }
    },
    goPage (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>
