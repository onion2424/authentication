import Logout from "@/components/Logout.vue";
import { shallowMount } from '@vue/test-utils';
import { createAcount, login, logout } from '@/test/firebase';

// ログアウトテスト

let wrapper;
// 事前にfirebaseモジュールを使用している箇所をモックする
beforeEach(() => {
    //マウント処理
    wrapper = shallowMount(Logout,{
        //mocksプロパティに$fireのモックを設定
        mocks:{
            $fire:{
                auth:{
                    //ログイン関数
                    signOut: jest.fn(() => {
                        //エミュレータ上で作動させる
                        return logout();
                    })
                }
            }
        }
    });
});

describe.skip('Logout', () => {
    // コンポーネントテスト
    test('Logoutコンポーネントが存在する', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    // テンプレートテスト
    describe('template', () => {
        test('ログアウトボタンが存在する', () => {
            expect(wrapper.contains('button')).toBeTruthy();
        });
    })

    // ログアウト
    describe('logout', () => {
        test('ログアウト 無意味', async () => {
            let mailaddress = 'logout@gmail.com';
            let password = 'testtest';
            await createAcount(mailaddress, password);
            await login(mailaddress, password);
            expect(() => {wrapper.vm.onClickLogout()}).not.toThrow();
        })

        test('ログアウト => メッセージ', async () => {
            let mailaddress = 'logout2@gmail.com';
            let password = 'testtest2';
            await createAcount(mailaddress, password);
            await login(mailaddress, password);
            const message = await wrapper.vm.logout();
            expect(message).toBe('成功');
        })
    })

});