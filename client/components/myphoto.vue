<style scoped>
    .feed {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .photo {
        max-width: 800px;
        margin-bottom: 50px;
    }

    .photo__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .photo .panel-body img {
        width: 100%;
        height: 100%;
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
        padding-left: 10px;
        padding-right: 10px;
        width: auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .star_text {
        font-size: 18px;
        padding-left: 10px;
    }

    .del {
        width: 200px;
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
                            <span class="panel-title">{{ photo.user }}</span>
                            <span class="panel-title">{{ photo.date.substring(0,10) }}</span>
                            <span class="glyphicon glyphicon-user"></span>
                        </div>
                    </div>
                    <div class="panel-body">
                        <img :src="getPic($index)" v-bind:alt="pic">
                    </div>
                    <div class="panel-footer">
                        <button type="button" class="btn btn-danger del" v-on:click="deletePhoto($index)">Удалить</button>
                        <button type="button" class="btn btn_star btn-success" disabled>
                            <img class="star" src="./1_star.jpg">
                            <span class="star_text">{{ photo.star_1 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-success" disabled>
                            <img class="star" src="./2_star.jpg">
                            <span class="star_text">{{ photo.star_2 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-success" disabled>
                            <img class="star" src="./3_star.jpg">
                            <span class="star_text">{{ photo.star_3 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-success" disabled>
                            <img class="star" src="./4_star.jpg">
                            <span class="star_text">{{ photo.star_4 }}</span>
                        </button>
                        <button type="button" class="btn btn_star btn-success   " disabled>
                            <img class="star" src="./5_star.jpg">
                            <span class="star_text">{{ photo.star_5 }}</span>
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
                return {
                    photos: [],
                };
            },
            mounted: function() {
                this.$http.get("/myphoto", { bearer: true })
                .then(function(response) {
                    this.photos = response.body;
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
                deletePhoto: function(index) {
                    let data = this.photos[index].image;
                    console.log(data);
                    this.$http.get("/delete?photo="+data, { bearer: true })
                    .then(function(response) {
                        this.$router.push("/myphoto");
                    }).catch(function(response) {
                        console.log("Ошибка при удалении")
                    });
                }
            }              
    };
</script>
