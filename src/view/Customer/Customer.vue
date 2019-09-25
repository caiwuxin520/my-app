<template>
  <div class="Customer">
     <headertitle :titles="'个人中心'" :tabfalg="false"></headertitle>
    客服
    <tabbar :actives="2"></tabbar>
  </div>
</template>

<script>
import tabbar from '../../components/tabbar'
import headertitle from '../../components/headertitle'
export default {
 components:{
   tabbar,
   headertitle
 }
}
</script>



<style lang='less' scoped>
.Customer{
  padding-top: 1rem;
}
</style>
