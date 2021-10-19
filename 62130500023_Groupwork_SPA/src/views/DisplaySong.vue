<template>
  <div class="w-full flex justify-center gap-x-20 mt-10">
    <div>
      <div class="w-full flex justify-center">
        <img class="rounded-3xl w-56 h-56 mb-7 object-cover object-center" :src="coverId" />
      </div>
      <ul v-if="loaded">
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Title:</span> {{ currentSong.title }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Artist:</span> {{ currentSong.artist }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Album:</span> {{ currentSong.album }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Album Artist:</span>
          {{ currentSong.albumArtist }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Year:</span> {{ currentSong.year }}
        </li>
        <li class="text-paleViolet text-xl">
          <span class="font-bold">Genre:</span> {{ currentSong.genre }}
        </li>
      </ul>
      <div class="w-56 mx-auto flex justify-center mt-5">
          <button class="displayButton" @click="editSong">Edit</button
          ><button class="displayButton" @click="deleteSong">Delete</button>
      </div>
    </div>
    <div v-if="loaded">
      <div class="text-paleViolet text-2xl font-bold mb-5">Lyrics</div>
      <div
        class="whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-96 overflow-auto h-showCase"
      >
        {{ `${decodedLyrics}` }}
      </div>
    </div>
    <div>
      <div>
        <iframe :src="ytlink" class="w-full h-52" allowFullScreen></iframe>
      </div>
      <div class="text-paleViolet text-2xl font-bold mt-5 mb-5">
        More Songs<input
          placeholder="SEARCH FOR SONGS, ARTISTS OR ALBUMS"
          class="input ml-4"
          v-model="search"
        />
      </div>
      <div
        class="flex flex-col h-more overflow-auto bg-darkViolet rounded-xl py-3"
      >
        <div v-for="song in filteredSongs" :key="song.id" class="mx-auto">
          <small-thumb :song="song" @show-song="showSong" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallThumb from "../components/SmallThumb.vue";

export default {
  components: { SmallThumb },
  data() {
    return {
      search: "",
      coverId: "",
      songId: this.$route.params.id,
      currentSong: null,
      songArray: [],
      url: "http://localhost:5001/songLists",
      ytlink: "",
      loaded: false,
    };
  },
  methods: {
    async fetchSongs() {
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    },
    showSong(id) {
      this.$emit("display-song", id);
    },
    editSong() {
      this.$emit("launch-edit-page", this.songId);
    },
    async deleteSong() {
      const con = confirm("Are you sure that you want to delete this song?");
      if (con) {
        const res = await fetch(`${this.url}/${this.songId}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          this.$emit("delete-song", this.songId - 1);
          window.location.href = '/';
        } else {
          alert("Failed to delete song");
        }
      }
    },
    compare(a, b) {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    },
  },
  async created() {
    this.songArray = await this.fetchSongs();
    for (let song of this.songArray) {
      if (song.id == this.songId) {
        this.currentSong = song;
      }
    }
    this.ytlink =  `https://www.youtube.com/embed/${this.currentSong.ytCode}`;
    this.loaded = true;
    // console.log(this.currentSong);
    // console.log(this.songId);
    this.coverId = require(`../assets/loading.gif`);
    const res2 = await fetch(
      `http://coverartarchive.org/release/${this.currentSong.coverCode}`
    );
    if (res2.ok) {
      const data2 = await res2.json();
      this.coverId = data2.images[0].thumbnails.large;
    } else {
      this.coverId = require(`../assets/default.jpg`);
    }
  },
  computed: {
    decodedLyrics() {
      const decoded = decodeURIComponent(this.currentSong.lyrics);
      return decoded === "" ? "No Lyrics Available" : decoded;
    },
    filteredSongs() {
      const listBuffer = JSON.parse(JSON.stringify(this.songArray));
      if (this.search == "") {
        return listBuffer.sort(this.compare);
      } else {
        return listBuffer
          .filter(
            (song) =>
              song.title.toLowerCase().includes(this.search.toLowerCase()) ||
              song.album.toLowerCase().includes(this.search.toLowerCase()) ||
              song.artist.toLowerCase().includes(this.search.toLowerCase())
          )
          .sort(this.compare);
      }
    },
  },
};
</script>