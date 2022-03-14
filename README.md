# ログイン機能 (firebase/authentication + nuxt.js + jest）

firebaseのauthenticationを用いた新規登録、ログイン、ログアウト

# 環境

Firebase/Authentication

nuxt.js (Typescript)

  ・nuxt/firebase
  
  ・
  
jest

  ・vue-test-utils
  
# ページ構成

## ホーム画面
 
 ○ マイページボタン
 
  ・未ログイン
   
    － ログイン画面に遷移
     
     
  ・ログイン済み
   
    － マイページに遷移
 
 
 ○ ユーザ登録ボタン
 
    － ユーザ登録画面に遷移
 
 
## ログイン画面
 
○ 登録ボタン

  ・ログイン成功
    
    － マイページに遷移
    
    
  ・ログイン失敗
    
    － アラート
      
## ユーザ登録画面

○ 登録ボタン
  
  ・登録成功
      
    － マイページに遷移
      
     
  ・登録失敗
      
    － アラート
    

# 簡単な仕様
○ Vuex/store
  
    ユーザ情報(メールアドレス)をstoreで管理
      
    認証状態が変更されたときに発火する関数でstoreのユーザ情報をセット、遷移を行う
      
  
○ ミドルウェア
  
    マイページに設定、未ログインであればログイン画面にリダイレクトさせる
    

○ jest
  
  
  
  



