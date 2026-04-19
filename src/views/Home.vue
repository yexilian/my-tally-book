<template>
  <div class="home">
    <van-nav-bar :title="$t('common.appName')" />
    <div class="total-card">
      <div class="total-label">{{ $t('home.totalExpense') }}</div>
      <div class="total-amount">¥ {{ totalExpense.toFixed(2) }}</div>
    </div>
    <div class="bill-list">
      <div class="list-header">
        <span class="list-title">{{ $t('home.recentBills') }}</span>
        <span class="view-all" @click="router.push('/list')">{{ $t('home.viewAll') }} &gt;</span>
      </div>
      <van-cell
        v-for="bill in recentBills"
        :key="bill.id"
        :title="bill.category"
        :label="bill.note || bill.date"
        :value="'¥ ' + bill.amount"
        :class="{ 'income': bill.type === 'income', 'expense': bill.type === 'expense' }"
      />
      <div v-if="recentBills.length === 0" class="empty">{{ $t('home.noBills') }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBillStore } from '../stores/bill'

const router = useRouter()
const billStore = useBillStore()

const now = new Date()
const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`

const totalExpense = computed(() => {
  return billStore.bills
    .filter(b => b.type === 'expense' && b.date.startsWith(currentYearMonth))
    .reduce((sum, b) => sum + b.amount, 0)
})

const recentBills = computed(() => {
  return [...billStore.bills].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,5)
})

onMounted(() => {
  billStore.loadBills()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 20px;
}
.total-card {
  background: linear-gradient(135deg, #3a7bd5, #00d2ff);
  margin: 16px;
  padding: 24px 20px;
  border-radius: 20px;
  color: white;
  text-align: center;
}
.total-label {
  font-size: 14px;
  opacity: 0.9;
}
.total-amount {
  font-size: 36px;
  font-weight: bold;
  margin-top: 8px;
}
.bill-list {
  background: white;
  margin: 0 16px;
  border-radius: 16px;
  overflow: hidden;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.list-title {
  font-weight: bold;
  color: #333;
}
.view-all {
  font-size: 12px;
  color: #3a7bd5;
  cursor: pointer;
}
.income :deep(.van-cell__value) {
  color: #07c160;
}
.expense :deep(.van-cell__value) {
  color: #ee0a24;
}
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>