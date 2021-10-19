app.component('image-list', {
  emits: ['favorite', 'showCanvas'],
    props: ['photos', 'notFound'],
    template:
        /*html*/
        `<div class="w-full my-5" v-for="photo in photos">
    <img class="transition duration-300 w-48 inline-block rounded-xl mr-5 hover:shadow-md cursor-pointer"
      :src="photo.src" @click="$emit('favorite', photo.id)">
    <transition name="bounce">
      <i v-show="photo.faved" class="fas fa-heart text-red-500 text-2xl z-10 absolute -ml-14 mt-2"></i>
    </transition>
    <div class="inline-block">
      <span class="block">{{ photo.photoDesc }}</span>
      <i class="fas fa-search-plus text-xl mt-3 text-gray-300 cursor-pointer hover:text-gray-400 transition duration-300"
        @click="$emit('showCanvas', photo.id)"></i>
    </div>
  </div>
  <div class="w-full flex justify-center mt-5" v-if="notFound">
      No Photos Found
    </div>`
})