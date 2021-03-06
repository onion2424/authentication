import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Auth from '@/store/auth'

// Auth accessor作成
let authStore: Auth;

function initializeStores(store: Store<any>): void {
    authStore = getModule(Auth, store);
}

export { initializeStores, authStore }