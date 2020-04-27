<template>
    <div style="display: none">

    </div>
</template>

<script>
    module.exports = {
        mounted: function() {          
            if(!this.$auth.isLoggedIn()) {
                this.$router.push("/login");
            }
        }
    };
</script>
