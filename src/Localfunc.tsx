import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const LocalData = styled.div`
  color:black
`;

export default function Localfunc() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const filteredData = {...toDos}
   localStorage.setItem('data', JSON.stringify(filteredData))
  return <LocalData />
}