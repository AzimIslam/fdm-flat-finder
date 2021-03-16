import { extendObservable } from 'mbox';

class UserStore{
    constructor(){
        extendObservable(this, {

            //shared states between users if they're logged in and current username
            LoggedIn : false,
            username: ''

        })
    }
}
export default new UserStore;