import { defineStore } from 'pinia'
import type Plyr from 'plyr'
import { ref } from 'vue'

let lastPlayerId = 0
interface Player {
  id: number
  plyr: Plyr
  diff: number
  isMain: boolean
}

export const useControlStore = defineStore('control', () => {
  const players = ref<Set<Player>>(new Set())
  const mainPlayer = ref<Plyr>()

  function addPlayer(player: Plyr, diff: number, isMain?: boolean) {
    players.value.add({
      id: lastPlayerId++,
      plyr: player,
      diff,
      isMain: isMain || false,
    })
    if (isMain) {
      mainPlayer.value = player
    }
  }

  function play(event: Plyr.PlyrEvent, isMain?: boolean) {
    players.value.forEach(player => {
      if (!player.plyr.paused) {
        return
      }
      player.plyr.currentTime = event.detail.plyr.currentTime + player.diff
      player.plyr.play()
    })
  }

  function pause() {
    players.value.forEach(({ plyr }) => plyr.pause())
  }

  return { players, addPlayer, play, pause }
})
