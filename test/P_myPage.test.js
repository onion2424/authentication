import myPage from "@/pages/myPage.vue";
import Logout from "@/components/Logout.vue";

import { shallowMount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';

let wrapper;

const router = {push: jest.fn()};

beforeEach(() => {
    wrapper = shallowMount(myPage, {
      mocks: { $router: router },
      stubs:{
        Logout:{
          template: "<h1 id='test'>test</h1>"
        }
      },
      computed: {
        mailaddress: jest.fn()
      }
    })
  })

describe('myPage', () => {
    test('<Logout />がある', ()=>{
        // スタブでテンプレートを変更して取得する
        const text = wrapper.find('h1#test').text();
        // テキストが取得できれば<Login />がある
        expect(text).toBe('test');
    });

    test('middlewareにauthenticatedが登録されている', () => {
      expect(wrapper.vm.$options.middleware).toContain("authenticated");
    });
});