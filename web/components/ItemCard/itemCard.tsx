import { Card } from 'antd'
import styles from '../../styles/components/itemCard.module.scss'

export default function ItemCard() {
  const min = 1
  const max = 2
  let randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min

  return(
    <Card
      hoverable
      cover={
        <img alt="item-img" src={`/ffxiv-preview-image/${randomNumber}/1_scale.png`} />
      }
      className={styles.card}
    >
      <Card.Meta
        title={randomNumber == 1 ? "義士の耳飾り" : "カッパーイヤリング"}
      />
    </Card>
  )
}