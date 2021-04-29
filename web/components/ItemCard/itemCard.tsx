import { Card } from 'antd'
import { Item } from '../../lib/requests/requestStructs'
import styles from '../../styles/components/itemCard.module.scss'
import Link from 'next/link'

interface Props {
  item: Item
}

export default function ItemCard(props: Props) {
  const { item } = props

  return(
    <Link href={`/${item.id}`}>
      <a>
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
      </a>
    </Link>
  )
}