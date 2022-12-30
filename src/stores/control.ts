import { defineStore } from 'pinia'
import type Plyr from 'plyr'
import { ref } from 'vue'

interface Player {
  id: number
  plyr: Plyr
  diff: number
}

export const useControlStore = defineStore('control', () => {
  const players = ref<Map<number, Player>>(new Map())
  const mainPlayer = ref<Player>()

  function addPlayer(player: Player) {
    players.value.set(player.id, player)
    if (player.id === 1) {
      mainPlayer.value = player
    }
  }

  function play(event: Plyr.PlyrEvent, id: number) {
    players.value.forEach(player => {
      if (!player.plyr.paused) {
        return
      }
      const d = players.value.get(1)?.diff || 0
      player.plyr.currentTime =
        event.detail.plyr.currentTime + (id === 0 ? d : -d)
      player.plyr.play()
    })
  }

  function pause() {
    players.value.forEach(({ plyr }) => plyr.pause())
  }

  function setDiff(id: number, diff: number) {
    const player = players.value.get(id)
    if (player) {
      player.diff = diff
    }
  }

  return { players, addPlayer, play, pause, setDiff }
})
