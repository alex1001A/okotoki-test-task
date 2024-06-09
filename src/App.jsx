import { useState, useEffect } from "react";

import CoinList from "./components/CoinList/CoinList";
import Input from "./components/Input/Input";

import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [inpValue, setInpValue] = useState("");

  useEffect(() => {
    fetch("https://api-eu.okotoki.com/coins")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const onChangeHandle = (e) => {
    setInpValue(e.target.value);
  };

  const onKeyUpHandle = () => {
    // setData([]);
    console.log('hi');
  };

  // setData((prevData) => prevData.filter((item) => item === inpValue));

  console.log(data);

  return (
    <div className="App">
      <Input value={inpValue} onChange={onChangeHandle} onKeyUp={onKeyUpHandle} />
      <CoinList data={data} />
    </div>
  );
}
