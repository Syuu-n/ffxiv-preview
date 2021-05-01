import { Card } from 'antd'
import { Item } from '../../lib/requests/requestStructs'
import styles from '../../styles/components/itemCard.module.scss'
import CustomLink from '../../components/CustomLink/customLink'

interface Props {
  item: Item
}

export default function ItemCard(props: Props) {
  const { item } = props

  return(
    <CustomLink href={`/${item.id}`}>
      <a>
        <Card
          hoverable
          cover={
            <img
              alt="item-thumbnail"
              src={`/ffxiv-preview-image/models/${item.model_main_1}/${item.model_main_2}/thumbnail.png`}
            />
          }
          className={styles.card}
        >
          <Card.Meta
            title={item.name}
            description={item.jobs}
          />
        </Card>
      </a>
    </CustomLink>
  )
}