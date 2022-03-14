import Signup from "~/pages/signup.vue";
import { shallowMount } from '@vue/test-utils';
import { createAcount, login, getUser } from '@/test/firebase';

// ユーザ登録テスト

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

    window.alert = jest.fn();
});


describe('Signup', () => {
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
        test('登録成功', async () => {
            let mailaddress = 'signup@gmail.com';
            let password = 'testtest';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            await wrapper.vm.onClickSignUp();

            // alertが１度も呼ばれてない
            expect(window.alert.mock.calls.length).toBe(0);

            // ログインしてユーザ情報を取得
            await login(mailaddress, password);
            const user = getUser();
            // emailが一致すれば成功
            expect(user.email).toBe(mailaddress);
        });

        
        test('登録失敗', async () => {
            let mailaddress = 'signup2@gmail.com';
            let password = 'testtest';
            await wrapper.setData({
                mailaddress: mailaddress,
                password: password
            });
            // あらかじめ同じメールアドレスで登録する
            await createAcount(mailaddress, password);

            await wrapper.vm.onClickSignUp();

            // alertが１度呼ばれる
            expect(window.alert.mock.calls.length).toBe(1);

        });

    })


})
