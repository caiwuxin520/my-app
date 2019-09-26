<template>
  <div>
    <!-- 首页头部 -->
    <div class="banner">
      <p class="title">
        您最高可借款额度（元）：30万
      </p>
      <van-slider v-model="value" @change="onChange" />
    </div>
    <!-- 借款期限 -->
    <div></div>

    <!-- 滚动公告 -->
    <div class="text-container">
      <div class="inner-container">
        <p class="text" v-for="(text, index) in arr" :key="index">{{text}}</p>
      </div>
    </div>
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
      value: 50
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
      this.$toast('当前值：' + value);
    }
  }
};
</script>



<style lang='less' scoped>
.banner{
  text-align: center;
  margin-bottom:5rem;
}
.text-container {
  // width: 500px;
  height: 30px;
  line-height: 30px;
  // margin: 10px auto;
  // border: 1px solid cornflowerblue;
  overflow: hidden;
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

