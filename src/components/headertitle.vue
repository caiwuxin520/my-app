<template>
  <div class="headertitle">
      <div class="box">{{title}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    };
  },
  props:['titles'],
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
    background-color: #fff;
    .box{
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.36rem;
        color: #000;
    }
}
</style>