<template>
  <div class="add-bill">
    <van-nav-bar :title="$t('add.title')" left-arrow @click-left="() => router.back()" />
    <div class="form-container">
      <van-field
        v-model="amount"
        type="number"
        :label="$t('add.amount')"
        :placeholder="$t('add.amount')"
        :rules="[{ required: true, message: $t('add.amountRequired') }]"
      />
      <van-field
        v-model="category"
        :label="$t('add.category')"
        placeholder="如：餐饮、购物、交通..."
      />
      <van-field
        v-model="date"
        :label="$t('add.date')"
        readonly
        @click="showDatePicker = true"
      />
      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker
          :title="$t('add.date')"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onDateConfirm"
          @cancel="showDatePicker = false"
        />
      </van-popup>
      <van-field
        v-model="note"
        :label="$t('add.note')"
        :placeholder="$t('add.notePlaceholder')"
      />
      <div style="margin: 30px 16px;">
        <van-button type="primary" block round @click="saveBill">{{ $t('add.save') }}</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBillStore } from '../stores/bill'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const billStore = useBillStore()

const amount = ref('')
const category = ref('')
const note = ref('')
const date = ref(new Date().toISOString().slice(0,10))

const showDatePicker = ref(false)
const minDate = new Date(2020, 0, 1)
const maxDate = new Date()
const onDateConfirm = (value) => {
  date.value = value.selectedValues.join('-')
  showDatePicker.value = false
}

const saveBill = () => {
  if (!amount.value || parseFloat(amount.value) <= 0) {
    showToast(t('add.amountRequired'))
    return
  }
  if (!category.value.trim()) {
    showToast('请填写分类')
    return
  }
  const newBill = {
    id: Date.now(),
    amount: parseFloat(amount.value),
    category: category.value.trim(),
    note: note.value,
    date: date.value,
    type: 'expense'
  }
  billStore.addBill(newBill)
  showToast(t('add.success'))
  router.back()
}
</script>

<style scoped>
.add-bill {
  min-height: 100vh;
  background: #f5f5f5;
}
.form-container {
  background: white;
  margin: 12px;
  border-radius: 16px;
  padding: 12px 0;
}
.van-field {
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
}
.van-field__control {
  font-size: 16px;
}
.van-field__label {
  font-weight: 500;
  color: #666;
}
</style>
