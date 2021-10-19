app.component("image-canvas", {
    props: ['canvas', 'photos', 'iter'],
    template: 
    /*html*/
    `
    <div class="flex flex-wrap mx-auto bg-gray-200 px-5 py-3 rounded-md mt-3" v-show="canvas"
      style="height: 18.5rem;">
      <div class="w-full flex justify-end"><i class="fas fa-times text-2xl cursor-pointer" @click="$emit('closeCanvas')"></i>
      </div>
      <div class="flex-wrap ml-3 w-full">
        <i class="fas fa-chevron-left text-2xl cursor-pointer" @click="$emit('prev')"></i>
        <img class="w-9/12 inline-block rounded-xl mx-8" :src="photos[iter].src">
        <i class="fas fa-chevron-right text-2xl cursor-pointer" @click="$emit('next')"></i>
      </div>
    </div>`
})