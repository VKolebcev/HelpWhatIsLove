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

    .photo_im {
        max-width: 500px;
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
                        <img :src="getPic($index)" v-bind:alt="pic" class="photo_im">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
            data: function() {
                return { photos: [] };
            },
            mounted: function() {
                this.$http.get("/feed", { bearer: true })
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
            show: function(name) {
                this.$http.get("/myphoto?name="+name, { bearer: true })
                .then(function(response) {
                    this.photos = response.body;
                });;
            }
            }
    };
</script>
