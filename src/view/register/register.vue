<template>
  <div class="register">
    <headertitle :titles="'注册'" :tabfalg="true"></headertitle>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="banner">
        <div class="banneritem">
          <p class="ptext">手机号</p>
          <div class="bannerinput">
            <div class="inputbox">
              <van-field
                v-model="phone"
                placeholder="请输入手机号"
                type="number"
                clearable
                maxlength="11"
              />
            </div>
          </div>
        </div>
        <div class="banneritem">
          <p class="ptext">邀请码</p>
          <div class="bannerinput">
            <div class="inputbox">
              <van-field v-model="yqcode" placeholder="请输入邀请码" clearable />
            </div>
          </div>
        </div>
        <div class="banneritem">
          <p class="ptext">图形验证码</p>
          <div class="bannerinput">
            <div class="inputbox inputbox1">
              <van-field
                v-model="code"
                placeholder="请输入图形验证码"
                type="number"
                clearable
                maxlength="4"
              />
              <img :src="codeimg" class="codeimg" @click="vercode" />
            </div>
          </div>
        </div>
        <div class="banneritem">
          <p class="ptext">验证码</p>
          <div class="bannerinput">
            <div class="inputbox">
              <van-field v-model="sms" center clearable type="number" placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary">获取验证码</van-button>
              </van-field>
            </div>
          </div>
        </div>
        <div class="banneritem">
          <p class="ptext">登录密码</p>
          <div class="bannerinput">
            <div class="inputbox">
              <van-field v-model="password" center clearable :type="type" placeholder="请设置6-16位密码">
                <van-icon
                  class-prefix="my-icon"
                  :name="iconname"
                  slot="right-icon"
                  @click="changgeicon"
                  size="28px"
                />
              </van-field>
            </div>
          </div>
        </div>
      </div>
      <div class="bannerxy">
        <van-checkbox v-model="checked">同意</van-checkbox>
        <span class="xyspan2" @click="gopath('./agreement')">《用户注册协议》</span>
      </div>
      <div class="bannerbtn">
        <van-button type="primary" size="large">完成</van-button>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      phone: "",
      yqcode: "",
      code: "",
      sms: "",
      password: "",
      iconname: "biyan",
      type: "password",
      checked: false,
      codeimg: "",
      isLoading: false
    };
  },
  created() {
    this.vercode();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.phone = ""
        this.yqcode = ""
        this.code = ""
        this.sms = ""
        this.password = ""
        this.checked = false
        this.isLoading = false;
      }, 500);
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
    //跳转
    gopath(path) {
      this.$router.push({
        path: path
      });
    },
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
          if(data){
            this.codeimg = data
          }
        });
    },
    //注册
    registers() {
      // this.$axios({
      //   method: "post",
      //   url: 'http://39.98.251.244/loan/backend/customerInfo/insertCustomerInfo',
      //   data: {
      //     id: this.touristId
      //   }
      // });
    }
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.register {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  .van-pull-refresh{
    height: 100%;
  }
  .banner {
    padding: 0 0.4rem;
    .banneritem {
      height: 1rem;
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