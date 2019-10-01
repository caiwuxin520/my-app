<template>
  <div class="idcardinfo">
    <headertitle :titles="'身份证信息'" :tabfalg="true"></headertitle>
    <div class="banner">
      <div class="banneritem">
        <p class="ptext">姓名</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="name"
              placeholder="请输入您的真实姓名"
              clearable
              :disabled="isws"
              :maxlength="4"
            />
          </div>
        </div>
      </div>
      <div class="banneritem">
        <p class="ptext">身份证</p>
        <div class="bannerinput">
          <div class="inputbox">
            <van-field
              v-model="idcard"
              placeholder="填写您的身份证号码"
              clearable
              :disabled="isws"
              :maxlength="18"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="updata">
      <div v-if="!src1">
        <van-uploader
          :after-read="afterRead1"
          :max-count="1"
          :before-read="beforeRead"
          :max-size="6000000"
          @oversize="overSize"
        >
          <div class="updata1">
            <div class="morenimg">
              <img src="../../assets/img/zheng.svg" class="img1" />
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="src1" v-else>
        <img :src="src1" />
      </div>
    </div>
    <div class="updata">
      <div v-if="!src2">
        <van-uploader
          :after-read="afterRead2"
          :max-count="1"
          :before-read="beforeRead"
          :max-size="6000000"
          @oversize="overSize"
        >
          <div class="updata1">
            <div class="morenimg">
              <img src="../../assets/img/fan.svg" class="img1" />
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="src1" v-else>
        <img :src="src2" />
      </div>
    </div>
    <div class="updata">
      <div v-if="!src3">
        <van-uploader
          :after-read="afterRead3"
          :max-count="1"
          :before-read="beforeRead"
          :max-size="6000000"
          @oversize="overSize"
        >
          <div class="updata1">
            <div class="morenimg">
              <img src="../../assets/img/shou.svg" class="img1" />
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="src1" v-else>
        <img :src="src3" />
      </div>
    </div>
    <div class="bannerbtn">
      <van-button type="primary" size="large" :disabled="okflag" @click="updataidcard">提交</van-button>
    </div>
  </div>
</template>

<script>
import headertitle from "../../components/headertitle";
export default {
  data() {
    return {
      name: "",
      idcard: "",
      src1: "",
      src2: "",
      src3: "",
      customerId: "",
      comId: this.getLocalStorage('comId').data ||　"",
      userId: this.getLocalStorage("userId").data || "",
      isws: false,
      imgid1: "",
      imgid2: "",
      imgid3: "",
      okflag:false
    };
  },
  created() {
    this.queryjk();
  },
  methods: {
    afterRead1(file) {
      this.src1 = file.content;
      let img = new Image();
      img.src = file.content;
      this.dwimg = file.content;
      let that = this;
      img.onload = function() {
        that.ontpys(img, 1);
      };
    },
    afterRead2(file) {
      this.src2 = file.content;
      let img = new Image();
      img.src = file.content;
      this.dwimg = file.content;
      let that = this;
      img.onload = function() {
        that.ontpys(img, 2);
      };
    },
    afterRead3(file) {
      this.src3 = file.content;
      let img = new Image();
      img.src = file.content;
      this.dwimg = file.content;
      let that = this;
      img.onload = function() {
        that.ontpys(img, 3);
      };
    },
    //查询借款人
    queryjk() {
      this.$axios({
        method: "get",
        url:
          "http://39.98.251.244/loan/backend/customerInfo/queryCustomerInfoVo",
        params: {
          comId: this.comId,
          userId: this.userId
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.customerId = res.data.data[0].id;
          if (res.data.data[0].isCompleteUser == 1) {
            this.isws = true;
            this.okflag = true;
            this.name = res.data.data[0].realName;
            this.idcard = res.data.data[0].idcardNumber;
            this.src1 = res.data.data[0].idcardFrontValue;
            this.src2 = res.data.data[0].idcardBackValue;
            this.src3 = res.data.data[0].idcardHandValue;
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
    //上传校验
    beforeRead(file) {
      if (file.type == "image/jpeg" || file.type == "image/png") {
        return true;
      }
      this.$toast({
        type: "fail",
        message: "请上传jpg,jepg,png图片",
        duration: 1000
      });
      return false;
    },
    //超过大小
    overSize() {
      this.$toast({
        type: "fail",
        message: "上传的图片不能超过6M",
        duration: 1000
      });
    },
    //压缩图片的方法
    ontpys(img, num) {
      let originWidth = img.width, // 压缩后的宽
        originHeight = img.height,
        maxWidth = 400,
        maxHeight = 400,
        quality = 0.8, // 压缩质量
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
      canvas.width = maxWidth;
      canvas.height = (originHeight / originWidth) * maxWidth;
      drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
      let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
      let file = this.dataURLtoFile(base64, Date.parse(Date()) + ".jpg");
      file = { content: base64, file: file };
      this.onimg(file, num);
    },
    //base64转file
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    //图片上传
    onimg(file, num) {
      //console.log(file.content)
      var formData = new FormData();
      formData.append("file", file.file);
      this.$axios({
        method: "post",
        url: "http://39.98.251.244/loan/backend/systemfile/uploadFileLocal",
        data: formData
      }).then(res => {
        if (res.data.code == 0) {
          if (num == 1) {
            this.imgid1 = res.data.data.id;
          } else if (num == 2) {
            this.imgid2 = res.data.data.id;
          } else {
            this.imgid3 = res.data.data.id;
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
    //提交信息
    updataidcard() {
      this.okflag = true;
      setTimeout(() => {
        this.okflag = false;
      }, 1000);
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
      let idcard1 = this.idcard.toUpperCase();
      if (!this.imgid1) {
        this.$toast({
          type: "fail",
          message: "请上传身份证正面照",
          duration: 1000
        });
        return;
      }
      if (!this.imgid2) {
        this.$toast({
          type: "fail",
          message: "请上传身份证反面照",
          duration: 1000
        });
        return;
      }
      if (!this.imgid3) {
        this.$toast({
          type: "fail",
          message: "请上传手持身份证照",
          duration: 1000
        });
        return;
      }

      this.$axios({
        method: "post",
        url:
          "http://39.98.251.244/loan/backend/customerInfo/updateCustomerInfo",
        data: {
          id: this.customerId,
          realName: this.name,
          idcardNumber: idcard1,
          idcardFront: this.imgid1,
          idcardBack: this.imgid2,
          idcardHand: this.imgid3
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
.idcardinfo {
  padding-top: 1rem;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
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
  .updata {
    padding: 0 0.4rem;
    margin-bottom: 0.4rem;
    .src1 {
      width: 100%;
      img {
        width: 100%;
        height: 3.9rem;
      }
    }
    .van-uploader {
      width: 100%;
    }
    .updata1 {
      width: 100%;
      .morenimg {
        width: 100%;
        img {
          width: 100%;
          height: 3.9rem;
        }
      }
    }
  }
}
</style>

<style>
.idcardinfo .van-uploader .van-uploader__input-wrapper {
  width: 100%;
}
</style>