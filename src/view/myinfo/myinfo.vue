<template>
  <div class="myinfo">
    <headertitle :titles="'个人中心'" :tabfalg="false"></headertitle>
    <div class="box">
      <div class="myinfobox1">
        <div class="box1top">我的资料</div>
        <div class="box1banner">
          <div class="box1item">
            <div class="iconbox" :style="{'background':'#67a9fd'}">
              <van-icon class-prefix="my-icon" name="credentials_icon" />
            </div>
            <p>身份证信息</p>
          </div>
          <div class="box1item">
            <div class="iconbox" :style="{'background':'#e96b56'}">
              <van-icon class-prefix="my-icon" name="danwei" />
            </div>
            <p>单位信息</p>
          </div>
          <div class="box1item">
            <div class="iconbox" :style="{'background':'#f8a724'}">
              <van-icon class-prefix="my-icon" name="shuaqiaqiapianyinhangqia" />
            </div>
            <p>收款银行卡</p>
          </div>
          <div class="box1item">
            <div class="iconbox" :style="{'background':'#ca8c59'}">
              <van-icon class-prefix="my-icon" name="shouji1" />
            </div>
            <p>手机号认证</p>
          </div>
          <div class="box1item" @click="wkfclick">
            <div class="iconbox" :style="{'background':'#3cc2ca'}">
              <van-icon class-prefix="my-icon" name="zmxy" />
            </div>
            <p>芝麻信用分</p>
          </div>
          <div class="box1item" @click="wkfclick">
            <div class="iconbox" :style="{'background':'#3cc2ca'}">
              <van-icon class-prefix="my-icon" name="xiangji" />
            </div>
            <p>其他资质证明</p>
          </div>
        </div>
      </div>
      <div class="myinfobox2">
        <div class="box2top">
          <div class="box2text1">我的借款</div>
          <div class="box2text2">审核中</div>
        </div>
        <div class="box2banner">
          <div class="box2item">
            <p>5000元</p>
            <span>申请金额</span>
          </div>
          <div class="box2item">
            <p>3个月</p>
            <span>借款期限</span>
          </div>
          <div class="box2item">
            <p>17871元</p>
            <span>每月还款</span>
          </div>
        </div>
      </div>
      <div class="myinfobox3">
        <div class="box3top">修改密码</div>
        <div class="box3top">退出登录</div>
      </div>
    </div>
    <tabbar :actives="3"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import headertitle from "../../components/headertitle";
export default {
  methods:{
    wkfclick(){
      this.$toast({
        type:'fail',
        message:'暂未开放该功能',
        duration:1000
      });
    }
  },
  components: {
    tabbar,
    headertitle
  }
};
</script>



<style lang='less' scoped>
.myinfo {
  padding-top: 1rem;
  padding-bottom: 50px;
  .box {
    margin-top: 0.4rem;
    padding: 0 0.4rem;
    .myinfobox1 {
      background-color: #fff;
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
      .box1top {
        height: 1rem;
        line-height: 1rem;
        padding-left: 0.3rem;
        border-bottom: 0.02rem solid #eee;
        font-size: 0.28rem;
        color: #333;
      }
      .box1banner {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 0.3rem;
        .box1item {
          margin-top: 0.3rem;
          width: 33.33%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .iconbox {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-bottom: 0.2rem;
            text-align: center;
            line-height: 0.8rem;
            .my-icon {
              font-size: 0.36rem;
              color: #fff;
            }
          }
          p {
            font-size: 0.28rem;
            color: #999;
          }
        }
      }
    }
    .myinfobox2 {
      background-color: #fff;
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
      .box2top {
        height: 1rem;
        padding: 0 0.3rem;
        border-bottom: 0.02rem solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .box2text1 {
          font-size: 0.28rem;
          color: #333;
        }
        .box2text2 {
          font-size: 0.28rem;
          color: red;
        }
      }
      .box2banner {
        display: flex;
        align-items: center;
        .box2item {
          padding: 0.3rem 0;
          width: 33.33%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          p {
            margin-bottom: 0.2rem;
            font-size: 0.36rem;
          }
          span {
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
    }
    .myinfobox3 {
      background-color: #fff;
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
      .box3top {
        height: 1rem;
        line-height: 1rem;
        padding-left: 0.3rem;
        border-bottom: 0.02rem solid #eee;
        font-size: 0.28rem;
        color: #333;
      }
      .box3top:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
