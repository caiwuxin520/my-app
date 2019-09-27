<template>
  <div class="updatapassword">
    <headertitle :titles="'修改密码'" :tabfalg="true"></headertitle>
    <div class="tx">登录密码尽量设置8-16位，字母数字符号组合。</div>
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
        <p class="ptext">验证码</p>
        <div class="bannerinput">
          <div class="inputbox inputbox1">
            <van-field v-model="code" placeholder="请输入右侧验证码" type="number" clearable maxlength="4" />
            <img :src="codeimg" class="codeimg" @click="vercode" />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">短信验证码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="sms" center clearable type="number" placeholder="请输入短信验证码">
              <van-button
                slot="button"
                size="small"
                type="primary"
                v-if="!btnflag"
                @click="fscode"
              >获取验证码</van-button>
              <van-button
                slot="button"
                size="small"
                type="primary"
                v-else
                :disabled="flag"
              >{{timer}}</van-button>
            </van-field>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">新密码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="password1" placeholder="请输入您的新密码" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">确认新密码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="password2" placeholder="确认您的新密码" clearable />
          </div>
        </div>
      </div>
    </div>
    <div class="bannerbtn">
      <van-button type="primary" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      checked: false,
      code: "",
      codeimg: "",
      phone: "",
      sms: "",
      btnflag: false,
      timer: 60,
      password1:"",
      password2:""
    };
  },
  created() {
    this.vercode();
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
    },
    //发送验证码
    fscode() {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.phone)) {
        this.$toast({
          type: "fail",
          message: "请输入正确的手机号",
          duration: 1000
        });
        return;
      }
      this.$axios({
        method: "get",
        url: " http://39.98.251.244/loan/backend/systemsms/sendSmsCode",
        params: {
          phoneNumber: this.phone
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.btnflag = true;
          let auth_timer = setInterval(() => {
            //定时器设置每秒递减
            this.timer--; //递减时间
            if (this.timer <= 0) {
              this.btnflag = false; //60s时间结束还原v-show状态并清除定时器
              this.timer = 60;
              clearInterval(auth_timer);
            }
          }, 1000);
          this.$toast({
            type: "success",
            message: "发送成功",
            duration: 1000
          });
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
.updatapassword {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  .tx {
    padding: 0.4rem;
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
  .bannerbtn {
    padding: 0 0.4rem;
    .van-button {
      margin-top: 0.42rem;
      border-radius: 25px;
      line-height: 50px;
      height: 50px;
    }
    .van-button--primary {
      background-color: #349aff;
      border: 1px solid #349aff;
    }
  }
}
</style>

<style>
.updatapassword .bannerxy .van-checkbox .van-icon {
  border: 1px solid #666;
}
.updatapassword .bannerxy .van-checkbox__icon--checked .van-icon {
  border-color: #1989fa;
}
.updatapassword .van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>