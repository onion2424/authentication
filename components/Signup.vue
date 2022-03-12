<template>
  <div class="signup">
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
      <button @click="onClickSignUp">登録</button>
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

  methods: {
    onClickSignUp:  async function () {
      const message = await this.createAcount();
      alert(message);

    },

    // 登録処理
    async createAcount(){
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(this.mailaddress, this.password);
        return '成功';
      } catch(error: any) {
        // エラー時 
        const errorCode=error.code;
        const errorMessage=error.message;

        // エラーハンドリング 
        // https://firebase.google.com/docs/reference/js/auth?hl=ja#autherrorcodes
        // 使用するエラーコードを直接チェック
        // エラー項目の参考
        // https://qiita.com/marchin_1989/items/ade93705dbf3c72e1ce0
        if(errorCode==='auth/invalid-email') {
        } else if(errorCode==='auth/user-disabled') {
        } else if(errorCode==='auth/user-not-found') {
        } else if(errorCode==='auth/wrong-password') {
        } else if(errorCode==='auth/too-many-requests') {
        } else {
        }
        return errorMessage;
      }
    }

  },

  mounted: function(){

  }
})
</script>