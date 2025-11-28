<script setup lang="ts">
import { twMerge } from "tailwind-merge"
import { onMounted } from "vue"
import Gnome from "./controls/linux/Gnome.vue"
import MacOs from "./controls/MacOs.vue"
import Windows from "./controls/Windows.vue"
import type { WindowControlsProps } from "./types"
import { getOsType } from "./utils/os"

defineOptions({
  inheritAttrs: false,
})

const {
  platform,
  justify = false,
  hide = false,
  hideMethod = "display",
  className = "",
} = defineProps<WindowControlsProps>()

let platformToUse = platform
onMounted(() => {
  getOsType().then((type) => {
    if (!platformToUse) {
      switch (type) {
        case "macos":
          platformToUse = "macos"
          break
        case "linux":
          platformToUse = "gnome"
          break
        default:
          platformToUse = "windows"
      }
    }
  })
})

const customClass = twMerge(
  "flex",
  className,
  hide && (hideMethod === "display" ? "hidden" : "invisible")
)
</script>

<template>
  <Windows
    v-if="platform === 'windows'"
    :class="twMerge(customClass, justify && 'ml-auto')"
  />
  <MacOs
    v-else-if="platform === 'macos'"
    :class="twMerge(customClass, justify && 'ml-0')"
  />
  <Gnome
    v-else-if="platform === 'gnome'"
    :class="twMerge(customClass, justify && 'ml-auto')"
  />
  <Windows v-else :class="twMerge(customClass, justify && 'ml-auto')" />
</template>
