<template>
  <div class="signup-page">
    <GlobalMain title="회원가입" />
    <section class="signup-form">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="아이디">
          <el-input v-model="form.id" placeholder="아이디" />
        </el-form-item>
        <el-form-item label="이름">
          <el-input v-model="form.name" placeholder="이름" />
        </el-form-item>
        <el-form-item label="중학교">
          <el-input v-model="form.middleSchool" placeholder="중학교" />
        </el-form-item>
        <el-form-item label="고등학교">
          <el-input v-model="form.highSchool" placeholder="고등학교" />
        </el-form-item>
        <el-form-item label="비밀번호">
          <el-input v-model="form.password" placeholder="비밀번호" />
        </el-form-item>
        <el-form-item label="비밀번호 확인">
          <el-input v-model="form.passwordCheck" placeholder="비밀번호 확인" />
        </el-form-item>
        <div class="submit-btns">
          <el-button @click="onSubmit">
            회원가입
          </el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        middleSchool: '',
        highSchool: '',
        password: '',
        passwordCheck: ''
      }
    }
  },
  computed: {
    isCompleteForm () {
      const {
        id,
        name,
        middleSchool,
        highSchool,
        password,
        passwordCheck
      } = this.form
      const isCompleteForm = (id && name && middleSchool && highSchool && password && passwordCheck)
      return isCompleteForm
    },
    isMatchPassword () {
      const {
        password,
        passwordCheck
      } = this.form
      return password === passwordCheck
    }
  },
  methods: {
    async onSubmit () {
      try {
        if (!this.isCompleteForm) { return alert('입력값을 확인해주세요.') }
        if (!this.isMatchPassword) { return alert('비밀번호가 일치하지 않습니다.') }
        const {
          id,
          name,
          middleSchool,
          highSchool,
          password
        } = this.form
        const res = await this.$axios.$get('/user/user_insert.do', {
          params: {
            user_id: id,
            user_pw: password,
            user_name: name,
            user_ms: middleSchool,
            user_hs: highSchool
          }
        })
        if (res === 0) {
          alert('회원가입에 성공했습니다.')
          return this.$router.push('/suggest-list')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>

</style>
