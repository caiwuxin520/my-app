<template>
  <div class="agreement">
    <headertitle :titles="'注册协议'" :tabfalg="true"></headertitle>
    <div class="agreebanner">111</div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
    };
  },
  methods:{
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.agreement {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  .agreebanner{
      padding: 0 0.4rem;
  }
}
</style>