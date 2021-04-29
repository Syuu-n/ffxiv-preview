import ItemCard from '../../components/ItemCard/itemCard'
import { Item } from '../../lib/requests/requestStructs'
import styles from '../../styles/components/itemCardList.module.scss'

interface Props {
  items: Item[]
}

export default function ItemCardList(props: Props) {
  const { items } = props

  return(
    <div className={styles.itemsContainer}>
      { items.map((item) =>
        <ItemCard item={item} key={item.id} />
      )}
    </div>
  )
}