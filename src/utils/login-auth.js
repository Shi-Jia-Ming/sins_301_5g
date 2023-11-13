import Cookies  from "js-cookie";

const TokenKey = 'userId';

export function isLogin() {
    return Cookies.get(TokenKey);
}