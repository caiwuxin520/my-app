<template>
  <div class="helpcenter">
    <headertitle :titles="'帮助中心'" :tabfalg="true"></headertitle>
    <div class="banner">
      <div class="item" v-for="(item,i) in list" :key="i"  @click="gocusinfo(item.title,item.content)">
        <div class="left">{{item.title}}</div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
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
      comId: 2,
      id: this.$route.query.id,
      list: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.querylist();
  },
  methods: {
    querylist() {
      this.$axios({
        method: "get",
        url: "http://39.98.251.244/loan/backend/helpInfo/queryHelpInfoVo",
        params: {
          comId: this.comId
        }
      }).then(res => {
        if (res.data.code == 0) {
          let newarr = [];
          let arr = res.data.data;
          arr.forEach(item => {
            if (item.parentId == this.id) {
              newarr.push(item);
            }
          });
          this.list = newarr;
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
    },
    gocusinfo(title, content) {
      this.$router.push({
        path: "/helpinfo",
        query: {
          title: title,
          content: content
        }
      });
    },
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
.helpcenter {
  padding-top: 1rem;
  .banner {
    .item {
      background-color: #fff;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.4rem;
      .left {
        width: 90%;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      .right {
        width: 10%;
        text-align: center;
      }
    }
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