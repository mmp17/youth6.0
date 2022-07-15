<template>
  <div class="notice-page">
    <GlobalMain title="천안시 청소년기관" />
    <div class="suggest-detail">
      <div class="partners-cont">
        <div class="partners-img-cont">
          <div>
            <h1 class="partners1"> 청소년 활동시설 </h1>
            <div class="sita1">
              <span class="partners-img1"><a href="http://www.cayouth.or.kr/" target="_blank"><img class="youth_banner_01" src="../assets/images/youth_banner_01.svg" alt=""></a></span>
              <span class="partners-img2"><a href="http://www.youth.ac/" target="_blank"><img class="youth_banner_02" src="../assets/images/youth_banner_02.svg" alt=""></a></span>
            </div>
            <div class="sitat1">
              <span class="partners-img3"><a href="http://www.youth.ac/" target="_blank"><img class="youth_banner_03" src="../assets/images/youth_banner_03.svg" alt=""></a></span>
            </div>
          </div>
          <div>
            <h1 class="partners2"> 청소년 복지지원기관</h1>
            <div class="sita2">
              <span class="partners-img4"><a href="https://www.cheonan.go.kr/teen" target="_blank"><img class="youth_banner_04" src="../assets/images/youth_banner_04.svg" alt=""></a></span>
              <span class="partners-img5"><a href="https://www.cheonan.go.kr/teen.do" target="_blank"><img class="youth_banner_05" src="../assets/images/youth_banner_05.svg" alt=""></a></span>
            </div>
          </div>
          <div>
            <h1 class="partners3"> 청소년 복지시설 </h1>
            <div class="sita3">
              <span class="partners-img6"><a href="http://www.shimter1388.com/" target="_blank"><img class="youth_banner_06" src="../assets/images/youth_banner_06.svg" alt=""></a></span>
              <span class="partners-img7"><a href="http://www.shimter1388.com/" target="_blank"><img class="youth_banner_07" src="../assets/images/youth_banner_07.svg" alt=""></a></span>
            </div>
          </div>
          <div>
            <h1 class="partners4"> 청소년 자유공간 </h1>
            <div class="sita4">
              <span class="partners-img8"><a href="https://www.facebook.com/ch6221388" target="_blank"><img class="youth_banner_08" src="../assets/images/youth_banner_08.svg" alt=""></a></span>
              <span class="partners-img9"><a href="http://www.youth.ac/" target="_blank"> <img class="youth_banner_09" src="../assets/images/youth_banner_09.svg" alt=""></a> </span>
            </div>
            <div class="sita5">
              <span class="partners-img10"><a href="https://www.facebook.com/chungdaum3" target="_blank"><img class="youth_banner_10" src="../assets/images/youth_banner_10.svg" alt=""></a></span>
              <span class="partners-img11"><a href="http://staryouth.co.kr/" target="_blank"><img class="youth_banner_11" src="../assets/images/youth_banner_11.svg" alt=""></a></span>
            </div>
            <div class="sita6">
              <span class="partners-img12"><a href="https://m.facebook.com/%EC%B2%AD%EB%8B%A4%EC%9B%805%ED%98%B8%EC%A0%90-100940088359089/"><img class="youth_banner_12" src="../assets/images/youth_banner_12.svg" alt="" target="_blank"></a></span>
              <span class="partners-img13"><a href="https://www.facebook.com/%EC%B2%AD%EB%8B%A4%EC%9B" target="_blank"><img class="youth_banner_13" src="../assets/images/youth_banner_13.svg" alt=""></a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain
  },
  methods: {
    goPage (path) {
      // const isChildrenType = this.$route.query.type === 'children'
      // if (isChildrenType) { return this.$router.push(`${path}?type=children`) }
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>
