import http from "./axios"

let lang_map =
{
    "SIGN_UP_AND_GET_MONEY_NOW": "立即成为代理人",
    "NICK_NAME": "昵称",
    "ENTER_NICK_NAME": "请输入昵称",
    "RANDOM": "随机",
    "PHONE": "手机号",
    "ENTER_PHONE": "请输入手机号",
    "VERIFY_CODE": "验证码",
    "ENTER_VERIFY_CODE": "请输入验证码",
    "SEND": "发送",
    "PASSWORD": "密码",
    "ENTER_PASSWORD": "请输入密码",
    "PASSWORD_AGAIN": "确认密码",
    "ENTER_PASSWORD_AGAIN": "请输入确认密码",
    "REFERRAL_CODE": "邀请码",
    "ENTER_REFERRAL_CODE": "请输入邀请码",
    "SIGN_UP": "注册",
    "HAS_ACCOUNT_SIGN_IN": "已有账号，登录",
    "SIGN_IN": "登录",
    "TASK_NUM": "代理次数",
    "DAY_PROFIT": "日收益",
    "YEAR_PROFIT": "年收益",
    "PROMOTE_COMMISSION": "奖励",
    "REST": "剩余",
    "NOT_LIMIT": "无限制",
    "FINISH_TASK": "完成代理",
    "DO_AGAIN": "再做一次",
    "RECEIVE_TASK": "立刻代理",
    "WELCOME_TO_PROMOTE_PLATFORM": "欢迎来到全民代理平台",
    "SHARE_AD_EVERY_DAY_CAN_MAKE_MONEY": "全球各大知名品牌商都集中在这里，每天代理5分钟，即可获得免费代理权的资格。赶紧开始代理推广大使之旅吧！",
    "GET_FIRST_AWARD_NOW": "立刻开始赚第一桶金",
    "FREE_GET_MONEY": "免费领钱",
    "YEAR": "年",
    "START_SHARE_MAKE_MONEY": "立刻开始分享赚钱",
    "FREE_GET_MONEY_NOW": "立即成为代理人",
    "CLICK_BTN_AUTO_COPY": "点击按钮自动复制分享链接",
    "COPY": "复制",
    "CLICK_ICON_SHARE_FRIEND": "点击下方图标分享给好友",
    "CANCEL": "取消",
    "LOADING": "加载中...",
    "LOAD_FAILED": "加载失败",
    "NO_MORE": "没有更多",
    "CLEAR_ALL_NOTIFY": "清理所有通知",
    "SURE": "确认",
    "SUCCESS_WITHDRAW_N": "成功提现{0}",
    "INVITED_SOMEONE": "邀请{0}",
    "GETTED_N_GIVE": "获得{0}",
    "DEPOSIT_N_BALANCE": "充值{0}",
    "GETTED_N_PROFIT": "获得{0}收益",
    "GETTED_N_AWARD": "获得{0}代理收入",
    "OTHER_QUESTION_CONTACT_CS": "联系我们",
    "DEPOSIT_SUCCESS": "充值成功",
    "DEPOSIT_N_CASH_ARRIVED": "充值{0}已到账!",
    "DO_TASK_MAKE_MONEY": "立即代理赚钱",
    "BUY_VIP": "购买VIP",
    "YESTERDAY_PROFIT_NOTIFY": "昨日收益通知",
    "YOU_GOT_COMMISSION_YESTERDAY": "您昨日获得了收入",
    "DO_TASK_GET_MORE_AWARD": "代理获得更多收入",
    "AD_TASK_AWARD_ARRIVED": "恭喜您获得代理收入",
    "COMMISSION_HAS_ARRIVED": "佣金已到账",
    "GET_MORE_AWARD": "获取更多收入",
    "CAN_NOT_GET_COMMISSION": "无法获得收入",
    "CONGRATULATIONS_YOU_GOT_COMMISSION": "恭喜您获得了收入",
    "YOUR_FRIEND_FINISH_TASK_LEVEL": "您的{0}级好友{1}完成的代理级别",
    "YOU_CAN_GET_COMMISSION": "您可获得奖励",
    "BECAUSE_YOU_DO_NOT_BUY_VIP": "由于您没有购买VIP",
    "SO_YOU_CANNOT_GOT_IT": "所以您无法获得奖励",
    "YOUR_FRIEND_FINISH_TASK": "您的{0}级好友{1}完成了任务",
    "CONGRATULATIONS_YOU_GOT": "恭喜您获得了",
    "BECAUSE_YOUR_VIP_LEVEL_IS": "由于您的VIP等级是",
    "SO_YOU_ONLY_GET": "所以您只能获得",
    "BUY_VIP_GET_ALL_COMMISSION": "开通VIP领取奖励",
    "UPGRADE_VIP_GET_ALL_COMMISSION": "升级VIP领取全部奖励",
    "TRANSFER_FAILED": "转账失败",
    "VIEW_DETAIL": "查看详情",
    "COMMISSION_ARRIVED_NOTIFY": "奖励到账通知",
    "YOUR_FRIEND_BUY_VIP_SPEND": "您的{0}级好友{1}购买VIP花费了",
    "BECAUSE_YOU_BUY_VIP_SPEND": "由于您购买VIP总共消费",
    "UPGRADE_VIP": "升级VIP",
    "INVITE_FRIEND_GET_MORE_AWARD": "邀请好友获取更多奖励",
    "AWARD_RULE": "奖励规则",
    "LOGIN": "登录",
    "HOME": "首页",
    "VIP": "VIP",
    "MESSAGE": "消息",
    "MY": "我的",
    "TAB_MONEY_TASK": "0投资就可赚钱，快快行动吧！",
    "INSTALL_APP": "添加到主屏幕",
    "PLEASE_CHECK_NETWORK": "加载失败，请检查网络连接",
    "INSTALLED_SUCCESSED": "安装成功",
    "BROWSER_NOT_SUPPORT": "当前浏览器不支持，请使用Chrome浏览器",
    "INVITE_FRIEND_DO_TASK_TOGETHER": "邀请好友一起代理",
    "ENJOY_FRIEND_YEAR_PROFIT": "享受好友15%代理收入",
    "INVITE_FRIEND": "邀请好友",
    "FRIEND_FINISH_TASH": "好友完成代理",
    "GET_AWARD": "获得奖励",
    "INVITE_NOW": "立即邀请",
    "MY_TEAM": "我的团队",
    "INVITE_AMOUNT": "邀请人数",
    "TOTAL_PROFIT": "累计收益",
    "INVITE_RULE": "邀请规则",
    "SHARE_AD_GET_CASH": "立即代理赚钱",
    "MAKE_MONEY_NOW": "立即赚钱",
    "SELECT_VIP_LEVEL": "选择会员等级",
    "TASK_PACKAGE": "套餐",
    "N_TIMES": "{0}次",
    "PACKAGE_NUM": "套餐数量",
    "SELECT_BUY_TIME": "选择购买时长",
    "AVAILABLE": "可用余额",
    "NEED_PAY": "需支付",
    "BUY_NOW": "立即购买",
    "BUY_SUCCESS": "购买成功",
    "BUY_N_SUCCESS": "恭喜你成功购买{0}!",
    "BUY_FAILED": "购买失败",
    "ACCOUNT_SHORT_BALANCE": "账户可用余额不足",
    "TO_DEPOSIT": "立即充值",
    "CLICK_ABOVE_MAKE_MONEY": "日赚1000超简单",
    "START_MAKE_MONEY_FREE": "立刻赚钱",
    "VIP_CENTER": "会员中心",
    "HELLO_VIP_N": "已购买 VIP{0}!",
    "OWEN_DAY_TASK_AMOUNT": "已拥有每日代理次数",
    "NOT_BUY_VIP_N": "暂未购买 VIP{0}",
    "DO_TASK_LEVEL": "可接代理等级",
    "VIP_N_AND_BELOW": "VIP{0}及以下",
    "DAY_TASK_NUM": "每日代理次数",
    "PREDICT_DAY_PROFIT": "预估日收益",
    "PREDICT_MONTH_PROFIT": "预估月收益",
    "PREDICT_YEAR_PROFIT": "预估年收益",
    "PREDICT_TOTAL_PROFIT": "预估总收益",
    "N_DAY": "{0}天",
    "EACH_DAY": "每天",
    "DO_TASK_NOW": "立即代理赚钱",
    "ABOUT_US": "关于我们",
    "SEE_MORE": "查看更多",
    "DAY_DATA": "每日数据",
    "TODAY_PROFIT": "累计收益",
    "TODAY_TASK": "邀请人数",
    "TASK_DATA": "代理数据",
    "FREE_TASK_COUNT": "免费代理次数",
    "TASK_COUNT": "代理次数",
    "YOU_NOT_BUY_VIP": "您暂未购买VIP",
    "RECOMMEND_TASK": "推荐",
    "MORE_TASK": "更多代理",
    "MESSAGE_CENTER": "消息中心",
    "READ_ALL": "全部已读",
    "HELP_CENTER": "帮助中心",
    "MY_VIP": "我的VIP",
    "BUY_AGAIN": "叠加购买",
    "NOT_BUY_VIP": "未开通VIP",
    "TASK_LEVEL": "可接取代理等级",
    "NOT_BUY": "未购买",
    "RULES_AND_DESC": "规则与说明",
    "GET_MORE_PROFIT": "赚取更多收益",
    "MY_WALLET": "我的钱包",
    "WALLET_HISTORY": "收支记录",
    "ACCOUNT_BALANCE": "账户余额",
    "WITHDRAW_WEB": "提现",
    "TOTAL_EARNINGS": "累计收益",
    "DEPOSIT_WEB": "充值",
    "MY_TASKS": "我的代理",
    "ALL_TASKS": "全部代理",
    "INPROGRESS": "进行中",
    "CHECKING": "审核中",
    "FINISHED": "已完成",
    "BUY_VIP_GET_MORE_PROFIT": "开通会员可接取专享高额代理任务",
    "HIGH_LEVEL_HIGH_GAINED": "等级越高,赚的越多",
    "INVITE_FRIEND_TOGETHER": "邀请好友一起赚",
    "RANKING": "排行榜",
    "CONTACT_US": "联系我们",
    "HELP": "帮助中心",
    "TASK_CENTER": "代理中心",
    "MY_TASK": "我的代理",
    "ALL": "全部",
    "FREE": "免费",
    "I_SEE": "我知道了",
    "TASKS_GUIDE_TITLE1": "这里可以查看不同等级的代理任务",
    "TASKS_GUIDE_DESC1": "代理任务的等级越高,奖励就越丰厚",
    "TASK_DETAIL": "代理详情",
    "TASK_AWARD": "代理收入",
    "TOTAL_TASK": "总代理次数",
    "REST_TASK": "剩余代理次数",
    "TASK_TIME": "代理任务时间",
    "TASK_IS_ENDED": "代理任务已结束",
    "TASK_DESC": "代理任务描述",
    "TASK_REQUIREMENTS": "代理要求",
    "TASK_REQUIREMENTS_CONTENT_N_CLICK": "分享完成之后{0}个有效好友点击链接即可完成任务，奖励将自动发放到您的账户",
    "TASK_REQUIREMENTS_CONTENT": "分享完成之后{0}个有效好友点击链接即可完成任务，奖励将自动发放到您的账户",
    "TASK_STEPS": "代理任务步骤",
    "CLICK_RECEIVE_TASK": "点击下方按钮开始代理",
    "HAS_RECEIVED": "正在代理...",
    "COPY_SHARE_TEXT": "复制您的专属代理链接",
    "MANUAL_CONTROL_TO_SHARE": "手动或点击 whatsaapp fb等一键分享图标进行 分享。",
    "CLICK_TO_QUICK_SHARE": "点击图标快速分享给朋友",
    "TASK_AUTO_FINISHED_N_FRIEND": "分享后，有{0}个好友点击观看即可自动获取奖金。",
    "TASK_END_COUNT_DOWN": "任务结束倒计时",
    "CAN_GET_AWARD": "可获得奖金",
    "TIP_LET_YOUR_FRIEND_CLICK_YOUR_LINK": "温馨提示：让您的好友浏览下您分享过去的内容链接，即可快速获得奖金",
    "DO_OTHER_GET_MORE_PROFIT": "我要代理更多品牌",
    "RECEIVE_SUCCESS": "代理任务开始了",
    "FINISHED_TASK_CAN_GET_N": "完成代理任务可获得{0}",
    "CONTINUE": "继续",
    "SO_SORRY": "很抱歉",
    "CURRENT_TASK_ONLY_VIP_N": "升级到Lv{0}即可代理该品牌",
    "UPGRADE_VIP_N_GET_MORE_MONEY": "立即获得Lv{0}资格",
    "TASK_COUNT_SHORT": "接取代理任务次数不足",
    "TASK_COUNT_SHORT_THAN_CONTINUE": "接取代理任务次数不足，购买次数继续",
    "BUY_COUNT": "购买次数",
    "TASK_EXPIRED": "代理超时",
    "PLEASE_FINISH_TASK_ON_TIME": "请在规定时间内完成代理任务",
    "RECEIVE_AGAIN": "重新代理",
    "NOT_TASK": "暂无此品牌",
    "NEXT": "下一步",
    "PREVOUS": "上一步",
    "JUMP": "跳过",
    "TASK_DETAIL_GUIDE_TITLE1": "这里是代理的任务次数和奖励明细",
    "TASK_DETAIL_GUIDE_TITLE2": "第一步，点击按钮即可领取代理任务",
    "TASK_DETAIL_GUIDE_TITLE3": "第二步",
    "TASK_DETAIL_GUIDE_TITLE4": "第三步，将您的专属代理链接通过社交媒体软件分享给您的好友 (粘贴即可).",
    "TASK_DETAIL_GUIDE_TITLE5": "代理是有时间限制的哦！’1个好友点击链接即可助力你成为代理形象大使，免费领取你的代理奖励",
    "OFFICIAL_ACCOUNT": "银行转账官方指定账号",
    "RECEIVER_NAME": "收款人姓名",
    "RECEIVER_ACCOUNT": "收款人账户",
    "RECEIVER_BANK": "开户行全称",
    "UPLOAD_TIP": "请按照上述信息汇款并保留汇款截图，汇款成功后在存款记录中提交审核，最低汇款金额为{0}",
    "FILL_USER_INFO": "填写用户资料",
    "FULLNAME_OF_BANK": "开户行全称",
    "ENTER_FULLNAME_OF_BANK": "请输入开户行全称",
    "TRANSFER_NAME": "汇款人姓名",
    "ENTER_TRANSFER_NAME": "请输入汇款人姓名",
    "TRANSFER_ACCOUNT": "汇款人账户",
    "ENTER_TRANSFER_ACCOUNT": "请输入汇款人账户",
    "TRANSFER_AMOUNT": "汇款金额",
    "ENTER_TRANSFER_AMOUNT": "请输入汇款金额",
    "TRANSFER_TIME": "汇款时间",
    "SELECT_TRANSFER_TIME": "请选择汇款时间",
    "TRANSFER_CERTIFICATION": "汇款凭证",
    "SEE_DEMO": "查看示例",
    "SUBMIT_USER_INFO_CERTIFICATION": "提交转账凭证",
    "SUBMIT_SUCCESS": "您的汇款记录已提交",
    "ABOUT_5_MINS_ARRIVE": "预计1-5分钟到账，请您耐心等待",
    "CONTACT_CUSTOM_SERVICE_QUICKLY": "联系客服",
    "SEE_DEPOSIT_DETAIL": "查看存款明细",
    "BANK_CHANNEL_UNAVAILABLE": "银行户口转账暂不可用",
    "ENTER_TRANSFEROR_NAME_AGAIN": "请重新输入您的汇款人姓名",
    "ENTER_TRANSFEROR_ACCOUNT_AGAIN": "请重新输入您的汇款人账号",
    "TRANSFER_AMOUNT_CANT_LESS_THAN_MIN": "汇款金额不能低于{0}",
    "ORDER_DETAIL": "订单详情",
    "ORDER_PAYING": "订单处理中",
    "PLEASE_WAIT": "请稍候",
    "BACK_HOME": "回到首页",
    "QUERYING_ORDER": "正在查询订单",
    "SEARCH_ORDER_NO_RESULT": "暂未查询到订单,请稍候再试",
    "HISTORY": "记录",
    "SELECT_PAYMENT": "选择充值方式",
    "DEPOSIT_AMOUNT": "充值金额",
    "ENTER_DEPOSIT_AMOUNT": "请输入充值金额",
    "PAY_NOW": "立即支付",
    "HOW_TO_PAY": "如何支付",
    "SELECT_BANK": "选择银行",
    "MIN_DEPOSIT": "最低充值金额",
    "MAX_DEPOSIT": "最高充值金额",
    "NO_DEPOSIT_CHANNEL": "暂无可用充值渠道",
    "NO_QUICK_CHANNEL": "暂无可用快捷支付渠道",
    "MIN_DEPOSIT_N": "最低充值金额为{0}",
    "MAX_DEPOSIT_N": "最高充值金额为{0}",
    "PROFIT_RANKING": "收益排行榜",
    "SUCCESS_DEPOSIT_IN_N_TO_BALANCE": "成功充值 {0} 余额",
    "FINISH": "完成",
    "DEPOSIT_FAILED": "充值失败",
    "DEPOSIT_NOT_ARRIVE": "充值未到账",
    "CONTACT_CS": "联系客服",
    "LATEST_3_MONTH": "最近三个月记录",
    "PROMOTE_BEGINNER_DESC": "代理一个品牌即可获得 $20, 门槛低, 秒提现",
    "HAS_BEEN_CLAIMED": "已被领取",
    "N_USER_JOINED": "已参与",
    "PEOPLE": "人",
    "ENTER_YOUR_TELEPHONE": "输入您的手机号码",
    "SET_YOUR_PASSWORD": "设置您的账号密码",
    "GET_CASH_NOW": "秒拿现金",
    "REG_NOW_GET_MONEY": "立即开始领钱",
    "IS_GETTING": "正在领取中",
    "TEAM_MEMBERS": "团队人数",
    "TOTAL_CONTRIBUTE": "累计贡献",
    "TEAM_LIST": "团队列表",
    "N_LEVEL_FRIEND": "{0}级好友",
    "CONTRIBUTE_AMOUNT": "贡献金额",
    "CAN_NOT_WITHDRAW_WAIT": "暂时无法提现，请稍候",
    "BACK": "返回",
    "WITHDRAW_AMOUNT": "提现金额",
    "AVAILABLE_BALANCE": "可用余额",
    "ENTER_WITHDRAW_AMOUNT": "请输入提现金额",
    "SELECT_WITHDRAW_WAY": "选择提现方式",
    "MIN_WITHDRAW": "最低提现金额",
    "MAX_WITHDRAW": "最高提现金额",
    "WITHHDRAW_FEE": "提现手续费",
    "TOTAL_DEDUCE_AMOUNT": "合计扣费金额",
    "NEXT_STEP": "下一步",
    "ESTIMATED_ARRIVE": "预计1-5分钟到账,请您耐心等待！",
    "WITHDRAW_SURE": "提现确认",
    "WILL_DEDUCE_N_GIFT_MONEY": "将扣除{0}赠送金",
    "GIFT_BALANCE": "赠送金余额",
    "PLEASE_FILL_ALL_ACCOUNT_INFO": "请将收款信息填写完整",
    "AFTER_RECEIVE_TASK_N_HOURS": "开始代理任务后，请在{0}个小时内进行分享，点击下方按钮进行复制",
    "CLICKED_NUM": "已点击次数",
    "BECAUSE_YOU_VIP_LEVEL_IS": "由于您的VIP等级是",
    "YOUR_FRIEND_BUY_VIP_N": "您的{0}级好友购买了VIP{1}",
    "WAIT_CHECK_TO_ARRIVE": "请耐心等待,审核后会自动入账",
    "CHECK_TIME_WEEKDAY": "审核时间: 工作日 9:00 - 24:00",
    "PLEASE_CONTACT_US": "请联系客服快速入账",
    "ARRIVE_AT": "到账时间",
    "YOU_RE_FREE_VIP_NOW": "普通会员"
}

