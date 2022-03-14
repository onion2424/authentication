import index from "~/pages/index.vue";
import Login from "~/pages/login.vue";

import { mount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';

let wrapper;

//https://stackoverflow.com/questions/50977862/how-to-test-url-change-with-jest
//global.window = {location: {pathname: null}};

const router = {push: jest.fn()};

beforeEach(() => {
  wrapper = mount(index, {
    mocks: { $router: router },
  })
})

describe('index', () => {

    test('マイページボタンクリック時', ()=>{
        // 
        const button = wrapper.find('button#toMyPage');

        button.trigger('click');

        expect(router.push).toBeCalledWith('/myPage/');

    });

    test('ユーザ登録ボタンクリック時', ()=>{
      const button = wrapper.find('button#toSignUp');

      button.trigger('click');

      expect(router.push).toBeCalledWith('/signUp/');
    })
});
