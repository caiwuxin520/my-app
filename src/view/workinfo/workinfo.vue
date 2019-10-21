<template>
  <div class="workinfo">
    <headertitle :titles="'单位信息'" :tabfalg="true"></headertitle>
    <div class="tx">填写真实有效的信息审核才会通过哦!</div>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">支付宝账户</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="ailpay"
              placeholder="支付宝账号为手机号或邮箱"
              clearable
              ref="input1"
              :maxlength="30"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">芝麻信用</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="zmxy"
              placeholder="芝麻信用为数字。例：500"
              clearable
              type="number"
              :maxlength="3"
              ref="input2"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">公司名称</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="gsmc"
              placeholder="填写您的公司名称"
              clearable
              ref="input3"
              :maxlength="30"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">公司职位</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="gszw"
              placeholder="填写您的公司职位"
              clearable
              ref="input4"
              :maxlength="30"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">单位电话</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="dwphone"
              placeholder="填写您的单位电话"
              clearable
              @input="onInput"
              ref="input5"
              :maxlength="20"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">工作年龄(年)</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="gzage"
              placeholder="填写您的工作年龄"
              clearable
              ref="input6"
              :maxlength="3"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem banneritemcolor">
        <p class="ptext">单位地址</p>
        <div class="bannerinput">
          <div class="inputbox" @click="show('1')">
            <van-field
              v-model="dwaddress"
              placeholder="请选择"
              clearable
              readonly
              :disabled="ismoren"
              right-icon="arrow"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">详细地址</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="xxaddress"
              placeholder="填写您的详细地址"
              clearable
              ref="input7"
              :maxlength="40"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">月收入(元)</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="ysr"
              placeholder="收入为数字(元)"
              clearable
              type="number"
              ref="input8"
              :maxlength="10"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">现居住地址</p>
        <div class="bannerinput">
          <div class="inputbox" @click="show('2')">
            <van-field
              v-model="jzaddress"
              placeholder="请选择"
              clearable
              readonly
              :disabled="ismoren"
              right-icon="arrow"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">详细地址</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="jzxxaddress"
              placeholder="填写您的详细地址"
              clearable
              ref="input9"
              :maxlength="40"
              :disabled="ismoren"
            />
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
            <van-field
              v-model="zxname"
              placeholder="填写您的亲属姓名"
              clearable
              ref="input10"
              :maxlength="4"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">手机</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="zxphone"
              placeholder="填写您的亲属手机"
              clearable
              ref="input11"
              type="number"
              :maxlength="11"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">关系</p>
        <div class="bannerinput">
          <div class="inputbox" @click="show('3')">
            <van-field
              v-model="zxgx"
              placeholder="请选择"
              clearable
              readonly
              :disabled="ismoren"
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
            <van-field
              v-model="qtname"
              placeholder="填写联系人姓名"
              clearable
              ref="input12"
              :maxlength="4"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">手机</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="qtphone"
              placeholder="填写联系人手机"
              clearable
              ref="input13"
              type="number"
              :maxlength="11"
              :disabled="ismoren"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">关系</p>
        <div class="bannerinput">
          <div class="inputbox" @click="show('4')">
            <van-field
              v-model="qtgx"
              placeholder="请选择"
              clearable
              readonly
              :disabled="ismoren"
              right-icon="arrow"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 地址选择 -->
    <van-popup v-model="show1" position="bottom">
      <van-area :area-list="areaList" @cancel="show1 = !show1" @confirm="onconfirm" />
    </van-popup>
    <!-- 关系选择 -->
    <van-popup v-model="show2" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="show2 = !show2" @confirm="onConfirm1" />
    </van-popup>
    <div class="bannerbtn">
      <van-button type="primary" size="large" :disabled="okflag" @click="okdata">提交</van-button>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
