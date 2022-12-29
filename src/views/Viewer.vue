<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueWinBox, useWinBox } from 'vue-winbox'
import Player from '@/components/Player.vue'

interface YoutubeLiveDetail {
  actualStartTime: '2022-12-22T10:48:28Z'
  actualEndTime: '2022-12-22T12:41:26Z'
  scheduledStartTime: '2022-12-22T10:45:00Z'
}

const winboxRef1 = ref()
const winboxRef2 = ref()

const id1 = 'Aeba39HULDI'
const id2 = 'j5zFnCC7q2c'

const diff = ref<number | null>(null)

async function getYoutubeInfo(id: string) {
  const tempKey = '0OyOPpNr_786pvmMyVe0nbRXHEZvz7ZFBySazIA'
  const req = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${id}&key=${tempKey
      .split('')
      .reverse()
      .join('')}`,
  )
  const res = await req.json()
  return res?.items[0]?.liveStreamingDetails as YoutubeLiveDetail
}

const ready = ref(false)

async function load() {
  const info1 = await getYoutubeInfo(id1)
  const info2 = await getYoutubeInfo(id2)
  if (!diff.value) {
    diff.value =
      (new Date(info1.actualStartTime).getTime() -
        new Date(info2.actualStartTime).getTime()) /
        1000 +
      10 // delay
  }
  ready.value = true
}
</script>

<template>
  <form @submit.prevent="load">
    <div class="mb-6 grid w-600px gap-6 md:grid-cols-4">
      <div>
        <label
          for="id1"
          class="font-medium text-sm mb-2 c-white block dark:text-white"
          >Main ID</label
        >
        <input
          id="id1"
          v-model="id1"
          type="text"
          class="border rounded-lg bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          for="id2"
          class="font-medium text-sm mb-2 c-white block dark:text-white"
          >Sub ID</label
        >
        <input
          id="id2"
          v-model="id2"
          type="text"
          class="border rounded-lg bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          for="diff"
          class="font-medium text-sm mb-2 c-white block dark:text-white"
          >Seconds diff</label
        >
        <input
          id="diff"
          v-model="diff"
          type="text"
          class="border rounded-lg bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="rounded font-bold bg-blue-500 text-white py-2 px-4 hover:bg-blue-700"
      >
        Load
      </button>
    </div>
  </form>

  <VueWinBox
    v-if="ready"
    ref="winboxRef1"
    :options="{ x: 0, y: 50, width: 600, height: 500 }"
  >
    <Player :src="id1" main />
  </VueWinBox>

  <VueWinBox
    v-if="ready"
    ref="winboxRef2"
    :options="{ x: 610, y: 50, width: 600, height: 500 }"
  >
    <Player :src="id2" :diff="diff" />
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
