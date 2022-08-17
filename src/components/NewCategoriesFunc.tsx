import React from "react";
import {useForm} from "react-hook-form";
import {atom, useRecoilState} from "recoil";
import {categoryState, IToDo, NewCategoryState, toDoState} from "../atoms";

interface INewCategory {
  NewCategory: string;
}


export default function NewCategoriesFunc() {
  const [newCategory, setNewCategory] = useRecoilState(NewCategoryState)
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState)
  const [toDos, setToDos] = useRecoilState(toDoState)
  const {register, handleSubmit, watch, setValue, setError } = useForm()
  const onValid = ({NewCategory}:INewCategory) => { 
    
    setCurrentCategory((oldCategories) => {
      
       return NewCategory as any
    } 
       
    )
    setNewCategory((newCategories) => {
      
      return [...newCategories, NewCategory] as any
    })
  }  

  return (
   <>
    <form onSubmit={handleSubmit(onValid as any)}>
      <input
        placeholder="Create New Category!"
        {...register("NewCategory")}
        
      />
    </form>  

    
    </>
  )
}