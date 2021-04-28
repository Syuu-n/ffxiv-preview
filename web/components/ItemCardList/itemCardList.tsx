import ItemCard from '../../components/ItemCard/itemCard'
import styles from '../../styles/components/itemCardList.module.scss'

export default function ItemCardList() {
  const items = [...Array(10)].map(() => <ItemCard/>)

  return(
    <div className={styles.itemsContainer}>
      { items.map((item, i) =>
        item
      )}
    </div>
  )
}