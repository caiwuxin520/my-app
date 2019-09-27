<template>
  <div class="tabbar">
    <van-tabbar v-model="active"  active-color="#349aff"	>
      <van-tabbar-item to="./index">
        <span>首页</span>
        <van-icon class-prefix="my-icon" size="25px" name="jiekuan" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item to="./wallet">
        <span>钱包</span>
        <van-icon class-prefix="my-icon" size="25px" name="qianbao" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item to="./Customer">
        <span>客服</span>
        <van-icon class-prefix="my-icon" size="25px" name="kefu" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item to="./myinfo">
        <span>我的</span>
        <van-icon class-prefix="my-icon" size="25px" name="wode" slot="icon" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  props:['actives'],
  created(){
      this.active = this.actives
  },
};
</script>



<style lang='less' scoped>
</style>