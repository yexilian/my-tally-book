<template>
  <div class="bill-list-page">
    <van-nav-bar :title="$t('billList.title')" left-arrow @click-left="() => router.back()" />
    <div v-for="group in groupedBills" :key="group.date" class="date-group">
      <div class="date-title">{{ group.date }}</div>
      <van-swipe-cell v-for="bill in group.list" :key="bill.id">
        <van-cell>
          <template #title>
            <span>{{ bill.category }}</span>
            <span v-if="bill.note" class="note">{{ bill.note }}</span>
          </template>
          <template #label>
            {{ bill.date }}
          </template>
          <template #value>
            <span :class="{ 'income': bill.type === 'income', 'expense': bill.type === 'expense' }">
              ¥ {{ bill.amount }}
            </span>
          </template>
          <template #right-icon>
            <van-icon name="delete-o" class="delete-icon" @click.stop="deleteBill(bill.id)" />
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" :text="$t('billList.delete')" @click="deleteBill(bill.id)" />
        </template>
      </van-swipe-cell>
    </div>
    <div v-if="groupedBills.length === 0" class="empty">{{ $t('home.noBills') }}</div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBillStore } from '../stores/bill'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const billStore = useBillStore()

const groupedBills = computed(() => {
  const groups = {}
  const sorted = [...billStore.bills].sort((a,b) => new Date(b.date) - new Date(a.date))
  sorted.forEach(bill => {
    if (!groups[bill.date]) groups[bill.date] = []
    groups[bill.date].push(bill)
  })
  return Object.entries(groups).map(([date, list]) => ({ date, list }))
})

const deleteBill = (id) => {
  billStore.deleteBill(id)
  showToast(t('billList.deleteSuccess'))
}

onMounted(() => {
  billStore.loadBills()
})
</script>

<style scoped>
.bill-list-page {
  min-height: 100vh;
  background: #f5f5f5;
}
.date-group {
  margin-bottom: 12px;
}
.date-title {
  background: #f0f0f0;
  padding: 8px 16px;
  font-size: 12px;
  color: #666;
}
.note {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}
.income :deep(.van-cell__value) {
  color: #07c160;
}
.expense :deep(.van-cell__value) {
  color: #ee0a24;
}
.delete-icon {
  font-size: 20px;
  color: #999;
  padding: 0 8px;
  cursor: pointer;
}
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>