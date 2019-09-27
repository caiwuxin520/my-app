<template>
  <div>
    <!-- 首页头部 -->
    <div class="banner">
        <div class="title">
          <span>账户余额</span>
          <span>50000</span>
        </div>
    </div>
    <!-- 实名认证 -->
    <div class="rz">
      <img src="../../assets/img/user_tx.png" alt="">
      <span>15500000001</span>
      <span>--已实名制认证</span>
    </div>
    <!-- 账户余额 -->
    <div class="ye">
      <div class="left">
        <span class="top">账户余额</span>
        <span class="bottom">50741.00</span>
      </div>
      <div class="right" @click="checktx">
        <span>取现</span>
      </div>
    </div>
    <div class="xz">
      <van-icon class-prefix="my-icon" name="dunpai" />
      <span>账户资金安全由银行保障</span>
    </div>
    <!-- 封装底部组件 -->
    <tabbar :actives="1"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
export default {
  name: "scroll",
  data() {
    return {
      
    };
  },
  components: {
    tabbar
  },
  computed: {
    
  },
  mounted() {
    this.getmsg();
  },

  methods: {
    //查询借款人信息以及余额
    getmsg(){
      this.$axios.get('http://39.98.251.244/loan/backend/customerInfo/queryCustomerInfoVo?page=1&limit=1&id=1&comId=1&userId=1&realName=1&phoneNumber=1&idcardNumber=1&provinceId=1&cityId=1&regionId=1&address=1&zfbAccount=1&companyPhone=1&companyProvinceId=1&companyCityId=1&companyRegionId=1&companyAddress=1&bankAccount=1').then(res =>{
        
      })
    },
    
    //点击提现
    checktx(){
      let data = {
        comId: 2,//跟在地址栏后面的
        customerId: 1,//登录后才有的
        cashoutMoney:''//需要提现的金额
      }
      this.$axios.post('http://39.98.251.244/loan/backend/recordCashout/insertRecordCashout',data).then(res =>{

      })
    }
  }
};
</script>


<style lang='less' scoped>

.banner {
  background: url("../../assets/img/bg2.png") no-repeat;
  background-size:cover;
  // text-align: center;
  // margin-bottom:1rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0.8rem;
    color:#fff;
  }
  
}
.rz{
  display: flex;
  align-items: center;
  background-color: #fff;
  line-height: 1.2rem;
  padding-left:0.3rem;
  border-bottom:1px solid #eee;
  img{
    width: 0.6rem;
    height: 0.6rem;
    padding-right:0.2rem;
    
  }
  span{
    color:#999;
  }
}
.ye{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  // line-height: 0.8rem;
  align-items: center;
  padding:0.4rem 0.4rem;
  
  .left{
    display: flex;
    flex-direction: column;
    line-height: 0.6rem;
    // align-items: center;
    .top{
      color:#999;
      font-size:0.12rem;
    }
    .bottom{
      color:black;
      font-weight: bold;
      font-size: 0.36rem;
    }
  }
  .right{
    width: 2rem;
    border:1px solid #349aff;
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.6rem;
    color:#349aff
  }
}
.xz{
  text-align: center;
  color:#aaa;
  font-size:0.12rem;
  margin-top:0.6rem;
}

</style>

