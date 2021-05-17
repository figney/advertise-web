<template>
  <div class="tool-page flex flex-direction align-center justify-center padding">
    <van-button round class="bg-primary font-bold size-72 margin-bottom" @click="importAllLang">Import</van-button>
    <van-button round class="bg-blue fc-fff font-bold size-72 margin-bottom" @click="getAllLang">Get</van-button>
    <van-button round class="bg-error fc-fff font-bold size-72 margin-bottom" @click="updateLang">Update</van-button>
  </div>
</template>

<script>
import {Button} from "vant";
import {importAll} from "../plugins/importLang";
import {Toast} from "mand-mobile";

export default {
  components: {
    [Button.name]: Button
  },
  methods: {
    importAllLang() {
      importAll()
    },
    getAllLang() {
      this.$http.get('v1/getLangList',{
        params: {
          group: '自动生成1',
          local: 'CN',
        }
      })
        .then(res=>{
          console.log(JSON.stringify(res))
        })
        .catch(err=>{
          Toast.failed(err.data.message)
        })
    },
    updateLang() {
      let lang_map = JSON.parse(`{
  "产品到期通知": "Thông báo hết hạn sản phẩm. ",
  "可接广告次数不足": "Có thể được kết nối với sự chứng thực ",
  "存在未完成任务无法重复接取": "Không có nhiệm vụ nào chưa hoàn thành nhiệm vụ không thể được lặp lại. ",
  "广告任务佣金到账通知": "Nhiệm vụ chứng thực phần thưởng cho thông báo ",
  "广告任务佣金无法获得通知": "Hoa hồng nhiệm vụ chứng thực không thể nhận thông báo ",
  "广告任务佣金部分到账通知": "Ủy ban ủy nhiệm chứng thực Thông báo đến ",
  "广告任务可接数量不足": "Sự chứng thực là không đủ ",
  "广告任务完成奖励到账通知": "Nhiệm vụ chứng thực đã hoàn thành phần thưởng thông báo đến ",
  "当前广告今日完成数量已达上限": "Sự chứng thực hiện tại đã hoàn thành số ngày hôm nay. ",
  "当前广告总完成数量已达上限": "Sự chứng thực hiện tại đã đạt đến giới hạn trên ",
  "提现通道关闭": "Tắt kênh phân phối. ",
  "无法购买": "Không thể mua ",
  "无法降级": "Không thể xuống cấp ",
  "测试通知奖励": "THÔNG BÁO THÔNG BÁO THÔNG BÁO ",
  "用户异常": "Ngoại lệ người dùng ",
  "超出最大叠加数量": "Vượt quá số lượng chồng chất tối đa "
}
`);

      for (let k of Object.keys(lang_map)) {
        this.$http.post('v1/updateLang',{
          slug: k,
          content: lang_map[k],
          local: 'VI'
        }).then(res=>{

        }).catch(err=>{
          console.log('update failed:',err)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.tool-page {
  min-height: 100vh;
}
</style>