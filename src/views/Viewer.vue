<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueWinBox, useWinBox } from 'vue-winbox'
import Player from '@/components/Player.vue'

const options = {
  title: 'Count: 0',
  class: 'white',
  x: 'center',
  y: 'center',
  width: '50%',
  height: '50%',
}
const winboxRef1 = ref()
const winboxRef2 = ref()
</script>

<template>
  <VueWinBox ref="winboxRef1" :options="options">
    <Player />
  </VueWinBox>

  <VueWinBox ref="winboxRef2" :options="options">
    <Player />
  </VueWinBox>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100vh;
  background: linear-gradient(135deg, #0d1117, #131820);
  font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, 'Open Sans',
    OpenSans, Roboto, Segoe UI, sans-serif;
}
</style>
