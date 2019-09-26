<template>
  <div>
    <!-- 首页头部 -->
    <div class="banner">
      
    </div>
    <!-- 借款期限 -->
    <div class="qx">
      
      <div class="qx_money">
        <div class="left">
          <span>账户余额（元）</span>
          <span class="dash">0</span>
        </div>
        <div class="right">
          <span>待还余额（元）</span>
          <span class="dash">0</span>
        </div>
        
      </div>
      
      <div class="btn">
        <button>立即提现</button>
      </div>
    </div>
    <div class="msg">
      <img src="../../assets/img/icon.png" alt="">
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
      checked: true
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
    .left{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right:0.8rem;
      border-right:1px dashed #eeeeee;
      padding-right:0.8rem;
      font-size:0.28rem;
      .dash{
        color:red;
        font-size:0.48rem;
        padding-top:0.2rem;
      }
    }
    .right{
      display: flex;
      flex-direction: column;
      align-items: center;
     font-size:0.28rem;
      .dash{
        color:red;
         font-size:0.48rem;
         padding-top:0.2rem;
      }
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
    padding: 0 0.22rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom:1px solid #efefed;
    // padding-bottom: 0.4rem;
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
.msg{
  text-align: center;
  background-color: #fff;
  line-height: 1.3rem;
  span{
    vertical-align: middle;
    color:#999;
  }
  img{
    display:inline-block;
    vertical-align: middle;
    // width: 0.42rem;
    height: 0.36rem;
    margin-right:0.1rem;
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

