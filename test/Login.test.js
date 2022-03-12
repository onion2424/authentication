import Login from "@/components/Login.vue";
import { shallowMount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';
import fetch from "node-fetch";

// ログインテスト

// emulator内のデータを削除
// beforeAll(() => {
//     // httpリクエストでemulator上のデータを全削除
//     // https://firebase.google.com/docs/reference/rest/auth/#section-auth-emulator-clearaccounts
//     // https://stackoverflow.com/questions/64845486/delete-all-users-from-the-new-firebase-auth-emulator
//     fetch('http://localhost:9099/emulator/v1/projects/onion2424-authentication/accounts', {
//     method: 'DELETE',
//     headers: {
//         'Authorization': 'Bearer owner'
//     }
//     });

//     //alertを文字列を返すだけにする
//     window.alert = (msg) => msg;
// });

let wrapper;
// 事前にfirebaseモジュールを使用している箇所をモックする
beforeEach(() => {
    //マウント処理
    wrapper = shallowMount(Login,{
        //mocksプロパティに$fireのモックを設定
        mocks:{
            $fire:{
                auth:{
                    //ログイン関数
                    signInWithEmailAndPassword: jest.fn((a, b) => {
                        //エミュレータ上で作動させる
                        return login(a, b);
                    })
                }
            }
        }
    });
});

describe.skip('Login', () => {
    //コンポーネントテスト
    test('Loginコンポーネントが存在する', () => {
        expect(wrapper.exists()).toBeTruthy();
    })

    // テンプレート関連
    describe('template', () => {
        test('メールアドレス入力', async () =>{
            let input = wrapper.find('input[data-bind=mailaddress]');
            expect(input.element.type == 'email').toBeTruthy();
            // バインドチェック 
            await wrapper.setData({
                mailaddress:'test@gmail.com'
                })
            expect(input.element.value).toBe('test@gmail.com');
        });

        test('パスワード入力', async () =>{
            let input = wrapper.find('input[data-bind=password]');
            expect(input.element.type == 'password').toBeTruthy();
            //バインドチェック
            await wrapper.setData({
                password:'test'
            })
            expect(input.element.value).toBe('test');
        });
    })

    //
    describe('login', () => {
        test('登録済み ⇒ ログイン', async ()=>{
            let mailaddress = 'login@gmail.com';
            let password = 'testtest';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            //モックされているか
            expect(() => wrapper.vm.onClickLogin()).not.toThrow();
        });

        test('ログイン ⇒ メッセージ確認', async () => {
            let mailaddress = 'login2@gmail.com';
            let password = 'testtest2';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            await createAcount(mailaddress, password);
            const message = await wrapper.vm.login();
            expect(message).toBe('成功');
        });
    })
});