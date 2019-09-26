<template>
  <div class="blankcard">
    <headertitle :titles="'银行卡信息'" :tabfalg="true"></headertitle>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      
    };
  },
  created() {
    
  },
  methods: {
   
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.blankcard {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
</style>