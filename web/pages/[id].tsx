import { GetStaticPaths, GetStaticProps } from "next"
import { SSR_BASE_URL } from '../lib/config/config'
import { Item } from '../lib/requests/requestStructs'
import Layout from '../components/Layout/layout'
import { Typography, Carousel, Image, Card, Badge } from 'antd'
import { LeftOutlined, RightOutlined, AppstoreFilled } from '@ant-design/icons'
import styles from '../styles/pages/[id].module.scss'

interface Props {
  ssrItem: Item
}

export default function ItemPage(props: Props) {
  const { ssrItem } = props
  const { Title, Text } = Typography

  // カルーセルの左右矢印
  const NextArrow = props => {
    const { onClick } = props
    return (
      <div onClick={onClick} className={styles.nextArrowWrap}>
        <RightOutlined />
      </div>
    )
  }
  
  const PrevArrow = props => {
    const { onClick } = props
    return (
      <div onClick={onClick} className={styles.prevArrowWrap}>
        <LeftOutlined />
      </div>
    )
  }

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  return (
    <Layout
      title={ssrItem.name}
      menuSelected="earrings"
      breadcrumbs={[
        { key: "", name: "ホーム" },
        { key: "earrings", name: "耳飾り"},
        { key: ssrItem.id, name: ssrItem.name }
      ]}
    >
      <div className={styles.titleContainer}>
        <Title level={1}>{ssrItem.name}</Title>
        <Text type="secondary">{ssrItem.name_en}</Text>
      </div>
      <div className={styles.contentWrapper}>
        <div>
          {/* image */}
          <Card>
            <Carousel arrows {...settings} className={styles.imageCarousel}>
              <Image src={`/ffxiv-preview-image/${ssrItem.id}/scale.png`} />
              <Image src={`/ffxiv-preview-image/${ssrItem.id}/1.png`} />
              <Image src={`/ffxiv-preview-image/${ssrItem.id}/2.png`} />
              <Image src={`/ffxiv-preview-image/${ssrItem.id}/3.png`} />
            </Carousel>
          </Card>
          {/* info */}
          <Badge.Ribbon text={`パッチ ${ssrItem.patch}`} placement="end">
            <Card className={styles.infoCardContainer}>
              {/* SP 用タイトル */}
              <Title level={2} className={styles.itemTitleSp}>{ssrItem.name}</Title>
              <div className={styles.infoCardInner}>
                {/* アイコン */}
                <div className={styles.iconContainer}>
                  <img src={`/ffxiv-preview-image/${ssrItem.id}/icon.png`} className={styles.icon}/>
                  <img src={`/ffxiv-preview-image/common/icon_cover.png`} className={styles.iconCover} />
                </div>
                <div className={styles.infoContainer}>
                  {/* アイテム名 */}
                  <Title level={2} className={styles.itemTitle}>{ssrItem.name}</Title>
                  {/* 基本情報 */}
                  <div className={styles.baseInfoContainer}>
                    <Text keyboard>{`ITEM LEVEL ${ssrItem.item_level}`}</Text>
                    <div>
                      <Text>クラス：</Text>
                      <Text type="success">{ssrItem.jobs}</Text>
                    </div>
                    <div>
                      <Text>装備レベル：</Text>
                      <Text type="success">{ssrItem.level}</Text>
                      <Text>〜</Text>
                    </div>
                  </div>
                  {/* マーケット */}
                  <Text type={ssrItem.is_untradable ? "danger" : "success"}>{`マーケット取引${ssrItem.is_untradable ? "不可" : "可"}`}</Text>
                </div>
              </div>
            </Card>
          </Badge.Ribbon>
          <Card className={styles.howToGetContainer}>
            <div className={styles.howToGetTitleContainer}>
              <AppstoreFilled />
              <Title level={3}>入手方法</Title>
            </div>
            <Text className={styles.sourceText}>{`${ssrItem.source}`}</Text>
          </Card>
        </div>
        <Card className={styles.sider}>
          <div className={styles.adDummy} />
        </Card>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const itemRes = await fetch(`${SSR_BASE_URL}/v1/items/${params.id}`, { method: "GET" })
  const ssrItem: Item = await itemRes.json()

  return {
    props: {
      ssrItem
    }
  }
}

export const getStaticPaths: GetStaticPaths = async() => {
  const itemsRes = await fetch(`${SSR_BASE_URL}/v1/items`, { method: "GET" })
  const items: Item[] = await itemsRes.json()
  const paths = await items.map(
    (item) => {
      return {
        params: { id: item.id.toString() }
      }
    }
  )

  return {
    paths,
    fallback: false
  }
}