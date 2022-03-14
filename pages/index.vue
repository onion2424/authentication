<template>
    <div>
        <p>ホーム画面</p>
        <button @click='onClickMypage' id="toMyPage">マイページ</button>
        <button @click='onClickSignUp' id="toSignUp">ユーザ登録</button>
        <p id="loggedIn" v-show='isLoggedIn'>LoggedIn!!</p>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { authStore } from "@/store";

    export default Vue.extend({
        computed:{
            isLoggedIn(){
                return authStore.isLoggedIn;
            }
        },
        methods: {
            onClickMypage(){
                this.$router.push('/myPage/');
            },
            onClickSignUp(){
                this.$router.push('/signUp/');
            }
        }
    });

</script>