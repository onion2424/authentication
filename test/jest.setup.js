//https://nextat.co.jp/staff/archives/252

import fetch from "node-fetch";
// emulator内のデータを削除
beforeEach(() => {
    // httpリクエストでemulator上のデータを全削除
    // https://firebase.google.com/docs/reference/rest/auth/#section-auth-emulator-clearaccounts
    // https://stackoverflow.com/questions/64845486/delete-all-users-from-the-new-firebase-auth-emulator
    fetch('http://localhost:9099/emulator/v1/projects/authentication-94c1a/accounts', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer owner'
    }
    });

    //alertを文字列を返すだけにする
    window.alert = (msg) => msg;
});