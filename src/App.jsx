import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { CiSearch } from "react-icons/ci";

import Button from "./components/Button/Button";
import CoinList from "./components/CoinList/CoinList";
import Input from "./components/Input/Input";

import FavCoinsList from "./components/FavCoinsList/FavCoinsList";

export default function App() {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [favCoins, setFavCoins] = useState(() => {
    const storedFavCoins = localStorage.getItem("fav");
    return storedFavCoins ? JSON.parse(storedFavCoins) : [];
  });

  const [category, setCategory] = useState(false);

  const [inpValue, setInpValue] = useState("");

  const [btnState, setBtnState] = useState(true);

  useEffect(() => {
    fetch("https://api-eu.okotoki.com/coins")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = data
          .map((coin) => ({
            name: coin,
            id: uuidv4(),
          }))
          .filter((item) => item.name !== "")
          .sort((a, b) => a.name.localeCompare(b.name));
        setData(transformedData);
        setInitialData(transformedData);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favCoins));
  }, [favCoins]);

  const addToFavHandle = (id) => {
    const selectedCoin = data.find((coin) => coin.id === id);
    if (selectedCoin && !favCoins.some((coin) => coin.id === id)) {
      setFavCoins([...favCoins, selectedCoin]);
    }
  };

  const removeFromFavHandle = (id) => {
    setFavCoins(favCoins.filter((item) => id !== item.id));
  };

  const onChangeBtnStateHandle = () => {
    setBtnState((prevState) => !prevState);
    setInpValue(btnState === false ? "" : inpValue);
  };

  const onChangeHandle = (e) => {
    setInpValue(e.target.value);
  };

  const onKeyUpHandle = () => {
    setData(
      initialData
        .filter((item) => item.name.includes(inpValue.toUpperCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  return (
    <div className="container">
      <Button state={btnState} onClick={onChangeBtnStateHandle}>
        <CiSearch /> Search
      </Button>
      {btnState && (
        <div className="form-wrapper">
          <div className="form-wrapper__input">
          <CiSearch />
            <Input
              placeHolder="Search..."
              value={inpValue}
              onChange={onChangeHandle}
              onKeyUp={onKeyUpHandle}
            />
          </div>
          <div className="form-wrapper__categories">
            <div
              className={!category ? "" : "active"}
              onClick={() => setCategory(true)}
            >
              Favorites
            </div>
            <div
              className={category ? "" : "active"}
              onClick={() => setCategory(false)}
            >
              All Coins
            </div>
          </div>
            {!category ? (
              <CoinList addToFav={addToFavHandle} data={data} />
            ) : (
              <FavCoinsList
                removeFromFav={removeFromFavHandle}
                favCoins={favCoins}
              />
            )}
        </div>
      )}
    </div>
  );
}
