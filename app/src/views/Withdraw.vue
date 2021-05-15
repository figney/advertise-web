<template>
  <div class="withdraw-page flex flex-direction app-appbar">
    <van-nav-bar
        style="z-index:3"
        fixed
        class="no-border-bar shadow"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.push({name:'WalletHistory'})"
    >
      <template #right>
        <div class="fc-accent">{{$t('HISTORY','记录')}}</div>
      </template>
      <template #title>
        <div class="font-bold">{{$t('WITHDRAW_WEB', '提现')}}</div>
      </template>
    </van-nav-bar>
    <template v-if="(channel.length==0 && inited)">
      <div class="margin border-radius padding white-view flex flex-direction align-center justify-center" style="min-height:calc(100vh - 2.04rem)">
        <div class="flex-sub margin border-radius-sm padding white-view flex flex-direction align-center justify-center">
          <img src="../assets/images/icon_10@2x.png" style="width:1.8rem" class="margin-bottom">
          <span class="text-center fs-16 font-bold fc-secondary margin-bottom">{{$t('CAN_NOT_WITHDRAW_WAIT','暂时无法提现，请稍候')}}</span>
          <van-button class="bg-dark fc-fff border-radius-sm" style="width:5.6rem" @click="$router.go(-1)">{{$t('BACK','返回')}}</van-button>
        </div>
      </div>
    </template>

    <template v-if="channel.length>0 && inited">
      <template v-if="!submitSuccess">
        <div class="margin flex flex-direction margin-bottom white-view border-radius-sm padding">
          <div class="margin-bottom-sm flex align-center">
            <div class="fs-16 font-bold">
              {{ $t("WITHDRAW_AMOUNT", "提现金额") }}
            </div>
            <div class="flex-sub"/>
            <div class="fs-13 font-400">{{ $t("AVAILABLE_BALANCE", "可用余额") }}</div>
            <div class="margin-lr-xs flex align-baseline font-bold fs-14">
              <money-number class="money-number" :value="wallet.balance"/>
            </div>
          </div>

          <van-field
              class="margin-bottom font-bold border-radius-xs bg-view fs-16"
              v-model="amount"
              :type="currentChannel.type=='OnLine'?'digit':'number'"
              :formatter="$balanceFormat"
              :placeholder="$t('ENTER_WITHDRAW_AMOUNT', '请输入提现金额')"
              @click-right-icon="useAllBalance"
              ref="withdrawInput"
          >
            <template #left-icon>
              <div class="margin-right-xs fs-16 fc-secondary montserrat">
                {{system.default_currency}}
              </div>
            </template>
            <template #right-icon>
              <div class="fc-accent font-400 fs-14">{{ $t("ALL", "全部") }}</div>
            </template>
          </van-field>

          <div class="fs-16 font-bold margin-bottom-sm">
            {{ $t("SELECT_WITHDRAW_WAY", "选择提现方式") }}
          </div>
          <van-radio-group
              class="font-bold margin-bottom withdraw-ways"
              v-model="currentChannel"
              @change="currentChannelChange"
          >
            <van-radio
                v-for="(ch,i) in channel"
                :key="'withdraw-channel-'+i"
                checked-color="#ff8900"
                label-position="left"
                :name="ch"
                :class="['padding-sm border-radius-xs',{'bg-e8e8e8':(currentChannel.id==ch.id)},{'opacity-80':(currentChannel.id!=ch.id)}]"
            >
              <span :class="['flex','align-center',{'fc-accent':(currentChannel.id==ch.id)}]">
                <img class="size-25 margin-right-xs" :src="ch.cover">
                <span>{{ch.title}}</span>
              </span>
            </van-radio>
          </van-radio-group>

          <template v-if="!currentChannel.select_bank">
            <div class="padding-tb-sm flex align-center">
              <img :src="currentChannel.cover" class="size-25 margin-right-sm" v-if="currentChannel.cover">
              <span>{{currentChannel.title}}</span>
            </div>
            <van-field
                v-model="inp.value"
                v-for="(inp,i) in currentChannel.input_config"
                :key="currentChannel.type+'input'+i"
                class="fs-12 font-bold border-radius-xs bg-f2f2f6 margin-bottom"
                :placeholder="inp.label"
            ></van-field>
          </template>

          <template v-else>
            <div class="margin-bottom-sm fs-16 font-bold">{{$t('SELECT_BANK','选择银行')}}</div>
            <div class="padding-sm margin-bottom-sm flex align-center bg-ecd8af border-radius-xs font-bold" @click="showSelectBank=true">
              <img :src="currentBank.bank_cover" class="size-25 margin-right-sm" v-if="currentBank.bank_cover">
              <span>{{currentBank.bank_name}}</span>
              <div class="flex-sub"></div>
              <van-icon name="arrow"/>
            </div>
            <van-field
                v-model="inp.value"
                v-for="(inp,i) in currentBank.input_config"
                :key="currentBank.name+'input'+i"
                class="fs-12 font-bold border-radius-xs bg-view margin-bottom"
                :placeholder="inp.label"
            ></van-field>
          </template>

          <div class="margin-bottom-sm flex align-center fc-888" v-if="calcMin!=0">
            <span class="margin-right-sm">{{$t('MIN_WITHDRAW','最小提现金额')}}</span>
            <div class="flex align-baseline font-bold">
              <money-number
                  class="money-number"
                  :value="calcMin"
              />
            </div>
          </div>

          <div class="margin-bottom-sm flex align-center fc-888" v-if="calcMax!=0">
            <span class="margin-right-sm">{{$t('MAX_WITHDRAW','最大提现金额')}}</span>
            <div class="flex align-baseline font-bold">
              <money-number
                  class="money-number"
                  :value="calcMax"
              />
            </div>
          </div>

          <div class="margin-bottom-sm flex align-center fc-888">
            <span class="margin-right-sm">{{$t('WITHHDRAW_FEE','提现手续费')}}</span>
            <span class="din-pro font-bold">{{currentChannel.rate}}%</span>
          </div>

          <div class="flex align-center margin-bottom fc-888">
            <span class="margin-right-sm">
              {{ $t("TOTAL_DEDUCE_AMOUNT", "合计扣费金额") }}
            </span>
            <div class="font-bold fc-accent flex align-baseline">
              <money-number
                  class="money-number"
                  :value="calcPredictArrive"
                  :precision="coin_unit.balance"
              />
            </div>
          </div>

