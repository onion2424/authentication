
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionTree, Store } from "vuex";
import { ActionContext } from "vuex/types";
import { Context } from "@nuxt/types";
import { initializeStores } from '~/utils/store-accessor';

//https://crieit.net/posts/vuex-module-decorators-nuxtServerInit-store-index-ts-actions


// RootStateを追加
export const state = () => ({});
export type RootState = ReturnType<typeof state>;

const initializer = (store: Store<any>) => initializeStores(store);

export const plugins = [initializer]

// Rootのactionsを追加
export const actions: ActionTree<any, any> = {
    nuxtServerInit: async (
      context: ActionContext<RootState, RootState>,
      server: Context
    ) => {
      // nuxtServerInitの処理
    //   if (this.$fire.auth === null) {
    //     throw 'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
    //   }
  
      if (server.$fire.auth === null) {
        throw 'nuxtServerInit Example not working - server.$fire.auth cannot be accessed.'
      }
  
      if (server.app.$fire.auth === null) {
        throw 'nuxtServerInit Example not working - server.$fire.auth cannot be accessed.'
      }
      
      // onAuthStateChangedイベントを設定
      //server.$fire.auth.onAuthStateChanged(function(user){console.log('hey')});

      if (server?.res?.locals?.user) {
        const { allClaims: claims, ...authUser } = server.res.locals.user;
        await context.dispatch('onAuthStateChangedAction', {
          authUser,
          claims,
        })
      }
  }
}
export * from '~/utils/store-accessor'

