import {atom, selector, useRecoilValue} from "recoil";

/*🚨주의사항🚨
  1.recoil 에러발생 :TS2307: Cannot find module 'recoil' or its corresponding type declarations
  - 원인: vsc의 캐싱문제 === vsc가 변화에 감지를 못함 === "껐다가 키면됨" 
  2.'export'를 붙이지 않으면 [atoms.tsx Module]안에 '로컬'로 선언한다고 인지 
  🌎global state🌎
  1. state management 입장 
   - global state를 어플리케이션에서 분리된 공간에서 관리하는 것이 효율적이며 효용성도 높다고 볼 수 있다  

  */
 /*
1.🚀리코일 값으로 '화살표 함수' 또는 '일반 함수' 가능하며 할당하지는 못 함 
    '화살표 함수'는 우변을 평가하며 결과도 리턴함  
   export const Func = atom({
    key:"func",
    default: () => {}
  
   }) 
2. A Selector represents a piece of derived state 
 - 'derived state': 'state' 를 입력 받아서 그걸 변형해 반환하는 순수함수를 거쳐 반환된 값    
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


// category에 따라 toDos를 분류하는 'selector'
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

