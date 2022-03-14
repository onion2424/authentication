import { initializeStores, authStore } from '@/utils/store-accessor';
import { createStore } from '~/.nuxt/store'

const router = {push: jest.fn()};

describe('authStore', () => {
    beforeEach(() => {
        // actions テスト
        // https://qiita.com/azukiazusa/items/8a158913c870bc0c8ba9
        initializeStores(createStore());
        // $router.pushを自前で実装しておく
        authStore.store.$router = router;
    })
    describe('actions', () => {

           test('onAuthStateChangedAction: ログイン時 => storeにユーザデータセット + "/myPage/"遷移', async () => {
            const mailaddress = 'onStateChanged@gmail.com';
            const data = {
                authUser: {
                    email: mailaddress,
                },
                claims: true,
            }
            
            expect(authStore.store.getters['auth/isLoggedIn']).toBeFalsy();
            await authStore.onAuthStateChangedAction(data);
            expect(authStore.store.getters['auth/isLoggedIn']).toBeTruthy();

            // 遷移先を確かめる
            // https://qiita.com/moritanzania/items/2f55c8c3894c66b93823
            expect(router.push).toBeCalledWith('/myPage/');
        });
        test('onAuthStateChangedAction: ログアウト時 => storeのユーザデータリセット + "/"遷移 ', async () => {
            const mailaddress = 'onStateChanged@gmail.com';
            const data = {
                authUser: {
                    email: mailaddress,
                },
                claims: true,
            }

            await authStore.onAuthStateChangedAction(data);
            expect(authStore.store.getters['auth/isLoggedIn']).toBeTruthy();

            await authStore.onAuthStateChangedAction({});
            expect(authStore.store.getters['auth/isLoggedIn']).toBeFalsy();
            expect(router.push).toBeCalledWith('/');
        })
    })
})