<!--          :disabled="!allowSubmit"-->
          <van-button
              block
              class="border-radius-xs font-bold margin-tb"
              color="#ff8900"
              @click="beforeWithdraw"
          >
            {{ $t("NEXT_STEP", "下一步") }}
          </van-button>
        </div>

        <div
          class="margin-lr margin-bottom white-view box-shadow border-radius-sm flex flex-direction"
          v-if="currentBank.remark || currentChannel.remark"
        >
          <div class="border-radius-xs padding-sm flex flex-direction bg-f8ede5">
            <div class="withdraw-tip fs-12">
              <span v-if="currentChannel.select_bank">{{currentBank.remark || currentChannel.remark}}</span>
              <span v-else>{{currentChannel.remark}}</span>
            </div>
          </div>
        </div>
      </template>

      <div class="flex-sub flex flex-direction align-center margin white-view border-radius-sm" v-else>
        <div style="height:2.8rem"></div>
        <img
            class="margin-bottom"
            src="../assets/images/icon_11@2x.png"
            style="width:2rem"
        />
        <div class="margin-bottom-sm font-bold fs-22 text-center">
          {{ $t("SUBMIT_SUCCESS", "提交成功") }}
        </div>
        <div class="margin-bottom text-center">
          {{ $t("ESTIMATED_ARRIVE", "预计1-5分钟到账,请您耐心等待！") }}
        </div>
        <div class="margin padding-lr" style="width:100%">
          <van-button
              class="border-radius-sm font-bold bg-dark fc-fff"
              block
              @click="finishWithdraw"
          >{{ $t("FINISH", "完成") }}</van-button
          >
        </div>
      </div>
    </template>

    <!-- 选择二级 channel item -->
    <van-popup
        get-container=".wallet-history-page"
        v-model="showSelectBank"
        round
        position="bottom"
        class="margin-tb border-radius no-bg padding-lr"
    >
      <div class="padding position-re white-view border-radius box-shadow">
        <van-icon
            @click="showSelectBank = false"
            size="0.5rem"
            color="#ff8900"
            class="position-ab margin-right margin-top"
            style="font-weight:bold;right:0;top:0"
            name="cross"
        />
        <div class="flex flex-direction vh-70">
          <div class="fs-16 text-center font-bold white-view padding-tb-sm" style="border-bottom:1px solid #EEECFA">{{$t('SELECT_BANK','选择银行')}}</div>
          <div class="whtie-view padding-sm"/>
          <div class="flex flex-direction flex-sub"  style="overflow:auto">
            <van-button
                v-for="(item, i) in currentChannel.channel_list"
                :key="'select-type' + i"
                :color="currentBank == item ? '#ff8900' : ''"
                class="bg-f2f2f6 border-radius-xs margin-bottom-sm"
                style="min-height:1.174rem"
                block
                @click="changeBank(item)"
            >
              <span class="font-bold">{{ item.bank_name }}</span>
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 提现确认 -->
    <van-popup
        class="vw-80 border-radius padding"
        v-model="showWithdrawSure"
    >
      <div class="flex flex-direction">
        <div class="fs-18 font-bold text-center margin-bottom">{{$t('WITHDRAW_SURE','提现确认')}}</div>
        <div class="margin-bottom-sm">{{$t('WILL_DEDUCE_N_GIFT_MONEY',[withdrawInfo.deduct_money+' '+system.default_currency],'将扣除N赠送金')}}</div>
        <div class="flex flex-direction padding-lr-sm fs-12 fc-888 margin-bottom">
          <div class="margin-bottom-xs flex align-center justify-between" v-if="withdrawInfo.give_balance">
            <span class="margin-right-xs">{{$t('GIFT_BALANCE','赠送金余额')}}:</span>
            <span>- {{withdrawInfo.give_balance >= withdrawInfo.deduct_money ? withdrawInfo.deduct_money : withdrawInfo.give_balance }} {{system.default_currency}}</span>
          </div>
          <div class="flex align-center justify-between" v-if="withdrawInfo.money_bao_deduct_give_balance">
            <span class="margin-right-xs">{{$t('MONEY_BAO_BALANCE','赚钱宝余额')}}:</span>
            <span>- {{withdrawInfo.money_bao_deduct_give_balance }} {{system.default_currency}}</span>
          </div>
        </div>
        <div class="flex align-center">
          <van-button color="#ff8900" class="margin-right-xs" round block plain @click="showWithdrawSure=false">{{$t('CANCEL','取消')}}</van-button>
          <van-button color="#ff8900" class="margin-left-xs" round block @click="startWithdraw">{{$t('SURE','确认')}}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import MoneyNumber from "@/components/MoneyNumber";
