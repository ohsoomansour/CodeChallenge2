import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { 
  QueryClient,
  QueryClientProvider
     } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil';
/*reactQuery 설치 오류 ※https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-4
 1. react & react-dom@18.2.0에서 발생하는 오류(※22년 8월 11일에는 17버전도 해결됨)
  > 1) npm i @tanstack/react-query 설치 
  > 2)  import {useQuery} from '@tanstack/react-query';

 2. react와 react-dom버전을 낮춰야 하는 경우
  > 1)module_modules 폴더 삭제, package_json 파일 삭제 ※출처: https://curryyou.tistory.com/479
  > 2)"dependencies": {
      "@testing-library/react": "^12.0.0",
      "@testing-library/user-event": "^12.0.0",
      "react": "^17.0.2",
      "react-dom": "^17.0.2",
    }
  > 3) npm install 하면 package.json에서 react와 react-dom에 맞게 설치함  
  > 4) react 18버전은 "npm peer react@^18.0.0 from  @testing-library/react@13.2.0" 으로 맞춰줘야 함 
  > 5) 18버전은 ReactDOM 의 render 프로퍼티가 지원되지 않으므로 반드시 17버전의 방식으로 바꿔줘야함 
     ver17
        ReactDOM.render(
          <React.StrictMode>
                <App />
          </React.StrictMode>,
          document.getElementById('root')
        );
     ver18 
     const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
       root.render(
         <React.StrictMode>
              <App />
         </React.StrictMode>
       ); 
  3.ReactQueryDevtools 문제 해결 ※https://tanstack.com/query/v4/docs/devtools
    > 1)  npm i -D @tanstack/react-query-devtools
    > 2) import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
  */     
const queryClient = new QueryClient()
     
ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
          <App />
      <ReactQueryDevtools initialIsOpen={true} />  
    </QueryClientProvider>
  </RecoilRoot>,
document.getElementById("root")
)


