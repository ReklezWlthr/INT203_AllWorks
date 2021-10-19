const app = {
    data() {
        return {
            photos: [{
                    src: 'https://www.planetware.com/photos-large/THA/thailand-railay-beach.jpg',
                    photoDesc: 'Railay Beach, Krabi',
                    faved: true
                },
                {
                    src: 'https://www.planetware.com/photos-large/THA/grand-palace.jpg',
                    photoDesc: 'The Grand Palace, Bangkok',
                    faved: false
                },
                {
                    src: 'https://www.planetware.com/photos-large/THA/thailand-pai.jpg',
                    photoDesc: 'Pai, Mae Hong Son',
                    faved: false
                },
                {
                    src: 'https://www.planetware.com/photos-large/THA/thailand-sukhothai.jpg',
                    photoDesc: 'Sukhothai Old City, Sukhothai',
                    faved: false
                },
            ]
        }
    },
    methods: {
        fav(index){
            this.photos[index].faved = !this.photos[index].faved;
        }
    },
    computed: {
        total(){
            return this.photos.length;
        },
        liked(){
            return this.photos.filter(n => n.faved).length;
        }
    }
}
Vue.createApp(app).mount('#app')