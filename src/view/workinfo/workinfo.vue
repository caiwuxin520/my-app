<template>
  <div class="workinfo">
    <headertitle :titles="'单位信息'" :tabfalg="true"></headertitle>
    <div class="tx">登录密码尽量设置8-16位，字母数字符号组合。</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">支付宝账户</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="ailpay" placeholder="填写您的支付宝账号" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">芝麻信用</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="zmxy" placeholder="填写您的芝麻信用" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">公司名称</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="gsmc" placeholder="填写您的公司名称" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">公司职位</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="gszw" placeholder="填写您的公司职位" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">单位电话</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="dwphone" placeholder="填写您的单位电话" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">工作年龄(年)</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="gzage" placeholder="填写您的工作年龄" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">单位地址</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="dwaddress"
              placeholder="请选择"
              clearable
              :disabled="true"
              right-icon="arrow"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">详细地址</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="xxaddress" placeholder="填写您的详细地址" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">月收入(元)</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="ysr" placeholder="填写您的月收入(元)" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">现居住地址</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="jzaddress"
              placeholder="请选择"
              clearable
              :disabled="true"
              right-icon="arrow"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">详细地址</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="jzxxaddress" placeholder="填写您的详细地址" clearable />
          </div>
        </div>
      </div>
    </div>
    <div class="tx">直系亲属联系人</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">姓名</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="zxname" placeholder="填写您的亲属姓名" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">手机</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="zxphone" placeholder="填写您的亲属手机" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">关系</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="zxgx"
              placeholder="请选择"
              clearable
              :disabled="true"
              right-icon="arrow"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tx">其他联系人</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">姓名</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="qtname" placeholder="填写联系人姓名" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">手机</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field v-model="qtphone" placeholder="填写联系人手机" clearable />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">关系</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="qtgx"
              placeholder="请选择"
              clearable
              :disabled="true"
              right-icon="arrow"
            />
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
      ailpay: "",
      zmxy: "",
      gsmc: "",
      gszw: "",
      dwphone: "",
      gzage: "",
      dwaddress: "",
      xxaddress: "",
      ysr: "",
      jzaddress: "",
      jzxxaddress: "",
      zxphone: "",
      zxgx: "",
      zxname: "",
      qtphone: "",
      qtgx: "",
      qtname: ""
    };
  },
  created() {},
  methods: {},
  components: {
    headertitle
  }
};
</script>



<style lang='less' scoped>
.workinfo {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  .bannerbtn {
    padding: 0 0.4rem;
    margin-bottom: 0.2rem;
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
  .tx {
    padding: 0.4rem;
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
}
</style>