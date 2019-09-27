<template>
  <div class="myorder">
    <headertitle :titles="'我的借款'" :tabfalg="true"></headertitle>
    <div class="box1banner">
      <div class="box1item iconboxactive">
        <div class="iconbox">
          <van-icon class-prefix="my-icon" name="jiekuandingdantijiao5" />
        </div>
        <p>订单提交</p>
      </div>
      <div class="line">
        <span></span>
      </div>
      <div class="box1item iconboxactive">
        <div class="iconbox">
          <van-icon class-prefix="my-icon" name="shenhe" />
        </div>
        <p>审核通过</p>
      </div>
      <div class="line">
        <span></span>
      </div>
      <div class="box1item">
        <div class="iconbox">
          <van-icon class-prefix="my-icon" name="yidaozhang" />
        </div>
        <p>到账成功</p>
      </div>
    </div>
    <div class="je">
      <div class="pic">2000,000.00</div>
      <p>恭喜！您的个人信用贷款已审核通过！</p>
    </div>
    <div class="banner">
      <div class="item">
        <div class="left">订单编号:</div>
        <div class="right">
            <span>1231231231312</span>
            <van-button type="default"  size="mini">复制</van-button>
        </div>
      </div>
       <div class="item">
        <div class="left">借款金额:</div>
        <div class="right">￥50,000</div>
      </div>
       <div class="item">
        <div class="left">下单时间:</div>
        <div class="right">2019-06-13 09:11:12</div>
      </div>
       <div class="item">
        <div class="left">借款期限:</div>
        <div class="right">3个月</div>
      </div>
       <div class="item">
        <div class="left">到账银行:</div>
        <div class="right">招商银行</div>
      </div>
       <div class="item">
        <div class="left">收款账号:</div>
        <div class="right">**** **** **** 6542</div>
      </div>
       <div class="item">
        <div class="left">每月还款:</div>
        <div class="right">￥17,674</div>
      </div>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.myorder {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  .box1banner {
    display: flex;
    height: 2rem;
    align-items: center;
    .box1item {
      flex: 3;
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
        background-color: #ccc;
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
    .iconboxactive {
      .iconbox {
        background-color: #fba620;
      }
      p {
        color: #fba620;
      }
    }
    .line {
      position: relative;
      height: 100%;
      flex: 1;
      span {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 36%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ccc;
      }
    }
  }
  .je {
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .pic {
      font-size: 0.6rem;
      color: #e73324;
      font-weight: bold;
    }
    p {
      margin-top: 0.2rem;
      font-size: 0.28rem;
      color: #999;
    }
  }
  .banner{
      background-color: #fff;
      padding: 0 0.4rem;
     .item{
         display: flex;
         align-items: center;
         height: 1rem;
         .left{
             width: 25%;
             color: #999;
         }
         .right{
             width: 75%;
             color: #000;
             font-weight: bold;
             .van-button{
                 margin-left: 0.4rem;
             }
         }
     } 
  }
}
</style>