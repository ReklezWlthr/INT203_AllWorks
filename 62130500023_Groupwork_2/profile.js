const app = {
    data() {
        return {
            firstname: 'Napat',
            lastname: 'Wattanasuttiwong',
            job: 'Game Developer',
            pro: 'images/pro.jpg',
            art: '12',
            fol: '1608',
            rate: '4.7',
            width: '150'
        }
    },
    created() {
        console.log('Message is ' + this.msg)
    },
    updated() {
        console.log('Message was changed to ' + this.msg)
    }
}
mountedApp = Vue.createApp(app).mount('#app')