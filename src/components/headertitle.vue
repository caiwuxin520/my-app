<template>
  <div class="headertitle">
      <van-icon name="arrow-left" size="0.40rem" v-if="tabfalg" @click="$router.go(-1)"/>
      <div class="box">{{title}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    };
  },
  props:['titles','tabfalg'],
  created(){
      this.title = this.titles
  },
};
</script>



<style lang='less' scoped>
.headertitle{
    height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon{
      position: absolute;
      left: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .box{
        font-size: 0.36rem;
        color: #000;
    }
}
</style>