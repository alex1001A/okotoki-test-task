import { IoMdStarOutline } from "react-icons/io";

import ListItem from "../ListItem/ListItem";

import styles from "./CoinList.module.css";

export default function CoinList({ data, addToFav }) {
  return (
    <div className={styles.list}>
      {data.map((item) => (
        <ListItem item={item}>
          <IoMdStarOutline
            className={styles.item__icon}
            onClick={() => addToFav(item.id)}
          />
        </ListItem>
      ))}
    </div>
  );
}
