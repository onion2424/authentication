import Login from "~/pages/login.vue";
import { shallowMount } from '@vue/test-utils';
import { createAcount, login, getUser } from '@/test/firebase';

// ログインテスト
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

    window.alert = jest.fn()
});

describe('Login', () => {
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

    // 登録関連
    describe('login', () => {
        test('登録済み ⇒ ログイン成功', async ()=>{
            let mailaddress = 'login@gmail.com';
            let password = 'testtest';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            await createAcount(mailaddress, password);
            await wrapper.vm.onClickLogin();
            // alertが呼ばれない
            expect(window.alert.mock.calls.length).toBe(0);

            // 成功時はuserからmailaddressが取得できる
            const user = getUser();
            expect(user.email).toBe(mailaddress);
        });

        test('未登録 => ログイン失敗', async () => {
            let mailaddress = 'login2@gmail.com';
            let password = 'testtest';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            await wrapper.vm.onClickLogin();
            // alertが１度呼ばれる
            expect(window.alert.mock.calls.length).toBe(1);
        })

    })
});