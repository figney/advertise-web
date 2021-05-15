<template>
  <div class="bank-transfer-page app-appbar flex flex-direction">
    <van-nav-bar
        class="no-border-bar shadow"
        fixed
        left-arrow
        @click-left="$router.go(-1)"
    >
      <template #title>
        <div class="font-bold">{{receiverInfo.title}}</div>
      </template>
    </van-nav-bar>

    <div
        class="flex-sub white-view margin border-radius-sm flex flex-direction padding box-shadow"
        v-if="!showSubmitSuccess"
    >
      <!-- 收款人信息 -->
      <div class="font-bold fs-16 margin-bottom">
        {{ $t("OFFICIAL_ACCOUNT", "银行转账官方指定账号") }}
      </div>

      <div class="flex align-center  margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("RECEIVER_NAME", "收款人姓名") }}
        </div>
        <van-field
            :value="receiverInfo.card_user_name"
            readonly
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
            @click="$copyText(receiverInfo.card_user_name)"
        >
          <template #right-icon>
            <img src="../assets/images/copy@2x.png" style="height:0.5rem">
          </template>
        </van-field>
      </div>
      <div class="flex align-center  margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("RECEIVER_ACCOUNT", "收款人账户") }}
        </div>
        <van-field
            :value="receiverInfo.card_number"
            readonly
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
            @click="$copyText(receiverInfo.card_number)"
        >
          <template #right-icon>
            <img src="../assets/images/copy@2x.png" style="height:0.5rem">
          </template>
        </van-field>
      </div>
      <div class="flex align-center  margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden text-ellipsis text-nowrap"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("RECEIVER_BANK", "开户行全称") }}
        </div>
        <van-field
            :value="receiverInfo.card_bank_name"
            readonly
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
            @click="$copyText(receiverInfo.card_bank_name)"
        >
          <template #right-icon>
            <img src="../assets/images/copy@2x.png" style="height:0.5rem">
          </template>
        </van-field>
      </div>

      <div class="margin-bottom-sm"/>

      <!-- 汇款提示 -->
      <div class="margin-bottom-sm fs-12 padding-sm border-radius-xs bg-fef3ee fc-error">
        {{$t("UPLOAD_TIP",[receiverInfo.min_money.toString()+' '+system.default_currency],"请按照上述信息汇款并保留汇款截图，汇款成功后在存款记录中提交审核，最小汇款金额为{0}")}}
      </div>

      <!-- 汇款人信息  -->
      <div class="font-bold fs-16 margin-bottom">
        {{ $t("FILL_USER_INFO", "填写用户资料") }}
      </div>

      <div class="flex align-center  margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("FULLNAME_OF_BANK", "开户行全称") }}
        </div>
        <van-field
            v-model="transferor.bank"
            :placeholder="$t('ENTER_FULLNAME_OF_BANK', '请输入开户行全称')"
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
        />
      </div>

      <div class="flex align-center  margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_NAME", "汇款人姓名") }}
        </div>
        <van-field
            v-model="transferor.name"
            :placeholder="$t('ENTER_TRANSFER_NAME', '请输入汇款人姓名')"
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
        />
      </div>

      <div class="flex align-center  margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_ACCOUNT", "汇款人账户") }}
        </div>
        <van-field
            v-model="transferor.account"
            :placeholder="$t('ENTER_TRANSFER_ACCOUNT', '请输入汇款人账户')"
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
        />
      </div>

      <div class="flex align-center margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_AMOUNT", "汇款金额") }}
        </div>
        <van-field
            type="number"
            :formatter="$balanceFormat"
            v-model="transferor.amount"
            :placeholder="$t('ENTER_TRANSFER_AMOUNT', '请输入汇款金额')"
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
        />
      </div>

      <div class="flex align-center margin-bottom-sm fs-12">
        <div
            class="margin-right-sm van-overflow-hidden"
            style="max-width:2rem;min-width:2rem"
        >
          {{ $t("TRANSFER_TIME", "汇款时间") }}
        </div>
        <van-field
            readonly
            :value="transferor.time"
            :placeholder="$t('SELECT_TRANSFER_TIME', '请选择汇款时间')"
            class="bg-f1f1f1 border-radius-xs padding-tb-xs padding-lr-sm font-bold fs-12"
            right-icon="underway-o"
            @click="showSelectDate = true"
        />
      </div>

      <div class="flex flex-direction margin-bottom-sm fs-12">
        <div
            class="margin-bottom-sm van-overflow-hidden"
        >
          {{ $t("TRANSFER_CERTIFICATION", "汇款凭证") }}
        </div>
        <div class="flex align-center">
          <!-- capture="camera" -->
          <van-uploader
              v-model="fileList"
              :max-size="10 * 1024 * 1024"
              upload-icon="plus"
              :max-count="1"
              class="margin-right"
          />
          <div class="flex align-center">
            <van-button plain size="small" color="#FF7214" @click="startShowDemo">{{$t('SEE_DEMO','查看示例')}}</van-button>
          </div>
        </div>
      </div>

      <van-button
          class="margin-tb border-radius-xs bg-dark fc-fff"
          block
          :disabled="!allowSubmit"
          @click="submit"
      >
        {{ $t("SUBMIT_USER_INFO_CERTIFICATION", "提交用户资料审核") }}
      </van-button>
    </div>

    <!-- 提交成功显示 -->
    <div class="white-view margin border-radius-sm flex-sub flex flex-direction align-center" v-else>
      <div style="height:2.8rem"></div>
      <img
          class="margin-bottom"
          src="../assets/images/icon_21@2x.png"
          style="width:2rem"
      />
      <div class="margin-bottom-sm font-bold fs-22 text-center">
        {{ $t("SUBMIT_SUCCESS", "提交成功") }}
      </div>
      <div class="margin-bottom fc-888 text-center padding-lr">
        {{ $t("ABOUT_5_MINS_ARRIVE", "预计1-5分钟到账，请您耐心等待") }}
      </div>
      <div class="margin-bottom flex flex-direction" style="width:8.2rem">
        <van-button class="border-radius-sm bg-dark fc-fff margin-bottom-sm" block @click="contact">
          {{$t('CONTACT_CUSTOM_SERVICE_QUICKLY','联系客服快速验证入账')}}
        </van-button>
        <van-button class="border-radius-sm margin-bottom-sm" block @click="toDepositDetail">
          {{$t('SEE_DEPOSIT_DETAIL','查看存款明细')}}
        </van-button>
      </div>
    </div>

    <!-- 选择汇款时间 -->
    <van-popup
        v-model="showSelectDate"
        class="border-radius-top-sm"
        position="bottom"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <div class="flex flex-direction">
          <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              :placeholder="$t('SELECT_TRANSFER_TIME', '请选择汇款时间')"
              :confirm-button-text="$t('SURE', '确定')"
              :cancel-button-text="$t('CANCEL', '取消')"
              @confirm="changeDate"
              @cancel="showSelectDate = false"
          />
        </div>
      </div>
    </van-popup>

    <!-- 案列预览 -->
    <van-popup v-model="showDemo" get-container="body">
      <div
          class="vw-100 vh-100 flex flex-direction position-re"
          style="overflow:hidden"
      >
        <van-icon
            @click="showDemo = false"
            size="0.5rem"
            class="close-icon"
            name="cross"
        />

        <div class="padding fs-18 font-bold text-center box-shadow" style="width:100%">{{$t('SEE_DEMO','查看示例')}}</div>

        <div class="flex flex-direction" style="overflow:auto">
          <div class="padding" style="border-bottom:1px solid #eeecfa">
            <img
                src="../assets/images/user.png"
                style="max-width:100%;min-width:100%"
            />
          </div>
          <div class="padding" style="border-bottom:1px solid #eeecfa">
            <img
                src="../assets/images/user.png"
                style="max-width:100%;min-width:100%"
            />
          </div>
          <div class="padding" style="border-bottom:1px solid #eeecfa">
            <img
                src="../assets/images/user.png"
                style="max-width:100%;min-width:100%"
            />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Cell,
  NavBar,
  Field,
  DatetimePicker,
  Popup,
  Icon,
  Uploader,
  Button,
  Dialog,
} from "vant";
import { Base } from "@/mixins";
import { Toast } from "mand-mobile";
import Compressor from "compressorjs";

