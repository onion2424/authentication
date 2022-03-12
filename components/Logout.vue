<template>
  <div class="logout">
      <button @click="onClickLogout">ログアウト</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods:{
      async onClickLogout(){
          this.logout();
          return true;
      },

      async logout(){
           try{
               await this.$fire.auth.signOut();
               return '成功';
           }catch(error:any){
               return error.message;
           }
      }

  },
});
</script>