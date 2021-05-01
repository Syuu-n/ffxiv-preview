import { Typography, Card, Badge } from 'antd'
import { Item, ItemIndex } from '../../lib/requests/requestStructs'
import styles from '../../styles/components/itemInfoCard.module.scss'
import CustomLink from '../../components/CustomLink/customLink'

interface Props {
  item: Item | ItemIndex
  compact?: boolean
  isLink?: boolean
}

export default function ItemInfoCard(props: Props) {
  const { item, compact, isLink } = props
  const { Title, Text } = Typography
  const patchColors = {
    2: "pink",
    3: "blue",
    4: "red",
    5: "purple"
  }

  const card =
    <Badge.Ribbon
      text={`パッチ ${item.patch}`}
      placement="end"
      color={patchColors[`${parseInt(item.patch)}`]}
    >
      <Card hoverable={isLink}>
        {/* SP 用タイトル */}
        { compact ? (
          <Title level={4} className={styles.itemTitleSpCompact}>{item.name}</Title>
        ) : (
          <Title level={2} className={styles.itemTitleSp}>{item.name}</Title>
        )}
        <div className={styles.infoCardInner}>
          { compact ? (
            <>
              {/* コンパクトスタイル */}
              <div className={styles.iconContainerCompact}>
                {/* アイコン */}
                <img src={`/ffxiv-preview-image/icons/${item.id}.png`} className={styles.iconCompact}/>
                <img src={`/ffxiv-preview-image/commons/icon_cover.png`} className={styles.iconCoverCompact} />
              </div>
              <div className={styles.infoContainer}>
                {/* アイテム名 */}
                <Title level={4} className={styles.itemTitle}>{item.name}</Title>
                {/* 基本情報 */}
                <div className={styles.baseInfoContainer}>
                  <Badge
                    count={`ITEM LEVEL ${item.item_level}`}
                    className={styles.itemLevelBadge}
                  />
                  <div>
                    <Text>クラス：</Text>
                    <Text type="success">{item.jobs}</Text>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 通常スタイル */}
              <div className={styles.iconContainer}>
                {/* アイコン */}
                <img src={`/ffxiv-preview-image/icons/${item.id}.png`} className={styles.icon}/>
                <img src={`/ffxiv-preview-image/commons/icon_cover.png`} className={styles.iconCover} />
              </div>
              <div className={styles.infoContainer}>
                {/* アイテム名 */}
                <Title level={2} className={styles.itemTitle}>{item.name}</Title>
                {/* 基本情報 */}
                <div className={styles.baseInfoContainer}>
                  <Badge
                    count={`ITEM LEVEL ${item.item_level}`}
                    className={styles.itemLevelBadge}
                  />
                  <div>
                    <Text>クラス：</Text>
                    <Text type="success">{item.jobs}</Text>
                  </div>
                  <div>
                    <Text>装備レベル：</Text>
                    <Text type="success">{item.level}</Text>
                    <Text>〜</Text>
                  </div>
                </div>
                {/* マーケット */}
                <Text type={item.is_untradable ? "danger" : "success"}>{`マーケット取引${item.is_untradable ? "不可" : "可"}`}</Text>
              </div>
            </>
          ) }
        </div>
      </Card>
    </Badge.Ribbon>

  return (
    <>
      { isLink ? (
        <CustomLink href={`/${item.id}`}>
          <a>{card}</a>
        </CustomLink>
      ): (
        card
      )}
    </>
  )
}