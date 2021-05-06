import { Card, Badge, Typography } from 'antd'
import { Item } from '../../lib/requests/requestStructs'
import styles from '../../styles/components/itemCard.module.scss'
import CustomLink from '../../components/CustomLink/customLink'

interface Props {
  item: Item
}

export default function ItemCard(props: Props) {
  const { item } = props
  const { Title, Text } = Typography

  return(
    <CustomLink href={`/${item.id}`}>
      <a>
        <Card
          hoverable
          cover={
            <div className={styles.cardCoverWrap}>
              <img
                alt="item-thumbnail"
                src={`/ffxiv-preview-image/models/${item.model_main_1}/${item.model_main_2}/400.png`}
                className={styles.itemThumbnail}
              />
              <Badge
                count={`ITEM LEVEL ${item.item_level}`}
                className={styles.itemLevelBadge}
              />
            </div>
          }
          className={styles.card}
        >
          <div className={styles.cardMeta}>
            <Title level={4} className={styles.itemTitle}>{item.name}</Title>
            <Text type="secondary" className={styles.itemJobs}>{item.jobs}</Text>
          </div>
        </Card>
      </a>
    </CustomLink>
  )
}