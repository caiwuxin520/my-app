<template>
  <div class="idcardinfo">
    <headertitle :titles="'身份证信息'" :tabfalg="true"></headertitle>
    <div class="tj">提交</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">姓名</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="name" placeholder="请输入您的真实姓名" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">身份证</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="idcard" placeholder="填写您的身份证号码" clearable />
          </div>
        </div>
      </div>
    </div>
    <div class="updata">
      <div v-if="!src1">
        <van-uploader :after-read="afterRead1">
          <div class="updata1">
            <div class="morenimg">
              <img src="../../assets/img/zheng.png" class="img1" />
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="src1" v-else>
        <img :src="src1">
      </div>
    </div>
    <div class="updata">
      <div v-if="!src2">
        <van-uploader :after-read="afterRead2">
          <div class="updata1">
            <div class="morenimg">
              <img src="../../assets/img/zheng.png" class="img1" />
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="src1" v-else>
        <img :src="src2">
      </div>
    </div>
    <div class="updata">
      <div v-if="!src3">
        <van-uploader :after-read="afterRead3">
          <div class="updata1">
            <div class="morenimg">
              <img src="../../assets/img/zheng.png" class="img1" />
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="src1" v-else>
        <img :src="src3">
      </div>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      name: "",
      idcard: "",
      src1: "",
      src2: "",
      src3: ""
    };
  },
  created() {},
  methods: {
    afterRead1(file) {
      this.src1 = file.content
    },
    afterRead2(file) {
      this.src2 = file.content
    },
    afterRead3(file) {
      this.src3 = file.content
    }
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
  .tj{
    position: fixed;
    color: #fff;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 1000;
  }
  .banner {
    padding: 0 0.4rem;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .banneritem {
      height: 50px;
      display: flex;
      align-items: center;
      .ptext {
        width: 20%;
        font-size: 0.28rem;
        color: #666;
        white-space: nowrap;
      }
      .bannerinput {
        width: 80%;
        padding-left: 0.4rem;
        box-sizing: border-box;
        .inputbox {
          //   border-bottom: 1px solid #f7f7f7;
          .codeimg {
            width: 80px;
            height: 35px;
            margin-right: 16px;
          }
          .van-button {
            background-color: #fff;
            border: 1px solid #dedede;
            color: #666;
            border-radius: 4px;
          }
        }
        .inputbox1 {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .updata {
    padding: 0 0.4rem;
    margin-bottom: 0.4rem;
    .src1{
      width: 100%;
      img{
        width: 100%;
      }
    }
    .van-uploader {
      width: 100%;
    }
    .updata1 {
      width: 100%;
      .morenimg {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

<style>
.idcardinfo .van-uploader .van-uploader__input-wrapper {
  width: 100%;
}
</style>