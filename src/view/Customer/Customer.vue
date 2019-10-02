<template>
  <div class="Customer">
    <headertitle :titles="'客服'" :tabfalg="false"></headertitle>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="banner">
        <div class="banneritem" v-for="(item,i) in list" :key="i">
          <div class="itemleft">
            <div class="bannericon" :class="i | classname">
              <van-icon class-prefix="my-icon" :name="i | iconname" size="0.4rem" />
            </div>
            <p>{{item.title}}</p>
          </div>
          <div class="itemright">
            <div
              class="itemright1"
              v-for="(items,j) in item.zdlist"
              :key="j"
              @click="gocusinfo(items.title,items.content)"
            >
              <p>{{items.title}}</p>
            </div>
            <div class="itemright1" v-if="item.zdlist.length == 2" @click="gogengduo(item.id)">
              <span>查看更多信息</span>
              <van-icon name="arrow" color="#349AFF" size="0.36rem" />
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="cusicon" @click="gokf">
      <div class="bannericon">
        <van-icon class-prefix="my-icon" name="kefu" />
      </div>
    </div>
    <tabbar :actives="2"></tabbar>
  </div>
</template>

<script>
import tabbar from "../../components/tabbar";
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      isLoading: false,
      list: [],
      comId: this.getLocalStorage("comId").data || ""
    };
  },
  created() {
    this.querylist();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.querylist();
        this.isLoading = false;
      }, 500);
    },
    querylist() {
      this.$axios({
        method: "get",
        url: this.$url+"/loan/backend/helpInfo/queryHelpInfoVo",
        params: {
          comId: this.comId
        }
      }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.length > 0) {
            let newarr = [];
            let arr = res.data.data;
            arr.forEach(item => {
              if (item.parentId == null) {
                item["zdlist"] = [];
                newarr.push(item);
              }
            });
            newarr.forEach(item => {
              arr.forEach(items => {
                if (items.parentId == item.id) {
                  item.zdlist.push(items);
                }
              });
            });
            newarr.forEach(item => {
              if (item.zdlist.length > 3) {
                let a = item.zdlist.slice(0, 2);
                item.zdlist = a;
              }
            });
            this.list = newarr;
          }
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
    gogengduo(id) {
      this.$router.push({
        path: "/helpcenter",
        query: {
          id: id
        }
      });
    },
    gokf() {
      this.$router.push({
        path: "/custominfo"
      });
    }
  },
  components: {
    tabbar,
    headertitle
  },
  filters: {
    iconname(val) {
      let a = null;
      switch (val) {
        case 0:
          a = "iconfonthuankuankuai";
          break;
        case 1:
          a = "qianbao";
          break;
        case 2:
          a = "xiaodai-";
          break;
        case 3:
          a = "wode";
          break;
        case 4:
          a = "danwei";
          break;
        case 5:
          a = "dunpai";
          break;
        case 6:
          a = "shenhe";
          break;
        case 7:
          a = "icon-test";
          break;
        case 8:
          a = "credentials_icon";
          break;
        case 9:
          a = "ziliaoduibi";
          break;
        default:
          a = "huanzhong";
      }
      return a;
    },
    classname(val) {
      let a = null;
      switch (val) {
        case 0:
          a = "icon2";
          break;
        case 1:
          a = "icon3";
          break;
        case 2:
          a = "icon4";
          break;
        case 3:
          a = "icon5";
          break;
        case 4:
          a = "icon6";
          break;
        case 5:
          a = "icon7";
          break;
        case 6:
          a = "icon8";
          break;
        case 7:
          a = "icon9";
          break;
        case 8:
          a = "icon10";
          break;
        case 9:
          a = "icon1";
          break;
        default:
          a = "icon2";
      }
      return a;
    }
  }
};
</script>



<style lang='less' scoped>
.Customer {
  padding-top: 1rem;
  padding-bottom: 50px;

  .van-pull-refresh {
    min-height: 85vh;
  }
  .banner {
    .banneritem {
      display: flex;
      justify-content: flex-start;
      min-height: 2.6rem;
      background-color: #fff;
      margin-bottom: 0.4rem;
      .itemleft {
        p {
          font-size: 0.36rem;
        }
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-right: 1px solid #eee;
        .bannericon {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.2rem;
          .my-icon {
            font-size: 0.4rem;
            color: #fff;
          }
        }
        .icon1 {
          background-color: #ffb848;
        }
        .icon2 {
          background-color: #8cba00;
        }
        .icon3 {
          background-color: #852b99;
        }
        .icon4 {
          background-color: #f42321;
        }
        .icon5 {
          background-color: #f33331;
        }
        .icon6 {
          background-color: #f19388;
        }
        .icon7 {
          background-color: #f29238;
        }
        .icon8 {
          background-color: #f21266;
        }
        .icon9 {
          background-color: #f21883;
        }
        .icon10 {
          background-color: #f29338;
        }
      }
      .itemright {
        width: 70%;
        display: flex;
        flex-direction: column;
        .itemright1 {
          flex: 1;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 0.2rem;
          border-bottom: 1px solid #eee;
          p {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
            font-size: 0.36rem;
          }
          span {
            color: #349aff;
            font-size: 0.36rem;
            margin-right: 0.2rem;
          }
        }
        .itemright1:last-child {
          border-bottom: none;
        }
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
