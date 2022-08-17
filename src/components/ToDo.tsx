import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, IToDo, NewCategoryState, toDoState } from "../atoms";
import NewCategoriesFunc from "./NewCategoriesFunc";


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
  const [NewCategories, setNewCategories] = useRecoilState(NewCategoryState)
  const currentCategory = useRecoilValue(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  //이벤트가 일어났을 때 'newToDo'의 category가 바뀜 + 이벤트가 일어나는 '객체' 기준(id)으로 배열의 순서를 찾음 
  //oldToDos는 createToDo 에서 만든 최신 toDo까지 있음 따라서 이벤트가 일어난 '새 카테고리'의 id === (과거 ~ 최신,toDO).id
  //(toDos.filter((toDo) => toDo.category !== currentCategory))
  
  const onClick = (event:React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name}, 
    } = event; 
    setToDos((oldToDos ) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id );
      const newToDo = {text:text, id, category: name as any } 

      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)]
    } ) 

  };
  
    
  return (
    <>
    
    <li>
      <>
      <span>{text}</span>
      {category !== Categories.TO_DO && (<button name="TO_DO" onClick={onClick}>To Do</button>)}
      {category !== Categories.DOING && <button name="DOING" onClick={onClick}>Doing</button>}
      {category !== Categories.DONE  && <button name="DONE" onClick={onClick}>Done</button>}
      { category !== currentCategory && NewCategories.map((todo, index) =>
      (<button key={ index} name={todo+""} onClick={onClick}>{todo+""}</button>))
       }
     </>       
    </li>
       
  </>
  )
}
export default ToDo;