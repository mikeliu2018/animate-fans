<template>
  <video
    ref="rVideoPlayer"
    class="video-js vjs-theme-city vjs-big-play-centered"
    controlsList="nodownload"
    oncontextmenu="return false;"
  ></video>
  <!-- oncontextmenu="return false;" -->
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";
import videoJs from "video.js";
import "video.js/dist/video-js.css";
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

const rVideoPlayer = ref<Element>();
let player = ref();
onMounted(() => {
  player.value = videoJs(rVideoPlayer.value as Element, props.options);
});

onUnmounted(() => {
  if (player.value) {
    player.value.dispose();
  }
});
</script>

<style>
video::-internal-media-controls-download-button {
  display: none;
}

video::-webkit-media-controls-enclosure {
  overflow: hidden;
}

video::-webkit-media-controls-panel {
  width: calc(100% + 30px); /* Adjust as needed */
}
</style>
