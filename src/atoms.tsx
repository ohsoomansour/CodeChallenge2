import {atom} from "recoil";

/*recoil 에러발생 :TS2307: Cannot find module 'recoil' or its corresponding type declarations
  - 원인: vsc의 캐싱문제 === vsc가 변화에 감지를 못함 === "껐다가 키면됨" 
*/

export const darkAtom = atom({
  key: "dark",
  default:true,
})