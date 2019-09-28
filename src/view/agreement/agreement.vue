<template>
  <div class="agreement">
    <headertitle :titles="title" :tabfalg="true" v-if="title"></headertitle>
    <div class="agreebanner" v-html="html"></div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      comId: 2,
      type: "",
      title: "",
      html:''
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.queryinfo()
  },
  methods: {
    //查询信息
    queryinfo() {
      this.$axios({
        method: "get",
        url: "http://39.98.251.244/loan/backend/agreement/queryAgreementVo",
        params: {
          comId: this.comId,
          type: this.type
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.title = res.data.data[0].agreementTitle
          this.html = res.data.data[0].agreementContent
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    }
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.agreement {
  padding-top: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  .agreebanner {
    padding: 0 0.4rem;
  }
}
</style>