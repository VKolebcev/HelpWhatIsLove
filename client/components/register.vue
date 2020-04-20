<style scoped>
    .tr {
        height: 400px;
        width: 3000px;
    }
    #pswd_info {
        position:absolute;
        bottom: 20%;
        right:44%;
        width:250px;
        padding:15px;
        background:#fefefe;
        font-size:.875em;
        border-radius:5px;
        box-shadow:0 1px 3px #ccc;
        border:1px solid #ddd;
    }

    #pswd_info h4 {
        margin:0 0 10px 0;
        padding:0;
        font-weight:normal;
    }

    #pswd_info::before {
    content: "\25B2";
    position:absolute;
    top:-12px;
    left:45%;
    font-size:14px;
    line-height:14px;
    color:#ddd;
    text-shadow: none;
    display:block;
    }
    
    .invalid {
    color:#ec3f41;
    }
    
    .valid {
    color:#3a7d34;
    }
    
    #pswd_info {
    display:none;
    }

</style>

<template>
    <div class="focus">
        <div class="tr"></div>
        <form class="focus__holder" v-on:keydown.enter="register">
            <input type="text" class="form-control username"
                placeholder="Логин" v-model="username">
            <input type="password" class="form-control passwordA"
                placeholder="Пароль" v-model="passwordA">
            <input type="password" class="form-control passwordB"
                placeholder="Повтор пароля" v-model="passwordB">
            <button type="button" class="btn btn-danger btn-block"
                v-on:click="register" disabled>Зарегистрироваться!</button>
        </form>
        <div id="pswd_info">
            <h4>Пароль должен соответствовать критериям:</h4>
            <ul>
                <li id="letter">Минимум <strong>одна буква</strong></li>
                <li id="capital">Минимум <strong>одна заглавная буква</strong></li>
                <li id="number">Минимум <strong>одна цифра</strong></li>
                <li id="length">Быть не менее <strong>8 символов</strong></li>
            </ul>
        </div>

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
        mounted: function() {
                const $ = require('jquery');
                let length = false
                let letter = false
                let capital = false
                let number = false
                $('input[type=password]').keyup(function() {
                    let pswd = $(this).val();
                    if ( pswd.length < 8 ) {
                        $('#length').removeClass('valid').addClass('invalid');
                    } else {
                        $('#length').removeClass('invalid').addClass('valid');
                        length = true
                    }
                    if ( pswd.match(/[A-z]/) ) {
                        $('#letter').removeClass('invalid').addClass('valid');
                        letter = true
                    } else {
                        $('#letter').removeClass('valid').addClass('invalid');
                    }
                    if ( pswd.match(/[A-Z]/) ) {
                        $('#capital').removeClass('invalid').addClass('valid');
                        capital = true
                    } else {
                        $('#capital').removeClass('valid').addClass('invalid');
                    }
                    if ( pswd.match(/[0-9]/) ) {
                        $('#number').removeClass('invalid').addClass('valid');
                        number = true
                    } else {
                        $('#number').removeClass('valid').addClass('invalid');
                    }

                    if (length && letter && capital && number 
                            && $(".username").val().length != 0
                            && $(".passwordA").val().length != 0
                            && $(".passwordB").val().length != 0) {
                        $(".btn").prop("disabled", false); 
                    }
                }).focus(function() {
                    $('#pswd_info').show();
                }).blur(function() {
                    $('#pswd_info').hide();
                });     
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
