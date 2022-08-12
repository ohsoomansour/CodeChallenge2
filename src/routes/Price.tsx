import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinTickers } from "./api";


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
interface IPrice {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface RouteParams {
  coinId: string;
}



export default function Price() {
  
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const {isLoading, data } = useQuery<IPrice[]>(["Price"],() =>  fetchCoinHistory(coinId) );
  console.log(data)
  
  /* const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
       data:[i.close, i.high, i.low, i.market_cap, i.open, i.time_close, i.time_open, i.volume]
    }
  })
   
   가격표: {data? data[0].high : undefined }
           {data? data[0].low.toLocaleString() : undefined }
           {data? data[0].open.toLocaleString() : undefined }
           {data? data[0].close.toLocaleString() : undefined }
  */
  
  

  return (
    <div>  
    { isLoading ? (
      "Loading Price"
    )  : (
     <> 
      <Tabs>
        <Tab isActive={priceMatch !== null }>high:${data? Number(data[0].high).toLocaleString('ko-KR') : undefined }</Tab>
        <Tab isActive={priceMatch !== null }>low:${data? Number(data[0].low).toLocaleString('ko-KR') : undefined }</Tab>
      </Tabs>

      <Tabs>
        <Tab isActive={priceMatch !== null }>open:${data? Number(data[0].open).toLocaleString('ko-KR') : undefined }</Tab>
        <Tab isActive={priceMatch !== null }>close:${data? Number(data[0].close).toLocaleString('ko-KR') : undefined }</Tab>
      </Tabs>
    </>
  )}
   </div>
  ) 
}