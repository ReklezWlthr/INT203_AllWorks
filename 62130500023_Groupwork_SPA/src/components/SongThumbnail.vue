<template>
  <div class="w-thumb flex py-3 px-6">
    <div>
      <img
        @click="showSong"
        class="rounded-3xl w-36 h-36 cursor-pointer object-cover object-center"
        :src="coverId"
      />
    </div>
    <div class="pl-3 pt-2">
      <ul class="text-paleViolet">
        <li
          class="font-semibold text-lg w-42 preventOverflow"
        >
          {{ song.title }}
        </li>
        <li class="w-42 preventOverflow">
          {{ song.artist === "" ? "Unknown Artist" : song.artist }}
        </li>
        <li class="w-42 preventOverflow">
          {{ song.album === "" ? "Unknown Artist" : song.album }}
        </li>
        <li>
          <i
            @click="like(song)"
            class="transition duration-150 cursor-pointer fas fa-heart text-2xl pt-2"
            :class="song.liked ? 'text-red-500' : 'text-red-200 opacity-25'"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverId: "",
    };
  },
  props: ["song"],
  emits: ["like-song", "show-song"],
  methods: {
    like(song) {
      song.liked = !song.liked;
      this.$emit("like-song", song);
    },
    showSong() {
      this.$emit("show-song", this.song.id);
    },
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