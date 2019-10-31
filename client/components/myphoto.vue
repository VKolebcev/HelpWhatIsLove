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

    .photo img {
        width: 100%;
        height: 100%;
    }

    .panel-footer
    {
        background-color: white;
    }
    .del {
        margin: 0 0 0 620px;
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
                            <span class="glyphicon glyphicon-user"></span>
                        </div>
                    </div>
                    <div class="panel-body">
                        <img :src="getPic($index)" v-bind:alt="pic">
                    </div>
                    <div class="panel-footer">
                        <span class="panel-title">{{ photo.date.substring(0,10) }}</span>
                        <a class="del" v-on:click="$emit('deletePhoto($index)')">Удалить</a>
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
                }
            },
            deletePhoto: function() {
                console.log(index);
                this.$http.get("/delete", this.photos[index].image, { bearer: true })
                .then(function(response) {
                    this.$router.push("/myphoto");
                }).catch(function(response) {
                    console.log(response);
                });
            }
    };
</script>
