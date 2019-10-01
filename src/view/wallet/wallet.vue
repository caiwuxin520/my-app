<template>
  <div class="wallet">
    <headertitle :titles="'钱包'" :tabfalg="false"></headertitle>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>
        <!-- 首页头部 -->
        <div class="banner">
          <div class="title">
            <span class="span1">账户余额</span>
            <span v-if="islogin" class="span2">{{balanceWallet}}</span>
            <span v-else class="span2">0</span>
          </div>
        </div>
        <!-- 实名认证 -->
        <div class="rz" v-if="islogin">
          <img src="../../assets/img/user_tx.png" alt />
          <span>{{phone}}</span>
          <span v-if="isCertificate == 1">--已实名制认证</span>
          <span v-if="isCertificate == 0">--未实名制认证</span>
        </div>
        <div class="rz" v-else>
          <van-button type="default" size="large" round to="/login">请登录</van-button>
        </div>
        <!-- 账户余额 -->
        <div class="ye">
          <div class="left">
            <span class="top">账户余额</span>
            <span class="bottom">{{balanceDebt}}</span>
          </div>
          <div class="right">
            <van-button type="default" round size="small" @click="checktx" :disabled="okflag">取现</van-button>
          </div>
        </div>
        <!-- <div class="ye ye1">
        <div class="left">
          <span class="top">待还余额</span>
          <span class="bottom">{{balanceDebt}}</span>
        </div>
        </div>-->
        <div class="xz">
          <van-icon class-prefix="my-icon" name="dunpai" />
          <span>账户资金安全由银行保障</span>
        </div>
      </div>
    </van-pull-refresh>

    <!-- 封装底部组件 -->
    <tabbar :actives="1"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import headertitle from "../../components/headertitle";
export default {
  name: "scroll",
  data() {
    return {
      comId: 2,
      customerId: "",
      islogin: false,
      userId: this.getLocalStorage("userId").data || "",
      balanceDebt: "",
      balanceWallet: "",
      isCertificate: "",
      phone: "",
      okflag: false,
      isLoading: false
    };
  },
  components: {
    tabbar,
    headertitle
  },
  created() {
    this.jclogin();
    this.queryjk();
  },
  methods: {
    //检查登陆状态
    jclogin() {
      this.$axios({
        method: "post",
        url: "http://39.98.251.244/loan/backend/systemuser/checkLogin"
      }).then(res => {
        if (res.data.code == 0) {
          this.islogin = true;
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
    //查询借款人
    queryjk() {
      this.$axios({
        method: "get",
        url:
          "http://39.98.251.244/loan/backend/customerInfo/queryCustomerInfoVo",
        params: {
          comId: this.comId,
          userId: this.userId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.customerId = res.data.data[0].id;
          this.balanceDebt = res.data.data[0].balanceDebt;
          this.balanceWallet = res.data.data[0].balanceWallet;
          this.isCertificate = res.data.data[0].isCertificate;
          this.phone = res.data.data[0].phoneNumber;
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    },
    //点击提现
    checktx() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
      if (this.islogin) {
        if (this.balanceWallet > 0) {
          let data = {
            comId: this.comId,
            customerId: this.customerId,
            cashoutMoney: this.balanceWallet
          };
          this.$axios
            .post(
              "http://39.98.251.244/loan/backend/recordCashout/insertRecordCashout",
              data
            )
            .then(res => {
              if (res.data.code == 0) {
                this.$toast({
                  type: "success",
                  message: res.data.msg,
                  duration: 1000
                });
                this.queryjk();
              } else {
                this.$toast({
                  type: "fail",
                  message: res.data.msg,
                  duration: 1000
                });
              }
            });
        } else {
          this.$toast({
            type: "fail",
            message: "余额需要大于0元",
            duration: 1000
          });
        }
      } else {
        this.$toast({
          type: "fail",
          message: "请先登录",
          duration: 1000
        });
      }
    }
  }
};
</script>


<style lang='less' scoped>
.wallet {
  .van-pull-refresh {
    min-height: 85vh;
  }
}
.banner {
  background: url("../../../static/bg2.png") no-repeat;
  background-size: cover;
  // text-align: center;
  // margin-bottom:1rem;
  height: 4.5rem;
  position: relative;
  .title {
    color: #fff;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%;);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .span1 {
      color: #fff;
      font-size: 0.32rem;
    }
    .span2 {
      color: #fff;
      font-size: 0.48rem;
      font-weight: bold;
    }
  }
}
.wallet {
  padding-top: 1rem;
}
.rz {
  display: flex;
  align-items: center;
  background-color: #fff;
  line-height: 1.2rem;
  height: 1.2rem;
  padding: 0 0.3rem;
  border-bottom: 1px solid #eee;
  img {
    width: 0.6rem;
    height: 0.6rem;
    padding-right: 0.2rem;
  }
  span {
    color: #999;
    font-size: 0.36rem;
  }
}
.ye {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  // line-height: 0.8rem;
  align-items: center;
  padding: 0.4rem 0.4rem;
  border-bottom: 1px solid #ccc;
  .left {
    display: flex;
    flex-direction: column;
    line-height: 0.6rem;
    // align-items: center;
    .top {
      color: #999;
      font-size: 0.32rem;
    }
    .bottom {
      color: black;
      font-weight: bold;
      font-size: 0.36rem;
    }
  }
  .right {
    .van-button {
      width: 1.2rem;
    }
  }
}
.ye1 {
  border-bottom: none;
}
.xz {
  text-align: center;
  color: #aaa;
  font-size: 0.36rem;
  line-height: 1rem;
  .my-icon {
    font-size: 0.36rem;
  }
}
</style>

