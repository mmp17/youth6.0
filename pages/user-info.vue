<template>
  <div class="user-info">
    <GlobalMain title="설정 및 개인정보" />
    <section class="login-form">
      <el-form ref="form" :model="form">
        <el-form-item label="아이디">
          <el-input v-model="form.id" disabled placeholder="아이디" />
        </el-form-item>
        <el-form-item label="비밀번호">
          <el-input v-model="form.password" disabled placeholder="비밀번호" type="password" />
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
        <div class="bottom-btn">
          <el-button class="change-btn" @click="submitUserInfo">
            정보수정
          </el-button>
          <el-button class="cancel-btn" @click="$router.go(-1)">
            취소
          </el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain
  },
  async middleware ({ store }) {
    await store.dispatch('GET_USER_DATA')
  },
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
    ...mapGetters([
      'getUserInfo'
    ])
  },
  created () {
    const {
      user_birthday: userBirthday,
      user_gender: userGender,
      user_id: userId,
      user_name: userName,
      user_phone: userPhone,
      user_pw: userPw
    } = this.getUserInfo
    this.form.id = userId
    this.form.password = userPw
    this.form.name = userName
    this.form.gender = userGender
    this.form.birth = userBirthday
    this.form.phoneNumber = userPhone
  },
  methods: {
    async submitUserInfo () {
      try {
        const {
          name, gender, birth, phoneNumber
        } = this.form
        const res = await this.$axios({
          method: 'get',
          url: '/user/update_user_info_sns.do',
          params: {
            user_idx: this.getUserInfo.idx,
            user_id: this.getUserInfo.user_id,
            user_name: name,
            user_gender: gender,
            user_birthday: dayjs(birth).format('YYYY-MM-DD'),
            user_phone: phoneNumber
          }
        })
        const { status } = res
        const isSuccess = status === 200
        await this.$store.dispatch('GET_USER_DATA')
        if (isSuccess) {
          alert('정상 처리되었습니다.')
        }
        this.$router.push('/')
      } catch (e) {
        alert('오류가 발생했습니다. 다시 시도해주세요')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
