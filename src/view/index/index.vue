<template>
  <div class="index">
    首页
    <tabbar :actives="0"></tabbar>
  </div>
</template>

<script>
import tabbar from '../../components/tabbar'
export default {
 components:{
   tabbar
 }
}
</script>



<style lang='less' scoped>
.index{
  p{
    color: red;
  }
}
</style>

