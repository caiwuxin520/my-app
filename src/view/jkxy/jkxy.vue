<template>
  <div class="Customer">
    <!-- <headertitle :titles="'借款协议'" :tabfalg="false"></headertitle> -->
    <van-nav-bar title="借款协议" @click-left="onClickLeft" left-arrow />
    <div v-html="content" class="content"></div>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import headertitle from "../../components/headertitle";
export default {
  components: {
    //    tabbar,
    headertitle
  },
  data() {
    return {
        content:''
    };
  },
  created(){
      this.getmsg()
  },
  methods: {
    onClickLeft() {
      this.$router.push("./index");
    },
    //查询协议
    getmsg(){
        this.$axios.get('http://39.98.251.244/loan/backend/agreement/queryAgreementVo?type=0').then(res =>{
            this.content = res.data.data[0].agreementContent
        }
            
        )
    }
  }
};
</script>



<style lang='less' scoped>
.Customer{
    background-color: #fff;
    .content{
        padding: 0 0.2rem;
    }
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar {
  background-color: #349aff;
}
.van-nav-bar__title {
  color: #fff;
}
.msg {
  text-align: center;
  // background-color: #fff;
  line-height: 1.3rem;
  display: flex;
  justify-content: center;
  span {
    vertical-align: middle;
    color: #999;
    margin-left: 0.1rem;
  }
}
</style>
