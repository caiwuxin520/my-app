<template>
  <div class="myorder">
    <headertitle :titles="'我的借款'" :tabfalg="true"></headertitle>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
        <p>{{jkinfo.loanStatusValue}}</p>
      </div>
      <div class="line">
        <span></span>
      </div>
      <div class="box1item" :class="{'iconboxactive':jkinfo.isTransOkStatus==1}"  >
        <div class="iconbox">
          <van-icon class-prefix="my-icon" name="yidaozhang" />
        </div>
        <p>{{jkinfo.loanStatusValue}}</p>
      </div>
    </div>
    <div class="je">
      <div class="pic">{{jkinfo.loanMoney}}</div>
      <p>{{jkinfo.statusNotice}}</p>
    </div>
    <div class="banner">
      <div class="item">
        <div class="left">订单编号:</div>
        <div class="right">
            <span>{{jkinfo.loanNo}}</span>
            <van-button type="default"  size="mini" class="tag-read" :data-clipboard-text="jkinfo.loanNo" @click="copy">复制</van-button>
        </div>
      </div>
       <div class="item">
        <div class="left">借款金额:</div>
        <div class="right">￥{{jkinfo.loanMoney}}</div>
      </div>
       <div class="item">
        <div class="left">下单时间:</div>
        <div class="right">{{jkinfo.createTime}}</div>
      </div>
       <div class="item">
        <div class="left">借款期限:</div>
        <div class="right">{{jkinfo.loanMonth}}个月</div>
      </div>
       <div class="item">
        <div class="left">到账银行:</div>
        <div class="right">{{jkinfo.bankName}}</div>
      </div>
       <div class="item">
        <div class="left">收款账号:</div>
        <div class="right">{{jkinfo.bankAccount}}</div>
      </div>
       <div class="item">
        <div class="left">每月还款:</div>
        <div class="right">￥{{jkinfo.returnMoneyPerMonth}}</div>
      </div>
    </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
import Clipboard from 'clipboard';
export default {
  data() {
    return {
      comId: this.getLocalStorage('comId').data ||　"",
      userId: this.getLocalStorage("userId").data || "",
      jkinfo:{},
      isLoading: false,
    };
  },
  created() {
    this.queryjk()
  },
  methods: {
     //查询借款人
    queryjk() {
      this.$axios({
        method: "get",
        url:
          this.$url+"loan/backend/customerInfo/queryCustomerInfoVo",
        params: {
          comId: this.comId,
          userId: this.userId
        }
      }).then(res => {
        if (res.data.code == 0) {
          let customerId = res.data.data[0].id;
          this.querymyjk(customerId)
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    },
     //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.queryjk();
        this.isLoading = false;
      }, 500);
    },
    //查询我的借款
    querymyjk(id) {
      this.$axios({
        method: "get",
        url: this.$url+"loan/backend/recordLoan/queryRecordLoanVo",
        params: {
          comId: this.comId,
          customerId: id
        }
      }).then(res => {
        if (res.data.code == 0) {
           this.jkinfo = res.data.data[0]
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    },
     copy() {
        let clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
           this.$toast({
            type: "success",
            message: '复制成功',
            duration: 1000
          });
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
           this.$toast({
            type: "fail",
            message: '不支持复制',
            duration: 1000
          });
          // 释放内存
          clipboard.destroy()
        })
      }
  },
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
   .van-pull-refresh {
    min-height: 85vh;
  }
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
      padding: 0 0.4rem;
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
             
         }
     } 
  }
}
</style>