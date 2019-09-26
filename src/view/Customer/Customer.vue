<template>
  <div class="Customer">
     <headertitle :titles="'帮助中心'" :tabfalg="false"></headertitle>
    <!-- <div>
      <img src="../../assets/img/icon.png" alt="">
      <span>点击联系客服，服务时间：9：30-21：30</span>
    </div> -->
     <div class="msg">
      <van-icon class-prefix="my-icon" name="kefu" color="#999"/>
      <span>点击联系客服，服务时间：9：30-21：30</span>
    </div>
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
.msg{
  text-align: center;
  // background-color: #fff;
  line-height: 1.3rem;
  display: flex;
  justify-content: center;
  span{
    vertical-align: middle;
    color:#999;
    margin-left:0.1rem;
  }
  
}
</style>
