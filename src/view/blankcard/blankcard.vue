<template>
  <div class="blankcard">
    <headertitle :titles="'银行卡信息'" :tabfalg="true"></headertitle>
    <div class="card" v-if="isCompleteBank">
      <img :src="banksrc" alt />
      <p class="cardnum">{{zxblanknum | banknumber}}</p>
    </div>
    <div class="tx" v-if="!isCompleteBank">填写本人银行卡须是本人名下的借记卡（储蓄卡）</div>
    <div class="banner" v-if="!isCompleteBank">
      <div class="banneritem">
        <p class="ptext">持卡人姓名</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="name"
              placeholder="填写持卡人姓名"
              clearable
              :maxlength="4"
              :disabled="name"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">持卡人身份证</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="idcard"
              placeholder="填写持卡人身份证号"
              clearable
              :maxlength="18"
              :disabled="idcard"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="banner" v-if="!isCompleteBank">
      <div class="banneritem">
        <p class="ptext">开户银行</p>
        <div class="bannerinput">
          <div class="inputbox">
            <!-- <van-field
              v-model="blankname"
              placeholder="请选择"
              clearable
              :disabled="true"
              right-icon="arrow"
            />-->
            <van-cell is-link @click="show = !show">{{blankname}}</van-cell>
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">银行卡号</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="blanknum"
              placeholder="填写银行卡号"
              clearable
              type="number"
              :maxlength="20"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bannerbtn" v-if="!isCompleteBank">
      <van-button type="primary" size="large" :disabled="okflag" @click="updata">提交</van-button>
    </div>
    <!-- 银行选择 -->
    <van-popup v-model="show" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      name: "",
      idcard: "",
      blankname: "",
      blanknum: "",
      blankid: "",
      comId:this.getLocalStorage('comId').data ||　"",
      userId: this.getLocalStorage("userId").data || "",
      isCompleteBank: false,
      banlist: [],
      show: false,
      columns: [],
      customerId: "",
      okflag: false,
      zxblanknum :'',
      banksrc:''
    };
  },
  created() {
    this.queryinfo();
    this.queryblank();
  },
  methods: {
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
          this.customerId = res.data.data[0].id;
          if (res.data.data[0].realName) {
            this.name = res.data.data[0].realName;
          }
          if (res.data.data[0].idcardNumber) {
            this.idcard = res.data.data[0].idcardNumber;
          }
          if (res.data.data[0].isCompleteBank == 1) {
            this.isCompleteBank = true;
            this.zxblanknum = res.data.data[0].bankAccount
            this.banksrc = res.data.data[0].bankIcon
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
    onConfirm(value, index) {
      this.show = false;
      this.blankname = this.columns[index].text;
      this.blankid = this.columns[index].bankId;
    },
    onCancel() {
      this.show = false;
    },
    //可用银行查询
    queryblank() {
      this.$axios({
        method: "get",
        url:
          this.$url+"/loan/backend/companySettingBank/queryCompanySettingBank",
        params: {
          comId: this.comId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.banlist = res.data.data;
          this.banlist.forEach(item => {
            let o = {
              text: item.bankName,
              bankId: item.id
            };
            this.columns.push(o);
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
    //提交
    updata() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
      if (!this.isCompleteBank) {
        let reg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!reg.test(this.name)) {
          this.$toast({
            type: "fail",
            message: "请输入正确的姓名",
            duration: 1000
          });
          return;
        }
        let reg1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg1.test(this.idcard)) {
          this.$toast({
            type: "fail",
            message: "请输入正确的身份证号",
            duration: 1000
          });
          return;
        }
        if (!this.blankname) {
          this.$toast({
            type: "fail",
            message: "请输入您的开户银行",
            duration: 1000
          });
          return;
        }
        if (!this.blanknum) {
          this.$toast({
            type: "fail",
            message: "请输入您的银行卡号",
            duration: 1000
          });
          return;
        }

        this.$axios({
          method: "post",
          url:
            this.$url+"/loan/backend/customerInfo/updateCustomerInfo",
          data: {
            id: this.customerId,
            realName: this.name,
            idcardNumber: this.idcard,
            bankId: this.blankid,
            bankAccount: this.blanknum
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
    }
  },
  components: {
    headertitle
  },
  filters:{
    banknumber(val){
      let reg = /^(\d{4})\d+(\d{4})$/;
      let str = val.replace(reg, "$1****$2");
      return str
    }
  }
};
</script>



<style lang='less' scoped>
.blankcard {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
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
  .tx {
    padding: 0.4rem;
    font-size: 0.28rem;
    color: #666;
  }
  .card {
    padding: 0.4rem;
    position: relative;
    padding-bottom: 0;
    img {
      width: 100%;
      height: 3.6rem;
      border-radius: 10px;
    }
    .cardnum {
      position: absolute;
      color: #fff;
      left: 0.8rem;
      bottom: 0.4rem;
    }
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
}
</style>