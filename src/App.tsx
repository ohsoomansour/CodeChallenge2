import React from 'react';
import { createGlobalStyle }from "styled-components";
import Router from './routes/Router';
import {ThemeProvider} from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from 'recoil';
import { darkAtom } from './atoms';

/* 1. Typescript - strongly-typed prgramming language : 프로그래밍 언어가 작동하기 전에 type을 확인한다 
    - 설치싸이트 create-react-app.dev/docs/adding-typescript/
    - installation: npx create-react-app my-app --template typescript

  2. event:React.Formevent<HTMLInputElement> ※https://velog.io/@tlatjdgh3778/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EB%B8%94%EB%A7%81%EA%B3%BC-%EC%BA%A1%EC%B2%98%EB%A7%81%EC%97%90-%EB%8C%80%ED%95%9C-%EC%A0%95%EB%A6%AC
    - target: 실제 이벤트가 시작된  '타깃'요소
     > event.target: 폼 안쪽에 실제 클릭한 요소를 가리킨다 
     >버블링 예)<form onClick={onClick} > "폼 안의 모든 요소에서 발생하는 클릭 이벤트를 잡아냄 "
            <div>
              <p>실제클릭</p> "클릭 이벤트가 어디서 발생했든 상관없이 <form>요소까지 이벤트가 버블링 되어 핸들러를 실행"(BubblingPhase)
            </div> "캡쳐링과 버블링 단계의 핸들러는 타깃 단계(p태그)에서 트리거가 된다"
          </form> 
    >캡쳐링 예)
             
    - currentTarget: 이벤트 리스너가 달린 요소 "React는 이걸 선택!"
   - button태그가 form태그 안에 없다면 event:React.MouseEvent<HTMLButtonElement>
    > SyntheticEvent 참고: https://reactjs.org/docs/events.html
  
    3.[styled.d.ts] - styled-components can be extended by using declaration merging 
   > 참고: ※styled-components.com/docs/api#typescript

  4. 커뮤니케이션:https://app.slack.com/client/T60TDKNJK/C8LH8PUQJ/thread/C8LH8PUQJ-1659775237.845679

  */
 /*
  coinpaprika: api.coinpaprika.com/docs#operation/getTickers   
  ReactQuery사용: https://react-query-v3.tanstack.com/ 
  react-router-dom 문제시!!(그냥 새프로젝트 셋업) 
    1. npx create-react-app@5.0.0 react-masterclass-tsx2 --template typescript
    2. npx i styled-components >> 문제 체크 >> @types/ 설치
    3. npm i react-router-dom@5.3.0 >> 문제체크 >> @types/ 설치 
      import {BrowserRouter, Switch, Route} from "react-router-dom";
      <BrowserRouter>
          <Switch>
            <Route path="/">
              <Coins />
            </Route>
          </Switch>
        </BrowserRouter>
    4. 우리가 우리 Router에게 우리의 URL이 변수값을 갖는다는 걸 말해주는 방식 
    5. 그리고 [index.tsx]에서 <React.StrictMode> </React.StrictMode> 빼줘야함 
 */
/*Visual Studio Code에서 순서대로 터미널에서 실행(React.1회 - #5.4 참고)
  <git 처리 과정> - ※https://jforj.tistory.com/119
  1.> Working Directory: 개발자의 현재시점으로 소스코드를 수정하며 개발하는 공간을 의미
    > Staging Area: Working Directory에서 작업한 파일을 Local Repository에 전달하기 위해 파일들을 분류하는 공간
    > Local Repository: 로컬 저장소이며 작업한 파일들을 저장해두는 내부 저장소(.git 폴더)
    > Remote Repository: 원격 저장소이며 인터넷으로 연결되어 있어 있는 외부 저장소
    *Branch: Remote Repository의 현재 상태를 복사하며 master 브랜치와 별개의 작업을 진행할 수 있는 공간
             보통 브랜치를 생성하여 개발을 진행하고 개발을 완료하면 master 브랜치에 병합하여 개발 완료된 소스코드를 합침
    *Head: 현재 작업중인 브랜치의 최근 커밋된 위치
    *index: Staging Area를 의미           

  git init
  git add README.md  
    - git add: 어떤 파일을 깃에 올릴지 함 보쟈, git add . 프로젝트 모든 파일을 추가 하겠다  
    - 🔧🚀"수정된 소스코드들을 > Staging Area로 전달"🚀
    - git add index.html (index.html만 올리겠다)
  git status : 📜📄내가 올릴려고 하는 파일들 나열📃  
    -  WorkingDirectory에서 📂수정이 발생된 파일들📂을 확인 
  git commit -m "first commit" 
    - 최종본이라고 볼 수있음
    - (add된 모든 소코드들을)🚀Staging Area > Local Repositiory로 이동🚀   
  git branch -M main
    - 생성되어 있는 브랜치를 확인
  git remote add origin https://github.com/ohsoomansour/App.git(리포리토리주소) 
   - origin은 git이 가져온 '원격 저장소'를 가리킴
     > 🚀 원격 저장소를 연결 🪐🌍
  git remote -v
   -  내가 설정해둔 원격저장소 이름과 URL을 확인 할 수 있음 
  git push -u origin main : "master - > master 성공" 
   - orgin:원격저장소 별칭 
   - master: 현재브랜치 이름 
   - 🚀'로컬 저장소'에서 파일을 업로드하면서🚀 병합시키는 명령어가 push🚩 

  
  ★수정발생: 
    git add . (전체하는게 편함 )
    git commit -m "second commit" 
    git remote -v : 내가 설정해둔 원격저장소 이름과 URL을 확인 할 수 있음 
    git remote add origin https://github.com/ohsoomansour/soo.git > error: remote origin already exists.
    > git remote rm origin: "🚧연결이 잘못되었으면 연결을 해제함🚧"
    git push -u origin main

  ★gh-pages
  ⓵npm install gh-pages --save-dev
  ⓶"scripts": {"deploy": "gh-pages -d build", "predeploy": "npm run build" }
    "homepage": "https://ohsoomansour.github.io/Bitcoin/"
  ⓷npm run build > npm run deploy (published 성공!)

*/
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
}
a {
  text-decoration:none;
  color: inherit;
}
` 

function App() {
  const isDark = useRecoilValue(darkAtom);
  return (
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme } >
      <GlobalStyle />
      <Router />
    </ThemeProvider>  
    </>
  );
}

export default App;
