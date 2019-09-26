<template>
  <div class="forgetpassword">
    <headertitle :titles="'找回密码'" :tabfalg="true"></headertitle>
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
                <img src="../../assets/img/code.jpg" class="codeimg" />
              </div>
            </div>
          </div>
          <div class="banneritem">
            <p class="ptext">短信验证码</p>
            <div class="bannerinput">
              <div class="inputbox">
                <van-field v-model="sms" center clearable type="number" placeholder="请输入短信验证码">
                  <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
              </div>
            </div>
          </div>
           <div class="banneritem">
           <p class="ptext">新密码</p>
            <div class="bannerinput">
              <div class="inputbox">
                <van-field v-model="password" center clearable :type="type" placeholder="请设置6-16位密码">
                   <van-icon class-prefix="my-icon" :name="iconname"  slot="right-icon" @click="changgeicon" size="28px"/>
                </van-field>
              </div>
            </div>
          </div>
        </div>
        <div class="bannerbtn">
            <van-button type="primary" size="large">完成</van-button>
        </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      phone: "",
      code: "",
      sms: "",
      password:"",
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
      
  },
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.forgetpassword {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  .banner {
    padding: 0 0.4rem;
    .banneritem {
      height: 1rem;
      display: flex;
      align-items: center;
      .ptext{
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
      .van-button--primary{
          background-color: #7654e7;
          border: 1px solid #7654e7;
      }
  }
}
</style>
