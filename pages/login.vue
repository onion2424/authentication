<template>
  <div class="login">
    <p>ログイン画面</p>
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
          const message = await this.login();
          // エラー時はアラート
          message && window.alert(message);
      },

      async login(): Promise<string>{
           try{
               await this.$fire.auth.signInWithEmailAndPassword(this.mailaddress, this.password);
               return '';
           }catch(error:any){
              // エラーハンドリング 
              // https://firebase.google.com/docs/reference/js/auth?hl=ja#autherrorcodes
              // 使用するエラーコードを直接チェック
              // エラー項目の参考
              // https://qiita.com/marchin_1989/items/ade93705dbf3c72e1ce0

              // エラー時 
              const errorCode=error.code;
              const errorMessage=error.message;
              let ret = '';

              if(errorCode==='auth/invalid-email') {
                ret = 'メールアドレスの形式が間違っています';
              } else if(errorCode==='auth/user-disabled') {
                ret = 'ユーザが無効になっています';
              } else if(errorCode==='auth/user-not-found') {
                ret = 'ユーザが存在しません';
              } else if(errorCode==='auth/wrong-password') {
                ret = 'パスワードが間違っています';
              } else if(errorCode==='auth/too-many-requests') {
                ret = 'パスワードが何度も間違っています';
              } else { // その他
                ret = '認証に失敗しました';
              }

              return ret;
           }
      }

  },

  mounted:function(){

  }
});

</script>