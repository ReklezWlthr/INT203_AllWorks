const app = {
    data() {
        return {
            searchButton: true,
            searchBox: false,
            search: '',
            iter: 0,
            canvas: false,
            notfound: false,
            photos: [{
                    id: 0,
                    src: 'https://www.planetware.com/photos-large/THA/thailand-railay-beach.jpg',
                    photoDesc: 'Railay Beach, Krabi',
                    faved: true,
                    collapse: false
                },
                {
                    id: 1,
                    src: 'https://www.planetware.com/photos-large/THA/grand-palace.jpg',
                    photoDesc: 'The Grand Palace, Bangkok',
                    faved: false,
                    collapse: false
                },
                {
                    id: 2,
                    src: 'https://www.planetware.com/photos-large/THA/thailand-pai.jpg',
                    photoDesc: 'Pai, Mae Hong Son',
                    faved: false,
                    collapse: false
                },
                {
                    id: 3,
                    src: 'https://www.planetware.com/photos-large/THA/thailand-sukhothai.jpg',
                    photoDesc: 'Sukhothai Old City, Sukhothai',
                    faved: false,
                    collapse: false
                },
            ]
        }
    },
    methods: {
        fav(index) {
            this.photos[index].faved = !this.photos[index].faved;
        },
        triggerSearch() {
            this.searchBox = !this.searchBox;
            this.searchButton = !this.searchButton;
            this.search = '';
        },
        showCanvas(index) {
            this.canvas = true;
            this.iter = index;
        },
        closeCanvas() {
            this.canvas = false;
        },
        next() {
            this.iter++;
            if (this.iter >= this.photos.length) {
                this.iter = 0;
            }
        },
        prev() {
            this.iter--;
            if (this.iter < 0) {
                this.iter = this.photos.length - 1;
            }
        }
    },
    computed: {
        total() {
            return this.photos.length;
        },
        liked() {
            return this.photos.filter(n => n.faved).length;
        },
        filteredPhotos() {
            this.notfound = false;
            if (this.search == '') {
                return this.photos
            } else {
                fp = this.photos.filter(n => n.photoDesc.toLowerCase().includes(this.search.toLowerCase()));
                if (fp.length == 0) {
                    this.notfound = true;
                } else {
                    return fp;
                }
            }
        }
    }
}
mount = Vue.createApp(app).mount('#app')