import areaLists from "../../assets/js/area";
export default {
  data() {
    return {
      customerId: "",
      comId: this.getLocalStorage("comId").data || "",
      userId: this.getLocalStorage("userId").data || "",
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
      qtname: "",
      okflag: false,
      show1: false,
      showactive: null,
      showactive1: null,
      show2: false,
      gxid1: null,
      gxid2: null,
      areaList: {},
      ismoren: false,
      columns: [
        {
          text: "父母",
          id: 0
        },
        {
          text: "兄妹",
          id: 1
        },
        {
          text: "同事",
          id: 2
        },
        {
          text: "朋友",
          id: 3
        }
      ],
      c11: "",
      c12: "",
      c13: "",
      c21: "",
      c22: "",
      c23: ""
    };
  },
  created() {
    //页面初始化将省市区数据赋值给areaList
    this.areaList = areaLists;
    this.queryinfo();
  },
  methods: {
    //显示
    show(type) {
      if (!this.ismoren) {
        if (type == "1" || type == "2") {
          this.show1 = !this.show1;
          this.showactive = type;
          this.show2 = false;
        } else if (type == "3" || type == "4") {
          this.show2 = !this.show2;
          this.showactive1 = type;
          this.show1 = false;
        }
      }
    },
    onInput(value){
      console.log(value)
    },
    //查询信息
    queryinfo() {
      this.$axios({
        method: "get",
        url: this.$url + "loan/backend/customerInfo/queryCustomerInfoVo",
        params: {
          comId: this.comId,
          userId: this.userId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.customerId = res.data.data[0].id;
          if (res.data.data[0].isCompleteCompany == 1) {
            this.ismoren = true;
            this.okflag = true;
            this.ailpay = res.data.data[0].zfbAccount;
            this.zmxy = res.data.data[0].zmCredit;
            this.gsmc = res.data.data[0].companyName;
            this.gszw = res.data.data[0].companyPosition;
            this.dwphone = res.data.data[0].companyPhone;
            this.gzage = res.data.data[0].workingYears;
            this.xxaddress = res.data.data[0].companyAddress;
            this.ysr = res.data.data[0].salary;
            this.jzxxaddress = res.data.data[0].address;
            this.dwaddress =
              res.data.data[0].companyProvinceIdValue +
              " " +
              res.data.data[0].companyCityIdValue +
              " " +
              res.data.data[0].companyRegionIdValue;

            this.jzaddress =
              res.data.data[0].provinceIdValue +
              " " +
              res.data.data[0].cityIdValue +
              " " +
              res.data.data[0].regionIdValue;

            this.c11 = res.data.data[0].companyProvinceId;
            this.c12 = res.data.data[0].companyCityId;
            this.c13 = res.data.data[0].companyRegionId;
            this.c21 = res.data.data[0].provinceId;
            this.c22 = res.data.data[0].cityId;
            this.c23 = res.data.data[0].regionId;

            this.zxname =
              res.data.data[0].customerRelativesList[0].relativeName;
            this.zxphone =
              res.data.data[0].customerRelativesList[0].relativePhone;
            // this.zxgx = res.data.data[0].customerRelativesList[0].relativceType;
            let zx = res.data.data[0].customerRelativesList[0].relativceType;
            this.zxgx =
              zx == 0 ? "父母" : zx == 1 ? "兄妹" : zx == 2 ? "同事" : "朋友";
            this.qtname =
              res.data.data[0].customerRelativesList[1].relativeName;
            this.qtphone =
              res.data.data[0].customerRelativesList[1].relativePhone;
            let zx1 = res.data.data[0].customerRelativesList[1].relativceType;
            this.qtgx =
              zx1 == 0
                ? "父母"
                : zx1 == 1
                ? "兄妹"
                : zx1 == 2
                ? "同事"
                : "朋友";
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
    //地址选择确认 格式化
    onconfirm(e) {
      let c = "";
      e.forEach(item => {
        if (typeof item == "undefined") {
          return;
        }
        c += item.name + " ";
      });
      this.show1 = false;
      if (this.showactive == "1") {
        this.dwaddress = c.substr(0, c.length - 1);
        this.c11 = e[0].code;
        this.c12 = e[1].code;
        this.c13 = e[2].code;
      } else {
        this.jzaddress = c.substr(0, c.length - 1);
        this.c21 = e[0].code;
        this.c22 = e[1].code;
        this.c23 = e[2].code;
      }
    },
    //关系选择
    onConfirm1(value, index) {
      this.show2 = false;
      if (this.showactive1 == "3") {
        this.zxgx = this.columns[index].text;
        this.gxid1 = this.columns[index].id;
      } else {
        this.qtgx = this.columns[index].text;
        this.gxid2 = this.columns[index].id;
      }
    },
    //提交
    okdata() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
      let reg = /^1[3456789]\d{9}$/;
      let reg1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      let ailpayname = null;
      if (reg.test(this.ailpay) || reg1.test(this.ailpay)) {
        ailpayname = this.ailpay;
      } else {
        this.ailpay = "";
        this.$refs.input1.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确的支付宝账户。",
          duration: 1000
        });
        return;
      }
      if (!this.zmxy) {
        this.zmxy = "";
        this.$refs.input2.focus();
        this.$toast({
          type: "fail",
          message: "芝麻信用为数字格式，请重新输入。",
          duration: 1000
        });
        return;
      }
      let reg3 = /^[\u4e00-\u9fa5]+$/;
      if (!reg3.test(this.gsmc)) {
        this.gsmc = "";
        this.$refs.input3.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确的公司名称。",
          duration: 1000
        });
        return;
      }
      if (!reg3.test(this.gszw)) {
        this.gszw = "";
        this.$refs.input4.focus();
        this.$toast({
          type: "fail",
          message: "公司职位存在不规范的文字或字符，请重新输入。",
          duration: 1000
        });
        return;
      }
      if (this.dwphone) {
        let reg10 = /^[0-9]*$/;
        if (!reg10.test(this.dwphone)) {
          this.dwphone = "";
          this.$refs.input5.focus();
          this.$toast({
            type: "fail",
            message: "单位电话为数字，请重新输入。",
            duration: 1000
          });
          return;
        }
      }
      if (!this.gzage) {
        this.gzage = "";
        this.$refs.input6.focus();
        this.$toast({
          type: "fail",
          message: "请输入工作年龄。",
          duration: 1000
        });
        return;
      }
      var ageReg=/^[1-9]\d*$/
      if (!ageReg.test(this.gzage)) {
        this.gzage = "";
        this.$refs.input6.focus();
        this.$toast({
          type: "fail",
          message: "工作年龄请输入正整数。",
          duration: 1000
        });
        return;
      }
      if (parseFloat(this.gzage) < 0) {
        this.gzage = "";
        this.$refs.input6.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确的工作年龄。",
          duration: 1000
        });
        return;
      }
      if (!this.dwaddress) {
        this.$toast({
          type: "fail",
          message: "请选择单位地址。",
          duration: 1000
        });
        return;
      }
      let reg4 = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!reg4.test(this.xxaddress)) {
        this.xxaddress = "";
        this.$refs.input7.focus();
        this.$toast({
          type: "fail",
          message: "详细地址存在不规范的文字或字符，请重新输入。",
          duration: 1000
        });
        return;
      }
      var regs=/\s/g;
      if(regs.test(this.xxaddress)){
        this.xxaddress = "";
        this.$refs.input7.focus();
        this.$toast({
          type: "fail",
          message: "详细地址存在不规范的文字或字符，请重新输入。",
          duration: 1000
        });
        return;
      }
      if (!this.ysr) {
        this.ysr = "";
        this.$refs.input8.focus();
        this.$toast({
          type: "fail",
          message: "月收入为数字格式，请重新输入。",
          duration: 1000
        });
        return;
      }
      if (!this.jzaddress) {
        this.$toast({
          type: "fail",
          message: "请选择现居住地址。",
          duration: 1000
        });
        return;
      }
      if (!reg4.test(this.jzxxaddress)) {
        this.jzxxaddress = "";
        this.$refs.input9.focus();
        this.$toast({
          type: "fail",
          message: "详细地址存在不规范的文字或字符，请重新输入。",
          duration: 1000
        });
        return;
      }
      if(regs.test(this.jzxxaddress)){
        this.jzxxaddress= "";
        this.$refs.input9.focus();
        this.$toast({
          type: "fail",
          message: "详细地址存在不规范的文字或字符，请重新输入。",
          duration: 1000
        });
        return;
      }
      let reg5 = /^[\u4e00-\u9fa5]{2,4}$/;
      if (!reg5.test(this.zxname)) {
        this.zxname = "";
        this.$refs.input10.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确直系亲属姓名。",
          duration: 1000
        });
        return;
      }
      if (!reg.test(this.zxphone)) {
        this.zxphone = "";
        this.$refs.input11.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确直系亲属手机号。",
          duration: 1000
        });
        return;
      }
      if (!this.zxgx) {
        this.$toast({
          type: "fail",
          message: "请选择直系亲属关系。",
          duration: 1000
        });
        return;
      }
      if (!reg5.test(this.qtname)) {
        this.qtname = "";
        this.$refs.input12.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确其他联系人姓名。",
          duration: 1000
        });
        return;
      }
      if (!reg.test(this.qtphone)) {
        this.qtphone = "";
        this.$refs.input13.focus();
        this.$toast({
          type: "fail",
          message: "请输入正确其他联系人手机号。",
          duration: 1000
        });
        return;
      }
      if (!this.qtgx) {
        this.$toast({
          type: "fail",
          message: "请选择其他联系人关系。",
          duration: 1000
        });
        return;
      }
      let data = {
        id: this.customerId,
        zfbAccount: ailpayname,
        zmCredit: parseInt(this.zmxy),
        companyName: this.gsmc,
        companyPosition: this.gszw,
        companyPhone: this.dwphone,
        workingYears: this.gzage,
        companyProvinceId: this.c11,
        companyCityId: this.c12,
        companyRegionId: this.c13,
        companyAddress: this.xxaddress,
        salary: this.ysr,
        provinceId: this.c21,
        cityId: this.c22,
        regionId: this.c23,
        address: this.jzxxaddress,
        customerRelativesList: [
          {
            id: "",
            relativeName: this.zxname,
            relativePhone: this.zxphone,
            relativeType: this.gxid1,
            isDirect: 1
          },
          {
            id: "",
            relativeName: this.qtname,
            relativePhone: this.qtphone,
            relativeType: this.gxid2,
            isDirect: 0
          }
        ]
      };
      this.$axios({
        method: "post",
        url: this.$url + "loan/backend/customerInfo/updateCustomerInfo",
        data: data
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
        font-size: 16px;
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
