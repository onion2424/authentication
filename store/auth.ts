import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

// 書き方参照
// https://wattanx.hatenablog.com/entry/2020/12/06/225447


// 実装参照
// https://zenn.dev/watson_sei/articles/f4db7312494525#vuex%E4%BD%9C%E6%88%90
// https://firebase.nuxtjs.org/service-options/auth/

// interface
interface user {
    authUser: any;
};
interface authData {
    authUser: any;
    claims: any;
}


@Module({ stateFactory: true, namespaced: true, name: 'auth' })
export default class Auth extends VuexModule{
    // state : data() property
    private user: user = {authUser: null};
    public store: any;


    // stateはゲッターによって取得する
    public get isLoggedIn(): boolean {
        return !!this.user.authUser;
    }

    // mutations : stateを変更するメソッド(actions経由で使用)
    @Mutation
    private async RESET_USER(){
        this.user.authUser = null;
    }
    @Mutation
    private async SET_USER(data:authData){
        const authUser = data.authUser;
        const claims = data.claims;
        
        this.user.authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            displayName: authUser.displayName,
            photoURL: claims.picture,
            isAdmin: claims.admin
        }

    }
 
    // actions : その他のメソッド
    @Action({rawError: true })
    public async onAuthStateChangedAction(data:authData) {
        const authUser = data?.authUser;
        const claims = data?.claims;
        console.log(data);
        console.log(this);
        if (!authUser) {
          // ログアウトしたらページ遷移します
          console.log('return');
          
          await this.RESET_USER();
          this.store.$router.push('/');
          return
        }
    
        if (authUser && claims) {
          try {
        // ログインしたらページ遷移します
            console.log('移動');
            await this.SET_USER(data);
            this.store.$router.push('/myPage/');
          } catch (e) {
            console.error(e)
          }
        }
    
      
    }

}