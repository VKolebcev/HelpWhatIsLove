<style scoped>
    .feed {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .photo {
        transition: 1s; /* Время эффекта */
        max-width: 1200px;
        margin-bottom: 50px;
    }

    .photo_im {
        max-width: 600px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .photo__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btn {
        width: auto;
        padding: 3px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
    }

    .info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .scale {
        transition: 1s; /* Время эффекта */
    }
    .scale:active {
        max-width: 1000px;
    }
    .photo:active {
        max-width: 1200px;
    }

    .panel-footer
    {
        background-color:white;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .star {
        width: 25px;
    }
    
    .btn_star {
        padding-left: 3px;
        padding-right: 5px;
        width: auto;
        height: 33px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .star_text {
        font-size: 18px;
        padding-left: 10px;
    }
</style>

<template>
    <div>
        <test></test>
        <navigation></navigation>
        <div class="feed">
            <div class="feed__row">
                <div v-for="(photo,$index) in photos" class="photo panel panel-default">
                    <div class="panel-heading">
                        <div class="photo__header">
                            <div class="info">
                                <button type="button" class="btn btn-info btn-block" v-on:click="show(photo.user)">{{ photo.user }}</button>
                            </div>
                            <span class="glyphicon glyphicon-user"></span>
                        </div>
                    </div>
                    <div class="panel-body">
                        <img :src="getPic($index)" v-bind:alt="pic" class="photo_im scale">
                    </div>
                    <div class="panel-footer" v-bind:disabled="false">
                        <button type="button" class="btn btn_star btn-default" v-on:click="rate($index, 1)">
                            <img class="star" src="./1_star.jpg">
                            <span class="star_text">{{ photo.star_1 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-default" v-on:click="rate($index, 2)">
                            <img class="star" src="./2_star.jpg">
                            <span class="star_text">{{ photo.star_2 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-default" v-on:click="rate($index, 3)">
                            <img class="star" src="./3_star.jpg">
                            <span class="star_text">{{ photo.star_3 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-default" v-on:click="rate($index, 4)">
                            <img class="star" src="./4_star.jpg">
                            <span class="star_text">{{ photo.star_4 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-default" v-on:click="rate($index, 5)">
                            <img class="star" src="./5_star.jpg">
                            <span class="star_text">{{ photo.star_5 }}</span>
                        </button>
                        <button type="button" class="btn btn-danger" v-on:click="complain($index)">
                            <span>Жалоба</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
            data: function() {
                return {  photos: [] };
            },
            mounted: function() {
                this.$http.get("/feed", { bearer: true })
                .then(function(response) {
                    let temp_photos = response.body;
                    for (let i=0; i < temp_photos.length; i++){
                        this.$http.get("/test_rate?image="+temp_photos[i].image, { bearer: true })
                        .then(function(response) {
                            if (response.body[0] != undefined) {
                                temp_photos[i]["rate"] = response.body[0].rate;
                                temp_photos[i]["visible"] = true;
                            } else {
                                temp_photos[i]["visible"] = false;
                            }
                            
                        });
                    }
                    this.photos = temp_photos
                });
            },
        components: {
            navigation: require("./navigation.vue"),
            test: require("./test.vue")
        },
        methods: {
            getPic: function(index) {
                return '/uploads/' + this.photos[index].image;
                },
            show: function(name) {
                this.$http.get("/myphoto?name="+name, { bearer: true })
                .then(function(response) {
                    this.photos = response.body;
                });
            },
            rate: function(index, number) {
                this.$http.get("/rate?image="+this.photos[index].image+"&number="+number, { bearer: true })
                .then(function(response) {
                    window.location.reload();
                });
            },
            complain: function(index) {
                this.$http.get("/complain?image="+this.photos[index].image, { bearer: true })
                .then(function(response) {
                    alert("Жалоба успешно отправлена")
                });
            }
            }
    };
</script>
