import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { darkAtom } from "../atoms";
import { fetchCoins } from "./api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width:100vw;
  height:100hv;
  backgorund-color:${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  max-width:480px;
  padding: 0px 20px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display:flex;
  justify-content:center;
  align-items:center;
  position:relative;
`;
const Title = styled.h1`
  font-size:48px;
  color: ${(props) => props.theme.accentColor};
`;
const CoinList = styled.ul`

`;
const Coin = styled.li`
  color: ${(props) => props.theme.bgColor};
  background-color: white;
  border-radius:15px;
  margin-bottom:10px;

  a {
    display:flex;
    align-items:center;
    padding:20px;
    transition: color .5s ease-in;
  }
  &:hover {
    a{
      color: ${(props) => props.theme.accentColor};
    }
  }
  
`;
const Img = styled.img`
  height:35px;
  width:35px;
  margin-right:10px;
`;
const Loader = styled.div`
  text-align:center;
  display:block
`;
const Button = styled.button`
  background-color:transparent;
  position: absolute;
  top:10px;
  right:10px;
  cursor:pointer;
`;

interface ICon {
  id: string,
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
/*CSS
1.<header>태그 범위
  - 보통 도입부에 해당하는 컨텐츠, nav링크의 집합 정보를 포함
  - 제목 요소(h1 ~ h6)
  - logo & icon
  - 저자 정보
2. a{
  display:block; 클릭 할 수 있는 범위가 해당 coin전체가 됨 
}
3. Link 컴퍼논트 설명 
 - ※참조 사이트:reactrouter.com/web/api/Link
 - Link to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
 - location = useLocation() > console.log(location); 
   > 
     hash: ""
     key: "vrzx46"
     pathname: "/btc-bitcoin"
     search: ""
    ▶state: {name: 'Bitcoin'}
 4. ReactQuery는 우리가 원하는 data가 이미 cash에 있다는 것을 알고 있음 
 5. Hash와 QueryHash의 이해
   - Hash: 해시는 데이터를 다루는 기법, 검색과 저장이 아주 빠르게 진행한다. 그 이유는 
          데이터를 검색할 때 사용할 key와 실제 데이터의 값이 한 쌍으로 존재, key값이 ★'배열의 인덱스로 변환'
          하기 때문에 검색과 저장의 평균적인 시간 복잡도가 0에 수렴

 6. useQuery는 isLoading이라고 불리는 boolean 값을 return 한다
   > fetchCoins가 로딩중이라면 react query의 isLoading은 'true' data는 'undefined' 
 7. fechCoins가 끝나면 data에 넣어줌 
 8. 상세화면(coin)에서 전체페이지(coins)로 다시 돌아와도 로딩이 되지않는 이유는 "allCoins"에 데이터를 캐시에 저장하기 때문에 
   - 리액트쿼리는 데이터를 파괴하지 않음 
   - 캐시 read 1) https://react-query-v3.tanstack.com/guides/caching,
     캐시 read 2) https://velog.io/@yrnana/React-Query%EC%97%90%EC%84%9C-staleTime%EA%B3%BC-cacheTime%EC%9D%98-%EC%B0%A8%EC%9D%B4
     
   - mount: 맨 처음 컴포넌트가 렌더 될때는 component가 mount 되지만, 다시 props나 state가 변경 되어 render될때는 mount가 되지않음
     > shouldComponentUpdate(nextProps, nextState)나, componentWillReceiveProps(nextProps)쪽에서 그 변화를 감지해 관련 작업
   - cashTime: 데이터가 inactive상태일때 캐싱된 상태로 남아있는 시간, inactive 된 시점 ~ (기본)5분 후 '캐시데이터' 삭제
     예) cashTime이 2분 지나고 있음 > A쿼리 인스턴스가 새롭게 mount되면 ? > fetch가 실행, fresh한 값을 가져오는 동안 > 캐시 데이터
        *새롭게 mount되는 경우  = F5 (새로고침 할때) 
        *뒤로가기는 새롭게 mount되는 것이 아님, cashTime도 사라있고 staleTime도 사라있으면 fetch가 되지않고 '캐시 데이터'를 보여줌
     예)  캐시타임 5분이 지남 > 가비지 콜렉터 수집 된다
  - staleTime: 데이터가 'fresh' > 'stale' 상태로 변경 걸리는 시간
              fresh상태에서는 데이터가 한 번 fetch 되고 나서 mount에 관계없이 fetch하지 않음   
     (데이터의 최신 업데이트의 상태를 관리한다정도 )
    
 9. DevTools는 캐시에 있는 쿼리를 볼 수 있다       
 10.await 코드는 최상위 레벨 코드에서 작동하지 않으며 익명 async() => {} 함수로 코드를 감싸면 최상위 레벨 코드에도 await 를 사요     
 */


export default function Coins() {
  const darkstate  = useSetRecoilState(darkAtom);
  const toggleMode = () => darkstate((prev) => !prev); 
  const {isLoading, data} = useQuery<ICon[]>(["allCoins"],fetchCoins);
  /* const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async() => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100))
      setLoading(false);
     })()
  },[]) */
  return (
  <Wrapper>
  <Container>
    <Header>
      <Button onClick={toggleMode}>
        <FontAwesomeIcon icon={faLightbulb} size="2x"/>
      </Button>
      <Title>코인</Title>
    </Header>
    {isLoading ? (
      <Loader>Loading...</Loader>
    ) :(
    <CoinList>
      {data?.slice(0,100).map((coin, index) => (
      <Coin key={coin.id}>
        <Link to={{
          pathname: `/${coin.id}`,
          state: { name: coin.name },
          //search: `?Rank=${coin.rank}`
        }}>
          <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
          {coin.name}
        </Link>
      </Coin>
      ))}
    </CoinList>
    )}
  </Container>
  </Wrapper>
  );
}
