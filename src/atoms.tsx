import {atom, selector} from "recoil";

/*๐จ์ฃผ์์ฌํญ๐จ
  1.recoil ์๋ฌ๋ฐ์ :TS2307: Cannot find module 'recoil' or its corresponding type declarations
  - ์์ธ: vsc์ ์บ์ฑ๋ฌธ์  === vsc๊ฐ ๋ณํ์ ๊ฐ์ง๋ฅผ ๋ชปํจ === "๊ป๋ค๊ฐ ํค๋ฉด๋จ" 
  2.'export'๋ฅผ ๋ถ์ด์ง ์์ผ๋ฉด [atoms.tsx Module]์์ '๋ก์ปฌ'๋ก ์ ์ธํ๋ค๊ณ  ์ธ์ง 
  ๐global state๐
  1. state management ์์ฅ 
   - global state๋ฅผ ์ดํ๋ฆฌ์ผ์ด์์์ ๋ถ๋ฆฌ๋ ๊ณต๊ฐ์์ ๊ด๋ฆฌํ๋ ๊ฒ์ด ํจ์จ์ ์ด๋ฉฐ ํจ์ฉ์ฑ๋ ๋๋ค๊ณ  ๋ณผ ์ ์๋ค  

  */
 /*
1.๐๋ฆฌ์ฝ์ผ ๊ฐ์ผ๋ก 'ํ์ดํ ํจ์' ๋๋ '์ผ๋ฐ ํจ์' ๊ฐ๋ฅํ๋ฉฐ ํ ๋นํ์ง๋ ๋ชป ํจ 
    'ํ์ดํ ํจ์'๋ ์ฐ๋ณ์ ํ๊ฐํ๋ฉฐ ๊ฒฐ๊ณผ๋ ๋ฆฌํดํจ  
   export const Func = atom({
    key:"func",
    default: () => {}
  
   }) 
2. A Selector represents a piece of derived state 
 - 'derived state': 'state' ๋ฅผ ์๋ ฅ ๋ฐ์์ ๊ทธ๊ฑธ ๋ณํํด ๋ฐํํ๋ ์์ํจ์๋ฅผ ๊ฑฐ์ณ ๋ฐํ๋ ๊ฐ    
 - 
*/ 


export enum Categories {
   "TO_DO" = "TO_DO",
   "DOING" = "DOING",
   "DONE" = "DONE",
   
}
export interface INewCategory {
   NewCategory: string;
}
export const NewCategoryState = atom<INewCategory[]>({
   key:"newCategories",
   default:[],
})

export const categoryState = atom<Categories>({
   key:"category",
   default:Categories.TO_DO,
})

export interface IToDo {
   text: string;
   id:number;
   category:string;
 }

export const toDoState = atom<IToDo[]>({
   key: "toDo",
   default:[],
 })


// category์ ๋ฐ๋ผ toDos๋ฅผ ๋ถ๋ฅํ๋ 'selector'
export const toDoSelector = selector({
   key:"toDoSelector",
   get: ({ get }) => {
      const toDos = get(toDoState);
      const category = get(categoryState)

     return (
      toDos.filter((todo) => todo.category === category)
      )
   }
})

