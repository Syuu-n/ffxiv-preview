import { GetStaticPaths, GetStaticProps } from "next"
import { SSR_BASE_URL } from '../lib/config/config'
import { Item, ItemIndex } from '../lib/requests/requestStructs'
import Layout from '../components/Layout/layout'
import { Typography, Carousel, Image, Card, List, Button, Switch, Tooltip } from 'antd'
import { LeftOutlined, RightOutlined, AppstoreFilled, SnippetsOutlined } from '@ant-design/icons'
import styles from '../styles/pages/[id].module.scss'
import ItemInfoCard from '../components/ItemInfoCard/itemInfoCard'
import { useEffect, useState } from "react"
import ItemCardList from '../components/ItemCardList/itemCardList'

interface Props {
  ssrItem: Item
}

export default function ItemPage(props: Props) {
  const { ssrItem } = props
  const { Title, Text } = Typography
  const [showAll, setShowAll] = useState(false)
  const [variations, setVariations] = useState(ssrItem.variations)
  const [isUniq, setIsUniq] = useState(false)

  const loadMore =
    !showAll ? (
      ssrItem.series.length > 5 && (
        <div className={styles.showAllButton}>
          <Button onClick={() => setShowAll(true)}>すべて表示</Button>
        </div>
      )
    ) : null

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

  // 重複をまとめるフラグを localStorage へ保存
  const switchIsUniq = (value: boolean) => {
    const changedIsUniq = !value
    localStorage.setItem("isUniq", changedIsUniq.toString())
    setIsUniq(changedIsUniq)
  }

  useEffect(() => {
    const localStorageIsUniq = localStorage.getItem("isUniq")
    if (localStorageIsUniq === "true") {
      setIsUniq(true)
    }
  }, [])

  useEffect(() => {
    setVariations(isUniq ? ssrItem.uniq_variations : ssrItem.variations)
  }, [isUniq])

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
      <div className={styles.titleContainerWrap}>
        <div className={styles.titleContainer}>
          <Title level={1}>{ssrItem.name}</Title>
          <Text type="secondary">{ssrItem.name_en}</Text>
        </div>
        <span className={styles.titleDivider}/>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContainer}>
          {/* 画像 */}
          <Card>
            <Carousel arrows {...settings} className={styles.imageCarousel}>
              <Image src={`/ffxiv-preview-image/models/${ssrItem.model_main_1}/${ssrItem.model_main_2}/scale.png`} />
              <Image src={`/ffxiv-preview-image/models/${ssrItem.model_main_1}/${ssrItem.model_main_2}/1.png`} />
              <Image src={`/ffxiv-preview-image/models/${ssrItem.model_main_1}/${ssrItem.model_main_2}/2.png`} />
              <Image src={`/ffxiv-preview-image/models/${ssrItem.model_main_1}/${ssrItem.model_main_2}/3.png`} />
            </Carousel>
          </Card>
          {/* アイテム情報 */}
          <div className={styles.subCard}>
            <ItemInfoCard item={ssrItem}/>
          </div>
          {/* 入手方法 */}
          <Card className={styles.subCard}>
            <div className={styles.subCardTitle}>
              <AppstoreFilled />
              <Title level={3}>入手方法</Title>
            </div>
            <Text className={styles.sourceText}>{`${ssrItem.source}`}</Text>
          </Card>
          {/* 色違いのアイテム */}
          <Card className={styles.subCard}>
            <div className={styles.subCardTitleWithSwitch}>
              <div className={styles.subCardTitleNorMargin}>
                <AppstoreFilled className={styles.subCardTitleIcon}/>
                <Title level={3}>色違いのアイテム</Title>
              </div>
              {/* 重複トグルスイッチ */}
              <div style={{display: "flex"}}>
                <Text className={styles.switchLabelText}>同じデザインをまとめて表示</Text>
                <Tooltip title="同じデザインをまとめて表示">
                  <SnippetsOutlined className={styles.switchLabelICon} />
                </Tooltip>
                <Switch checked={isUniq} onChange={() => switchIsUniq(isUniq)} />
              </div>
            </div>
          </Card>
          { variations.length > 0 && (
            <div className={styles.subCard}>
              <ItemCardList items={variations}/>
            </div>
          )}
        </div>
        {/* サイドバー */}
        <div className={styles.siderContainer}>
          <Card>
            <div className={styles.adDummy} />
          </Card>
          {/* シリーズアイテム */}
          { ssrItem.series.length > 0 && (
            <Card className={styles.siderCard}>
              <div className={styles.subCardTitle}>
                <AppstoreFilled />
                <Title level={3}>シリーズ</Title>
              </div>
              <List loadMore={loadMore}>
                { !showAll ? (
                  [...Array(5)].map((_, i) =>
                    ssrItem.series[i] && (
                      <List.Item className={styles.listItem} key={i}>
                        <ItemInfoCard item={ssrItem.series[i]} compact isLink/>
                      </List.Item>
                    )
                  )
                ) : (
                  ssrItem.series.map((s_item, i) =>
                    <List.Item className={styles.listItem} key={i}>
                      <ItemInfoCard item={s_item} compact isLink/>
                    </List.Item>
                  )
                )}
              </List>
            </Card>
          )}
        </div>
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
  const itemsRes = await fetch(`${SSR_BASE_URL}/v1/items/ids`, { method: "GET" })
  const paths: string[] = await itemsRes.json()

  return {
    paths,
    fallback: false
  }
}