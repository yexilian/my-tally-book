<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon="home-o">{{ $t('common.home') }}</van-tabbar-item>
      <van-tabbar-item to="/add" icon="add-o">{{ $t('common.add') }}</van-tabbar-item>
      <van-tabbar-item to="/stats" icon="chart-trending-o">{{ $t('common.stats') }}</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-o">{{ $t('common.profile') }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}
#app {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>