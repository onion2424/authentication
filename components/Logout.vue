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
        const message = await this.logout();
        message && window.alert(message);
      },

      async logout(): Promise<string>{
           try{
               await this.$fire.auth.signOut();
               return '';
           }catch(error:any){
               return 'ログアウト失敗';
           }
      }

  },
});
</script>