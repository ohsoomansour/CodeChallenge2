import APEXChart from "react-apexcharts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import { useRecoilValue } from "recoil";
import { darkAtom } from "../atoms";
import { useParams } from "react-router-dom";
/*APEXChart 참고
 - 사이트: ※https://apexcharts.com/docs/react-charts
*/

interface IHistory {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}
interface RouteParams {
  coinId: string;
}
/*[데이터를 '필터'해서 투입] 
  *optional chaning 연산자: 이 연산자는 null 이나 undefined와 같은 빈 값에 대한 예외처리를 자동화 해준다.
 1. const exceptData = data ?? [];
 2. const chartData = exceptData?.map((i) => {
        return {
            x: i.time_close,
            y: [i.open, i.high, i.low, i.close],
        };
    });
  3. fallback: (사전적의미:만일을 위해 대비한) 해당 칼러 또는 폰트를 윈도우 운영체제에서 지원하지 못할경우
    알아서 적합한 '색깔' 또는 '폰트'를 자동으로 선택 
  
*/

export default function Chart() {
  const {coinId} = useParams<RouteParams>();
  //console.log(coinId);
  const {isLoading, data } = useQuery<IHistory[]>(["ohlcv"], () => fetchCoinHistory(coinId) )
  const isDark = useRecoilValue(darkAtom);
  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
        x: i.time_close,
        y: [i.open, i.high, i.low, i.close],
    }
  });

  return (
    <div>
    {isLoading ? (
    "Loading chart..."
  ) : (
    <APEXChart
      type="candlestick"
      series={[
        {
          data:chartData 
        },
      ]}
      
      height={340}
      width={440}
      options={{
        plotOptions: {
          candlestick: {
            wick:{
              useFillColor: true,
            },
            colors: {
              upward: '#3C90EB',
              downward: '#DF7D46'
            },
          }
        },
        theme: {
          mode: isDark ? 'dark' : 'light',
        },
        chart:{
          type: 'candlestick',
          height: 350,
          width: 480,
          background:"transparent",
          },
          
        title: {
          text: 'CandleStick?.Chart',
          align:'left'
        },
        xaxis: {
          type: 'datetime',
          min:undefined,
          max:undefined,
          range:undefined,
          position:'bottom',
          axisBorder: {show: false },
          axisTicks: { show: false },
          labels: {show: false},
          categories: data?.map((price) => price.time_close * 1000)
        },
        stroke: {
          show:true,
          curve:'straight',
          width:2,
          colors: undefined,
          
        },
        yaxis: {
          show: true,
          showAlways:true,
          tickAmount: 6,
          min:undefined,
          max:undefined,
          labels: {
            show:true
          },
          axisBorder: {show:false},
          axisTicks: {show:false},
          tooltip: {
            enabled:false,
          }
        },
        fill:{
          type:"gradient",
          gradient: {
            shade: 'dark',
            type:"horizontal",
          }
        }
        }}
    />
  )}
  </div>
)}
