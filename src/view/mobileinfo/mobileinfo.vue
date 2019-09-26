<template>
  <div class="mobileinfo">
    <headertitle :titles="'手机号认证'" :tabfalg="true"></headertitle>
    <div class="tx">请您确认服务密码是否正确,以免运营商锁定密码带来不便</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">手机号码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="phone" placeholder="请输入手机号" type="number" clearable maxlength="11" />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">服务密码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="password" center clearable type="number" placeholder="请输入服务密码"></van-field>
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">图形验证码</p>
        <div class="bannerinput">
          <div class="inputbox inputbox1">
            <van-field v-model="code" placeholder="请输入图形验证码" type="number" clearable maxlength="4" />
            <img :src="codeimg" class="codeimg" @click="vercode" />
          </div>
        </div>
      </div>
    </div>
    <div class="tx1">
      温馨提示:
      <br />手机服务密码是运营商网站登陆密码,若忘记密码,请您到运营商网站找回密码
    </div>
    <div class="bannerxy">
      <van-checkbox v-model="checked">同意</van-checkbox>
      <span class="xyspan2">《用户使用协议》</span>
    </div>
    <div class="bannerbtn">
      <van-button type="primary" size="large">提交认证</van-button>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      checked: false,
      password: "",
      code: "",
      codeimg: "",
      phone: ""
    };
  },
  created() {
      this.vercode()
  },
  methods: {
    //获取图形验证码
    vercode() {
      this.$axios({
        method: "get",
        url: "http://39.98.251.244/loan/backend/systemtool/defaultKaptcha",
        responseType: "arraybuffer"
      })
        .then(response => {
          console.log(response);
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          if (data) {
            this.codeimg = data;
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
.mobileinfo {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  .tx {
    padding: 15px 0;
    text-align: center;
    font-size: 0.26rem;
    color: #666;
  }
  .tx1 {
    padding: 17px;
    line-height: 24px;
    font-size: 0.26rem;
    color: #666;
  }
  .banner {
    padding: 0 0.4rem;
    background-color: #fff;
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
          border-bottom: 1px solid #f7f7f7;
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
  .bannerxy {
    padding: 0 0.4rem;
    height: 50px;
    display: flex;
    align-items: center;
    .xyspan2 {
      color: #7654e7;
      margin-left: 0.2rem;
    }
  }
  .bannerbtn {
    padding: 0 0.4rem;
    .van-button {
      margin-top: 0.42rem;
      border-radius: 20px;
      line-height: 40px;
      height: 40px;
    }
    .van-button--primary {
      background-color: #7654e7;
      border: 1px solid #7654e7;
    }
  }
}
</style>

<style>
.mobileinfo .bannerxy .van-checkbox .van-icon{
     border: 1px solid #666;
}
.mobileinfo .bannerxy .van-checkbox__icon--checked .van-icon{
    border-color: #1989fa;
}
</style>