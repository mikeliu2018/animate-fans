<script setup lang="ts">
import { reactive } from "vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
let videoOption = reactive({
  autoplay: false,
  controls: true,
  sources: [
    // {
    //   src: 'xxx.m3u8',
    //   type:'application/x-mpegURL'
    // }
    {
      src: "streams/animations/SAO/season1/ep5/index.m3u8",
      type: "application/x-mpegURL",
    },
  ],
  // width: "640px",
  // height: "360px",
  // children: {
  //   bigPlayButton: false,
  //   controlBar: {
  //     fullscreenToggle: false,
  //   },
  // },
  // bigPlayButton: false,
  controlBar: {
    pictureInPictureToggle: true,
    fullscreenToggle: true,
    audioTrackButton: false,
  },
});
</script>

<template>
  <div class="video">
    <video-player :options="videoOption"></video-player>
  </div>  
</template>

<style scoped>
@media (min-width: 1024px) {
  .video {
    /* min-height: 100vh; */
    display: flex;
    align-items: center;
  }
}
</style>
