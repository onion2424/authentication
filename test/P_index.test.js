import index from "~/pages/index.vue";
import Login from "~/pages/login.vue";

import { shallowMount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';
import { authStore } from "~/store";

let wrapper;

//https://stackoverflow.com/questions/50977862/how-to-test-url-change-with-jest
//global.window = {location: {pathname: null}};

const router = {push: jest.fn()};
let myMock = jest.fn();

beforeEach(() => {
  wrapper = shallowMount(index, {
    mocks: { 
      $router: router,
    },
    computed: {
      isLoggedIn: () => false
    }
  });

})

describe('index', () => {

    test('マイページボタンクリック時', ()=>{
        
        const button = wrapper.find('button#toMyPage');

        button.trigger('click');
        // /myPage/に遷移
        expect(router.push).toBeCalledWith('/myPage/');

    });

    test('ユーザ登録ボタンクリック時', ()=>{
      const button = wrapper.find('button#toSignUp');

      button.trigger('click');
      // /signUp/に遷移
      expect(router.push).toBeCalledWith('/signUp/');
    });

    test('ログイン時はLoggedIn', async () => {
      const loggedTest = shallowMount(index, {
        mocks: { 
          $router: router,
        },
        computed: {
          isLoggedIn: () => true
        }
      });
      const elm = loggedTest.find('p#loggedIn');
      expect(elm.isVisible()).toBe(true);

    })

    test('未ログイン時はLoggedInなし', async () => {
      const elm = wrapper.find('p#loggedIn');
      expect(elm.isVisible()).toBe(false);

    })
});
