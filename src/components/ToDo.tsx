import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, NewCategoryState, toDoState } from "../atoms";

/* 
  [
    {
        "text": "5",
        "id": 1660538626206,
        "category": "TO_DO"
    },
    {
        "text": "4",
        "id": 1660538625900,
        "category": "TO_DO"
    },
    {
        "text": "3",
        "id": 1660538625408,
        "category": "TO_DO"
    },
    {
        "text": "2",
        "id": 1660538625090,
        "category": "TO_DO"
    },
    {
        "text": "1",
        "id": 1660538624744,
        "category": "TO_DO"
    }
]
  Q. category를 바꾸려면 어떻게 해야 할까 ? 
  A. 1.('state'를 mutate안된다 !) 🔑 toDo의 'index'를 알면 추적이 가능 🔑
     2. 우리는 수정하고자 하는 to do의 경로를 알아야 한다
      > targetindex, oldToDo로 알 수 있음  
     3. "reaplce the to do in the index 'oldToDo' with 'newToDo' "
  */
function ToDo({text, category, id}:IToDo) {
  const NewCategories = useRecoilValue(NewCategoryState)
  const setToDos = useSetRecoilState(toDoState);
  
  const onClick = (event:React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name}, 
    } = event; 
    setToDos((oldToDos ) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id );
      const newToDo = {text:text, id, category: name as any } 

      return [ 
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ]
    } ) 

  };
  
  const CATEGORIES = [...Object.keys(Categories), ...NewCategories]
  // category 의 기준(todo 만들어 지는 생성 시점)에 따라 '버튼'의 생성이 달라짐    
  return (
    <li>
      <span>{text}</span>
        {CATEGORIES.map(
          (key: any, index:number) => 
          category !== key && (
            <button key={`button-${index}`} name={key} onClick={onClick}> {key}</button>
          )
        )}
    </li>
  )
}
export default ToDo;