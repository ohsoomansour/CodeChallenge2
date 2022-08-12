import {BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

/*
  1. <nestedRouter> 중첩된 라우터: /btc/chart 
  2. /:coinId 의미는 "Router에게 우리의 URL이 '변수값을 갖는다는 것을' 말한다"
  3. ❗React-router-dom@5.3.0 에서는 URL은 바뀌는데 렌더링 되지 않는 이슈❣
  */

export default function Router() {

  return(
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId" >
          <Coin />
        </Route>
        <Route path="/">
          <Coins/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}