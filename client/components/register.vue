<style scoped>
    .tr {
        height: 400px;
        width: 3000px;
    }
</style>

<template>
    <div class="focus">
        <div class="tr"></div>
        <form class="focus__holder" v-on:keydown.enter="register">
            <input type="text" class="form-control"
                placeholder="Логин" v-model="username">
            <input type="password" class="form-control"
                placeholder="Пароль" v-model="passwordA">
            <input type="password" class="form-control"
                placeholder="Повтор пароля" v-model="passwordB">
            <button type="button" class="btn btn-danger btn-block"
                v-on:click="register">Зарегистрироваться!</button>
        </form>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                username: "",
                passwordA: "",
                passwordB: ""
            };
        },
        methods: {
            register: function() {
                const $ = require('jquery');
                const bootstrap = require('bootstrap');
                if(this.passwordA === this.passwordB) {
                    let promise = this.$auth.register(this.username, this.passwordA)
                    promise.then(function(response) {
                        this.$router.push("/login");
                    }).catch(function() {
                        alert("Данный пользователь уже зарегистрирован");
                        this.$router.push("/login");
                    });
                }
            }
        }
    };
</script>
