<template>
  <div class="helpinfo">
    <headertitle :titles="'帮助详情'" :tabfalg="true"></headertitle>
    <div class="title">{{title}}</div>
    <div class="content" v-html="content"></div>
    <div class="cusicon" @click="gokf">
      <div class="bannericon">
        <van-icon class-prefix="my-icon" name="kefu" />
      </div>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      comId: this.getLocalStorage('comId').data ||　"",
      title: this.$route.query.title,
      content: this.$route.query.content
    };
  },
  created() {},
  methods: {
     gokf(){
      this.$router.push({
        path: "/custominfo",
      
      });
    }
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.helpinfo {
  padding: 0 0.4rem;
  padding-top: 1rem;
  height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  .title {
    padding: 0.5rem 0;
    display: flex;
    font-size: 0.4rem;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.4rem;
  }
  .content{
    font-size: 0.36rem;
  }
  .cusicon {
    background-color: #349aff;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    .my-icon {
      font-size: 0.4rem;
      color: #fff;
    }
  }
}
</style>

<style>
.helpinfo img {
  width: 100%;
  height: 100%;
}
</style>
