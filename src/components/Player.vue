<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Plyr from 'plyr'
import { useControlStore } from '@/stores/control'

const props = defineProps<{
  src: string
  diff?: number
  main?: boolean
}>()

const controlStore = useControlStore()
const playerRef = ref()

onMounted(async () => {
  const player = new Plyr(playerRef.value)
  controlStore.addPlayer(player, props.diff || 0, props.main)

  player.on('play', event => {
    controlStore.play(event, props.main)
  })
  player.on('pause', () => {
    controlStore.pause()
  })
})
</script>

<template>
  <div
    ref="playerRef"
    :options="{
      autosize: true,
    }"
    data-plyr-provider="youtube"
    :data-plyr-embed-id="src"
  ></div>
</template>

<style lang="scss">
.wb-body {
  display: flex;
  justify-content: center;
  margin: auto;
  background: #000;
  text-align: center;
}
</style>
