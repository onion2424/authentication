<template>
  <div class="signup">
    <p>登録画面</p>
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
      message && window.alert(message);
    },

    // 登録処理
    async createAcount(): Promise<string>{
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(this.mailaddress, this.password);
        return '';
      } catch(error: any) {

              // エラーハンドリング
              // https://masalib.hatenablog.com/entry/2020/11/26/000000
              const errorCode=error.code;
              const errorMessage=error.message;
              let ret = '';

              if(errorCode==='auth/invalid-email') {
                ret = 'メールアドレスの形式が間違っています';
              } else if(errorCode==='auth/email-already-in-use') {
                ret = 'メールアドレスがすでに使用されています';
              } else if(errorCode==='auth/weak-password') {
                ret = 'パスワードが弱すぎます(6文字以上)';
              } else if(errorCode==='auth/network-request-failed') {
                ret = '通信エラー';
              } else { // その他
                ret = '登録に失敗しました';
              }

              return ret;
      }
    }

  },

  mounted: function(){

  }
})
</script>