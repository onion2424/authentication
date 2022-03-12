<template>
    <div>
        <p>ログイン画面</p>
        <Login v-on:loggedIn="toMyPage"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Login from "@/components/Login.vue";
    export default Vue.extend({
        components: {
            Login
        },

        methods: {
            toMyPage(){
                this.$router.push('/myPage');
            }
        }
    });

</script>