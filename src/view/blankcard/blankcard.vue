<template>
  <div class="blankcard">
    <headertitle :titles="'银行卡信息'" :tabfalg="true"></headertitle>
    <div class="tj">提交</div>
    <div class="card">
        <img src="../../assets/img/bg.png" alt="">
        <p class="cardnum">********1111111</p>
    </div>
    <div class="tx">填写本人银行卡须是本人名下的借记卡（储蓄卡）</div>
     <div class="banner">
      <div class="banneritem">
        <p class="ptext">持卡人姓名</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="name" placeholder="填写持卡人姓名" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">持卡人身份证</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="idcard" placeholder="填写持卡人身份证号" clearable />
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">开户银行</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="blankname" placeholder="请选择" clearable :disabled="true" right-icon="arrow"/>
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">银行卡号</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="blanknum" placeholder="填写银行卡号" clearable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      name:"",
      idcard:"",
      blankname:"",
      blanknum:""
    };
  },
  created() {
    
  },
  methods: {
   
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.blankcard {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  .tj{
    position: fixed;
    color: #fff;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 1000;
  }
   .tx {
    padding: 0.4rem;
    font-size: 0.26rem;
    color: #666;
  }
  .card{
    padding: 0.4rem;
    position: relative;
    padding-bottom: 0;
    img{
      width: 100%;
      height: 3.6rem;
      border-radius: 10px;
    }
    .cardnum{
      position: absolute;
      color: #fff;
      right: 0.8rem;
      bottom: 0.8rem;
    }
  }
  .banner {
    padding: 0 0.4rem;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .banneritem {
      height: 50px;
      display: flex;
      align-items: center;
      .ptext {
        width: 20%;
        font-size: 0.28rem;
        color: #666;
        white-space: nowrap;
      }
      .bannerinput {
        width: 80%;
        padding-left: 0.4rem;
        box-sizing: border-box;
        .inputbox {
          //   border-bottom: 1px solid #f7f7f7;
          .codeimg {
            width: 80px;
            height: 35px;
            margin-right: 16px;
          }
          .van-button {
            background-color: #fff;
            border: 1px solid #dedede;
            color: #666;
            border-radius: 4px;
          }
        }
        .inputbox1 {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>