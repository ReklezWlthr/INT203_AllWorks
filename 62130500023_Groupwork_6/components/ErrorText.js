app.component('error-text', {
    template:
        /*html*/
        `<div v-if="errors" v-for="error in errors[attr]" :class="errorClass" class="mt-1"><i class="fas fa-exclamation-circle mr-1"></i>{{ error }}</div>`,
    props: ['attr', 'errors', 'errorClass']
})