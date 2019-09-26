<template>
  <div class="idcardinfo">
    <headertitle :titles="'身份证信息'" :tabfalg="true"></headertitle>
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
.idcardinfo {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
</style>