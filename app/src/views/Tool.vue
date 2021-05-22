<template>
  <div
    class="tool-page flex flex-direction align-center justify-center padding"
  >
    <van-button
      round
      class="bg-primary font-bold size-72 margin-bottom"
      @click="importAllLang"
      >Import</van-button
    >
    <van-button
      round
      class="bg-blue fc-fff font-bold size-72 margin-bottom"
      @click="getAllLang"
      >Get</van-button
    >
    <van-button
      round
      class="bg-error fc-fff font-bold size-72 margin-bottom"
      @click="updateLang"
      >Update</van-button
    >
  </div>
</template>

<script>
import { Button } from "vant";
import { importAll } from "../plugins/importLang";
import { Toast } from "mand-mobile";

export default {
  components: {
    [Button.name]: Button,
  },
  methods: {
    importAllLang() {
      importAll();
    },
    getAllLang() {
      this.$http
        .get("v1/getLangList", {
          params: {
            group: "",
            local: "",
          },
        })
        .then((res) => {
          console.log(JSON.stringify(res));
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
    updateLang() {
      let lang_map = {
        SIGN_UP_AND_GET_MONEY_NOW: "เป็นตัวแทนทันที",
        NICK_NAME: "ชื่อเล่น",
        ENTER_NICK_NAME: "โปรดป้อนชื่อเล่น",
        RANDOM: "สุ่ม",
        PHONE: "หมายเลขโทรศัพท์มือถือ",
        ENTER_PHONE: "โปรดป้อนหมายเลขโทรศัพท์มือถือ",
        VERIFY_CODE: "รหัสยืนยัน",
        ENTER_VERIFY_CODE: "โปรดป้อนรหัสยืนยัน",
        SEND: "ส่ง",
        PASSWORD: "รหัสผ่าน",
        ENTER_PASSWORD: "โปรดป้อนรหัสผ่าน",
        PASSWORD_AGAIN: "ยืนยันรหัสผ่าน",
        ENTER_PASSWORD_AGAIN: "โปรดป้อนรหัสผ่านยืนยัน",
        REFERRAL_CODE: "รหัสเชิญ",
        ENTER_REFERRAL_CODE: "โปรดป้อนรหัสเชิญ",
        SIGN_UP: "ลงทะเบียน",
        HAS_ACCOUNT_SIGN_IN: "มีบัญชีอยู่แล้ว เข้าสู่ระบบ",
        SIGN_IN: "เข้าสู่ระบบ",
        TASK_NUM: "จำนวนตัวแทน",
        DAY_PROFIT: "รายได้ต่อวัน",
        YEAR_PROFIT: "รายได้ต่อปี",
        PROMOTE_COMMISSION: "รางวัล",
        REST: "เหลือ",
        NOT_LIMIT: "ไม่มีจำกัด",
        FINISH_TASK: "เป็นตัวแทนสำเร็จ",
        DO_AGAIN: "ทำอีกครั้ง",
        RECEIVE_TASK: "เป็นตัวแทนทันที",
        WELCOME_TO_PROMOTE_PLATFORM: "ยินดีต้อนรับเข้าสู่แพลตฟอร์มตัวแทน",
        SHARE_AD_EVERY_DAY_CAN_MAKE_MONEY:
          "แบรนด์ที่มีชื่อเสียงระดับโลกอยู่ที่นี่หมดเลย เป็นตัวแทนเวลา 5 นาที ก็สามารถได้รับสิทธิตัวแทนแบบฟรี มาเริ่มเดี๋ยวนี้เลย!",
        GET_FIRST_AWARD_NOW: "หาเงินก้อนแรกทันที",
        FREE_GET_MONEY: "รับเงินฟรี",
        YEAR: "ปี",
        START_SHARE_MAKE_MONEY: "แชร์ทันที",
        FREE_GET_MONEY_NOW: "เป็นตัวแทนทันที",
        CLICK_BTN_AUTO_COPY: "คลิกปุ่มเพื่อคัดลอกลิงค์แชร์",
        COPY: "คัดลอก",
        CLICK_ICON_SHARE_FRIEND: "คลิกไอคอนด้านล่างเพื่อแชร์",
        CANCEL: "ยกเลิก",
        LOADING: "โหลดอยู่ ...",
        LOAD_FAILED: "โหลดล้มเหลว",
        NO_MORE: "ไม่มีแล้ว",
        CLEAR_ALL_NOTIFY: "ลบการแจ้งเตือนทั้งหมด",
        SURE: "ยืนยัน",
        SUCCESS_WITHDRAW_N: "ได้ถอนเงิน{0}",
        INVITED_SOMEONE: "เชิญ{0}",
        GETTED_N_GIVE: "ได้รับ{0}",
        DEPOSIT_N_BALANCE: "เติมเงิน{0}",
        GETTED_N_PROFIT: "ได้รับรายได้{0}",
        GETTED_N_AWARD: "ได้รับรายได้จากตัวแทน{0}",
        OTHER_QUESTION_CONTACT_CS: "ติดต่อเรา",
        DEPOSIT_SUCCESS: "เติมเงินสำเร็จ",
        DEPOSIT_N_CASH_ARRIVED: "เติมเงิน {0}เข้าบัญชีแล้ว",
        DO_TASK_MAKE_MONEY: "เป็นตัวแทนหาเงินเดี๋ยวนี้เลย",
        BUY_VIP: "ซื้อ VIP",
        YESTERDAY_PROFIT_NOTIFY: "แจ้งเตือนรายได้เมื่อวานนี้",
        YOU_GOT_COMMISSION_YESTERDAY: "คุณได้รับรายได้เมื่อวานนี้",
        DO_TASK_GET_MORE_AWARD: "เป็นตัวแทนและหารายได้มากขึ้น",
        AD_TASK_AWARD_ARRIVED: "ขอแสดงความยินดีที่ได้รับรายได้ตัวแทน",
        COMMISSION_HAS_ARRIVED: "ค่าคอมมิชชั่นเข้าบัญชีแล้ว",
        GET_MORE_AWARD: "หารายได้มากขึ้น",
        CAN_NOT_GET_COMMISSION: "ไม่สามารถรับรายได้",
        CONGRATULATIONS_YOU_GOT_COMMISSION: "ขอแสดงความยินดีที่ได้รับรายได้",
        YOUR_FRIEND_FINISH_TASK_LEVEL: "เพื่อน{1}ระดับ {0}ของคุณได้ระดับตัวแทน",
        YOU_CAN_GET_COMMISSION: "คุณสามารถรับรางวัล",
        BECAUSE_YOU_DO_NOT_BUY_VIP: "เนื่องจากคุณไม่ได้ซื้อ VIP",
        SO_YOU_CANNOT_GOT_IT: "จึงไม่สามารถรับรางวัลได้",
        YOUR_FRIEND_FINISH_TASK: "เพื่อน{1}ระดับ{0}ของคุณทำภารกิจสำเร็จ",
        CONGRATULATIONS_YOU_GOT: "ขอแสดงความยินดีคุณได้รับ",
        BECAUSE_YOUR_VIP_LEVEL_IS: "เนื่องจากระดับVIPของคุณคือ",
        SO_YOU_ONLY_GET: "คุณจึงสามารถได้รับ",
        BUY_VIP_GET_ALL_COMMISSION: "เปิดVIPรับรางวัล",
        UPGRADE_VIP_GET_ALL_COMMISSION: "อัพเกรด VIP เพื่อรับรางวัลทั้งหมด",
        TRANSFER_FAILED: "โอนเงินล้มเหลว",
        VIEW_DETAIL: "ดูรายละเอียด",
        COMMISSION_ARRIVED_NOTIFY: "แจ้งเตือนรางวัลเข้าสู่บัญชี",
        YOUR_FRIEND_BUY_VIP_SPEND: "เพื่อน {1}ระดับ{0}ของคุณซื้อVIPใช้เงิน",
        BECAUSE_YOU_BUY_VIP_SPEND:
          "เนื่องจากคุณมีการซื้อ VIP ค่าใช้จ่ายทั้งหมด",
        UPGRADE_VIP: "อัพเกรด VIP",
        INVITE_FRIEND_GET_MORE_AWARD: "เชิญเพื่อนเพื่อรับรางวัลมากขึ้น",
        AWARD_RULE: "กฎรางวัล",
        LOGIN: "เข้าสู่ระบบ",
        HOME: "หน้าแรก",
        VIP: "VIP",
        MESSAGE: "ข่าว",
        MY: "ของฉัน",
        TAB_MONEY_TASK: "ไม่ต้องลงทุนก็สามารถทำเงินได้ มาเข้าร่วมเดี๋ยวนี้ซิ!",
        INSTALL_APP: "เพิ่มไปยังหน้าจอหลัก",
        PLEASE_CHECK_NETWORK: "โหลดล้มเหลว โปรดตรวจสอบการเชื่อมต่อเครือข่าย",
        INSTALLED_SUCCESSED: "ติดตั้งสำเร็จ",
        BROWSER_NOT_SUPPORT:
          "เบราว์เซอร์ปัจจุบันไม่รองรับ โปรดใช้เบราว์เซอร์ Chrome",
        INVITE_FRIEND_DO_TASK_TOGETHER: "เชิญเพื่อนเป็นตัวแทน",
        ENJOY_FRIEND_YEAR_PROFIT: "สามารถได้รายได้ตัวแทน15%ของเพื่อน",
        INVITE_FRIEND: "เชิญเพื่อน",
        FRIEND_FINISH_TASH: "เพื่อนเป็นตัวแทนสำเร็จ",
        GET_AWARD: "ได้รับรางวัล",
        INVITE_NOW: "เชิญเดี๋ยวนี้",
        MY_TEAM: "ทีมของฉัน",
        INVITE_AMOUNT: "จำนวนคนที่ได้เชิญ",
        TOTAL_PROFIT: "รายได้สะสม",
        INVITE_RULE: "กฎการเชิญ",
        SHARE_AD_GET_CASH: "เป็นตัวแทนหาเงินทันที",
        MAKE_MONEY_NOW: "หาเงินทันที",
        SELECT_VIP_LEVEL: "เลือกระดับสมาชิก",
        TASK_PACKAGE: "แพ็คเกจ",
        N_TIMES: "{0}ครั้ง",
        PACKAGE_NUM: "จำนวนแพ็กเกจ",
        SELECT_BUY_TIME: "เลือกเวลา",
        AVAILABLE: "ยอดคงเหลือที่ใช้ได้",
        NEED_PAY: "ต้องชำระเงิน",
        BUY_NOW: "ซื้อทันที",
        BUY_SUCCESS: "ซื้อสำเร็จ",
        BUY_N_SUCCESS: "ขอแสดงความยินดีที่คุณซื้อ {0} สำเร็จ! ",
        BUY_FAILED: "ซื้อล้มเหลว",
        ACCOUNT_SHORT_BALANCE: "ยอดเงินคงเหลือในบัญชีไม่เพียงพอ",
        TO_DEPOSIT: "เติมเงินทันที",
        CLICK_ABOVE_MAKE_MONEY: "ง่ายมากที่จะได้รับ 1,000 ต่อวัน",
        START_MAKE_MONEY_FREE: "หาเงินทันที",
        VIP_CENTER: "ศูนย์สมาชิก",
        HELLO_VIP_N: "ได้ซื้อVIP {0}สำเร็จ!",
        OWEN_DAY_TASK_AMOUNT: "ได้จำนวนตัวแทนรายวันแล้ว",
        NOT_BUY_VIP_N: "ยังไม่ได้ซื้อ VIP {0}",
        DO_TASK_LEVEL: "ระดับตัวแทนที่รับได้",
        VIP_N_AND_BELOW: "VIP {0} และตํ่ากว่า",
        DAY_TASK_NUM: "จำนวนตัวแทนต่อวัน",
        PREDICT_DAY_PROFIT: "คาดการณ์รายได้ต่อวันที่จะได้รับ",
        PREDICT_MONTH_PROFIT: "คาดการณ์รายได้ต่อเดือนที่จะได้รับ",
        PREDICT_YEAR_PROFIT: "คาดการณ์รายได้ต่อปีที่จะได้รับ",
        PREDICT_TOTAL_PROFIT: "คาดการณ์รายได้รวมที่จะได้รับ",
        N_DAY: "{0}วัน",
        EACH_DAY: "ทุกวัน",
        DO_TASK_NOW: "เป็นตัวแทนทำเงินทันที",
        ABOUT_US: "เกี่ยวกับเรา",
        SEE_MORE: "ดูเพิ่มเติม",
        DAY_DATA: "ข้อมูลรายวัน",
        TODAY_PROFIT: "รายได้สะสม",
        TODAY_TASK: "จำนวนคนที่ได้เชิญ",
        TASK_DATA: "ข้อมูลตัวแทน",
        FREE_TASK_COUNT: "จำนวนตัวแทนฟรี",
        TASK_COUNT: "จำนวนตัวแทน",
        YOU_NOT_BUY_VIP: "คุณยังไม่ได้ซื้อ VIP",
        RECOMMEND_TASK: "แนะนำ",
        MORE_TASK: "ตัวแทนอื่น",
        MESSAGE_CENTER: "ศูนย์ข้อความ",
        READ_ALL: "อ่านหมดแล้ว",
        HELP_CENTER: "ศูนย์ช่วยเหลือ",
        MY_VIP: "VIP ของฉัน",
        BUY_AGAIN: "ซื้อพร้อมกัน",
        NOT_BUY_VIP: "ยังไม่เปิด VIP ",
        TASK_LEVEL: "ระดับตัวแทนที่รับได้",
        NOT_BUY: "ไม่ได้ซื้อ",
        RULES_AND_DESC: "กฎและคำอธิบาย",
        GET_MORE_PROFIT: "หาเงินเพิ่มขึ้น",
        MY_WALLET: "กระเป๋าเงินของฉัน",
        WALLET_HISTORY: "บันทึกรายรับและรายจ่าย",
        ACCOUNT_BALANCE: "ยอดคงเหลือในบัญชี",
        WITHDRAW_WEB: "ถอนเงิน",
        TOTAL_EARNINGS: "รายได้สะสม",
        DEPOSIT_WEB: "เติมเงิน",
        MY_TASKS: "ตัวแทนของฉัน",
        ALL_TASKS: "ตัวแทนทั้งหมด",
        INPROGRESS: "อยู่ระหว่างดำเนินการ",
        CHECKING: "อยู่ระหว่างตรวจสอบ",
        FINISHED: "เสร็จสิ้น",
        BUY_VIP_GET_MORE_PROFIT: "เปิด VIP สามารถทำภารกิจพิเศษหาเงินมากขึ้น",
        HIGH_LEVEL_HIGH_GAINED: "ระดับยิ่งสูง หาเงินยิ่งเยอะ",
        INVITE_FRIEND_TOGETHER: "เชิญเพื่อนมาหาเงินด้วยกัน",
        RANKING: "รายการจัดอันดับ",
        CONTACT_US: "ติดต่อเรา",
        HELP: "ศูนย์ช่วยเหลือ",
        TASK_CENTER: "ศูนย์ตัวแทน",
        MY_TASK: "ตัวแทนของฉัน",
        ALL: "ทั้งหมด",
        FREE: "ฟรี",
        I_SEE: "รับทราบแล้ว",
        TASKS_GUIDE_TITLE1: "ที่นี่คุณสามารถดูภารกิจตัวแทนในระดับต่างๆ",
        TASKS_GUIDE_DESC1: "ระดับของภารกิจตัวแทนยิ่งสูง รางวัลก็ยิ่งมีมากขึ้น",
        TASK_DETAIL: "รายละเอียดตัวแทน",
        TASK_AWARD: "รายได้ตัวแทน",
        TOTAL_TASK: "จำนวนตัวแทนทั้งหมด",
        REST_TASK: "จำนวนตัวแทนที่เหลือ",
        TASK_TIME: "เวลาของภารกิจตัวแทน",
        TASK_IS_ENDED: "ภารกิจตัวแทนเสร็จสิ้น",
        TASK_DESC: "คำอธิบายภารกิจตัวแทน",
        TASK_REQUIREMENTS: "กฎตัวแทน",
        TASK_REQUIREMENTS_CONTENT_N_CLICK:
          "หลังจากแชร์กับเพื่อน {0} คนและให้เพื่อนคลิกลิงก์ ภารกิจจะเสร็จสิ้นและรางวัลจะเข้าบัญชีของคุณโดยอัตโนมัติ",
        TASK_STEPS: "ขั้นตอนของภารกิจตัวแทน",
        CLICK_RECEIVE_TASK: "คลิกปุ่มด้านล่างเพื่อเป็นตัวแทน",
        HAS_RECEIVED: "กำลังเป็นตัวแทนอยู่...",
        COPY_SHARE_TEXT: "คัดลอกลิงก์ตัวแทนของคุณ",
        MANUAL_CONTROL_TO_SHARE:
          "คลิกไอคอนการแชร์ของ whatsaapp fb เพื่อแชร์กับเพื่อน",
        CLICK_TO_QUICK_SHARE: "คลิกไอคอนเพื่อแชร์กับเพื่อน ๆ อย่างรวดเร็ว",
        TASK_AUTO_FINISHED_N_FRIEND:
          "หลังจากแชร์เพื่อน {0} คนได้คลิกดูก็สามารถได้รับรายได้โดยอัตโนมัติ",
        TASK_END_COUNT_DOWN: "นับเวลาถอยหลังของภารกิจ",
        CAN_GET_AWARD: "สามารถได้รับรายได้",
        TIP_LET_YOUR_FRIEND_CLICK_YOUR_LINK:
          "คำเตือน: ให้เพื่อนคลิกดูลิงก์ที่คุณแชร์ จะได้รับรายได้ทันที",
        DO_OTHER_GET_MORE_PROFIT: "ฉันอยากเป็นตัวแทนของแบรนด์อื่น ๆ",
        RECEIVE_SUCCESS: "ภารกิจตัวแทนเริ่มต้นแล้ว",
        FINISHED_TASK_CAN_GET_N: "ทำภารกิจตัวแทนให้เสร็จสามารถได้รับ {0}",
        CONTINUE: "ต่อไป",
        SO_SORRY: "ขออภัย",
        CURRENT_TASK_ONLY_VIP_N:
          "อัปเกรดเป็น Lv {0} เพื่อเป็นตัวแทนของแบรนด์นี้",
        UPGRADE_VIP_N_GET_MORE_MONEY: "อัปเกรดLv {0} ทันที",
        TASK_COUNT_SHORT: "ภารกิจตัวแทนจำนวนไม่เพียงพอ",
        TASK_COUNT_SHORT_THAN_CONTINUE:
          "ภารกิจตัวแทนจำนวนไม่เพียงพอ ไปซื้อจำนวนครั้ง",
        BUY_COUNT: "ไปซื้อจำนวนครั้ง",
        TASK_EXPIRED: "เกินเวลาตัวแทน",
        PLEASE_FINISH_TASK_ON_TIME:
          "โปรดทำภารกิจตัวแทนให้เสร็จภายในเวลาที่กำหนด",
        RECEIVE_AGAIN: "เป็นตัวแทนใหม่",
        NOT_TASK: "ยังไม่มีแบรนด์ดังกล่าว",
        NEXT: "ถัดไป",
        PREVOUS: "ขั้นตอนก่อนหน้า",
        JUMP: "ข้าม",
        TASK_DETAIL_GUIDE_TITLE1:
          "นี่คือจำนวนครั้งภารกิจตัวแทนและรายละเอียดรางวัล",
        TASK_DETAIL_GUIDE_TITLE2: "ขั้นตอนที่ 1 คลิกปุ่มเพื่อรับภารกิจตัวแทน",
        TASK_DETAIL_GUIDE_TITLE3: "ขั้นตอนที่ 2",
        TASK_DETAIL_GUIDE_TITLE4:
          "ขั้นตอนที่3 แชร์ลิงก์ตัวแทนของคุณให้เพื่อนผ่านซอฟต์แวร์โซเชียลมีเดีย (เพียงแค่วาง)",
        TASK_DETAIL_GUIDE_TITLE5:
          "ตัวแทนมีเวลาจำกัดนะคะ’ เพื่อน 1 คนคลิกลิงก์แล้ว ก็สามารถช่วย ให้ คุณ เป็น ทูตตัวแทนและรับรางวัลตัวแทนของคุณได้ฟรี",
        OFFICIAL_ACCOUNT: "บัญชีทางการ",
        RECEIVER_NAME: "ชื่อผู้รับเงิน",
        RECEIVER_ACCOUNT: "บัญชีผู้รับเงิน",
        RECEIVER_BANK: "ชื่อเต็มของธนาคารที่เปิดบัญชี",
        UPLOAD_TIP:
          "โปรดโอนเงินตามข้อมูลข้างต้นและเก็บสกรีนช็อตของการโอนเงินไว้หลังจากการโอนเงินสำเร็จแล้วให้กดส่ง เพื่อตรวจสอบยืนยัน จำนวนเงินขั้นตํ่าในการโอนคือ {0}",
        FILL_USER_INFO: "กรอกข้อมูลผู้ใช้",
        FULLNAME_OF_BANK: "ชื่อเต็มของธนาคารที่เปิดบัญชี",
        ENTER_FULLNAME_OF_BANK: "โปรดป้อนชื่อเต็มของธนาคารที่เปิดบัญชี",
        TRANSFER_NAME: "ชื่อผู้โอน",
        ENTER_TRANSFER_NAME: "โปรดป้อนชื่อผู้โอน",
        TRANSFER_ACCOUNT: "บัญชีของผู้โอน",
        ENTER_TRANSFER_ACCOUNT: "โปรดป้อนบัญชีของผู้โอน",
        TRANSFER_AMOUNT: "จำนวนเงินที่โอน",
        ENTER_TRANSFER_AMOUNT: "โปรดป้อนจำนวนเงินที่โอน",
        TRANSFER_TIME: "เวลาโอนเงิน",
        SELECT_TRANSFER_TIME: "โปรดเลือกเวลาการโอน",
        TRANSFER_CERTIFICATION: "ใบรับรองการโอนเงิน",
        SEE_DEMO: "ดูตัวอย่าง",
        SUBMIT_USER_INFO_CERTIFICATION: "ส่งใบรับรองการโอนเงิน",
        SUBMIT_SUCCESS: "ส่งใบรับรองการโอนเงินแล้ว",
        ABOUT_5_MINS_ARRIVE: "คาดว่าจะเข้าถึงบัญชีใน 1-5 นาที โปรดรอสักครู่",
        CONTACT_CUSTOM_SERVICE_QUICKLY: "ติดต่อฝ่ายบริการลูกค้า",
        SEE_DEPOSIT_DETAIL: "ดูรายละเอียดการฝากเงิน",
        BANK_CHANNEL_UNAVAILABLE:
          "การโอนเงินบัญชีธนาคารไม่สามารถใช้งานได้ชั่วคราว",
        ENTER_TRANSFEROR_NAME_AGAIN: "โปรดป้อนชื่อผู้โอนของคุณอีกครั้ง",
        ENTER_TRANSFEROR_ACCOUNT_AGAIN: "โปรดป้อนบัญชีผู้โอนของคุณอีกครั้ง",
        TRANSFER_AMOUNT_CANT_LESS_THAN_MIN:
          "จำนวนเงินที่โอนต้องไม่น้อยกว่า {0}",
        ORDER_DETAIL: "รายละเอียดของออเดอร์",
        ORDER_PAYING: "ออเดอร์กำลังดำเนินอยู่",
        PLEASE_WAIT: "โปรดรอสักครู่",
        BACK_HOME: "กลับไปที่หน้าแรก",
        QUERYING_ORDER: "กำลังค้นหาออเดอร์อยู่",
        SEARCH_ORDER_NO_RESULT: "ไม่พบออเดอร์ โปรดลองอีกครั้งในภายหลัง",
        HISTORY: "บันทึก",
        SELECT_PAYMENT: "เลือกวิธีการเติมเงิน",
        DEPOSIT_AMOUNT: "จำนวนเงินที่เติม",
        ENTER_DEPOSIT_AMOUNT: "โปรดป้อนจำนวนเงินที่เติม",
        PAY_NOW: "ชำระเงินทันที",
        HOW_TO_PAY: "วิธีชำระเงิน",
        SELECT_BANK: "เลือกธนาคาร",
        MIN_DEPOSIT: "เติมเงินตํ่าสุด",
        MAX_DEPOSIT: "เติมเงินสูงสุด",
        NO_DEPOSIT_CHANNEL: "ไม่มีช่องเติมเงิน",
        NO_QUICK_CHANNEL: "ไม่มีช่องชำระเงินด่วน",
        MIN_DEPOSIT_N: "เติมเงินตํ่าสุด{0}",
        MAX_DEPOSIT_N: "เติมเงินสูงสุด{0}",
        PROFIT_RANKING: "รายการอันดับรายได้",
        SUCCESS_DEPOSIT_IN_N_TO_BALANCE: "เติมเงิน{0}สำเร็จ",
        FINISH: "เสร็จสิ้น",
        DEPOSIT_FAILED: "เติมเงินล้มเหลว",
        DEPOSIT_NOT_ARRIVE: "การเติมเงินยังไม่เข้าสู่บัญชี",
        CONTACT_CS: "ติดต่อฝ่ายบริการลูกค้า",
        LATEST_3_MONTH: "ข้อมูลบันทึกในช่วงสามเดือนที่ผ่านมา",
        PROMOTE_BEGINNER_TITLE: "โฆษณา 60s",
        PROMOTE_BEGINNER_DESC:
          "วิธีการเล่นที่ 1: สามารถทำเสร็จทันที (ดูโฆษณาของตัวเอง) รายได้ต่อวัน1200บาทขึ้นไป วิธีการเล่นที่2: เป็นตัวแทนจะได้รับรายได้มากขึ้น รายได้ต่อวัน 2000บาทขึ้นไป",
        HAS_BEEN_CLAIMED: "ได้รับแล้ว",
        N_USER_JOINED: "ได้เข้าร่วมแล้ว",
        PEOPLE: "คน",
        ENTER_YOUR_TELEPHONE: "ป้อนหมายเลขโทรศัพท์มือถือของคุณ",
        SET_YOUR_PASSWORD: "ตั้งรหัสผ่านบัญชีของคุณ",
        GET_CASH_NOW: "รับเงินสดทันที",
        REG_NOW_GET_MONEY: "รับเงินทันที",
        IS_GETTING: "กำลังรับอยู่",
        TEAM_MEMBERS: "จำนวนคนในทีม",
        TOTAL_CONTRIBUTE: "ผลงานสะสม",
        TEAM_LIST: "รายชื่อทีม",
        N_LEVEL_FRIEND: "เพื่อนระดับ {0}",
        CONTRIBUTE_AMOUNT: "จำนวนเงินสมทบ",
        CAN_NOT_WITHDRAW_WAIT:
          "การถอนเงินไม่สามารถใช้งานได้ชั่วคราว โปรดรอสักครู่",
        BACK: "กลับ",
        WITHDRAW_AMOUNT: "จำนวนเงินที่ถอนออก",
        AVAILABLE_BALANCE: "ยอดคงเหลือที่ใช้ได้",
        ENTER_WITHDRAW_AMOUNT: "โปรดป้อนจำนวนเงินที่ถอนออก",
        SELECT_WITHDRAW_WAY: "เลือกวิธีการถอน",
        MIN_WITHDRAW: "ถอนเงินตํ่าสุด",
        MAX_WITHDRAW: "ถอนเงินสูงสุด",
        WITHHDRAW_FEE: "ค่าธรรมเนียมการถอน",
        TOTAL_DEDUCE_AMOUNT: "จำนวนเงินหักทั้งหมด",
        NEXT_STEP: "ถัดไป",
        ESTIMATED_ARRIVE: "คาดว่าจะเข้าบัญชีใน 1-5 นาที โปรดรอสักครู่",
        WITHDRAW_SURE: "ยืนยันการถอนเงิน",
        WILL_DEDUCE_N_GIFT_MONEY: "หักเกมเหรียญ{0} ",
        GIFT_BALANCE: "เกมเหรียญที่เหลือ",
        PLEASE_FILL_ALL_ACCOUNT_INFO: "กรุณากรอกข้อมูลให้ครบถ้วน",
        AFTER_RECEIVE_TASK_N_HOURS:
          "หลังจากเริ่มภารกิจตัวแทน โปรดแชร์ภายใน {0} ชั่วโมง คลิกปุ่มด้านล่างเพื่อคัดลอก",
        CLICKED_NUM: "จำนวนคลิก",
        BECAUSE_YOU_VIP_LEVEL_IS: "ระดับ VIP ของคุณคือ",
        YOUR_FRIEND_BUY_VIP_N: "เพื่อนระดับ {0} ของคุณได้ซื้อ VIP {1}",
        WAIT_CHECK_TO_ARRIVE:
          "โปรดรอสักครู่ หลังจากตรวจสอบแล้วจะเข้าบัญชีโดยอัตโนมัติ",
        CHECK_TIME_WEEKDAY: "เวลาตรวจสอบ: วันทำการ 9: 00-24: 00",
        PLEASE_CONTACT_US:
          "โปรดติดต่อฝ่ายบริการลูกค้าเพื่อเข้าสู่บัญชีอย่างรวดเร็ว",
        ARRIVE_AT: "เวลาเข้าบัญชี",

        ACC_NAME: "ชื่อผู้ถือบัตร",
        ACC_NO: "บัตรธนาคาร",
        AWARD: "รางวัล",
        BALANCE: "ยอดคงเหลือ",
        BUY: "ซื้อ",
        COMMISSION: "ค่าธรรมเนียม",
        DEDUCT: "หัก",
        DEPOSIT: "ฝากเงิน",
        GIVE: "ให้ของขวัญ",
        INTEREST: "รายได้",
        OTHER: "อื่น ๆ",
        RECHARGE: "เติมเงิน",
        REFUND: "คืนเงิน",
        SUCCESS: "สำเร็จ",
        TAKEOUT: "เอาออก",
        TRANSFORM: "โอนเงิน",
        WITHDRAW: "ถอนเงิน",
        ARGS_ERROR: "ผิดพลาด",
        TASK_NOT_COMPLETED: "มีภารกิจยังไม่ทำเสร็จ ไม่สามารถรับอีก",
        NO_MORE_TAST_COUNT: "จำนวนภารกิจโฆษณาที่รับได้ไม่พอ",
        TODAY_TASK_UPPER_LIMIT: "จำนวนโฆษณาที่ทำเสริจได้ถึงขีดจำกัดของวันนี้",
        TOTAL_TASK_UPPER_LIMIT: "จำนวนโฆษณาที่ทำเสร็จได้ถึงขีดจำกัด",
        PHONE_EXISTED: "หมายเลขโทรศัพท์มือถือนี้มีอยู่แล้ว",
        PHONE_ERROR: "หมายเลขโทรศัพท์มือถือผิดพลาด",
        USER_EXCEPTION: "ผู้ใช้ผิดปกติ",
        INVITER_NOT_EXIST: "ไม่มีผู้เชิญนี้",
        PRODUCT_EXPIRATION_NOTICE: "แจ้งเตือนสินค้าหมดอายุ",
        NO_MORE_ADVERTISE_COUNT: "จำนวนโฆษณาไม่พอ",
        COMMISSION_ARRIVALED: "แจ้งเตือนได้รับค่าคอมมิชชั่นของภารกิจโฆษณา",
        COMMISSION_CAN_NOT_GET_NOTICE:
          "ค่าคอมมิชชั่นของภารกิจโฆษณาไม่สามารถได้รับการแจ้งเตือน",
        PART_COMMISSION_ARRIVALED:
          "แจ้งเตือนได้รับค่าคอมมิชชั่นของภารกิจโฆษณาส่วนหนึ่ง",
        TASK_COMPLETED_AWARD_ARRIVALED:
          "แจ้งเตือนได้รับรางวัลสำหรับภารกิจโฆษณา",
        WITHDRAW_CLOSED: "ช่องทางถอนเงินปิดแล้ว",
        CAN_NOT_BUY: "ไม่สามารถซื้อได้",
        CAN_NOT_DOWNGRADE: "ไม่สามารถลดเกรดได้",
        TEST_NOTICE: "ทดสอบแจ้งเตือนรางวัล",
        MAX_STACKS_EXCEEDED: "เกินจำนวนสูงสุดของสแต็ค",
        TASK_REQUIREMENTS_CONTENT:
          "กฎตัวแทน: ตัวแทนต้องการที่จะได้รับรายได้มากขึ้น ต้องแชร์ลิงค์พิเศษแก่เพื่อน เสร็จงานภายในเวลาที่กำหนดไว้ จะได้รายได้เพิ่มเติม รางวัลจะเข้าบัญชีคุณโดยอัตโนมัติ",
        IMMEDIATELY_COMPLETE_TASK: "ไปทำเดี๋ยวนี้",
        COPY_SUCCESS: "คัดลอกสำเร็จ",
        COPY_FAILED: "คัดลอกล้มเหลว",
        YOU_RE_FREE_VIP_NOW: "สมาชิกสามัญ",
      };

      for (let k of Object.keys(lang_map)) {
        this.$http
          .post("v1/updateLang", {
            slug: k,
            content: lang_map[k],
            local: "TH",
          })
          .then((res) => {})
          .catch((err) => {
            console.log("update failed:", err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.tool-page {
  min-height: 100vh;
}
</style>
