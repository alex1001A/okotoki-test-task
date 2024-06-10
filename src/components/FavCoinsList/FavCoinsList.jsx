import ListItem from '../ListItem/ListItem'

export default function ({ favCoins, removeFromFav }) {
  return (
    <div className=''>
      {favCoins.map((item) => (
        <ListItem onClick={() => removeFromFav(item.id)} item={item}/>
      ))}
    </div>
  );
}
