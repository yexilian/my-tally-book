<template>
  <div class="profile">
    <van-nav-bar :title="$t('profile.title')" />
    <van-cell-group inset>
      <van-cell :title="$t('profile.language')" is-link @click="showLangPicker = true">
        <template #value>
          {{ currentLang === 'zh' ? $t('profile.chinese') : $t('profile.english') }}
        </template>
      </van-cell>
    </van-cell-group>

    <van-popup v-model:show="showLangPicker" position="bottom">
      <van-picker
        :columns="[
          { text: $t('profile.chinese'), value: 'zh' },
          { text: $t('profile.english'), value: 'en' }
        ]"
        @confirm="onLangConfirm"
        @cancel="showLangPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'

const { locale, t } = useI18n()
const showLangPicker = ref(false)
const currentLang = computed(() => locale.value)

const onLangConfirm = ({ selectedOptions }) => {
  const newLang = selectedOptions[0].value
  locale.value = newLang
  localStorage.setItem('lang', newLang)
  if (newLang === 'zh') {
    Locale.use('zh-CN', zhCN)
  } else {
    Locale.use('en-US', enUS)
  }
  showLangPicker.value = false
}
</script>

<style scoped>
.profile {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>