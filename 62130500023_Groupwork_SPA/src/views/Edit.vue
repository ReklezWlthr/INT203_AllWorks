<template>
  <div class="text-5xl font-bold ml-10 mt-8 text-paleViolet">Edit Song</div>
  <edit-form
    v-if="loaded"
    :new-song-info="newSongInfo"
    :src="src"
    :lyrics="lyrics"
    @reload-cover="reloadCover"
    @forward-value="updateValue"
  />
  <div v-if="loaded" class="w-full flex mt-4">
    <button
      @click="editSong"
      class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-3 focus:outline-none rounded-full mx-auto"
    >
      Save
    </button>
  </div>
</template>

<script>
export default {
  emits: [
    "edit-song",
    "upload-song",
    "display-song",
    "launch-edit-page",
    "delete-song",
  ],
  data() {
    return {
      songId: this.$route.params.id,
      currentSong: {},
      newSongInfo: {},
      lyrics: "",
      src: require(`../assets/default.jpg`),
      loaded: false,
      coverCode: "",
      ytlink: "",
      key: "AIzaSyCx2yo5A-dlAKHgJhr_X2Z_Oej4x8vxu6E",
    };
  },
  props: ["songList", "url"],
  methods: {
    updateValue(lyrics) {
      this.lyrics = lyrics;
    },
    async editSong() {
      if (this.newSongInfo.title !== "") {
        if (
          this.currentSong.title.toLowerCase() !=
            this.newSongInfo.title.toLowerCase() ||
          this.currentSong.artist.toLowerCase() !=
            this.newSongInfo.artist.toLowerCase()
        ) {
          const ytCode = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.currentSong.title} - ${this.currentSong.artist}&type=video&key=${this.key}`
          );
          const ytData = await ytCode.json();
          if (ytData.items[0]) {
            this.ytlink = ytData.items[0].id.videoId;
          }
        }
        const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
        newSongBuffer.liked = this.currentSong.liked;
        newSongBuffer.lyrics = encodeURIComponent(this.lyrics);
        newSongBuffer.coverCode = this.coverCode;
        newSongBuffer.ytCode = this.ytlink;
        const res = await fetch(`${this.url}/${this.songId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newSongBuffer),
        });
        const data = await res.json();
        this.$emit("edit-song", data);
        window.location.href = `/show/${this.songId}`;
      } else {
        alert("Title cannot be empty")
      }
    },
    async fetchCurrentSong() {
      const res = await fetch(`${this.url}/${this.songId}`);
      const data = await res.json();
      return data;
    },
    async reloadCover() {
      this.src = require(`../assets/loading.gif`);
      try {
        const res = await fetch(
          `http://musicbrainz.org/ws/2/release/?fmt=json&query=${this.newSongInfo.album}%20AND%20artist:${this.newSongInfo.artist}%20AND%20(format:digitalmedia%20OR%20format:cd)`
        );
        const data = await res.json();
        if (data.releases[0]) {
          for (let release of data.releases) {
            const albumId = release.id;
            const res2 = await fetch(
              `http://coverartarchive.org/release/${albumId}`
            );
            if (res2.ok) {
              const data2 = await res2.json();
              this.coverCode = release.id;
              this.src = data2.images[0].thumbnails.large;
              break;
            }
          }
        } else {
          this.src = require(`../assets/default.jpg`);
          alert("Album Cover Not Found");
        }
      } catch {
        this.src = require(`../assets/default.jpg`);
      }
    },
  },
  async created() {
    this.src = require(`../assets/loading.gif`);
    this.currentSong = await this.fetchCurrentSong();
    this.newSongInfo.title = this.currentSong.title;
    this.newSongInfo.artist = this.currentSong.artist;
    this.newSongInfo.album = this.currentSong.album;
    this.newSongInfo.albumArtist = this.currentSong.albumArtist;
    this.newSongInfo.year = this.currentSong.year;
    this.newSongInfo.genre = this.currentSong.genre;
    this.lyrics = decodeURIComponent(this.currentSong.lyrics);
    this.ytlink = this.currentSong.ytCode;
    console.log(this.newSongInfo);
    this.coverCode = this.currentSong.coverCode;
    if (this.coverCode === "") {
      this.src = require(`../assets/default.jpg`);
    } else {
      try {
        const res2 = await fetch(
          `http://coverartarchive.org/release/${this.coverCode}`
        );
        if (res2.ok) {
          const data2 = await res2.json();
          this.src = data2.images[0].thumbnails.large;
        }
      } catch {
        this.src = require(`../assets/default.jpg`);
      }
    }
    this.loaded = true;
  },
};
</script>