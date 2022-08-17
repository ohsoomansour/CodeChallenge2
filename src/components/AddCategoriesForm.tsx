import React from "react";
import {useForm} from "react-hook-form";
import { useSetRecoilState} from "recoil";
import {categoryState,  NewCategoryState} from "../atoms";

interface INewCategory {
  NewCategory: string;
}

export default function AddCategoriesForm() {
  const setNewCategory = useSetRecoilState(NewCategoryState)
  const setCurrentCategory = useSetRecoilState(categoryState)

  const {register, handleSubmit,  setValue } = useForm()
  const onValid = ({NewCategory}:INewCategory) => { 
    
    setCurrentCategory(NewCategory as any) 

    setNewCategory((newCategories) => {
      
      return [...newCategories, NewCategory] as any
    })
    setValue("NewCategory", "")
  }  

  return (
    <form onSubmit={handleSubmit(onValid as any)}>
      <input
        placeholder="Create New Category!"
        {...register("NewCategory")}
        
      />
    </form>  
  )
}