import styles from "./Input.module.css";

export default function Input({ value, onChange, onKeyUp, placeHolder }) {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={(e) => onChange(e)}
      onKeyUp={onKeyUp}
      placeholder={placeHolder}
    />
  );
}
