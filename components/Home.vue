<template>
    <div>
        <p>ログイン</p>
        <Login v-on:loggedIn="toMyPage"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Login from "@/components/Login.vue";
    //import { authStore } from "@/store";

    export default Vue.extend({
        components: {
            Login
        },

        methods: {
            toMyPage(){
                //this.$router.push('/myPage');
                //alert(authStore.isLoggedIn);
            }
        }
    });

</script>