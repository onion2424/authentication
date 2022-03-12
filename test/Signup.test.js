import Signup from "@/components/Signup.vue";
import { shallowMount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';
import fetch from "node-fetch";

// ユーザ登録テスト

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
    wrapper = shallowMount(Signup,{
        //mocksプロパティに$fireのモックを設定
        mocks:{
            $fire:{
                auth:{
                    //ユーザ登録関数
                    createUserWithEmailAndPassword: jest.fn((a, b) => {
                        //エミュレータ上で作動させる
                        return createAcount(a, b);
                    })
                }
            }
        }
    });
});


describe.skip('Signup', () => {
    // コンポーネントテスト
    test('Signupコンポーネントが存在する', () => {
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
            expect(input.element.value).toBe('test@gmail.com')
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
    
    // 登録関連
    describe('signup', () => {
        test('登録 ⇒ ログイン確認', async () => {
            let mailaddress = 'test@gmail.com';
            let password = 'testtest';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            expect(() => {wrapper.vm.onClickSignUp()}).not.toThrow();
            expect(() => {login(mailaddress, password)}).not.toThrow();
        });

        test('登録 ⇒ メッセージ確認', async () => {
            let mailaddress = 'test2@gmail.com';
            let password = 'testtest2';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            const message = await wrapper.vm.createAcount();
            expect(message).toBe('成功');
        });

        // エラー時

    })


})
