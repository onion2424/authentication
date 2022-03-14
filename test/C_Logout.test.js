import Logout from "@/components/Logout.vue";
import { shallowMount } from '@vue/test-utils';
import { createAcount, login, logout, getUser } from '@/test/firebase';

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

    window.alert = jest.fn();
});

describe('Logout', () => {
    // コンポーネントテスト
    test('Logoutコンポーネントが存在する', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    // テンプレートテスト
    describe('template', () => {

        test('ログアウトボタンが存在する', () => {
            const button = wrapper.find('button');
            expect(button.text()).toBe('ログアウト');
        });
    })

    // ログアウト
    describe('logout', () => {
        test('ログイン済み => ログアウト成功', async () => {
            let mailaddress = 'logout@gmail.com';
            let password = 'testtest';
            await createAcount(mailaddress, password);
            await login(mailaddress, password);
            await wrapper.vm.onClickLogout();

            // alertが呼ばれない
            expect(window.alert.mock.calls.length).toBe(0);

            
            // 成功時はuser取得不可
            const user = getUser();
            expect(user).toBeFalsy();
        });

        // 未ログイン時のログアウトはエラーにならない
        // test('未ログイン => ログアウト失敗', async () => {
        //     let mailaddress = 'logout2@gmail.com';
        //     let password = 'testtest';
        //     await createAcount(mailaddress, password);
        //     await wrapper.vm.onClickLogout();
            
        //     // alertが１度呼ばれる
        //     expect(window.alert.mock.calls.length).toBe(1);
        // });

    })

});