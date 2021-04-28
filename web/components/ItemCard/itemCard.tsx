import { Card } from 'antd'
import styles from '../../styles/components/itemCard.module.scss'

interface Props {
  item: any
}

export default function ItemCard(props: Props) {
  const { item } = props

  return(
    <Card
      hoverable
      cover={
        <img alt="item-img" src={`/ffxiv-preview-image/${item.id}/1_scale.png`} />
      }
      className={styles.card}
    >
      <Card.Meta
        title={item.name}
        description={item.jobs}
      />
    </Card>
  )
}