import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";

import { mount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';

let wrapper;

//https://stackoverflow.com/questions/50977862/how-to-test-url-change-with-jest
global.window = {location: {pathname: null}};

const router = {push: jest.fn()};

beforeEach(() => {
    wrapper = mount(Home, {
      mocks: { $router: router }
    })
  })

describe('Template', () => {
    test('ログインボタンがある', ()=>{
        const login = wrapper.getComponent(Login);
        expect(login.contains('button')).toBeTruthy();
    });

});

describe('login', () => {
    test('ログイン => 画面切り替え', async () => {
        await wrapper.vm.toMyPage();
        //https://qiita.com/moritanzania/items/2f55c8c3894c66b93823
        expect(router.push).toBeCalledWith('/myPage');

        //https://qiita.com/kanimisounium/items/9f9e36be2c31288cac24
        console.log(wrapper.html());
    });
});