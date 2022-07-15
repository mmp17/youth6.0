<template>
  <div class="notice-page">
    <GlobalMain title="도란누리란?" />
    <div class="suggest-detail">
      <div class="platform-cont">
        <div>
          <h1 class="platform-intro1"> 제작 취지 </h1>
          <h1 class="platform-intro-menu1"></h1>
          <h1 class="platform-content1">
            <div class="text-images"><img class="content1-pic" style="height: 50px;" src="../assets/images/logo_info.png" alt=""></div>
            <span>는 여럿이 나직히 정답게 이야기 하는 ‘도란’과 세상이라는 뜻의 ‘누리’가 합쳐진 이름입니다. 
              천안시 청소년들이 자유롭게 소통하고 우리 삶의 터전을 발전시키기 위한 제안들을 나누며 청소년 스스로 자신들의 공간을 만들어나가는 플랫폼입니다. 
              천안시 청소년들이 자신의 의견을 맘껏 표현할 수 있는 ‘소통의 놀이터’가 [도란누리]를 통해 실현될 수 있기를 바랍니다.</span>
          </h1>
        </div>
        <div>
          <h1 class="platform-intro2"> 게시판 별 사용자 이용 방법</h1>
          <h1 class="platform-intro-menu2"></h1>
          <h1 class="platform-content2">
            <div class="parent">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide><img src="../assets/images/00.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/01.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/02.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/03.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/04.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/05.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/06.png" alt=""></swiper-slide>
                <swiper-slide><img src="../assets/images/07.png" alt=""></swiper-slide>
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                <div slot="button-prev" class="swiper-button-prev"></div>
                <div slot="button-next" class="swiper-button-next"></div>
              </swiper>
            </div>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  name: 'swiper-example-loop',
  title: 'Loop mode / Infinite loop',
  components: {
    GlobalMain,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}

</script>

<style>

</style>
