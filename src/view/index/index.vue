<template>
  <div>
    <!-- 首页头部 -->
    <div class="banner">
      <span>{{value}}</span>
      <div class="title">
        <p>您最高可贷款额度（元）：{{personmoney.loanMax}}</p>
        <van-slider
          v-model="value"
          :max="max"
          :min="min"
          active-color="rgba(255,255,255,.8)"
          inactive-color="rgba(255,255,255,.3)"
          bar-height="4px"
        >
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
    </div>
    <!-- 借款期限 -->
    <div class="qx">
      <div class="qx_title">
        <p>借款期限</p>
        <div class="month">
          <div
            :class="{colorChange:index==dynamic}"
            class="vv"
            v-for="(value,index) in newMonth"
            :key="index"
            @click="getmonth(index,value)"
          >{{value}}个月</div>
          <!-- <div>6个月</div>
          <div>12个月</div>
          <div>24个月</div>
          <div>36个月</div>-->
        </div>
      </div>
      <div class="qx_money">
        <!-- <span class="left">每月还款（元）</span>
        <span>月息（元）</span>-->
        <div class="myjk">
          <span class="top">{{value}}</span>
          <span class="bottom">我的借款</span>
        </div>
        <div class="hk">
          <span class="top">{{returnMoneyPerMonth}}</span>
          <span class="bottom">每月还款</span>
        </div>
        <div class="yx">
          <span class="top">{{profitPerMonth}}</span>
          <span class="bottom">月息</span>
        </div>
      </div>
      <div class="xy">
        <van-checkbox v-model="checked" checked-color="#349aff">同意</van-checkbox>
        <span @click="jkxy">《借款协议》</span>
      </div>
      <div class="btn">
        <button @click="gochecked">马上借款</button>
      </div>
    </div>

    <!-- 滚动公告 -->
    <div class="text-container">
      <div class="inner-container">
        <p class="text" v-for="(text, index) in arr" :key="index">{{text}}</p>
      </div>
    </div>
    <div class="bb"></div>
    <!-- 封装底部组件 -->
    <tabbar :actives="0"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
export default {
  name: "scroll",
  data() {
    return {
      // value: "",
      arr: [
        "不是被郭德纲发现的，也不是一开始就收为徒弟。",
        "现在雅阁这个状态像极了新A4L上市那段日子。",
        "低配太寒碜，各种需要加装，中配定价过高，又没啥特色",
        "然后各种机油门、经销商造反什么的幺蛾子。",
        "看五月销量，建议参考A4，打8折吧。",
        "不是被郭德纲发现的，也不是一开始就收为徒弟。"
      ],
      number: 0,//信息滚动条数
      value: 0,//贷款金额
      checked: false,//是否勾选协议
      personmoney: [],//可贷款金额数组
      max: 0,//最大可贷款金额
      min: 0,//最小可贷款金额
      dynamic: 0,//选择月份的下标
      newMonth: [],//月份数据处理后的
      val: 0,//选择的月份值
      returnMoneyPerMonth: "", //每月还款
      profitPerMonth: "" //月息
    };
  },
  components: {
    tabbar
  },
  // 监听滑块值的变化
  watch: {
    value(newvalue, oldvalue) {
      this.value = newvalue;
      this.getmsg(this.val);
    }
  },
  // 计算滚动消息
  computed: {
    text() {
      return {
        id: this.number,
        val: this.arr[this.number]
      };
    }
  },
  created() {
    this.startMove();
    this.getmoney();
    // this.getseesionid()
  },

  methods: {
    // 滚动定时器
    startMove() {
      let timer = setTimeout(() => {
        if (this.number === 5) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      });
    },
    // 滑块
    onChange(value) {
      this.$toast("当前值：" + value);
    },
    //根据贷款期限以及贷款金额 获取贷款信息
    getmsg(val) {
      this.$axios
        .get(
          `http://39.98.251.244/loan/backend/companySettingLoan/queryReturnMoneyPerMonth?comId=2&loanMoney=${this.value}&loanMonth=${this.dynamic == 0 ? parseInt(this.newMonth[0]) : parseInt(val)}`
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.returnMoneyPerMonth = res.data.data.returnMoneyPerMonth;
            this.profitPerMonth = res.data.data.profitPerMonth;
          }else{
            this.$toast(res.data.msg);
          }
        });
    },
    //根据个人信息查询可贷款金额
    getmoney() {
      this.$axios
        .get(
          "http://39.98.251.244/loan/backend/companySettingLoan/queryCompanySettingLoanVo?comId=2"
        )
        .then(res => {
          if (res.data.code == 0) {
            this.personmoney = res.data.data[0];
            this.max = this.personmoney.loanMax;
            this.min = this.personmoney.loanMin;
            this.value = this.min;
            this.month = this.personmoney.loanInstallment;
            this.newMonth = this.month.split(",");
            this.getmsg(this.newMonth[0]);
          }else{
            this.$toast(res.data.msg);
          }
        });
    },
    //选择月份
    getmonth(index, value) {
      this.dynamic = index;
      console.log(value);
      this.val = value;
      this.getmsg(this.val);
    },
    //提交借款
    gochecked() {
      if(this.checked == true){
        let data = {
        comId: 2,//跟在地址栏后面的
        customerId: 1,//登录后才有的
        loanMoney: this.value,//贷款总金额
        loanMonth:
          this.dynamic == 0 ? parseInt(this.newMonth[0]) : parseInt(this.val)//贷款月份
      };
      this.$axios
        .post(
          "http://39.98.251.244/loan/backend/recordLoan/insertRecordLoan",
          data
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$dialog
              .alert({
                title: "提示",
                message: "借款申请已提交，请等待后台审批"
              })
              .then(() => {
                this.$router.push("./myinfo");
              });
          }else if(res.data.code == -2){
            this.$toast('请先登录');
            this.$router.push('./login')
          }else{
            this.$toast(res.data.msg);
          }
        });
      }else{
        this.$toast('请勾选协议');
      }
      
    },
    //跳转借款协议
    jkxy() {
      this.$router.push("./jkxy");
    }
  }
};
</script>



