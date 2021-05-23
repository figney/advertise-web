let lang_map = {};

function $t(k, v) {
  lang_map[k] = v;
}

$t("YOUR_FRIEND", "你的好友");
$t("SHARED_WITH_YOU", "分享给你");
$t("HE_ALREADY_EARNED_AT", "他已经在");
$t("EARNED_MONEY", "赚钱了");
$t("CLICK_ABOVE_MAKE_MONEY", "加入我是代言人，每天领取1000，免费领取一百年");
$t("START_MAKE_MONEY_FREE", "立刻加入代言人");
$t("NEED_PAY", "开通价格");
$t("YOU_RE_FREE_VIP_NOW", "您当前属于普通VIP");
$t("FREE_VIP", "普通VIP");
$t(
  "YOUR_NEW_FRIEND_JOINED",
  "您有新的好友加入，开通VIP后即可获得 {0} 金额奖励"
);

console.log(JSON.stringify(lang_map));
