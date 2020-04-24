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
    span {
        font-size: 10px;
        margin: 5px;
    }

    .danger {
        color: red;
    }
</style>

<template>
    <div>
        <test></test>
        <navigation></navigation>
        <div class="focus">
            <div class="focus__holder">
                <img id="img" v-bind:src="image">
                <form v-on:submit.prevent="upload">
                    <label class="btn btn-default btn-file">Выбрать...
                        <input type="file" id="file" accept="image/x-png,image/gif,image/jpeg"
                            name="image" >
                    </label>
                    <button type="submit" class="btn btn-default submit"
                        v-bind:disabled="!previewed">Загрузить!</button>
                </form>
                <span>Файл должен быть загружен в формате *.png, *.gif, *.jpeg</span>
                <span>Максимальный размр загружаемоего файла 2 Мб</span>
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
        mounted: function() {
            const $ = require('jquery');
            let uploadField = document.getElementById("file");

            uploadField.onchange = function(event) {
                if(this.files[0].size > 16777216){
                alert("Размер файла привышает 2 Мб!");
                $('span').addClass('danger');
                this.value = "";
                this.previewed = false; 
                } else {
                    let files = event.target.files;
                    if(files.length > 0) {
                        let reader = new FileReader();
                        reader.onload = function(readerEvent) {
                            $("#img").attr("src",readerEvent.target.result);
                            $(".submit").prop("disabled", false);
                        };
                    reader.readAsDataURL(files[0]);
                    }
                }
            };
        },
        methods: {
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
