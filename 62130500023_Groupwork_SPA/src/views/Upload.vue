<template>
  <div class="text-5xl font-bold ml-10 mt-8 text-paleViolet">
    Upload New Song
  </div>
  <edit-form
    :new-song-info="newSongInfo"
    :src="src"
    :lyrics="lyrics"
    @reload-cover="reloadCover"
    @forward-value="updateValue"
  />
  <div class="w-full flex mt-4">
    <button
      @click="upload"
      class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-3 focus:outline-none rounded-full mx-auto"
    >
      Upload
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
      newSongInfo: {
        title: "",
        artist: "",
        album: "",
        albumArtist: "",
        year: null,
        genre: "",
      },
      lyrics: "",
      src: "/img/default.bc1ffa9c.jpg",
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
    async upload() {
      if (this.newSongInfo.title !== "") {
        const ytCode = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.newSongInfo.title} - ${this.newSongInfo.artist}&type=video&key=${this.key}`
        );
        const ytData = await ytCode.json();
        if (ytData.items[0]) {
          this.ytlink = ytData.items[0].id.videoId;
        }
        setTimeout(async () => {
          const newSongBuffer = JSON.parse(JSON.stringify(this.newSongInfo));
          console.log(newSongBuffer);
          newSongBuffer.liked = false;
          newSongBuffer.lyrics = encodeURIComponent(this.lyrics);
          newSongBuffer.coverCode = this.coverCode;
          newSongBuffer.ytCode = this.ytlink;
          const res = await fetch(this.url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newSongBuffer),
          });
          const data = res.json();
          this.$emit("upload-song", data);
          window.location.href = '/';
        }, 1);
      } else {
        alert("Title cannot be empty");
      }
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
              console.log(this.coverCode);
              break;
            }
          }
        } else {
          this.src = require(`../assets/default.jpg`);
          alert("Album Cover Not Found");
        }
      } catch {
        this.src = require(`../assets/default.jpg`);
        alert("Album Cover Fetch Error!");
      }
    },
  },
};
</script>
