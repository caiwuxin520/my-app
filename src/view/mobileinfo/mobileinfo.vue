<template>
  <div class="mobileinfo">
    <headertitle :titles="'手机号认证'" :tabfalg="true"></headertitle>
    <div class="tx">请您确认服务密码是否正确,以免运营商锁定密码带来不便</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">手机号码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="phone"
              placeholder="请输入手机号"
              type="number"
              clearable
              maxlength="11"
              :disabled="true"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">服务密码</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="password"
              center
              clearable
              type="number"
              placeholder="请输入服务密码"
              :disabled="wsflag && passwordflag"
            ></van-field>
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
    </div>
    <div class="bannerxy">
      <van-checkbox v-model="checked">同意</van-checkbox>
      <span class="xyspan2" @click="gopath('agreement')">《用户使用协议》</span>
    </div>
    <div class="bannerbtn">
      <van-button
        type="primary"
        size="large"
        :disabled="okflag && passwordflag"
        @click="phoneyz"
      >提交认证</van-button>
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
      phone: "",
      okflag: false,
      comId:this.getLocalStorage('comId').data ||　"",
      userId: this.getLocalStorage("userId").data || "",
      customerId: "",
      wsflag: false,
      passwordflag: false
    };
  },
  created() {
    this.vercode();
    this.queryinfo();
  },
  methods: {
    //获取图形验证码
    vercode() {
      this.$axios({
        method: "get",
        url: this.$url+"loan/backend/systemtool/defaultKaptcha",
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
        path: path,
        query: {
          type: 2
        }
      });
    },
    //查询信息
    queryinfo() {
      this.$axios({
        method: "get",
        url:
          this.$url+"loan/backend/customerInfo/queryCustomerInfoVo",
        params: {
          comId: this.comId,
          userId: this.userId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.phone = res.data.data[0].phoneNumber;
          this.customerId = res.data.data[0].id;
          if (res.data.data[0].isCompletePhone == 1) {
            this.password = res.data.data[0].phonePsd;
            if (res.data.data[0].phonePsd) {
              this.passwordflag = true;
            }
            this.wsflag = true;
            this.okflag = true;
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
    //手机号验证
    phoneyz() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
      if (!this.password) {
        this.$toast({
          type: "fail",
          message: "请输入服务密码",
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
      if (!this.checked) {
        this.$toast({
          type: "fail",
          message: "请同意用户使用协议",
          duration: 1000
        });
        return;
      }

      this.$axios({
        method: "post",
        url:
         this.$url+"loan/backend/customerInfo/updateCustomerInfo",
        data: {
          id: this.customerId,
          phonePsd: this.password,
          verCode: this.code
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$toast({
            type: "success",
            message: res.data.msg,
            duration: 1000
          });
          setTimeout(() => {
            this.$router.push("/myinfo");
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
        font-size: 16px;
        color: #666;
        white-space: nowrap;
      }
      .bannerinput {
        width: 80%;
        padding-left: 0.4rem;
        box-sizing: border-box;
        .inputbox {
          // border-bottom: 1px solid #f7f7f7;
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
    height: 1rem;
    display: flex;
    align-items: center;
    .xyspan2 {
      color: #349aff;
      margin-left: 0.2rem;
    }
  }
  .bannerbtn {
    padding: 0 0.4rem;
    .van-button {
      border-radius: 20px;
      line-height: 40px;
      height: 40px;
    }
    .van-button--primary {
      background-color: #349aff;
      border: 1px solid #349aff;
    }
  }
}
</style>

<style>
.mobileinfo .bannerxy .van-checkbox .van-icon {
  border: 1px solid #666;
}
.mobileinfo .bannerxy .van-checkbox__icon--checked .van-icon {
  border-color: #1989fa;
}
.mobileinfo .van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>