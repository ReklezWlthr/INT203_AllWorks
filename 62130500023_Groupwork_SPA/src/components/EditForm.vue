<template>
  <div class="flex justify-center gap-x-12">
    <div class="mt-10">
      <img
        :src="src"
        class="rounded-3xl w-56 h-56 object-cover object-center"
      />
      <div class="ml-48 -mt-8 relative">
        <div
          @click="reloadCover"
          id="spin"
          class="h-14 w-14 rounded-full flex flex-wrap justify-center content-center border-darkViolet text-paleViolet cursor-pointer"
          style="border-width: 1.8rem"
        >
          <i class="fas fa-sync-alt text-2xl"></i>
        </div>
      </div>
      <div class="w-60 text-paleViolet italic text-sm mt-2 text-center">
        CLICK TO FIND COVER IMAGE FROM ARCHIVE<br />
        BY MUSICBRAINZ &amp; COVER ART ARCHIVE
      </div>
    </div>
    <div class="w-1/4 mt-5 ml-12">
      <div v-for="(value, key) in songInfo" :key="key" class="row">
        <div>
          <div class="text-lg font-bold text-paleViolet">
            {{
              key
                .replace(/([A-Z])/g, "$1")
                .charAt(0)
                .toUpperCase() + key.slice(1)
            }}
            <span class="ml-28 text-lightViolet font-medium" v-if="key == 'title' && invalidTitle">Title cannot be empty.</span>
          </div>
          <input v-if="key == 'title'" @input="validate" v-model.trim="songInfo[key]" class="input" />
          <input v-else v-model.trim="songInfo[key]" class="input" />
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="text-lg font-bold text-paleViolet">Lyrics</div>
      <textarea
        v-model="lyricsInfo"
        @input="forwardValue"
        class="rounded-3xl w-96 bg-paleViolet focus:outline-none text-base text-darkViolet font-semibold px-5 h-lyrics resize-none py-4"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ["newSongInfo", "src", "lyrics"],
  data() {
    return {
      songInfo: this.newSongInfo,
      lyricsInfo: this.lyrics,
      invalidTitle: false
    };
  },
  methods: {
    reloadCover() {
      this.$emit("reload-cover");
    },
    forwardValue() {
      this.$emit("forward-value", this.lyricsInfo);
    },
    validate(){
      this.invalidTitle = this.songInfo.title === "";
    }
  }
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#spin:hover {
  animation: spin 1s;
}
</style>