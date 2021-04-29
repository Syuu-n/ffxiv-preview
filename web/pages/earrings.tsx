import { GetStaticProps } from 'next'
import { SSR_BASE_URL } from '../lib/config/config'
import Layout from '../components/Layout/layout'
import ItemCardList from '../components/ItemCardList/itemCardList'
import { Item } from '../lib/requests/requestStructs'

interface Props {
  items: Item[]
}

export default function Earrings(props: Props) {
  const { items } = props

  return (
    <Layout
      menuSelected="earrings"
      breadcrumbs={[
        { key: "", name: "ホーム" },
        { key: "earrings", name: "耳飾り"},
      ]}
    >
      <ItemCardList items={items}/>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const itemsRes = await fetch(`${SSR_BASE_URL}/v1/items`, { method: "GET" })
  const items: Item[] = await itemsRes.json()

  return {
    props: {
      items
    }
  }
}