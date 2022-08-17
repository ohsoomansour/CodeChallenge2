import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, NewCategoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import Localfunc from "../Localfunc";
import AddCategoriesForm from "./AddCategoriesForm";
/* 
  1.{...register("toDo")} "반환하는 모든 것 > input의 props로 전달 "
   register 함수는 input의 value, useState, onChange를 대체 
  2. handleSubmit 
   - react-hook-form 이 모든 확인을 다 마쳤을 때만 'onValid'를 호출 
   - 유효사항이 if(toDo.length < 10){return setToDoError("To Do should be longer")}  
  3. input의 required속성은 HTML에서 지원해주는 것
   - BUT useForm의 register은 "이걸 지원하지 않는 브라우저 또는 모바일을 사용 했을때, javascript애서 validation을 지원!"
   - react-hook-form은 required:true이면 채워야 할 항목에 빈칸을 두면 커서를 포커싱 해줌 
   - required:"입력해라" >> 메서지가 나옴  
  4. formState
   - 사용 > console.log(formState.errors)
  5.required 🔑 <ctr 키> + click! 
    📜required: Message | ValidationRule<boolean>;
    > ValidationRule<boolean> 해석 > 
    >export declare type ValidationRule<TValidationValue extends ValidationValue = ValidationValue> = TValidationValue | ValidationValueMessage<TValidationValue>;
      export declare type ValidationValueMessage<TValidationValue extends ValidationValue = ValidationValue> = {
        value: TValidationValue;
        message: Message;
      };
   6. RegEXP 용어
     > ()의미는 '그룹'을 지정, $1 ~ $9로 호출해 사용하는 것이 가능하다 
     > 예시) var str = "This is Webisfree!"
             var myRegExp = /(Webisfree)/g;
             myRegExp.test(str);
             str.replace(myRegExp, "super $1 site");
             console.log(str);
     >? 의미는 '최대 한 번'
     >* 의미는 있거나 없거나(여러 개 포함)

 
    7.onInput 과 onChange 차이
     - onInput 이벤트: '요소의 값'이 바뀌면 이벤트가 즉시 발생 
     - onChange 이벤트: '요소의 내용이 바뀌고 포커스를 잃어야 발생 한다  

  🥉Code Challenge 🥉
   🚨Watch all the section #5 and use Recoil to extend the To Do list that we make on the lecture with these two features:
   #️⃣Implement persistance to localStorage.
     ※참고: https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API#window.localstorage
     > window.localstorage
      ▼Storage {theme: 'dark', frequently-viewed-documents: '[{"url":"/ko/docs/Web/API/Web_Storage_API","title"…lor"}],"timestamp":1655962981757,"visitCount":3}]', length: 2}
       frequently-viewed-documents: "[{\"url\":\"/ko/docs/Web/API/Web_Storage_API\",\"title\":\"Web Storage API\",\"parents\":[{\"uri\":\"/ko/docs/Web\",\"title\":\"개발자를 위한 웹 기술\"},{\"uri\":\"/ko/docs/Web/API\",\"title\":\"Web API\"},{\"uri\":\"/ko/docs/Web/API/Web_Storage_API\",\"title\":\"Web Storage API\"}],\"timestamp\":1660530567813,\"visitCount\":4},{\"url\":\"/en-US/docs/Web/CSS/background-color\",\"title\":\"background-color\",\"parents\":[{\"uri\":\"/en-US/docs/Web\",\"title\":\"References\"},{\"uri\":\"/en-US/docs/Web/CSS\",\"title\":\"CSS\"},{\"uri\":\"/en-US/docs/Web/CSS/background-color\",\"title\":\"background-color\"}],\"timestamp\":1655962981757,\"visitCount\":3}]"
       theme: "dark"
       length: 2
    #️⃣Allow users to create custom categories.
    🔍추론 방법 
      1. localStorage개념을 이해 🔹https://mdn.github.io/dom-examples/web-storage/
      > localStorage.getItem('불러올 데어테에 해당되는 로컬스토리지 키값') > localStorage.getItem('bgcolor') > "5289FF"
      > localStorage.setItem('bgcolor', "5289FF") > localstorage > 
      > localStorage.target = "codechallenge" 
       ❗localStorage
         (Document 출처의 Storage)
          Storage{
           "bgcolor": "5E89FF",
           "image": "images/firefoxos.png",
           "target": "CodeChallenge",
           "font": "'Open Sans Condensed', sans-serif"
          }

      2. 저장한 데이터는 '브라우저 세션' 간에 공유가 된다
      *브라우저: 크롬, 엣지, 사파리, 파이어폭스 등
       🔷세션이란 ?  브라우저가 종료되기 전까지 클라이언트의 요청을 유지하게 해주는 기술 
       - 세션 저장 위치: 로컬과 서버에 저장 
       - 참고:※https://chrisjune-13837.medium.com/web-%EC%BF%A0%ED%82%A4-%EC%84%B8%EC%85%98%EC%9D%B4%EB%9E%80-aa6bcb327582
       
      
      3. 웹 스토리지 (Web Storage) ※https://ryuhojin.tistory.com/10?category=1050330
      
      *웹 스토리지: '웹 데이터'를 클라이언트에 저장하기 위해 만들어진 키-밸류 형식의 저장소
      *쿠키(Cookie): '서버'와 '클라이언트' 간의 지속적인 데이터 교환을 위해 만들어진 키-밸류 형식의 클라이언트 로컬에 저장  
       예) 클라이언트가 서버에 로그인 요청 > 서버는 클라이언트의 로그인 요청의 유효성을 확인(ID & PW 검사) unique한 id를 sessionid라는 이름으로 저장
         > 서버가 응답할 때 [Reponse headers] - Cookie: LOGIN_USER_ID = ceoosm 🚀⭐SESSION=d4848d49-287a-4dee-989f-e200~ 저장&응답 
         > 그 다음 클라이언트에서 cookie: SESSION=d4848d49-287a-4dee-989f-e200~ Request헤더에 추가하여 요청
         > 서버는 Request Headers의 SESSION 아이디 값을 저장된 세션 저장소에서 찾아보고 유효한지 확인후 요청을 처리하고 응답 
       📋   
        1)Local Storage
        - 데이터 유지: 브라우저 종료시 보관
        - 데이터 범위: 동일한 도메인(www.google.co.kr) 전역 공유
        2) Session Storage
        
        - 세션의 속도: 요청마다 서버에서 처리를 해야하기 때문에 비교적 느림 
        - 데이터 유지 브라우저 종료시 삭제
        - 데이터 범위: 브라우저간 공유 안됨  
        
        3) 쿠키 storage: 클라이언트 로컬 
        - LifeCycle: 쿠키는 브라우저를 종료해도 파일로 남아있음 
        - 속도: 파일에서 읽기 때문에 상대적으로 빠름 
        - 쿠키의 목적
         > 세션 관리, 서버가 알아야될 정보 (로그인 및 사용자 정보, 접속시간)
         > 개인화: 사용자에 맞는 페이지 제공
         > 트래킹: 사용자 행동 및 패턴 분석 
         

        ✨접근방법: get, set Recoil & input ...register("newCategory") > {category: "newCategory"}
          카테고리 만드는 atom 만들고  get,set으로 불러들여서 취합    
         1.구)카테고리 + 신)카테고리 >> categoryState 로 취합 (전달)>> CreateToDo toDoState(전체 toDo)에 취합함 
         2. 버튼변경 생성 및 변경: '현재 카테고리'는 'categoryState' 아톰에 있는 값이다!!
*/
   
      /*{toDos?.map((bToDO) => <NewCategoriesFunc key={bToDO.id} {...bToDO}>{bToDO.category}</NewCategoriesFunc>)}
       */
 
function ToDoList(){
  const NewCategories = useRecoilValue(NewCategoryState)
  const [category, setCategory] = useRecoilState(categoryState);
  const toDos = useRecoilValue(toDoSelector);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }

  return (
    
    <div>
      <Localfunc />
      <hr />
      <AddCategoriesForm/>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {NewCategories.map((fuck) => (
          <option value={fuck+ ""}>{fuck+""}</option>
          ))}
      </select>
      <CreateToDo />
      
       {toDos?.map((aToDo) => <ToDo key={aToDo.id} {...aToDo}></ToDo>)}
       
    </div>
  )

}
export default ToDoList;




