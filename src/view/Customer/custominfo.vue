<template>
  <div class="custominfo">
    <headertitle :titles="'在线客服'" :tabfalg="true"></headertitle>
     <div class="main">
      <iframe
        :src="'https://api.pop800.com/chat/'+id"
        width="100%"
        height="100%"
        frameborder="0"
        top="1rem"
        scrolling="auto"
        style="position:absolute;"
        name="ifm"
      ></iframe>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data(){
    return {
      comId:this.getLocalStorage('comId').data ||　"",
      id:''
    }
  },
  created(){
    this.query()
  },
  methods: {
    query(){
      this.$axios({
        method: "get",
        url: this.$url+"loan/backend/companySettingBase/queryCompanySettingBaseVo",
        params: {
          comId: this.comId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.id = res.data.data[0].serviceUrl
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    }
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.custominfo {
}
</style>