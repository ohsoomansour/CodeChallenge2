import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, NewCategoryState, toDoState } from "../atoms";

interface IForm {
  toDo:string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState)
  //const newcategory = useRecoilValue(NewCategoryState)
  const { register, watch,  handleSubmit, setError, formState:{errors} ,setValue  } = useForm<IForm>() 
  const onValid = ({ toDo }:IForm) => {
    setToDos((oldToDos) => [
      {text: toDo, id:Date.now(), category: category  },
      ...oldToDos
    ])
    //console.log(toDos)
    setValue("toDo", "")

  }
  return (
  <>  
    <form onSubmit={handleSubmit(onValid)}>
    <input 
      placeholder="Write a to do"
      {...register("toDo", {
        required:"Please write a toDo",
      })}
      
    />

    <button>Add</button>
  </form>
  
  </>
  )
    
}

export default CreateToDo;