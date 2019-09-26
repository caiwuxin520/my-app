<template>
  <div class="login">
    <headertitle :titles="'登录'" :tabfalg="true"></headertitle>
    <div class="logingimg">
      <img src="@/assets/img/login-banner.png" />
    </div>
    <van-tabs v-model="active" title-active-color="#7654E7">
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
                <img src="../../assets/img/code.jpg" class="codeimg" />
              </div>
            </div>
          </div>
          <div class="banneritem">
            <van-icon class-prefix="my-icon" name="suo" />
            <div class="bannerinput">
              <div class="inputbox">
                <van-field v-model="sms" center clearable type="number" placeholder="请输入短信验证码">
                  <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
              </div>
            </div>
          </div>
        </div>
        <div class="bannerbtn">
            <van-button type="primary" size="large" @click="login">登录</van-button>
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
                   <van-icon class-prefix="my-icon" :name="iconname"  slot="right-icon" @click="changgeicon"/>
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
                <img src="../../assets/img/code.jpg" class="codeimg" />
              </div>
            </div>
          </div>
         
        </div>
        <div class="bannerbtn">
            <van-button type="primary" size="large" @click="login">登录</van-button>
        </div>
        <div class="bannertx">
            <span @click="gopath('./forgetpassword')">忘记密码?</span>
        </div>
      </van-tab>
    </van-tabs>
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
      password:'',
      phone1:"",
      code1:"",
      iconname:'biyan',
      type:'password'
    };
  },
  methods:{
      //切换密码是否显示
      changgeicon(){
          if(this.type == 'password'){
              this.iconname = 'yanjing'
              this.type = 'text'
          }else{
              this.iconname = 'biyan'
                this.type = 'password'
          }
      },
      //跳转
      gopath(path){
          this.$router.push({
            path:path
          })
      },
      //登录
      login(){
        this.gopath('./index')
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
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
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
              border-radius: 4px
          }
        }
        .inputbox1 {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .bannerbtn{
      padding:  0 0.4rem;
      .van-button{
          margin-top: 0.42rem;
          border-radius: 20px;
          line-height: 40px;
          height: 40px;
      }
      .van-button--default{
          border: 1px solid #999;
      }
      .van-button--primary{
          background-color: #7654e7;
          border: 1px solid #7654e7;
      }
  }
  .bannertx{
      padding: 0 0.4rem;
      padding-top: 0.3rem;
      text-align: right;
      span{
          color: #333;
          font-size: 0.32rem;
      }
  }
}
</style>

<style>
.login .van-tabs .van-tabs__wrap .van-tabs__line {
  background-color: #7654e7;
}
.login .van-cell:not(:last-child)::after{
    border-bottom: none;
}
</style>