let lang_backend =
{
    "ACC_NAME": "持卡人姓名",
    "ACC_NO": "银行卡号",
    "AWARD": "奖励",
    "BALANCE": "余额",
    "BUY": "购买",
    "COMMISSION": "手续费",
    "DEDUCT": "扣除",
    "DEPOSIT": "存款",
    "GIVE": "赠送",
    "INTEREST": "利益",
    "OTHER": "其他",
    "RECHARGE": "充值",
    "REFUND": "退款",
    "SUCCESS": "成功",
    "TAKEOUT": "取出",
    "TRANSFORM": "转账",
    "WITHDRAW": "提现",
    "ARGS_ERROR": "参数错误",
    "TASK_NOT_COMPLETED": "存在未完成任务无法重复接取",
    "NO_MORE_TAST_COUNT": "广告任务可接数量不足",
    "TODAY_TASK_UPPER_LIMIT": "当前广告今日完成数量已达上限",
    "TOTAL_TASK_UPPER_LIMIT": "当前广告总完成数量已达上限",
    "PHONE_EXISTED": "手机号码已存在",
    "PHONE_ERROR": "手机号码错误",
    "USER_EXCEPTION": "用户异常",
    "INVITER_NOT_EXIST": "邀请人不存在",
    "PRODUCT_EXPIRATION_NOTICE": "产品到期通知",
    "NO_MORE_ADVERTISE_COUNT": "可接广告次数不足",
    "COMMISSION_ARRIVALED": "广告任务佣金到账通知",
    "COMMISSION_CAN_NOT_GET_NOTICE": "广告任务佣金无法获得通知",
    "PART_COMMISSION_ARRIVALED": "广告任务佣金部分到账通知",
    "TASK_COMPLETED_AWARD_ARRIVALED": "广告任务完成奖励到账通知",
    "WITHDRAW_CLOSED": "提现通道关闭",
    "CAN_NOT_BUY": "无法购买",
    "CAN_NOT_DOWNGRADE": "无法降级",
    "TEST_NOTICE": "测试通知奖励",
    "MAX_STACKS_EXCEEDED": "超出最大叠加数量",
    "TASK_REQUIREMENTS_CONTENT": "代理商规则：代理商希望获得更多收入。 必须与朋友分享特殊链接 在指定的时间内完成工作 将获得额外的收入 奖励将自动计入您的帐户。",
    "IMMEDIATELY_COMPLETE_TASK": "现在去做",
    "COPY_SUCCESS": "复制成功",
    "COPY_FAILED": "复制失败"
}



const importOne = function (path, describe) {
    http.post('v1/importLang', {
        name: describe,
        slug: path,
        type: 'client',
        group: 'Client'
    }).catch(err => {
        console.log('import lang error:', err)
    })
}

const importBackend = function (path, describe) {
    http.post('v1/importLang', {
        name: describe,
        slug: path,
        type: 'serve',
        group: 'Backend'
    }).catch(err => {
        console.log('import lang error:', err)
    })
}

export function importAll() {
    for (let k of Object.keys(lang_map)) {
        importOne(k, lang_map[k])
    }
    for (let k of Object.keys(lang_backend)) {
        importBackend(k, lang_backend[k])
    }
}
