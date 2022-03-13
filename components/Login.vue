<template>
  <div class="login">
    <table>
        <tr>
          <th>メールアドレス：</th>
        </tr>
        <tr>
          <td><input type="email" v-model="mailaddress" data-bind="mailaddress" /></td>
        </tr>
        <tr>
          <th>パスワード：</th>
        </tr>
        <tr>
          <td><input type="password" v-model="password" data-bind="password" /></td>
        </tr>
      </table>
      <button @click="onClickLogin">ログイン</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// dataオブジェクトのそれぞれのプロパティの型をまとめて定義し、dataの返り値の型として注釈する
export type DataType = {
  mailaddress: string;
  password: string;
}

export default Vue.extend({
  data(): DataType{
    return {
      mailaddress: "",
      password: ""
    }
  },

  methods:{
      async onClickLogin(){
          if(await this.login()){
            this.$emit('loggedIn');
          } 
      },

      async login(){
           try{
               let obj = await this.$fire.auth.signInWithEmailAndPassword(this.mailaddress, this.password);
               console.log(obj);
               return true;
           }catch(error){
               return false;
           }
      }

  },

  mounted:function(){

  }
});

</script>