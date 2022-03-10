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
      <button @click="signUp">登録</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
let auth:any = null;
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
    signUp: function () {
      //this.$fire.auth.createUserWithEmailAndPassword(this.mailaddress, this.password)
      this.$fire.auth.createUserWithEmailAndPassword(this.mailaddress, this.password)
    .then(
        // 成功時の処理
      )
      .catch(
        // エラー時の処理 
      )

    return true;
    }
  },

  mounted:function(){
    //auth.useEmulator('http://localhost:9099');
  }
})
</script>