import { createI18n } from 'vue-i18n'
import zh from '../locales/zh.js'
import en from '../locales/en.js'

const savedLang = localStorage.getItem('lang') || 'zh'

const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  messages: { zh, en }
})

export default i18n