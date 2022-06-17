<template>
  <div class="signup-modal">
    <el-dialog
      :visible.sync="showSignupModal"
      custom-class="login-modal"
      @close="close"
    >
      <div class="title">
        회원가입
      </div>
      <section class="login-form">
        <el-form ref="form" :model="form">
          <el-form-item label="아이디">
            <el-input v-model="form.id" placeholder="아이디" />
          </el-form-item>
          <el-form-item label="비밀번호">
            <el-input v-model="form.password" placeholder="비밀번호" type="password" />
          </el-form-item>
          <el-form-item label="이름">
            <el-input v-model="form.name" placeholder="이름" />
          </el-form-item>
          <el-form-item label="성별">
            <el-select v-model="form.gender" placeholder="성별" style="width:100%;">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="생년월일">
            <!-- <el-input v-model="form.birth" placeholder="생년월일" /> -->
            <el-date-picker
              v-model="form.birth"
              style="width:100%;"
              type="date"
              placeholder="생년월일"
            />
          </el-form-item>
          <el-form-item label="휴대폰번호">
            <el-input v-model="form.phoneNumber" placeholder="010-1234-5678" />
          </el-form-item>
          <el-button class="signup-btn" @click="handleSignup">
            완료
          </el-button>
        </el-form>
      </section>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      form: {
        id: '',
        password: '',
        name: '',
        gender: '',
        birth: '',
        phoneNumber: ''
      },
      genderOptions: [
        { value: '남성', label: '남성' },
        { value: '여성', label: '여성' }
      ]
    }
  },
  computed: {
    ...mapState({
      showSignupModal: state => state.showSignupModal
    }),
    isCompleteForm () {
      const {
        id,
        password,
        name,
        gender,
        birth,
        phoneNumber
      } = this.form
      const isCompleteForm = (id && name && gender && birth && phoneNumber && password)
      return isCompleteForm
    }
  },
  methods: {
    ...mapMutations([
      'toggleSignupModal'
    ]),
    async handleSignup () {
      try {
        if (!this.isCompleteForm) { return alert('입력값을 확인해주세요.') }
        const {
          id,
          password,
          name,
          gender,
          birth,
          phoneNumber
        } = this.form
        const res = await this.$axios.$get('/user/user_insert.do', {
          params: {
            user_id: id,
            user_pw: password,
            user_name: name,
            user_gender: gender,
            user_birthday: dayjs(birth).format('YYYY-MM-DD'),
            user_phone: phoneNumber
          }
        })
        if (typeof res === 'string') {
          if (res.includes('완료되었습니다')) {
            alert('회원가입에 성공했습니다.')
            this.toggleSignupModal(false)
            return this.$router.push('/suggest-list')
          }
          if (res.includes('중복된 아이디가')) {
            alert('중복된 아이디가 있습니다.')
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    close () {
      this.toggleSignupModal(false)
    }
  }
}
</script>

<style>

</style>
