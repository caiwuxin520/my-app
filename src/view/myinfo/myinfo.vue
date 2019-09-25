<template>
  <div class="myinfo">
    <headertitle :titles="'个人中心'" :tabfalg="false"></headertitle>
    <div class="myinfobox">
      <div class="myinfoitem">
        <van-icon class-prefix="my-icon" name="ziliaoduibi" color="#f66012" size="0.54rem" />
        <div class="itembox">
          <div class="itemleft">
            <p>我的资料</p>
          </div>
          <div class="itemright">
            <van-icon name="arrow" color="#C7C7CC" size="0.36rem"/>
          </div>
        </div>
      </div>
      <div class="myinfoitem">
        <van-icon class-prefix="my-icon" name="xiaodai-"  color="#dcd500" size="0.54rem"/>
        <div class="itembox">
          <div class="itemleft">
            <p>我的借款</p>
          </div>
          <div class="itemright">
            <van-icon name="arrow" color="#C7C7CC" size="0.36rem"/>
          </div>
        </div>
      </div>
      <div class="myinfoitem">
        <van-icon class-prefix="my-icon" name="huanzhong"  color="#0c8fdc" size="0.54rem"/>
        <div class="itembox">
          <div class="itemleft">
            <p>我的还款</p>
          </div>
          <div class="itemright">
            <van-icon name="arrow" color="#C7C7CC" size="0.36rem" />
          </div>
        </div>
      </div>
    </div>
    <tabbar :actives="3"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import headertitle from "../../components/headertitle";
export default {
  components: {
    tabbar,
    headertitle
  }
};
</script>



<style lang='less' scoped>
.myinfo {
  padding-top: 1rem;
  padding-bottom: 50px;
  .myinfobox {
    margin-top: 0.2rem;
    background-color: #fff;
    .myinfoitem {
      height: 1rem;
      width: 100%;
      padding-left: 1.1rem;
      box-sizing: border-box;
      position: relative;
      .itembox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        border-bottom: 0.02rem solid #F6F6F7;
        .itemright{
          margin-right: 0.4rem;
        }
        .itemleft{
          p{
            color: #333;
            font-size: 0.36rem;
          }
        }
      }
      .itembox:last-child{
        border-bottom: none;
      }
      .my-icon {
        position: absolute;
        left: 0.35rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
