
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionTree, Store } from "vuex";
import { ActionContext } from "vuex/types";
import { Context } from "@nuxt/types";
import { initializeStores } from '~/utils/store-accessor';



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
      //https://crieit.net/posts/vuex-module-decorators-nuxtServerInit-store-index-ts-actions
      // nuxtServerInitの処理
  
      if (server.$fire.auth === null) {
        throw 'nuxtServerInit Example not working - server.$fire.auth cannot be accessed.'
      }
  
      if (server.app.$fire.auth === null) {
        throw 'nuxtServerInit Example not working - server.$fire.auth cannot be accessed.'
      }

      if (server.res?.locals?.user) {
        const { allClaims: claims, ...authUser } = server.res.locals.user;
        await context.dispatch('onAuthStateChangedAction', {
          authUser,
          claims,
        })
      }
  }
}
export * from '~/utils/store-accessor'

