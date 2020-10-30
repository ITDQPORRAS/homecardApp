import { Cookies } from 'quasar'
const TokenKey = 'r4nz111';
export function getToken() {
    return Cookies.get(TokenKey) || false;
}
export function setToken(token) {
    return Cookies.set(TokenKey, token);
}
export function removeToken() {
    return Cookies.remove(TokenKey);
}