app.component('image-search', {
  emits: ['triggerSearch', 'onForwardSearch'],
  data() {
    return {
      search: ''
    }
  },
  props: ['searchOn'],
  template:
    /*html*/
    `<div class="w-full flex justify-end h-10" v-show="!searchOn">
    <i class="fas fa-search text-2xl cursor-pointer" @click="$emit('triggerSearch')"></i>
  </div>
  <div class="mx-auto w-11/12 h-10 flex justify-center" v-show="searchOn">
    <input v-model="search" class="border-2 rounded-md w-9/12 mr-3 focus:outline-none px-2 py-1"
      placeholder="Enter Text to Search" @input="$emit('onForwardSearch', this.search)">
    <button class="rounded-md px-2 py-1 bg-blue-200 focus:outline-none" @click="close">Cancel</button>
  </div>
  `,
  methods: {
    close() {
      this.$emit('triggerSearch');
      this.search = '';
    }
  }
})