import ItemCard from '../../components/ItemCard/itemCard'
import { Item, ItemIndex } from '../../lib/requests/requestStructs'
import styles from '../../styles/components/itemCardList.module.scss'

interface Props {
  items: ItemIndex[]
}

export default function ItemCardList(props: Props) {
  const { items } = props

  return(
    <div className={styles.itemsContainer}>
      { items.map((item: Item) =>
        <ItemCard item={item} key={item.id} />
      )}
    </div>
  )
}