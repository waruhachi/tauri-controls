<script setup lang="ts">
import type { OsType } from "@tauri-apps/plugin-os"
import { twMerge } from "tailwind-merge"
import { onMounted, ref } from "vue"
import type { WindowControlsProps, WindowTitlebarProps } from "./types"
import { getOsType } from "./utils/os"
import WindowControls from "./WindowControls.vue"

const { controlsOrder = "system", windowControlsProps } =
  defineProps<WindowTitlebarProps>()

const osType = ref<OsType | undefined>(undefined)

onMounted(() => {
  getOsType().then((type) => {
    osType.value = type
  })
})

const left =
  controlsOrder === "left" ||
  (controlsOrder === "platform" && windowControlsProps?.platform === "macos") ||
  (controlsOrder === "system" && osType.value === "macos")

const customProps = (ml: string) => {
  if (windowControlsProps?.justify !== undefined) return windowControlsProps

  const {
    justify: windowControlsJustify,
    className: windowControlsClassName,
    ...restProps
  } = windowControlsProps || {}
  return {
    justify: false,
    className: twMerge(windowControlsClassName, ml),
    ...restProps,
  } as WindowControlsProps
}
</script>

<template>
  <div
    :class="
      twMerge(
        'bg-background flex flex-row overflow-hidden select-none',
        $attrs.class as string
      )
    "
    data-tauri-drag-region
  >
    <template v-if="left">
      <WindowControls :="customProps('ml-0')" />
      <slot />
    </template>
    <template v-else>
      <slot />
      <WindowControls :="customProps('ml-auto')" />
    </template>
  </div>
</template>