<style lang='less' scoped>
.custom-button {
  background: url("../../assets/img/jinbi.png") no-repeat;
  background-size: 100% 100%;
  width: 0.48rem;
  height: 0.48rem;
}
.banner {
  background: url("../../assets/img/bg.png") 100% 100% no-repeat;
  background-size: 100% 100%;
  text-align: center;
  // height: 4rem;
  // line-height: 1.5rem;
  padding: 0 1rem;
  padding-bottom: 0.7rem;
  padding-top: 0.5rem;
  color: #fff;
  .title {
    // line-height: 1rem;
    p {
      padding-bottom: 0.6rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  span {
    font-size: 1rem;
  }
}
.qx {
  background-color: #fff;
  .qx_title {
    // line-height: 1rem;
    padding-left: 0.2rem;
    color: #848484;
    font-size: 0.32rem;
    margin-top: 0.1rem;
    p {
      line-height: 1rem;
    }
    .month {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .vv {
        // background: orange;
        display: flex;
        justify-content: center;
        line-height: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 0.4rem;
        color: black;
        width: 30%;
        font-size: 0.18rem;
        margin-right: 0.2rem;
        margin-bottom: 0.3rem;
      }
      .colorChange {
        background-color: #349aff;
        color: #fff;
      }
    }
  }
  .qx_money {
    display: flex;
    justify-content: center;
    border-top: 1px solid #efefed;
    border-bottom: 1px solid #efefed;
    padding: 0.4rem 0;
    color: #bdbdbb;
    .myjk {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid #eee;
      padding-right: 0.8rem;
      .top {
        color: black;
        font-size: 0.32rem;
        margin-bottom: 0.1rem;
      }
      .bottom {
        font-size: 0.18rem;
      }
    }
    .hk {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid #eee;
      padding-right: 0.8rem;
      padding-left: 0.8rem;
      .top {
        color: black;
        font-size: 0.32rem;
        margin-bottom: 0.1rem;
      }
      .bottom {
        font-size: 0.18rem;
      }
    }
    .yx {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 0.8rem;
      .top {
        color: black;
        font-size: 0.32rem;
        margin-bottom: 0.1rem;
      }
      .bottom {
        font-size: 0.18rem;
      }
    }
  }
  .xy {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    font-size: 0.12rem;
    display: flex;
    align-items: center;
    span {
      color: #349aff;
    }
  }
  .btn {
    margin: 0 0.22rem;
    padding-bottom: 0.4rem;
    button {
      background-color: #349aff;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 100%;
      padding: 0 0.22rem;
      margin: 0 auto;

      // margin:0 0.22rem;
    }
  }
}
.text-container {
  // width: 500px;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.5rem;
  height: 0.6rem;
  line-height: 0.6rem;
  // margin: 10px auto;
  // border: 1px solid cornflowerblue;
  overflow: hidden;
   background-color: #fff;
}
.bb {
  height: 0.8rem;
  background-color: #fff;
}
.text,
.text2 {
  margin: 0;
  
}
.inner-container {
 
  animation: myMove 10s linear infinite;
  animation-fill-mode: forwards;
}
/*文字无缝滚动*/
@keyframes myMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-150px);
  }
}
/*文字停顿滚动*/
@keyframes myMove2 {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-30px);
  }
  20% {
    transform: translateY(-30px);
  }
  30% {
    transform: translateY(-60px);
  }
  40% {
    transform: translateY(-60px);
  }
  50% {
    transform: translateY(-90px);
  }
  60% {
    transform: translateY(-90px);
  }
  70% {
    transform: translateY(-120px);
  }
  80% {
    transform: translateY(-120px);
  }
  90% {
    transform: translateY(-150px);
  }
  100% {
    transform: translateY(-150px);
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 3s linear;
}
.slide-leave-to {
  transform: translateY(-50px);
}
.slide-enter {
  transform: translateY(50px);
}
</style>

