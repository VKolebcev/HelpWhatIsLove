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
                }
            }
    };
</script>
