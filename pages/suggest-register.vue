<template>
  <div class="suggest-register-page">
    <GlobalMain title="제안" />
    <h2>제안글 </h2>
    <section class="first-row">
      <div class="day-range">
        <div class="input-label">
          제안 기간
        </div>
        <div class="date-pickers">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="종료날짜"
          />
        </div>
      </div>
      <div class="suggest-type">
        <div class="input-label">
          분야 선택
        </div>
        <div>
          <el-select v-model="form.type" placeholder="선택">
            <el-option
              v-for="type in suggestTypeList"
              :key="type"
              :label="type"
              :value="type"
            >
              {{ type }}
            </el-option>
          </el-select>
        </div>
      </div>
    </section>
    <section class="form-row">
      <div class="input-label">
        제안 제목
      </div>
      <div>
        <el-input v-model="form.title" placeholder="제안의 제목을 작성해주세요." />
      </div>
    </section>
    <section v-show="!isChildrenType" class="form-row text-area">
      <div class="input-label">
        제안 배경
      </div>
      <div>
        <el-input v-model="form.pro_content1" type="textarea" :rows="4" placeholder="제안을 작성하게된 이유를 요약해서 작성해주세요." />
      </div>
    </section>
    <section class="form-row text-area">
      <div class="input-label">
        주요 내용
      </div>
      <div>
        <el-input v-model="form.pro_content2" type="textarea" :rows="4" placeholder="제안하고 싶은 내용을 구체적으로 작성해주세요." />
      </div>
    </section>
    <section v-show="!isChildrenType" class="form-row text-area">
      <div class="input-label">
        기대 효과
      </div>
      <div>
        <el-input v-model="form.pro_content3" type="textarea" :rows="4" placeholder="제안을 통해 가져올 효과가 무엇인가요?" />
      </div>
    </section>
    <section class="form-row warning">
      <div class="input-label">
        제안글 작성 주의사항
      </div>
      <div>
        <ul>
          <li>
            ✤ 충청남도 학생의 권리를 실현하기 위한 정책을 제안해주세요.
          </li>
          <li>
            ✤ 일반 통념상 실현이 가능하다고 생각하는 제안을 등록해주세요.
          </li>
          <li>
            ✤ 제안하는 이유에 대해 깊이 생각하고, 객관적인 근거를 들어주세요.
          </li>
          <li>
            ✤ 단순 비판, 건의, 불만 사항은 제안에 해당되지 않으며 예고 없이 삭제될 수 있습니다.
          </li>
          <li>
            ✤ 여러분 스스로 프로젝트를 실현하고 싶은 것은 「희망나눔」메뉴를 활용해주세요.
          </li>
        </ul>
      </div>
      <div class="agree-checkbox">
        <input id="agree" v-model="form.agree" type="checkbox" name="">
        <label for="agree">제안글 작성에 대한 주의사항을 확인하였으며, 위 사항에 동의합니다.</label>
      </div>
      <div class="submit-btns">
        <el-button @click="goPage('/suggest-list')">
          돌아가기
        </el-button>
        <el-button @click="registerSuggest">
          제안 글 {{ isEditMode ? '수정' : '등록' }}
        </el-button>
      </div>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain
  },
  async asyncData ({ store, route }) {
    if (route.query.idx) {
      const { query: { type } } = route
      const isChildrenType = type === 'children'
      await store.dispatch('GET_SUGGEST_DETAIL', { idx: route.query.idx, isChildrenType })
    }
  },
  data () {
    return {
      form: {
        endDate: '',
        type: '',
        title: '',
        pro_content1: '',
        pro_content2: '',
        pro_content3: '',
        agree: true
      },
      suggestTypeList: [
        '교육', '문화', '환경', '안전', '기타'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getSuggestDetail',
      'isLoggedIn'
    ]),
    isEditMode () {
      return !!this.$route.query.idx
    },
    isChildrenType () {
      const { type } = this.$route.query
      return type === 'children'
    }
  },
  created () {
    if (this.isEditMode) {
      const {
        end_date: endDate,
        pro_cate: type,
        pro_sub: title,
        pro_content1: proContent1,
        pro_content2: proContent2,
        pro_content3: proContent3
      } = this.getSuggestDetail
      this.form.endDate = endDate
      this.form.type = type
      this.form.title = title
      this.form.pro_content1 = proContent1
      this.form.pro_content2 = proContent2
      this.form.pro_content3 = proContent3
    }
  },
  methods: {
    async registerSuggest () {
      try {
        const {
          endDate,
          type,
          title,
          pro_content1: proContent1,
          pro_content2: proContent2,
          pro_content3: proContent3,
          agree
        } = this.form
        const isValidForm = this.isChildrenType
          ? !!(endDate && type && title && proContent2)
          : !!(endDate && type && title && proContent1 && proContent2 && proContent3 && agree)
        if (!isValidForm) { return alert('제안 내용을 입력해주세요.') }
        if (!this.isLoggedIn) {
          alert('로그인 후 제안을 등록해주세요.')
          return
        }
        const dynamicParams = this.isEditMode
          ? {
              idx: this.$route.query.idx,
              user_idx: this.getUserInfo.idx
            }
          : {
              pro_user_name: this.getUserInfo.user_name,
              pro_user_idx: this.getUserInfo.idx
            }
        const params = {
          pro_cate: type,
          pro_sub: title,
          pro_content1: proContent1,
          pro_content2: proContent2,
          pro_content3: proContent3,
          end_date: dayjs(endDate).format('YYYY-MM-DD'),
          ...dynamicParams
        }
        const url = this.isChildrenType
          ? this.isEditMode ? '/proposal/update_proposal_chil.do' : '/proposal/insert_proposal_chil.do'
          : this.isEditMode ? '/proposal/update_proposal.do' : '/proposal/insert_proposal.do'
        await this.$axios.$get(url, { params })
        alert(`제안이 정상 ${this.isEditMode ? '수정' : '등록'}되었습니다.`)
        const path = this.isChildrenType ? '/suggest-list?type=children' : '/suggest-list'
        this.$router.push(path)
      } catch (e) {
        console.error(e)
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