import {Toast} from "mand-mobile"
import { Button, Icon, NavBar, Field, RadioGroup, Radio, Popup } from "vant";
import { Base } from "@/mixins";
export default {
  components: {
    MoneyNumber,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
  },
  data: () => {
    return {
      currentWithdrawParams: {},
      amount: '',
      transPwd: "",
      currentChannel: {},
      currentBank: {},
      channel: [],
      submitSuccess: false,
      showSelectBank: false,
      showWithdrawSure: false,
      withdrawInfo: {
        deduct_money: 0,
        give_balance: 0,
        money_bao_deduct_give_balance: 0
      },
      inited: false
    };
  },
  mixins: [Base],
  computed: {
    allowSubmit() {
      if (!this.amount) {
        this.amount = 0
        // return false
      }

      if (this.currentChannel.select_bank) {
        if (this.currentBank.input_config) {
          for (let inp of this.currentBank.input_config) {
            if (!inp.value) {
              return false
            }
          }
        }
        if (this.currentBank.max_money != 0 && this.amount > this.currentBank.max_money) {
          return false
        }
        if (this.currentBank.min_money !=0 && this.amount < this.currentBank.min_money) {
          return false
        }
      } else {
        if (this.currentChannel.input_config) {
          for (let inp of this.currentChannel.input_config) {
            if (!inp.value) {
              return false
            }
          }
          if (this.currentChannel.max_money != 0 && this.amount > this.currentChannel.max_money) {
            return false
          }
          if (this.currentChannel.min_money !=0 && this.amount < this.currentChannel.min_money) {
            return false
          }
        }
      }
      return true
    },
    calcPredictArrive() {
      let n = Number(this.amount)
      let num = n * (1 + this.currentChannel.rate / 100)
      return isNaN(num) ? 0 : num
    },
    calcMin() {
      let min = 0
      if (this.currentChannel.select_bank) {
        let bankMin = this.currentBank.min_money,
            channelMin = this.currentChannel.min_money;
        min = bankMin == 0 ? channelMin : bankMin
      } else {
        min = this.currentChannel.min_money
      }
      return min
    },
    calcMax() {
      let max = 0
      if (this.currentChannel.select_bank) {
        let bankMax = this.currentBank.max_money,
            channelMax = this.currentChannel.max_money;
        max = bankMax == 0 ? channelMax : bankMax
      } else {
        max = this.currentChannel.max_money
      }
      return max
    }
  },
  mounted() {
    this.getWithdrawInfo()
  },
  methods: {
    resetInput() {
      // this.amount = ''
      this.channel.forEach(ch=>{
        if (ch.select_bank) {
          ch.channel_list.forEach(child_ch=>{
            child_ch.input_config.forEach(inp=>{
              inp.value = ''
            })
          })
        } else {
          ch.input_config.forEach(inp=>{
            inp.value = ''
          })
        }
      })
    },
    useAllBalance() {
      let fee = this.wallet.balance * (this.currentChannel.rate / 100)
      this.amount = Math.floor(this.wallet.balance - fee)
    },
    currentChannelChange() {
      if (this.currentChannel.select_bank) {
        this.currentBank = this.currentChannel.channel_list[0]
      } else {
        this.currentBank = {}
      }
      this.resetInput()
    },
    getWithdrawInfo() {
      Toast.loading('loading')
      this.$http.get('v1/withdrawBegin')
          .then(res=>{
            this.channel = res.data.list
            if (this.channel.length) {
              this.currentChannel = this.channel[0]
              if (this.currentChannel.select_bank) {
                this.currentBank = this.currentChannel.channel_list[0]
              }
            }
            this.inited = true
            Toast.hide()
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
    },
    beforeWithdraw() {

      if (!this.amount) {
        window.scroll({top: 0, behavior: 'smooth'})
        Toast.failed(this.$t('ENTER_WITHDRAW_AMOUNT','请输入提现金额'))
        setTimeout(()=>{
          this.$refs.withdrawInput.focus()
        },500)
        return
      }

      if (!this.allowSubmit) {
        Toast.failed(this.$t('PLEASE_FILL_ALL_ACCOUNT_INFO','请将收款信息填写完整'))
        return
      }

      let params = {
        type: this.currentChannel.type,
        amount: parseFloat(this.amount),
        channel_id: this.currentChannel.id,
        channel_item_id: this.currentBank.id || 0,
        input_data: {}
      }

      if (this.currentChannel.select_bank) {
        for (let inp of this.currentBank.input_config) {
          params.input_data[inp.name] = inp.value || ''
        }
      } else {
        for (let inp of this.currentChannel.input_config) {
          params.input_data[inp.name] = inp.value || ''
        }
      }

      this.currentWithdrawParams = params

      this.startWithdraw()
    },
    startWithdraw() {
      this.showWithdrawSure = false
      Toast.loading('loading')
      this.$http.post('v1/putInWithdraw',this.currentWithdrawParams)
          .then(res=>{
            Toast.hide()
            this.submitSuccess = true
            this.$store.dispatch('refreshUser')
          })
          .catch(err=>{
            Toast.failed(err.data.message)
          })
          .finally(()=>{
            this.currentWithdrawParams = {}
          })
    },
    changeBank(item) {
      this.currentBank = item
      this.showSelectBank = false
      this.resetInput()
    },
    finishWithdraw() {
      this.resetInput()
      this.submitSuccess = false
    }
  },
};
</script>

<style lang="scss">
.withdraw-page {
  min-height: 100vh;

  .withdraw-tip {
    display: flex;
    align-items: flex-start;

    &::before {
      content: "";
      width: 6px;
      min-width: 6px;
      height: 6px;
      background: #c79f82;
      border-radius: 50%;
      margin: 6px 6px 6px 0;
    }
  }

  .close-icon {
    right: 0.28rem;
    top: 0.28rem;
    font-weight: bold;
  }

  .withdraw-ways {
    .van-radio__label {
      flex-grow: 1;
    }
  }
}
</style>
