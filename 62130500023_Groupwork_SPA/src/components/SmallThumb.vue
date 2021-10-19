<template>
  <div @click="showSong" class="w-thumb flex py-3 px-6 cursor-pointer hover:bg-darkPB rounded-lg transition duration-100">
    <div>
      <img class="rounded-3xl w-24 h-24 object-cover object-center" :src="coverId" />
    </div>
    <div class="pl-3 pt-2">
      <ul class="text-paleViolet">
        <li class="font-semibold text-lg w-52 preventOverflow">{{ song.title }}</li>
        <li class="w-52 preventOverflow">{{ song.artist === "" ? "Unknown Artist" : song.artist }}</li>
        <li class="w-52 preventOverflow">{{ song.album === "" ? "Unknown Artist" :  song.album }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverId: ""
    };
  },
  props: ["song"],
  emits: ['show-song'],
  methods: {
    showSong(){
        this.$emit("show-song", this.song.id);
    }
  },
  async created() {
    this.coverId = require(`../assets/loading.gif`);
    const res2 = await fetch(
      `http://coverartarchive.org/release/${this.song.coverCode}`
    );
    if (res2.ok) {
      const data2 = await res2.json();
      this.coverId = data2.images[0].thumbnails.small;
    } else {
        this.coverId = require(`../assets/default.jpg`);
    }
  },
};
</script>