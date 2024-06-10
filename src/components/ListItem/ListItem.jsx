import styles from "./ListItem.module.css";

export default function ListItem({ item, children }) {

  return (
    <div className={styles.coin}>
      {children}
      <p className={styles.coin__text}>{item.name}</p>
    </div>
  );
}
