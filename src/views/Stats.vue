<template>
  <div class="stats">
    <van-nav-bar :title="$t('stats.title')" />
    <div class="chart-container">
      <div id="pieChart" style="width: 100%; height: 300px;"></div>
    </div>
    <div class="legend">
      <div v-for="item in expenseData" :key="item.name" class="legend-item">
        <span class="dot" :style="{ background: item.color }"></span>
        <span>{{ item.name }}: ¥{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useBillStore } from '../stores/bill'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'

const billStore = useBillStore()
const { t, locale } = useI18n()
let chartInstance = null

const getExpenseData = () => {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`
  const expenseBills = billStore.bills.filter(b => b.type === 'expense' && b.date.startsWith(currentMonth))
  const categoryMap = {}
  expenseBills.forEach(bill => {
    categoryMap[bill.category] = (categoryMap[bill.category] || 0) + bill.amount
  })
  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
    color: ['#3a7bd5', '#f39c12', '#e74c3c', '#2ecc71', '#9b59b6'][Math.floor(Math.random()*5)]
  }))
}

const expenseData = computed(() => getExpenseData())

const renderChart = () => {
  const data = expenseData.value
  const chartDom = document.getElementById('pieChart')
  if (!chartDom) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartDom)
  }
  chartInstance.setOption({
    tooltip: { trigger: 'item' },
    title: {
      text: t('stats.expenseDistribution'),
      left: 'center'
    },
    series: [{
      type: 'pie',
      radius: '55%',
      data: data.map(item => ({ name: item.name, value: item.value })),
      label: { show: true, formatter: '{b}: {d}%' }
    }]
  })
}

onMounted(() => {
  billStore.loadBills()
  renderChart()
})

watch([() => billStore.bills, locale], () => {
  renderChart()
}, { deep: true })
</script>

<style scoped>
.stats {
  min-height: 100vh;
  background: #f5f5f5;
}
.chart-container {
  background: white;
  margin: 16px;
  border-radius: 16px;
  padding: 16px;
}
.legend {
  background: white;
  margin: 0 16px;
  border-radius: 16px;
  padding: 12px;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #333;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>