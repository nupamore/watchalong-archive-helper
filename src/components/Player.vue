<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Plyr from 'plyr'
import { useControlStore } from '@/stores/control'

const props = defineProps<{
  id: number
  src: string
  diff?: number
}>()

const controlStore = useControlStore()
const plyrRef = ref()

onMounted(async () => {
  const plyr = new Plyr(plyrRef.value)
  controlStore.addPlayer({
    id: props.id,
    plyr,
    diff: props.diff || 0,
  })

  plyr.on('play', event => {
    controlStore.play(event, props.id)
  })
  plyr.on('pause', () => {
    controlStore.pause()
  })
})
</script>

<template>
  <div
    ref="plyrRef"
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
