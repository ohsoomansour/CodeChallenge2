import { useForm } from "react-hook-form";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo:string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState)
  //const newcategory = useRecoilValue(NewCategoryState)
  const { register,   handleSubmit ,setValue  } = useForm<IForm>() 
  const onValid = ({ toDo }:IForm) => {
    setToDos((oldToDos) => [
      {text: toDo, id:Date.now(), category: category  },
      ...oldToDos
    ])
    setValue("toDo", "")
  }
  return (

  <form onSubmit={handleSubmit(onValid)}>
    <input 
      placeholder="Write a to do"
      {...register("toDo", {
        required:"Please write a toDo",
      })}
    />

    <button>Add</button>
  </form>
  
  )
    
}

export default CreateToDo;