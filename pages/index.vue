<template>
  <div class="main-page">
    <section class="main-page__gnb">
      <div class="d-day">D{{ survEndDDay }}</div>
      <h2>{{ main.surv_sub }}</h2>
      <el-progress
        :text-inside="true"
        :stroke-width="15"
        :percentage="survParticipationRate"
      />
      <div class="achieve">달성률 {{ survParticipationRate }}%</div>
      <div class="involve">
        <span>참여인원 : {{ main.surv_participants_num }}명</span>
        <span>참여 목표인원 : {{ main.surv_target_num }}명</span>
      </div>
      <a class="participate-survey" :href="main.surv_url" target="_blank"
        >설문 참여하기 <i class="el-icon-right" />
      </a>
    </section>
    <section class="main-page__part">
      <div class="notice">
        <div class="title">
          <h3>공지사항</h3>
          <i class="el-icon-circle-plus-outline" />
        </div>
        <div v-for="notice in main.notiList" :key="notice.idx" class="content">
          <nuxt-link :to="`/announce-detail?idx=${notice.idx}`">
            - {{ notice.noti_sub }}
          </nuxt-link>
        </div>
      </div>
      <div class="popular-suggest">
        <nuxt-link :to="`/suggest-detail?idx=${main.topAgreePropoList[0].idx}`">
          <div class="title">
            <h3>인기있는 제안</h3>
            <i class="el-icon-circle-plus-outline" />
          </div>
          <div class="content">
            {{ toAgreeSuggest.pro_sub }} <br /><br />
            <span v-html="convertNewLine(toAgreeSuggest.pro_content1)" />
          </div>
          <div class="status">
            <img src="~/assets/images/icon_like.png" alt="" />
            <span>
              {{ toAgreeSuggest.pro_agree }}
            </span>
            <img src="~/assets/images/icon_see.png" alt="" />
            <span>
              {{ toAgreeSuggest.pro_hit }}
            </span>
          </div>
        </nuxt-link>
      </div>
    </section>
    <section class="main-page__suggests">
      <h3>실현된 제안</h3>
      <swiper class="suggest-swiper" :options="swiperOption">
        <swiper-slide
          v-for="realize in main.realizedPropoList"
          :key="realize.idx"
        >
          <div class="box">
            <div class="title">
              <div class="category">
                <img :src="categorys[realize.pro_cate].src" alt="" />
                <span>{{ realize.pro_cate }}</span>
              </div>
              <div class="status">실현</div>
            </div>
            <div class="content">
              {{ realize.pro_sub }}
            </div>
          </div>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev pc" />
        <div slot="button-next" class="swiper-button-next pc" />
      </swiper>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";
import "swiper/css/swiper.css";
import dayjs from "dayjs";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async asyncData(context) {
    const res = await context.app.$axios.$get("/main/main.do");
    return {
      main: res,
    };
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      categorys: {
        전체: {
          src: require("~/assets/images/suggest-all.png"),
          label: "전체",
        },
        교육: {
          src: require("~/assets/images/suggest-edu.png"),
          label: "교육",
        },
        문화: {
          src: require("~/assets/images/suggest-culture.png"),
          label: "문화",
        },
        환경: {
          src: require("~/assets/images/suggest-environment.png"),
          label: "환경",
        },
        안전: {
          src: require("~/assets/images/suggest-safety.png"),
          label: "안전",
        },
        기타: {
          src: require("~/assets/images/suggest-etc.png"),
          label: "기타",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["isMobileSize"]),
    survEndDDay() {
      const remainHour = dayjs(this.main.surv_end_date).diff(
        new Date(),
        "hour"
      );
      const remainDays = Math.floor(remainHour / 24) + 1;
      return remainDays > 0
        ? `-${Math.abs(remainDays)}`
        : `+${Math.abs(remainDays)}`;
    },
    survParticipationRate() {
      const {
        surv_participants_num: survParticipantsNum,
        surv_target_num: survTargetNum,
      } = this.main;
      return (survParticipantsNum / survTargetNum) * 100;
    },
    toAgreeSuggest() {
      return this.main.topAgreePropoList[0];
    },
  },
  created() {
    const pcRealizedData = this.main.realizedPropoList.length;
    const pcSlidesPerView = pcRealizedData > 3 ? 3 : pcRealizedData;
    this.swiperOption.slidesPerView = this.isMobileSize ? 1 : pcSlidesPerView;
    // this.ipFinder();
  },
  methods: {
    convertNewLine(str) {
      try {
        return str.split("\n").join("<br />");
      } catch (e) {
        return str;
      }
    },

    // storeIPaddressesToCookies(ipaddess) {
    //   const _cookieName = "addresses";
    //   var cookies = this.getCookie(_cookieName);
    //   //it says some address cookie exists
    //   if (cookies) {
    //     // console.log(cookies);
    //     var cookieArray = cookies.split(",");
    //     // console.log(cookieArray);
    //     // console.log(cookieArray.includes(ipaddess));
    //     var isIPorIncluded = cookieArray.includes(ipaddess);
    //     if (isIPorIncluded) {
    //     } else {
    //       //if addresses existed but IP never recorded
    //       this.generateHitCount();
    //       address = [cookies];
    //       address.push(ipaddess);
    //       document.cookie = _cookieName + "=" + address;
    //     }
    //   } else {
    //     //if addresses never existed in cookie
    //     this.generateHitCount();
    //     address = [];
    //     address.push(ipaddess);
    //     document.cookie = _cookieName + "=" + address;
    //   }
    // },

    // getCookie(name) {
    //   var pattern = RegExp(name + "=.[^;]*");
    //   var matched = document.cookie.match(pattern);
    //   if (matched) {
    //     var cookie = matched[0].split("=");
    //     return cookie[1];
    //   }
    //   return false;
    // },
    // generateHitCount() {
    //   // console.log('Function CALLED')
    //   const config = {
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   };

    //   fetch("https://youthapi.co.kr/visit/visit_record.do", config)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // hitCounter.innerHTML = data;
    //       // console.log(data);
    //     });
    // },
    // async ipFinder() {
    //   var ip = await $.getJSON("https://api.ipify.org?format=json", function (data) {
    //     // Setting text of element P with id gfg
    //     // $("#gfg").html(data.ip);
    //     // this.storeIPaddressesToCookies(data.ip);
    //     return data.ip
    //   });
    //   console.log(ip.ip)
    //   this.storeIPaddressesToCookies(ip.ip);
    // },
  },
};
</script>