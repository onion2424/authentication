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
          if (await this.logout()){
              console.log('成功')!
          }
          return true;
      },

      async logout(){
           try{
               await this.$fire.auth.signOut();
               return true;
           }catch(error:any){
               alert(error.message);
               return false;
           }
      }

  },
});
</script>