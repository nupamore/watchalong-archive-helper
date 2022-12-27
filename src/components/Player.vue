<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Plyr from 'plyr'

const playerRef = ref()

onMounted(() => {
  console.log(playerRef.value)
  const player = new Plyr(playerRef.value)
})
</script>

<template>
  <div
    ref="playerRef"
    :options="{
      autosize: true,
    }"
    data-plyr-provider="youtube"
    data-plyr-embed-id="bTqVqk7FSmY"
  ></div>
</template>

<style lang="scss">
.wb-body {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background: #000;
}
</style>
