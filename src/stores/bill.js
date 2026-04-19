import { defineStore } from 'pinia'

export const useBillStore = defineStore('bill', {
  state: () => ({
    bills: []
  }),
  actions: {
    loadBills() {
      const stored = localStorage.getItem('bill-data')
      if (stored) {
        this.bills = JSON.parse(stored)
      } else {
        // 演示数据
        this.bills = [
          { id: Date.now(), amount: 48, category: '餐饮', note: '午餐', date: new Date().toISOString().slice(0,10), type: 'expense' },
          { id: Date.now()+1, amount: 299, category: '购物', note: '买鞋', date: new Date().toISOString().slice(0,10), type: 'expense' },
          { id: Date.now()+2, amount: 4588, category: '交通', note: '机票', date: new Date().toISOString().slice(0,10), type: 'expense' }
        ]
        this.saveBills()
      }
    },
    saveBills() {
      localStorage.setItem('bill-data', JSON.stringify(this.bills))
    },
    addBill(bill) {
      this.bills.unshift(bill)
      this.saveBills()
    },
    deleteBill(id) {
      this.bills = this.bills.filter(b => b.id !== id)
      this.saveBills()
    }
  }
})