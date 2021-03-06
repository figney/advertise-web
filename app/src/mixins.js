import { mapGetters, mapState } from "vuex";
import { Dialog, Toast } from "mand-mobile";


const Base = {
    computed: {
        ...mapState(['user', 'system', "money_bao", "money_bao_rate", "wallet", "all_property", "coin_unit", "product_data", "share", "left_secs", "productSep", "free_task_num"]),
        ...mapGetters(['isLogin', 'version']),
    },
    filters: {
        avatar(name) {
            const type = 'initials';//gridy bottts identicon initials avataaars male

            return `https://avatars.dicebear.com/4.5/api/${type}/${name}.svg`
        },
        number(value) {
            return Number(value)
        },
    },
    methods: {
        $localTime(time) {
            try {
                let str = this.system.time_format
                let t = new Date(time)
                let yyyy = t.getFullYear()
                let mm = (t.getMonth() + 1) > 9 ? (t.getMonth() + 1) : '0' + (t.getMonth() + 1)
                let dd = t.getDate() > 9 ? t.getDate() : '0' + t.getDate()
                let HH = t.getHours() > 9 ? t.getHours() : '0' + t.getHours()
                let MM = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes()
                let SS = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds()
                if (isNaN(yyyy)) {
                    return time
                }
                return str.replace('yyyy', yyyy).replace('mm', mm).replace('dd', dd).replace('HH', HH).replace('MM', MM).replace('SS', SS)
            } catch (error) {
                return time
            }
        },
        $toThousands(num = 0) {
            num = (num || 0).toString()
            var result = ''
            var nums = num.split('.')
            if (nums.length > 1) {
                num = nums[0]
                nums[1] = '.' + nums[1]
            }
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) {
                result = num + result
            }
            return result + (nums[1] || "");
        },
        $startRecaptcha(action) {
            return new Promise((resolve, reject) => {
                try {
                    if (this.system.open_recaptcha) {
                        window.grecaptcha.ready(() => {
                            grecaptcha.execute(this.system.web_recaptcha_key, { action }).then(token => {
                                if (!token) {
                                    Toast.failed(this.$t('PLEASE_CHECK_NETWORK', '????????????????????????????????????'))
                                    this.$webEvent('?????? google token ??????: ' + action)
                                }
                                resolve(token ? token : false)
                            }).catch(err => {
                                this.$webEvent('?????? google token ??????: ' + action)
                                resolve(false)
                            })
                        })
                    } else {
                        resolve('null')
                    }
                } catch (err) {
                    Toast.failed(this.$t('PLEASE_CHECK_NETWORK', '????????????????????????????????????'))
                    resolve(false)
                }
            })
        },
        $getCallingCode(country_code) {
            let calling_code = ''
            switch (country_code) {
                case 'CN':
                    calling_code = '86'
                    break;
                case 'IN':
                    calling_code = '91'
                    break;
                case 'TH':
                    calling_code = '66'
                    break;
                case 'VN':
                    calling_code = '84'
                    break;
                case 'ID':
                    calling_code = '62'
                    break;


                default:
                    break;
            }
            return calling_code
        },
        $getCountryCode(calling_code) {
            let country_code = ''
            switch (calling_code) {
                case '86':
                    country_code = 'CN'
                    break;
                case '91':
                    country_code = 'IN'
                    break;
                case '66':
                    country_code = 'TH'
                    break;
                case '84':
                    country_code = 'VN'
                    break;
                case '62':
                    country_code = 'ID'
                    break;

                default:
                    break;
            }
            return country_code
        },
        $balanceFormat(value, zero = false) {
            if (!value) {
                return zero ? 0 : ''
            }

            let v = value.toString()
            if (v.indexOf('.') > -1) {
                v = v.substring(0, v.indexOf('.') + this.coin_unit.balance + 1)
            }
            return v
        },
        $usdtFormat(value, zero = false) {
            if (!value) {
                return zero ? 0 : ''
            }

            let v = value.toString()
            if (v.indexOf('.') > -1) {
                v = v.substring(0, v.indexOf('.') + this.coin_unit.usdt + 1)
            }
            return v
        }
    },
    beforeRouteLeave(to, from, next) {
        if (!this.isLogin && to.name != 'Beginner' && to.name != 'TaskShare') {
            this.$bus.emit('login')
        } else {
            next();
        }
    },
}
const mobileApp = {
    computed: {
        isMobileApp() {
            return 'dog' in window
        }
    },
    mounted() {
        // this.$dismissMobileLoading()
    },
    methods: {
        saveApp() {

            this.$webEvent('?????????????????????', '-')
            try {
                this.$webEvent('????????????????????????????????????', '-')
                window.deferredPrompt.prompt();
                window.deferredPrompt.userChoice
                    .then(choice => {
                        if (choice.outcome == 'accepted') {
                            // ????????????
                            this.$bus.emit('showPwaBanner', false)
                            Toast.info(this.$t('INSTALLED_SUCCESSED', '??????????????????????????????'))
                        } else {
                            // ???????????????
                        }
                    })
                    .catch(e => {
                        console.log('pwa install error:', e)
                    })
            } catch (e) {
                this.$webEvent('???????????????????????????????????????', '-')
                Dialog.failed({
                    content: this.$t('BROWSER_NOT_SUPPORT', '????????????????????????????????????Chrome?????????'),
                    confirmText: this.$t('SURE', '??????'),
                    cancelText: this.$t('CANCEL', '??????')
                })
            }

            // let u = navigator.userAgent;
            // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            // if (isAndroid) {
            //     this.$webEvent('Android????????????APP', '-')
            //     let el = document.createElement('a')
            //     el.href = this.system_info.sys_app
            //     el.click()
            // } else {
            //     this.$webEvent('?????????????????????', '-')
            //     try {
            //         this.$webEvent('????????????????????????????????????', '-')
            //         window.deferredPrompt.prompt();
            //     } catch (e) {
            //         this.$webEvent('???????????????????????????????????????', '-')
            //         Dialog.failed({content: this.$t('????????????????????????????????????Chrome?????????'), confirmText: this.$t('??????'),})
            //     }
            // }
        }
    }
}

export {
    Base,
    mobileApp
}
