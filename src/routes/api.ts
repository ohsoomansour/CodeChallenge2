/*               🥇 Code Challenge 
  • Implement a beautiful dark mode toggle button.
  • Implement a back button from the /:coinId route.
  • Implement the /:coinId/price tab
  • Implement a CandleStick chart on the /:coinId/chart tab. 
 ※참고 사이트:https://apexcharts.com/docs/react-charts/ 
  > npm install --save react-apexcharts apexcharts
  ※깃허브 아이디 검색 쿼리: github.com/search?q=githubgw
  */
 

const BASE_URL = `https://api.coinpaprika.com/v1`
//https://api.coinpaprika.com/v1/coins
export  async function fetchCoins() {
  return await (
    await fetch(`${BASE_URL}/coins`)).json();
} 

// export default function 선언할때, 파일 내 1개의 function만 선언가능
export function fetchCoinInfo(coinId:string) {
  return fetch(`${BASE_URL}/coins/${ coinId }`).then((response) => 
  response.json()
  )
}
// https://api.coinpaprika.com/v1/tickers/${coinId}
export function fetchCoinTickers(coinId:string) {
  return fetch(`${BASE_URL}/tickers/${ coinId }`).then(
    (response) => response.json() 
  
  )
}
export function fetchCoinHistory (coinId:string) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(
    (response) => response.json()
  );
};