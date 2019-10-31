<style scoped>
    .tr {
        height: 400px;
        width: 3000px;
    }
</style>

<template>
    <div class="focus">
        <div class="tr"></div>
        <form class="focus__holder" v-on:keydown.enter="login">
            <input type="text" class="form-control"
                placeholder="Логин" v-model="username">
            <input type="password" class="form-control"
                placeholder="Пароль" v-model="password">
            <button type="button" class="btn btn-primary btn-block"
                v-on:click="login">Войти!</button>
            <router-link to="/register">Регистрация</router-link>
        </form>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                username: "",
                password: ""
            };
        },
        methods: {
            login: function() {
                this.$auth.logIn(this.username, this.password)
                .then(function(response) {
                    this.$router.push("/feed");
                }).catch(function(){
                    alert("Неверные данные")
                });
            }
        }
    };
</script>
