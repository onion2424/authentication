import { Context } from '@nuxt/types'

// ページ遷移時に実行するミドルウェア
export default ({ store, route, redirect }: Context) => {
    //未ログイン時は'/'にリダイレクト
    if(!store.getters['auth/isLoggedIn']){
        redirect('/login');
    }
}