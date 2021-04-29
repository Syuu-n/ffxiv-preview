import { GetStaticPaths, GetStaticProps } from "next"
import { SSR_BASE_URL } from '../lib/config/config'
import { Item } from '../lib/requests/requestStructs'
import Layout from '../components/Layout/layout'
import { Typography, Carousel, Image } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from '../styles/pages/[id].module.scss'

interface Props {
  ssrItem: Item
}

export default function ItemPage(props: Props) {
  const { ssrItem } = props
  const { Title } = Typography

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
    >
      <Title level={1}>{ssrItem.name}</Title>
      <div className={styles.imageContainer}>
        <Carousel arrows {...settings}>
          <Image src={`/ffxiv-preview-image/${ssrItem.id}/1_scale.png`} />
          <Image src={`/ffxiv-preview-image/${ssrItem.id}/1.png`} />
          <Image src={`/ffxiv-preview-image/${ssrItem.id}/2.png`} />
          <Image src={`/ffxiv-preview-image/${ssrItem.id}/3.png`} />
        </Carousel>
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