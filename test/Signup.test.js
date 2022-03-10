import Signup from "@/components/Signup.vue";
import { shallowMount } from '@vue/test-utils';
import auth from '@/test/firebase';
import {createUserWithEmailAndPassword, deleteUser} from 'firebase/auth';
import fetch from "node-fetch";

// ユーザ登録テスト

// emulator内のデータを削除
beforeAll(() => {
    // httpリクエストでemulator上のデータを全削除
    // https://firebase.google.com/docs/reference/rest/auth/#section-auth-emulator-clearaccounts
    // https://stackoverflow.com/questions/64845486/delete-all-users-from-the-new-firebase-auth-emulator
    fetch('http://localhost:9099/emulator/v1/projects/onion2424-authentication/accounts', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer owner'
    }
    });
})

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
                        return createUserWithEmailAndPassword(auth, a, b);
                        //プロミスを返す
                        //eturn Promise.resolve();
                    })
                }
            }
        }
    });
})


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
    
    // 

    test('登録が出来る', async () => {
        //expect(wrapper.vm.$fire.auth.createUserWithEmailAndPassword()).toBeTruthy();
        await wrapper.setData({
            mailaddress: 'test@gmail.com',
            password:'testtest'
        });
        expect(wrapper.vm.signUp()).toBeTruthy();
    })

})
