export default function CoinList({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <h6 key={index}>{item}</h6>
      ))}
    </div>
  );
}
