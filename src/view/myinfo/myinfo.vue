<template>
  <div class="myinfo">
    <headertitle :titles="'个人中心'" :tabfalg="false"></headertitle>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="box">
        <div class="myinfobox1">
          <div class="box1top">我的资料</div>
          <div class="box1banner">
            <div class="box1item" @click="gopath('./idcardinfo')">
              <div class="iconbox" :style="{'background':'#67a9fd'}">
                <van-icon class-prefix="my-icon" name="credentials_icon" />
              </div>
              <p>身份证信息</p>
              <p v-if="isCompleteUser == 1 &&　islogin" class="p1">(已完善)</p>
              <p v-else>(待完善)</p>
            </div>
            <div class="box1item" @click="gopath('./workinfo')">
              <div class="iconbox" :style="{'background':'#e96b56'}">
                <van-icon class-prefix="my-icon" name="danwei" />
              </div>
              <p>单位信息</p>
              <p v-if="isCompleteCompany == 1　&&　islogin" class="p1">(已完善)</p>
              <p v-else>(待完善)</p>
            </div>
            <div class="box1item" @click="gopath('./blankcard')">
              <div class="iconbox" :style="{'background':'#f8a724'}">
                <van-icon class-prefix="my-icon" name="shuaqiaqiapianyinhangqia" />
              </div>
              <p>收款银行卡</p>
              <p v-if="isCompleteBank == 1　&&　islogin" class="p1">(已完善)</p>
              <p v-else>(待完善)</p>
            </div>
            <div class="box1item" @click="gopath('./mobileinfo')">
              <div class="iconbox" :style="{'background':'#ca8c59'}">
                <van-icon class-prefix="my-icon" name="shouji1" />
              </div>
              <p>手机号认证</p>
              <p v-if="isCompletePhone == 1　&&　islogin" class="p1">(已完善)</p>
              <p v-else>(待完善)</p>
            </div>
            <div class="box1item" @click="gopath('./updatapassword')" v-if="islogin">
              <div class="iconbox" :style="{'background':'#FFA500'}">
                <van-icon class-prefix="my-icon" name="suo" />
              </div>
              <p>修改密码</p>
            </div>
            <!-- <div class="box1item" @click="wkfclick">
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
            </div>-->
          </div>
        </div>
        <div class="myinfobox2" @click="gopath('./myorder')" v-if="islogin && isjek">
          <div class="box2top">
            <div class="box2text1">我的借款</div>
            <div class="box2text2">{{jkinfo.loanStatusValue}}</div>
          </div>
          <div class="box2banner">
            <div class="box2item">
              <p>{{jkinfo.loanMoney}}元</p>
              <span>申请金额</span>
            </div>
            <div class="box2item">
              <p>{{jkinfo.loanMonth}}个月</p>
              <span>借款期限</span>
            </div>
            <div class="box2item">
              <p>{{jkinfo.returnMoneyPerMonth}}元</p>
              <span>每月还款</span>
            </div>
          </div>
        </div>
        <div class="myinfobox3" v-if="islogin">
          <van-button type="default" @click="tuichu">
            <van-icon class-prefix="my-icon" name="guanji" />退出登录
          </van-button>
        </div>
      </div>
    </van-pull-refresh>
    <tabbar :actives="3"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      islogin: false,
      isLoading: false,
      comId: this.getLocalStorage("comId").data || "",
      userId: this.getLocalStorage("userId").data || "",
      isCompletePhone: "",
      isCompleteUser: "",
      isCompleteBank: "",
      isCompleteCompany: "",
      isjek: null,
      jkinfo: {},
      customerId: ""
    };
  },
  created() {
    this.jclogin();
    this.queryjk();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.querymyjk();
        this.isLoading = false;
      }, 500);
    },
    wkfclick() {
      this.$toast({
        type: "fail",
        message: "暂未开放该功能",
        duration: 1000
      });
    },
    //跳转
    gopath(path) {
      this.$router.push({
        path: path
      });
    },
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
    //退出登陆
    tuichu() {
      this.$axios({
        method: "post",
        url: "http://39.98.251.244/loan/backend/systemuser/logout"
      }).then(res => {
        if (res.data.code == 0) {
          this.$toast({
            type: "success",
            message: res.data.msg,
            duration: 1000
          });
          localStorage.removeItem("userId");
          setTimeout(() => {
            this.$router.push("./login");
          }, 500);
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
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
          if (res.data.data.length > 0) {
            this.customerId = res.data.data[0].id;
            this.isCompletePhone = res.data.data[0].isCompletePhone;
            this.isCompleteUser = res.data.data[0].isCompleteUser;
            this.isCompleteCompany = res.data.data[0].isCompleteCompany;
            this.isCompleteBank = res.data.data[0].isCompleteBank;
            this.querymyjk();
          }
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    },
    //查询我的借款
    querymyjk() {
      this.$axios({
        method: "get",
        url: "http://39.98.251.244/loan/backend/recordLoan/queryRecordLoanVo",
        params: {
          comId: this.comId,
          customerId: this.customerId
        }
      }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.length == 0) {
            this.isjek = false;
          } else {
            this.jkinfo = res.data.data[0];
            this.isjek = true;
          }
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
    tabbar,
    headertitle
  }
};
</script>



<style lang='less' scoped>
.myinfo {
  padding-top: 1rem;
  padding-bottom: 50px;
  .van-pull-refresh {
    min-height: 85vh;
  }
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
            font-size: 0.32rem;
            color: #999;
          }
          .p1 {
            color: red;
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
          font-size: 0.32rem;
          color: #333;
        }
        .box2text2 {
          font-size: 0.32rem;
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
            font-size: 0.32rem;
            color: #999;
          }
        }
      }
    }
    .myinfobox3 {
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
      .van-button {
        width: 100%;
        height: 50px;
        border-radius: 25px;
        color: #999;
        font-size: 16px;
        .my-icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
