<template>
  <div>
    <!-- 首页头部 -->
    <div class="banner">
      <p class="title">您最高可借款额度（元）：{{personmoney.loanMax}}</p>
      <van-slider v-model="value">
        
        <div slot="button" class="custom-button"><span>{{ value }}</span></div>
      </van-slider>
    </div>
    <!-- 借款期限 -->
    <div class="qx">
      <div class="qx_title">
        <p>借款期限</p>
      </div>
      <div class="qx_money">
        <span class="left">每月还款（元）</span>
        <span>月息（元）</span>
      </div>
      <div class="xy">
        <van-checkbox v-model="checked" checked-color="#fc6f08">
          同意
          <span>《借款协议》</span>
        </van-checkbox>
      </div>
      <div class="btn">
        <button>点击&nbsp;&nbsp;&nbsp;&nbsp;马上借款</button>
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
      number: 0,
      value: 50,
      checked: true,
      personmoney:[]
    };
  },
  components: {
    tabbar
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.arr[this.number]
      };
    }
  },
  mounted() {
    this.startMove();
    this.getmsg();
    this.getmoney();
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
    //根据贷款期限 获取贷款信息
    getmsg(){
      this.$axios.get('http://39.98.251.244/loan/backend/companySettingLoan/queryReturnMoneyPerMonth?comId=2&loanMoney=1&loanMonth=1').then(res =>{
        console.log(res.data)
      })
    },
    //根据个人信息查询可贷款金额
    getmoney(){
      this.$axios.get('http://39.98.251.244/loan/backend/companySettingLoan/queryCompanySettingLoanVo?page=1&limit=1&id=1&comId=2').then(res =>{
        this.personmoney = res.data.data[0]
        console.log(this.personmoney)
      })
    }
  }
};
</script>



<style lang='less' scoped>
.custom-button{
  background: url('../../assets/img/jinbi.png') 100% 100% no-repeat;
  background-size: 100% 100%;
  width: 0.6rem;
  height: 0.6rem;
}
.banner {
  background: url("../../assets/img/bg.png") 100% 100% no-repeat;
  background-size: 100% 100%;
  text-align: center;
  // margin-bottom:1rem;
  height: 4rem;
  line-height: 2.5rem;
  padding: 0 1rem;
  color: #fff;
}
.qx {
  background-color: #fff;
  .qx_title {
    line-height: 1rem;
    padding-left: 0.2rem;
    color: #848484;
    font-size: 0.32rem;
    margin-top: 0.1rem;
  }
  .qx_money {
    display: flex;
    justify-content: center;
    // line-height: 1.5rem;
    border-top: 1px solid #efefed;
    border-bottom: 1px solid #efefed;
    padding: 0.4rem 0;
    color: #bdbdbb;
    .left {
      border-right: 1px dashed #eeeeee;
      margin-right: 1rem;
      padding-right: 1rem;
    }
  }
  .xy {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    span {
      color: #fc6f08;
      font-size: 0.32rem;
    }
  }
  .btn {
    margin: 0 0.22rem;
    padding-bottom: 0.4rem;
    button {
      background-color: #5789ea;
      border-radius: 0.4rem;
      color: #fff;
      font-size: 0.32rem;
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
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  margin-left: 0.5rem;
  height: 0.6rem;
  line-height: 0.6rem;
  // margin: 10px auto;
  // border: 1px solid cornflowerblue;
  overflow: hidden;
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

