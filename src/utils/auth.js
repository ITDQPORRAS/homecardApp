// import { Cookies } from 'quasar'
// const TokenKey = 'r4nz111';
// export function getToken() {
//     return Cookies.get(TokenKey) || false;
// }
// export function setToken(token) {
//     return Cookies.set(TokenKey, token);
// }
// export function removeToken() {
//     return Cookies.remove(TokenKey);
// }

// import { LocalStorage } from 'quasar'
// const TokenKey = 'HoMeCard';
// export function getToken() {
//     return LocalStorage.getItem(TokenKey);
// }
// export function setToken(token) {
//     return LocalStorage.set(TokenKey, token);
// }
// export function removeToken() {
//     return LocalStorage.remove(TokenKey);
// }


const TokenKey = 'HoMeCard';
const info = "infox"
const barangay = "barangay"
const member = "member"
const selected = "selected"
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export function getToken() {
    return ls.get(TokenKey);
}
export function setToken(token) {
    return ls.set(TokenKey, token);
}
export function removeToken() {
    return ls.remove(TokenKey);
}
export function setInfo(data) {
    return ls.set(info, data);
}
export function getInfo() {
    return ls.get(info);
}
export function setMember(data) {
    return ls.set(member, data);
}
export function getMember() {
    return ls.get(member);
}
export function getBrgy() {
    return ls.get(barangay);
}
export function setBrgy(brgy) {
    return ls.set(barangay, brgy);
}
export function setSelected(data) {
    return ls.set(selected, data);
}
export function getSelected() {
    return ls.get(selected);
}