export default {
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data: () => {
    return {
      isSubmitting: false,
      currentDate: new Date(),
      showSelectDate: false,
      showSubmitSuccess: false,
      transferor: {
        name: "",
        account: "",
        bank: "",
        amount: "",
        time: "",
      },
      fileList: [],
      receiverInfo: {
        min_money: 0,
      },
      showDemo: false
    };
  },
  computed: {
    allowSubmit() {
      return (
          !!this.transferor.name &&
          !!this.transferor.account &&
          !!this.transferor.bank &&
          !!this.transferor.amount &&
          !!this.transferor.time &&
          !!this.fileList.length
      );
    },
  },
  mixins: [Base],
  mounted() {
    this.$nextTick(() => {
      const _data = localStorage.getItem("TransferInfo");
      localStorage.removeItem("TransferInfo")
      try {
        if (!_data) {
          Toast.failed(
              this.$t("BANK_CHANNEL_UNAVAILABLE", "银行户口转账暂不可用")
          );
          this.$router.go(-1);
        } else {
          this.receiverInfo = JSON.parse(_data);
        }
      } catch (err) {
        Toast.failed(
            this.$t("BANK_CHANNEL_UNAVAILABLE", "银行户口转账暂不可用")
        );
        this.$router.go(-1);
      }
    });
  },
  methods: {
    startShowDemo() {
      this.showDemo = true
    },
    contact() {
      this.$openLink(this.system.service.url)
    },
    toDepositDetail() {
      this.$router.push({ name: 'WalletHistory' })
    },
    changeDate(datetime) {
      this.transferor.time = this.$localTime(datetime);
      this.showSelectDate = false;
    },
    async submit() {
      if (this.isSubmitting) return
      this.isSubmitting = true

      if (this.transferor.name == this.receiverInfo.card_user_name) {
        Toast.failed(
            this.$t("ENTER_TRANSFEROR_NAME_AGAIN", "请重新输入您的汇款人姓名")
        );
        return;
      }
      if (this.transferor.account == this.receiverInfo.card_number) {
        Toast.failed(
            this.$t("ENTER_TRANSFEROR_ACCOUNT_AGAIN", "请重新输入您的汇款人账号")
        );
        return;
      }
      if (this.transferor.amount < this.receiverInfo.min_money) {
        Toast.failed(
            this.$t("TRANSFER_AMOUNT_CANT_LESS_THAN_MIN",[this.receiverInfo.min_money.toString()], "汇款金额不能低于N")
        );
        return;
      }

      const file = await this.compressImage(this.fileList[0].file)
      let formData = new FormData();
      formData.append("channel_item_id", this.receiverInfo.id);
      formData.append("next_action", this.receiverInfo.next_action);
      formData.append("next_id", this.receiverInfo.next_id);
      formData.append("next_data", JSON.stringify(this.receiverInfo.next_data));
      formData.append("user_name", this.transferor.name);
      formData.append("card_number", this.transferor.account);
      formData.append("bank_name", this.transferor.bank);
      formData.append("amount", this.transferor.amount);
      formData.append("time", this.transferor.time);
      formData.append("image", file);
      Toast.loading("loading");
      console.log(formData)
      this.$http
        .post("v1/putInTransferVoucher", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$fbq('InitiateCheckout')
          this.showSubmitSuccess = true;
          this.isSubmit = true;
          Toast.hide();
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        })
        .finally(()=>{
          this.isSubmitting = false
        });
    },
    finishSubmit() {
      this.showSubmitSuccess = false;
      this.$router.go(-1);
    },
    async compressImage(file) {
      return await new Promise((resolve,reject)=>{
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            resolve(result)
          },
          error(err) {
            console.log(err.message);
            resolve(file)
          },
        });
      })
    }
  },
};
</script>

<style lang="scss">
.bank-transfer-page {
  min-height: 100vh;

  .confirm-certification-modal {
    .van-dialog__header--isolated {
      padding: 15px 0;
    }

    .van-dialog__footer {
      button {
        height: 1.15rem;
      }

      .van-dialog__confirm {
        color: #432af5;
      }
      .van-dialog__cancel {
        color: #888;
      }
    }

    .confirm-certification-content {
      overflow: auto;
      max-height: 60vh;
    }
  }

  .submit-success {
    .van-button {
      height: unset;
      min-height: 44px;
      padding: 0.1333rem 0.2337rem;

    }
  }

  .confirm-name {
    background: #d7e9ff;
    animation: confirmName 1s linear infinite;
  }

  @keyframes confirmName {
    0%,100% {
      background: #d4e7ff;
    }

    50% {
      background: #88bdff;
    }
  }

}
</style>