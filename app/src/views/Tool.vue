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

    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('RechargeOrderSuccessNotification')"
      >RechargeOrderSuccessNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('TransferVoucherRejectNotification')"
      >TransferVoucherRejectNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('TransferVoucherPassNotification')"
      >TransferVoucherPassNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserAwardNotification')"
      >UserAwardNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserDeductAwardNotification')"
      >UserDeductAwardNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserEarningsNotification')"
      >UserEarningsNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserFriendDeductAwardNotification')"
      >UserFriendDeductAwardNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserWithdrawRefundNotification')"
      >UserWithdrawRefundNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserWithdrawRejectNotification')"
      >UserWithdrawRejectNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserWithdrawToPayErrorNotification')"
      >UserWithdrawToPayErrorNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserWithdrawToPayNotification')"
      >UserWithdrawToPayNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserProductCommissionNotification')"
      >UserProductCommissionNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserProductOverNotification')"
      >UserProductOverNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserYesterdayProfitNotification')"
      >UserYesterdayProfitNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserProductCommissionV2Notification')"
      >UserProductCommissionV2Notification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserVipCommissionNotification')"
      >UserVipCommissionNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserAdTaskCommissionNotification')"
      >UserAdTaskCommissionNotification</van-button
    >
    <van-button
      class="bg-error fc-fff font-bold margin-bottom"
      @click="testNotify('UserAdTaskFinishedNotification')"
      >UserAdTaskFinishedNotification</van-button
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
        SIGN_UP_AND_GET_MONEY_NOW: "trở thành đại lý ngay",
        NICK_NAME: "Tên game",
        ENTER_NICK_NAME: "Nhập tên game",
        RANDOM: "Tùy chọn",
        PHONE: "Số điện thoại",
        ENTER_PHONE: "Nhập số điện thoại",
        VERIFY_CODE: "Mã code",
        ENTER_VERIFY_CODE: "Nhập mã code",
        SEND: "Gửi đi",
        PASSWORD: "Mật khẩu",
        ENTER_PASSWORD: "Nhập mật khẩu",
        PASSWORD_AGAIN: "Xác nhận mật khẩu",
        ENTER_PASSWORD_AGAIN: "Nhập lại mật khẩu đã xác nhận",
        REFERRAL_CODE: "Mã mời",
        ENTER_REFERRAL_CODE: "Nhập mã mời",
        SIGN_UP: "Đăng ký",
        HAS_ACCOUNT_SIGN_IN: "Đã có tài khoản, đăng nhập ngay",
        SIGN_IN: "đăng nhập",
        TASK_NUM: "Số lần đại lý",
        DAY_PROFIT: "Doanh thu ngày",
        YEAR_PROFIT: "Doanh thu năm",
        PROMOTE_COMMISSION: "Phần thưởng",
        REST: "Còn lại",
        NOT_LIMIT: "Không giới hạn",
        FINISH_TASK: "Hoàn thành đại lý",
        DO_AGAIN: "Chơi một lần nữa",
        RECEIVE_TASK: "Đại lý ngay",
        WELCOME_TO_PROMOTE_PLATFORM:
          "Chào mừng  bạn đến với nền tảng đại lý toàn dân",
        SHARE_AD_EVERY_DAY_CAN_MAKE_MONEY:
          "Các thương hiệu lớn trên toàn cầu điều tập trung ở đây, hàng ngày đại lý 5 phút sẽ miễn phí nhận được tư cách đại lý. Hãy bắt đầu con đường đại sứ đại lý nhé!",
        GET_FIRST_AWARD_NOW: "kiếm tiền ngay",
        FREE_GET_MONEY: "Miễn phí nhận tiền",
        YEAR: "Năm",
        START_SHARE_MAKE_MONEY: "chia sẻ ngay để kiếm tiền",
        FREE_GET_MONEY_NOW: "Trở thành đại lý ngay",
        CLICK_BTN_AUTO_COPY: "click nút này tự động chia sẻ link",
        COPY: "sao chép",
        CLICK_ICON_SHARE_FRIEND:
          "click hình ảnh dưới đây để chia sẻ cho bạn bè",
        CANCEL: "Hủy",
        LOADING: "Đang tải…..",
        LOAD_FAILED: "lỗi",
        NO_MORE: "Không còn gì nữa",
        CLEAR_ALL_NOTIFY: "Xóa tất cả thông báo ",
        SURE: "Xác nhận",
        SUCCESS_WITHDRAW_N: "Rút tiền thành công {0}",
        INVITED_SOMEONE: "Mời {0}",
        GETTED_N_GIVE: "Nhận được {0}",
        DEPOSIT_N_BALANCE: "Nạp thẻ {0}",
        GETTED_N_PROFIT: "Nhận được {0} doanh thu",
        GETTED_N_AWARD: "Nhận được {0} thu nhập đại lý ",
        OTHER_QUESTION_CONTACT_CS: "Liên lạc chúng tôi",
        DEPOSIT_SUCCESS: "Nạp thẻ thành công",
        DEPOSIT_N_CASH_ARRIVED: "Đã nạp {0} vào tài khoản",
        DO_TASK_MAKE_MONEY: "Đại lý ngay để kiếm tiền",
        BUY_VIP: "Mua VIP",
        YESTERDAY_PROFIT_NOTIFY: "Thông báo doanh thu hôm qua",
        YOU_GOT_COMMISSION_YESTERDAY: "Bạn hôm qua đã kiếm được thu nhập",
        DO_TASK_GET_MORE_AWARD: "Đại lý để nhận được thu nhập nhiều hơn",
        AD_TASK_AWARD_ARRIVED: "Chúc mừng bạn đã nhận được thu nhập đại lý",
        COMMISSION_HAS_ARRIVED: "Tiền phần tram đã vào tài khoản",
        GET_MORE_AWARD: "Nhận được thu nhập nhiều hơn",
        CAN_NOT_GET_COMMISSION: "Không thể nhận tiền",
        CONGRATULATIONS_YOU_GOT_COMMISSION: "Chúc mừng bạn đã nhận được tiền",
        YOUR_FRIEND_FINISH_TASK_LEVEL:
          "LV đại lý đã hoàn thành của bạn{1} LV{0}",
        YOU_CAN_GET_COMMISSION: "Bạn có thể nhận thưởng",
        BECAUSE_YOU_DO_NOT_BUY_VIP: "Vì bạn chưa mua thành viên VIP",
        SO_YOU_CANNOT_GOT_IT: "Cho nên bạn không thể nhận thưởng",
        YOUR_FRIEND_FINISH_TASK: "Bạn {1} LV{0} của bạn đã hoàn thàng nhiệm vụ",
        CONGRATULATIONS_YOU_GOT: "Chúc mừng bạn nhận được",
        BECAUSE_YOUR_VIP_LEVEL_IS: "Vì LV thành viên VIP của bạn là ",
        SO_YOU_ONLY_GET: "Cho nên bạn chỉ có thể nhận được",
        BUY_VIP_GET_ALL_COMMISSION: "Mở thành viên VIP để nhận thưởng",
        UPGRADE_VIP_GET_ALL_COMMISSION:
          "Nâng cấp LV VIP để nhận tất cả phần thường",
        TRANSFER_FAILED: "Chuyển khoản không thành công",
        VIEW_DETAIL: "Xem chi tiết",
        COMMISSION_ARRIVED_NOTIFY: "Thông báo phần thường vào tài khoản",
        YOUR_FRIEND_BUY_VIP_SPEND: "Bạn {1} LV {0} của bạn đã chi",
        BECAUSE_YOU_BUY_VIP_SPEND: "Vì bàn mua thành viên VIP đã chi",
        UPGRADE_VIP: "Nâng cấp thành viên VIP",
        INVITE_FRIEND_GET_MORE_AWARD: "Mời bạn bè để nhận thưởng",
        AWARD_RULE: "Quy định thưởng",
        LOGIN: "Đăng nhập",
        HOME: "Trang chủ",
        VIP: "Thành viên VIP",
        MESSAGE: "Tin nhắn",
        MY: "của mình",
        TAB_MONEY_TASK:
          "Không cần đầu tư cũng có thể kiếm tiền, nhanh chóng hành động nhé! ",
        INSTALL_APP: "Thêm vào màn hình",
        PLEASE_CHECK_NETWORK: "Lỗi, xin kiểm tra lại kết nối mạng",
        INSTALLED_SUCCESSED: "Cài đặt thành công",
        BROWSER_NOT_SUPPORT:
          "Trình duyệt hiện tại không hỗ trợ, vui lòng sử dụng trình duyệt Chrome",
        INVITE_FRIEND_DO_TASK_TOGETHER: "Mời bạn bè cùng làm đại lý",
        ENJOY_FRIEND_YEAR_PROFIT: "hưởng 15% thu nhập đại lý của bạn bè",
        INVITE_FRIEND: "Mời bạn bè",
        FRIEND_FINISH_TASH: "Bạn bè hoàn thành đại lý",
        GET_AWARD: "Đ ược thưởng",
        INVITE_NOW: "Mời ngay",
        MY_TEAM: "Đội ngũ của tôi",
        INVITE_AMOUNT: "Số người đã mời",
        TOTAL_PROFIT: "doanh thu lũy kế",
        INVITE_RULE: "Quy tắc mời bạn bè",
        SHARE_AD_GET_CASH: "Đại lý ngay để kiếm tiền",
        MAKE_MONEY_NOW: "Kiếm tiền ngay",
        SELECT_VIP_LEVEL: "Lựa chọn LV thành viên",
        TASK_PACKAGE: "cambo",
        N_TIMES: "{0} lần",
        PACKAGE_NUM: "Số lượng cambo",
        SELECT_BUY_TIME: "Lựa chọn thời gian muốn mua",
        AVAILABLE: "Số dư khả dụng",
        NEED_PAY: "Phải thanh toán",
        BUY_NOW: "Mua ngay",
        BUY_SUCCESS: "Mua thành công",
        BUY_N_SUCCESS: "Chúc mừng bạn mua {0} thành công",
        BUY_FAILED: "Lỗi",
        ACCOUNT_SHORT_BALANCE: "Số dư tài khoản không đủ",
        TO_DEPOSIT: "Nạp thẻ ngay",
        CLICK_ABOVE_MAKE_MONEY: "Ngày kiếm 1000 siêu đơn giản",
        START_MAKE_MONEY_FREE: "Kiếm tiền ngay",
        VIP_CENTER: "Trung tâm thành viên",
        HELLO_VIP_N: "Đã mua thành viên VIP {0}",
        OWEN_DAY_TASK_AMOUNT: "Số lần đại lý hang ngày đã có",
        NOT_BUY_VIP_N: "Tạm thời chưa mua thành viên VIP {0}",
        DO_TASK_LEVEL: "LV đại lý được nhận",
        VIP_N_AND_BELOW: "VIP {0} và dưới",
        DAY_TASK_NUM: "Số lần đại lý hang ngày",
        PREDICT_DAY_PROFIT: "Dự toán doanh thu ngày",
        PREDICT_MONTH_PROFIT: "Dự toán doanh thu tháng",
        PREDICT_YEAR_PROFIT: "Dự toán doanh thu năm",
        PREDICT_TOTAL_PROFIT: "Dự toán doanh thu tổng",
        N_DAY: "{0} ngày",
        EACH_DAY: "Hàng ngày",
        DO_TASK_NOW: "Đại lý để kiếm tiền ngay",
        ABOUT_US: "Về chúng tôi",
        SEE_MORE: "xem chi tiết",
        DAY_DATA: "Dữ liệu hàng ngày",
        TODAY_PROFIT: "Doanh thu lũy kế ",
        TODAY_TASK: "Số người đã mời",
        TASK_DATA: "Hồ sơ đại lý",
        FREE_TASK_COUNT: "Số lần miễn phí đại lý ",
        TASK_COUNT: "Số lần đại lý ",
        YOU_NOT_BUY_VIP: "Bạn chưa mua thành viên VIP",
        RECOMMEND_TASK: "Giới thiệu",
        MORE_TASK: "xem thêm đại lý khác",
        MESSAGE_CENTER: "Trung tâm tin nhắn",
        READ_ALL: "Toàn bộ đã đọc",
        HELP_CENTER: "Trung tâm hỗ trợ",
        MY_VIP: "Thành viên vip của tôi",
        BUY_AGAIN: "Mua thêm lần nữa",
        NOT_BUY_VIP: "chưa đăng ký thành viên VIP",
        TASK_LEVEL: "LV đại lý được nhận",
        NOT_BUY: "Chưa mua",
        RULES_AND_DESC: "luật chơi và giải thích",
        GET_MORE_PROFIT: "kiếm thu hoạch nhiều hơn",
        MY_WALLET: "Ví tiền của tôi",
        WALLET_HISTORY: "Thông tin thu chi",
        ACCOUNT_BALANCE: "Số dư tài khoản",
        WITHDRAW_WEB: "Rút tiền",
        TOTAL_EARNINGS: "Thu hoạch lũy kế ",
        DEPOSIT_WEB: "Nạp tiền ",
        MY_TASKS: "Đại lý của tôi",
        ALL_TASKS: "Toàn bộ đại lý",
        INPROGRESS: "đang tiến hành",
        CHECKING: "đang thẩm duyệt",
        FINISHED: "đã hoàn thành",
        BUY_VIP_GET_MORE_PROFIT:
          "Đăng ký thành viên có thể nhận nhiệm vụ đại lý độc hưởng lãi cao",
        HIGH_LEVEL_HIGH_GAINED: "LV càng cao, kiếm được càng nhiều",
        INVITE_FRIEND_TOGETHER: "Mời bạn bề cùng kiềm tiền",
        RANKING: "Bảng xếp hạng",
        CONTACT_US: "Liên lạc chúng tôi",
        HELP: "Trung tâm hỗ trợ",
        TASK_CENTER: "Trung tâm đại lý",
        MY_TASK: "Đại lý của tôi",
        ALL: "Tất cả",
        FREE: "Miễn phí",
        I_SEE: "Tôi đã biết",
        TASKS_GUIDE_TITLE1: "đây có thể xem nhiều loại nhiệm vụ đại lý ",
        TASKS_GUIDE_DESC1:
          "LV của nhiệm vụ đại lý càng cao, giải thưởng càng phong phú",
        TASK_DETAIL: "Chi tiết về đại lý",
        TASK_AWARD: "Thu nhập đại lý",
        TOTAL_TASK: "Số lượng đại lý",
        REST_TASK: "Số lượng đại lý còn lại",
        TASK_TIME: "thời gian của nhiệm vụ đại lý",
        TASK_IS_ENDED: "Nhiệm vụ đại lý đã kết thúc ",
        TASK_DESC: "Mô tả nhiệm vụ đại lý",
        TASK_REQUIREMENTS: "Yêu cầu đại lý",
        TASK_REQUIREMENTS_CONTENT_N_CLICK:
          "sau khi hoàn thành chia sẻ có {0} bạn bè án đường link thì là hoàn thành nhiệm vụ, giải thưởng sẽ tự động gửi vào tài khoản của bạn",
        TASK_STEPS: "Các bước đại lý nhiệm vụ",
        CLICK_RECEIVE_TASK: "Nhấn nút dưới đây bắt đầu đại lý",
        HAS_RECEIVED: "Đang đại lý …….. ",
        COPY_SHARE_TEXT: "Copy đường link đại lý của bạn",
        MANUAL_CONTROL_TO_SHARE:
          "thủ công hoặc clip nút chia sẻ của whatsapp FB v.v…để chia sẻ",
        CLICK_TO_QUICK_SHARE: "clip nút này để nhanh chóng chia sẻ cho bạn bè",
        TASK_AUTO_FINISHED_N_FRIEND:
          "Sau khi chia sẻ, có {0} bạn bè ấn và xem sẽ tự động nhận được tiền thưởng ",
        TASK_END_COUNT_DOWN: "Đếm ngược kết thúc nhiệm vụ",
        CAN_GET_AWARD: "Có thể nhận được tiền thưởng",
        TIP_LET_YOUR_FRIEND_CLICK_YOUR_LINK:
          "Lời nhắc nhờ: cho bạn bè xem các nội dung bạn chia sẻ thìcó thể nhanh chóng nhận được tiền thưởng",
        DO_OTHER_GET_MORE_PROFIT: "Tôi muốn đại lý nhiều thương hiệu hơn",
        RECEIVE_SUCCESS: "Đã bắt đầu nhiệm vụ đại lý",
        FINISHED_TASK_CAN_GET_N:
          "Hoàn thành nhiệm vụ đại lý có thể nhận được {0}",
        CONTINUE: "Tiếp tục",
        SO_SORRY: "Xin lỗi",
        CURRENT_TASK_ONLY_VIP_N:
          "nâng cấp đến LV {0} sẽ được đại lý thương hiệu này",
        UPGRADE_VIP_N_GET_MORE_MONEY: "lấy tư cách đại lý lv {0} ngay",
        TASK_COUNT_SHORT: "Số lần nhiệm vụ được nhận không đủ  ",
        TASK_COUNT_SHORT_THAN_CONTINUE:
          "Số lần nhận nhiệm vụ không đủ, mua thêm để tiếp tục.",
        BUY_COUNT: "Số lần mua",
        TASK_EXPIRED: "Đại lý đã qua thời hạn",
        PLEASE_FINISH_TASK_ON_TIME:
          "Hãy hoàn thành nhiệm vụ đại lý trong thời gian quy định ",
        RECEIVE_AGAIN: "Đại lý lại",
        NOT_TASK: "Tạm thời chưa có thương hiệu này",
        NEXT: "Bước tiếp theo",
        PREVOUS: "Bước trên ",
        JUMP: "Bỏ qua",
        TASK_DETAIL_GUIDE_TITLE1:
          "đây là số lần nhiệm vụ đại lý được nhận và chi tiết của giải thưởng",
        TASK_DETAIL_GUIDE_TITLE2: "Bước 1, ấn nút có thể nhận nhiệm vụ ngay",
        TASK_DETAIL_GUIDE_TITLE3: "Bước thứ 2",
        TASK_DETAIL_GUIDE_TITLE4:
          "Bước thứ 3, chia sẻ link đại lý của bạn cho bạn bè, dán vào là được.",
        TASK_DETAIL_GUIDE_TITLE5:
          "Đại lý có thời gian hạn chế nhé, một người cilp link của bạn thì có thể giúp bạn trở thành đại sứ hình tượng của đại lý, miễn phí nhận giải thưởng đại lý của bạn",
        OFFICIAL_ACCOUNT:
          "chuyển khoản ngân hàng vào tài khoản chỉ định của 60s",
        RECEIVER_NAME: "Tên người nhận tiền",
        RECEIVER_ACCOUNT: "Tài khoản nhận tiền",
        RECEIVER_BANK: "Tên đầy đủ ngân hàng mở tài khoản",
        UPLOAD_TIP:
          "chuyển khoản theo thông tin nêu trên và chụp hình lại hình ảnh chuyển khoản, sau khi chuyển khoản thành công nộp thẩm duyệt tại ghi chếp gửi tiền, số tiền chuyển khoản ít nhất là {0} ",
        FILL_USER_INFO: "Điền thông tin người dùng",
        FULLNAME_OF_BANK: "Tên đầy đủ ngân hàng mở tài khoản",
        ENTER_FULLNAME_OF_BANK: "Nhập tên đầy đủ ngân hàng mở tài khoản",
        TRANSFER_NAME: "Tên người chuyển khoản",
        ENTER_TRANSFER_NAME: "Nhập tên người chuyển khoản",
        TRANSFER_ACCOUNT: "Tài khoản của người chuyển khoản",
        ENTER_TRANSFER_ACCOUNT: "Nhập tài khoản của người chuyển khoản",
        TRANSFER_AMOUNT: "Số tiền chuyển khoản  ",
        ENTER_TRANSFER_AMOUNT: "Nhập số tiền chuyển khoản ",
        TRANSFER_TIME: "Thời gian chuyển khoản",
        SELECT_TRANSFER_TIME: "Chọn thời gian chuyển khoản",
        TRANSFER_CERTIFICATION: "Bằng chứng chuyển khoản",
        SEE_DEMO: "Xem mẫu ví dụ",
        SUBMIT_USER_INFO_CERTIFICATION: "Cung cấp bằng chứng chuyển khoản",
        SUBMIT_SUCCESS: "Hồ sơ chuyển khoản của bạn đã nộp",
        ABOUT_5_MINS_ARRIVE:
          "Nó dự kiến sẽ đến trong vài phút 1-5, xin vui lòng kiên nhẫn chờ đợi",
        CONTACT_CUSTOM_SERVICE_QUICKLY:
          "Liên lạc nhân viên chắm sóc khách hàng ",
        SEE_DEPOSIT_DETAIL: "Kiểm tra thông tin tài khoản",
        BANK_CHANNEL_UNAVAILABLE:
          "Chuyển khoản ngân hàng tạm thời không khả dụng",
        ENTER_TRANSFEROR_NAME_AGAIN:
          "Vui lòng nhập lại tên người thanh toán của bạn",
        ENTER_TRANSFEROR_ACCOUNT_AGAIN:
          "Vui lòng nhập lại tài khoản người chuyển tiền của bạn",
        TRANSFER_AMOUNT_CANT_LESS_THAN_MIN:
          "Số tiền chuyển khoản không được thấp hơn ()",
        ORDER_DETAIL: "Chi tiết đơn hàng ",
        ORDER_PAYING: "Đơn hàng đang xử lý",
        PLEASE_WAIT: "Xin vui lòng chờ giây lát",
        BACK_HOME: "Quay về trang chủ",
        QUERYING_ORDER: "Đang tra cứu đơn hàng",
        SEARCH_ORDER_NO_RESULT:
          "Tạm thời chưa tìm thấy đơn hang, xin vui lòng thử lại sau",
        HISTORY: "Lịch sử",
        SELECT_PAYMENT: "Lựa chọn phương thức chuyển khoản",
        DEPOSIT_AMOUNT: "Số tiền nạp thẻ",
        ENTER_DEPOSIT_AMOUNT: "Nhập số tiền nạp thẻ",
        PAY_NOW: "thanh toán ngay",
        HOW_TO_PAY: "Cách thanh toán như nào ",
        SELECT_BANK: "lựa chọn ngân hàng",
        MIN_DEPOSIT: "Mức nạp tiền thấp nhất",
        MAX_DEPOSIT: "Mức nạp tiền cao nhất",
        NO_DEPOSIT_CHANNEL: "Tạm thời không có kênh nạp tiền",
        NO_QUICK_CHANNEL: "Tạm thời không có kênh nạp tiền nhanh",
        MIN_DEPOSIT_N: "Mức nạp tiền thấp nhất là {0}",
        MAX_DEPOSIT_N: "Mức nạp tiền cao nhất là {0}",
        PROFIT_RANKING: "Bảng xếp hạng thu hoạch",
        SUCCESS_DEPOSIT_IN_N_TO_BALANCE: "Nạp tiền thành công, số dư là {0}",
        FINISH: "Hoàn thành",
        DEPOSIT_FAILED: "Nạp tiền không thành công",
        DEPOSIT_NOT_ARRIVE: "Tiền chưa vào tài khoản",
        CONTACT_CS: "Liên lạc nhân viên chăm sóc khách hàng",
        LATEST_3_MONTH: "Lịch sử 3 tháng gần đây",
        PROMOTE_BEGINNER_DESC:
          "Hoạt động cho một thương hiệu có thể được thưởng, với ngưỡng thấp và rút tiền mặt nhanh chóng",
        HAS_BEEN_CLAIMED: "Đã được nhận",
        N_USER_JOINED: "Đã tham gia ",
        PEOPLE: "Người",
        ENTER_YOUR_TELEPHONE: "Nhập số điện thoại của bạn",
        SET_YOUR_PASSWORD: "Cài đặt mật khẩu của bạn",
        GET_CASH_NOW: "Nhận tiền mặt trong giây lát",
        REG_NOW_GET_MONEY: "Bắt đầu nhận tiền ngay",
        IS_GETTING: "Đang nhận",
        TEAM_MEMBERS: "Số người trong đội ngũ ",
        TOTAL_CONTRIBUTE: "Lũy kế đóng góp",
        TEAM_LIST: "Danh sách đội ngũ",
        N_LEVEL_FRIEND: "Bạn bè lv {0}",
        CONTRIBUTE_AMOUNT: "Số tiền đã đóng góp ",
        CAN_NOT_WITHDRAW_WAIT:
          "Tạm thời gian không thể rút tiền, xin vui lòng chờ trong giây phút",
        BACK: "Quay lại",
        WITHDRAW_AMOUNT: "Số tiền được rút",
        AVAILABLE_BALANCE: "Số tiền còn lại",
        ENTER_WITHDRAW_AMOUNT: "Nhập số tiền cần rút",
        SELECT_WITHDRAW_WAY: "Chọn phương thức rút tiền",
        MIN_WITHDRAW: "Mức rút thấp nhất",
        MAX_WITHDRAW: "Mức rút cao nhất",
        WITHHDRAW_FEE: "Phí thủ tục",
        TOTAL_DEDUCE_AMOUNT: "Tổng phí khẩu trừ",
        NEXT_STEP: "Bước tiếp theo",
        ESTIMATED_ARRIVE:
          "Dự kiến phút đến tài khoản của bạn, xin vui lòng chờ trong giây phút",
        WITHDRAW_SURE: "Xác nhận rút tiền",
        WILL_DEDUCE_N_GIFT_MONEY: "Phí trải nghiệm {0} sẽ được khấu trừ",
        GIFT_BALANCE: "Số tiền còn lại của tiền được tặng",
        PLEASE_FILL_ALL_ACCOUNT_INFO:
          "Vui lòng điền đầy đủ thông tin thanh toán",
        AFTER_RECEIVE_TASK_N_HOURS:
          "Sau khi bắt đầu nhiệm vụ đại lý, xin hãy chia sẽ trong {0} giờ và ấn nút dưới bắt đầu sao chép",
        CLICKED_NUM: "Số lần đã click",
        BECAUSE_YOU_VIP_LEVEL_IS: "Vì LV VIP của bạn là",
        YOUR_FRIEND_BUY_VIP_N: "Bạn LV {0} của bạn đã mua thành viên VIP (1)",
        WAIT_CHECK_TO_ARRIVE:
          "Xin bạn vui lòng chờ đợi một chút, của bạn sẽ được nhận khoản sau khi được xác nhận",
        CHECK_TIME_WEEKDAY: "Thời gian xác nhận: 09:00-24:00 của ngày làm việc",
        PLEASE_CONTACT_US:
          "Xin liên lạc chăm sóc khách hàng để nhận tiền nhanh",
        ARRIVE_AT: "Thời gian nhận tiền",
      };

      for (let k of Object.keys(lang_map)) {
        this.$http
          .post("v1/updateLang", {
            slug: k,
            content: lang_map[k],
            local: "VI",
          })
          .then((res) => {})
          .catch((err) => {
            console.log("update failed:", err);
          });
      }
    },
    testNotify(type) {
      this.$http
        .get("v1/testNtf", {
          params: {
            type: type,
          },
        })
        .then((res) => {
          console.log(JSON.stringify(res));
        })
        .catch((err) => {
          Toast.failed(err.data.message);
        });
    },
  },
};
</script>

<style lang="scss">
.tool-page {
  min-height: 100vh;
}
</style>
