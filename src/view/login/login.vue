<template>
  <div class="login">
    <headertitle :titles="'登录'" :tabfalg="false"></headertitle>
    <div class="tj">
      <van-icon name="arrow-left" color="#fff" size="0.40rem" @click="gopath('./index')" />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="logingimg">
        <img src="@/assets/img/login-banner.png" />
      </div>
      <van-tabs v-model="active" title-active-color="#349aff">
        <van-tab title="手机号登录">
          <div class="banner">
            <div class="banneritem">
              <van-icon class-prefix="my-icon" name="shouji1" />
              <div class="bannerinput">
                <div class="inputbox">
                  <van-field
                    v-model="phone"
                    placeholder="请输入手机号"
                    type="number"
                    clearable
                    maxlength="11"
                    error-message
                  />
                </div>
              </div>
            </div>
            <div class="banneritem">
              <van-icon class-prefix="my-icon" name="dunpai" />
              <div class="bannerinput">
                <div class="inputbox inputbox1">
                  <van-field
                    v-model="code"
                    placeholder="请输入验证码"
                    type="number"
                    clearable
                    maxlength="4"
                  />
                  <img :src="codeimg" class="codeimg" @click="vercode" />
                </div>
              </div>
            </div>
            <div class="banneritem">
              <van-icon class-prefix="my-icon" name="suo" />
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
                      :disabled="btnflag"
                    >{{timer}}</van-button>
                  </van-field>
                </div>
              </div>
            </div>
          </div>
          <div class="bannerbtn">
            <van-button type="primary" size="large" @click="login1" :disabled="okflag">登录</van-button>
            <van-button type="default" size="large" @click="gopath('./register')">注册</van-button>
          </div>
        </van-tab>
        <van-tab title="账户登录">
          <div class="banner">
            <div class="banneritem">
              <van-icon class-prefix="my-icon" name="shouji1" />
              <div class="bannerinput">
                <div class="inputbox">
                  <van-field
                    v-model="phone1"
                    placeholder="请输入手机号"
                    type="number"
                    clearable
                    maxlength="11"
                  />
                </div>
              </div>
            </div>
            <div class="banneritem">
              <van-icon class-prefix="my-icon" name="suo" />
              <div class="bannerinput">
                <div class="inputbox">
                  <van-field v-model="password" center clearable :type="type" placeholder="请输入密码">
                    <van-icon
                      class-prefix="my-icon"
                      :name="iconname"
                      slot="right-icon"
                      @click="changgeicon"
                    />
                  </van-field>
                </div>
              </div>
            </div>
            <div class="banneritem">
              <van-icon class-prefix="my-icon" name="dunpai" />
              <div class="bannerinput">
                <div class="inputbox inputbox1">
                  <van-field
                    v-model="code1"
                    placeholder="请输入验证码"
                    type="number"
                    clearable
                    maxlength="4"
                  />
                  <img :src="codeimg" class="codeimg" @click="vercode" />
                </div>
              </div>
            </div>
          </div>
          <div class="bannerbtn">
            <van-button type="primary" size="large" @click="login2">登录</van-button>
          </div>
          <div class="bannertx">
            <span @click="gopath('./forgetpassword')">忘记密码?</span>
          </div>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      active: 0,
      phone: "",
      code: "",
      sms: "",
      password: "",
      phone1: "",
      code1: "",
      iconname: "biyan",
      type: "password",
      isLoading: false,
      btnflag: false,
      timer: 60,
      okflag: false,
      codeimg: "",
      formPath: ""
    };
  },
  created() {
    this.vercode();
  },
  mounted() {
    let query = this.$route.query;
    this.formPath = query.path;
  },
  methods: {
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.phone = "";
        this.sms = "";
        this.code = "";
        this.password = "";
        this.phone1 = "";
        this.code1 = "";
        this.isLoading = false;
      }, 500);
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
        url: "http://39.98.251.244/loan/backend/systemsms/sendSmsCode",
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
    },
    //切换密码是否显示
    changgeicon() {
      if (this.type == "password") {
        this.iconname = "yanjing";
        this.type = "text";
      } else {
        this.iconname = "biyan";
        this.type = "password";
      }
    },
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
    //跳转
    gopath(path) {
      this.$router.push({
        path: path
      });
    },
    //手机号登录
    login1() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.phone)) {
        this.$toast({
          type: "fail",
          message: "请输入正确的手机号",
          duration: 1000
        });
        return;
      }
      if (!this.code) {
        this.$toast({
          type: "fail",
          message: "请输入图形验证码",
          duration: 1000
        });
        return;
      }
      if (!this.sms) {
        this.$toast({
          type: "fail",
          message: "请输入短信验证码",
          duration: 1000
        });
        return;
      }
      this.$axios({
        method: "post",
        url: "http://39.98.251.244/loan/backend/systemuser/mobileLogin",
        data: {
          mobile: this.phone,
          verCode: this.code,
          smsCode: this.sms
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$toast({
            type: "success",
            message: res.data.msg,
            duration: 1000
          });
          setTimeout(() => {
            this.$router.push(this.formPath);
          }, 500);
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg,
            duration: 1000
          });
        }
      });
      // this.gopath('./index')
    },
    //密码登陆
    login2() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.phone1)) {
        this.$toast({
          type: "fail",
          message: "请输入正确的手机号",
          duration: 1000
        });
        return;
      }
      if (!this.password) {
        this.$toast({
          type: "fail",
          message: "请输入密码",
          duration: 1000
        });
        return;
      }
      if (!this.code1) {
        this.$toast({
          type: "fail",
          message: "请输入图形验证码",
          duration: 1000
        });
        return;
      }
      this.$axios({
        method: "post",
        url: "http://39.98.251.244/loan/backend/systemuser/accountLogin",
        data: {
          account: this.phone1,
          password: this.password,
          verCode: this.code1
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$toast({
            type: "success",
            message: res.data.msg,
            duration: 1000
          });
          setTimeout(() => {
            if(this.formPath == '/register' || this.formPath == '/forgetpassword'){
              this.$router.push('/index')
            }else{
               this.$router.push(this.formPath);
            }
          }, 500);
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
.login {
  padding-top: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  .tj {
    position: fixed;
    color: #fff;
    top: 0.3rem;
    left: 0.3rem;
    z-index: 1000;
  }
  .van-pull-refresh {
    min-height: 80vh;
  }
  .logingimg {
    width: 100%;
    height: 100px;
    img {
      width: 100%;
      height: 100px;
    }
  }
  .banner {
    padding: 0 0.4rem;
    .banneritem {
      height: 1rem;
      display: flex;
      align-items: center;
      .my-icon {
        font-size: 0.48rem;
        color: #666;
      }
      .bannerinput {
        width: 100%;
        padding-left: 0.4rem;
        box-sizing: border-box;
        .inputbox {
          border-bottom: 0.02rem solid #f7f7f7;
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
      border-radius: 20px;
      line-height: 40px;
      height: 40px;
    }
    .van-button--default {
      border: 1px solid #999;
    }
    .van-button--primary {
      background-color: #349aff;
      border: 1px solid #349aff;
    }
  }
  .bannertx {
    padding: 0 0.4rem;
    padding-top: 0.3rem;
    text-align: right;
    span {
      color: #333;
      font-size: 0.32rem;
    }
  }
}
</style>

<style>
.login .van-tabs .van-tabs__wrap .van-tabs__line {
  background-color: #349aff;
}
.login .van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>