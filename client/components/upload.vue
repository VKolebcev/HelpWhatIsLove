<style scoped>
    input[type="file"] {
        display: none;
    }

    form {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    img {
        width: 100%;
        height: 100%;
        padding: 5px;
    }
</style>

<template>
    <div>
        <test></test>
        <navigation></navigation>
        <div class="focus">
            <div class="focus__holder">
                <img v-bind:src="image">
                <form v-on:submit.prevent="upload">
                    <label class="btn btn-default btn-file">Выбрать...
                        <input type="file" accept="image/*"
                            name="image" v-on:change="preview">
                    </label>
                    <button type="submit" class="btn btn-default"
                        v-bind:disabled="!previewed">Загрузить!</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                image: "./1.jpg",
                previewed: false
            };
        },
        methods: {
            preview: function(event) {
                let files = event.target.files;
                if(files.length > 0) {
                    let self = this;
                    let reader = new FileReader();
                    reader.onload = function(readerEvent) {
                        self.image = readerEvent.target.result;
                        self.previewed = true;
                    };
                    reader.readAsDataURL(files[0]);
                }
            },
            upload: function(event) {
                let data = new FormData(event.target);
                this.$http.post("/upload", data, { bearer: true })
                .then(function() {
                    this.$router.push("/feed");
                });
            }
        },
        components: {
            navigation: require("./navigation.vue"),
            test: require("./test.vue")
        }
    };
</script>
