import { useEffect, useState } from "react";
import { useLocation, useParams, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import {useQuery} from "@tanstack/react-query"
import { fetchCoinTickers } from "./api";
import {fetchCoinInfo} from "./api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

/* 
1.타입스크립트에게 우리 URL 내에 몇몇 파라미터들이 있다는 것 말해줘야 한다 
2.coin id로 코인 받기 (Coins)
  https://api.coinpaprika.com/v1/coins/btc-bitcoin
  https://api.coinpaprika.com/#operation/getCoinById

  coin id로 특정 코인에 대한 시세 정보 얻기 (Tickers)
  https://api.coinpaprika.com/v1/tickers/btc-bitcoin
  https://api.coinpaprika.com/#operation/getTickersById
 3.Object.keys(temp1).join() 
   Object.values(temp1).map(v => typeof v).join()  
 4. CSS
   - text-transform:uppercase "모든 글자를 대문자로 바꿈"
 5. URI 전체  - https:www.mydomain.com:80/docs/search?category=react&lang=ko#intro(deepDive p.337)
  1) https: scheme(protocol)
  2) www.mydomain.com "Host(Domain)"
  3) :80 "Port"
  4) /docs/search? "path"
  5) category=react&lang=ko "Query"
  6) #intro "Fragment" 
  */

  interface RouteParams {
    coinId: string;
  }
interface IinfoData {
    id:string;
    name:string;  
    symbol:string;   
    rank:number; 
    is_new:boolean;  
    is_active: boolean;  
    type:string;
    description:string;    
    message: string;  
    open_source:boolean;    
    started_at: string;   
    development_status:string;    
    hardware_wallet :boolean;  
    proof_type: string;  
    org_structure:string;   
    hash_algorithm:string;     
    first_data_at:string;  
    last_data_at:string;  

  } 
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }
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
const Loader = styled.div`
  text-align:center;
  display:block
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  color:${(props) => props.theme.accentColor};
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap:10px;
`;
const Tab = styled.span<{isActive:boolean}>`
  text-align:center;
  text-transform:uppercase;
  font-size:12px;
  font-weight:400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color:${(props) => props.isActive? props.theme.accentColor : props.theme.textColor };
  a {
    display:block;
  }
  `;
const Home = styled.div`
  display:flex;
  position:absolute;
  top:10px;
  left:10px;
  cursor:pointer;
`
//useRouteMatch > true 또는 false를 반환, 이용 > Price, Chart의 글자 색으로 표시하여 그 'Link path'로 잘 도착했구나 
export default function Coin() {
  const {coinId} = useParams<RouteParams>();
  //console.log(coinId);
  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");
  const location = useLocation<{name:string}>()

  const { isLoading:infoLoading, data:infoData} = useQuery<IinfoData>(
    ["info", coinId], () => fetchCoinInfo(coinId))
  const {isLoading:tickersLoading, data:tickersData} = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
  )
  //console.log(tickersData);
  /* const [info, setInfo] = useState<IinfoData>();
  const [loading, setLoading] = useState(true);
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      //console.log(infoData);
      const priceData = await(
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      //console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })()
  },[coinId]) */
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Header>
        <Home>
          <Link to="/" >
            <FontAwesomeIcon icon={faHouse} size="2x" />
          </Link>
        </Home>
        
        <Title>{location.state? location.state.name : infoLoading ? "loading..." : infoData?.name }</Title>
      </Header>
      {loading ? (<Loader>Loading...</Loader>) : (
        <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol:</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Open Source:</span>
            <span>{infoData?.open_source ? "Yes" : "No"}</span>
          </OverviewItem>
        </Overview>
        <Description>{infoData?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{Number(tickersData?.total_supply).toLocaleString('ko-KR')}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{Number(tickersData?.max_supply).toLocaleString('ko-KR')}</span>
          </OverviewItem>
        </Overview>
        <Tabs>
          <Tab isActive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </Tab>
          <Tab isActive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>
        </Tabs>
      
        <Switch>
          <Route path="/:coinId/price">
            <Price /> 
          </Route>

          <Route path="/:coinId/chart">
            <Chart />
          </Route>
        </Switch>
      </>
      )}
    </Container>
  )
}