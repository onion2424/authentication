import { Context } from '@nuxt/types'

export default ({ store, route, redirect }: Context) => {
    console.log(route.name);
    // if (!store.getters.isLoggedIn && route.name !== 'index') {
    //     redirect('/');
    // }else {
    //     store.$router.push(route.path || '/');
    // }
    console.log(store);
    if(route.name !== 'index' && !store.getters['auth/isLoggedIn']){
        redirect('/');
    }
}