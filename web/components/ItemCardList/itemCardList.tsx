import ItemCard from '../../components/ItemCard/itemCard'
import styles from '../../styles/components/itemCardList.module.scss'

interface Props {
  items: any
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