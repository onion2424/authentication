<template>
  <div>
    <p>マイページ</p>
    <div>
      <p>your mail address : {{mailaddress}}</p>
    </div>
    <Logout />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logout from "@/components/Logout.vue";
import { authStore } from "@/store";

export default Vue.extend({
  middleware: 'authenticated',
  name: 'MyPage',
  components: {
    Logout
  },
  computed:{
    mailaddress(){
      return authStore.user.authUser.email || 'unknown';
    }
  }
})
</script>
