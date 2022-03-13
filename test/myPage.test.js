import myPage from "@/components/myPage.vue";
import Logout from "@/components/Logout.vue";

import { mount } from '@vue/test-utils';
import { createAcount, login } from '@/test/firebase';

let wrapper;

const router = {push: jest.fn()};

beforeEach(() => {
    wrapper = mount(myPage, {
      mocks: { $router: router }
    })
  })

describe('Template', () => {
    test('ログアウトボタンがある', ()=>{
        const logout = wrapper.getComponent(Logout);
        expect(logout.contains('button')).toBeTruthy();
    });

});

describe('login', () => {
    test('GET不可', async () => {
        await wrapper.vm.toMyPage();
        //https://qiita.com/moritanzania/items/2f55c8c3894c66b93823
        expect(router.push).toBeCalledWith('/myPage');

        //https://qiita.com/kanimisounium/items/9f9e36be2c31288cac24
        console.log(wrapper.html());
    });

});