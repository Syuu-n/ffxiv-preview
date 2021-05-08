import { GetStaticProps, GetStaticPaths } from 'next'
import { SSR_BASE_URL } from '../../lib/config/config'
import { ItemIndex } from '../../lib/responses/responseStructs'
import Layout from '../../components/Layout/layout'
import ItemCardList from '../../components/ItemCardList/itemCardList'
import { Pagination } from 'antd'
import { useRouter } from 'next/router'
import styles from '../../styles/pages/earrings/[page].module.scss'

interface Props {
  itemIndex: ItemIndex
}

export default function EarringsPage(props: Props) {
  const { itemIndex } = props
  const router = useRouter()

  return (
    <Layout
      menuSelected="earrings"
      breadcrumbs={[
        { key: "", name: "ホーム" },
        { key: "earrings/1", name: "耳飾り"},
      ]}
    >
      <ItemCardList items={itemIndex.items}/>
      <div className={styles.paginationContainer}>
        <Pagination
          current={itemIndex.meta.current_page}
          pageSize={18}
          total={itemIndex.meta.total_count}
          onChange={(page, _) => router.push(`/earrings/${page}`)}
          showSizeChanger={false}
        />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params.page
  const itemsRes = await fetch(`${SSR_BASE_URL}/v1/items?page=${page}`, { method: "GET" })
  const itemIndex: ItemIndex = await itemsRes.json()

  return {
    props: {
      itemIndex
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const itemsRes = await fetch(`${SSR_BASE_URL}/v1/items`, { method: "GET" })
  const itemIndex: ItemIndex = await itemsRes.json()

  const paths = [...Array(itemIndex.meta.total_pages)].map((_, i) =>
    { return { params: { page: (i + 1).toString() } } }
  )

  return {
    paths,
    fallback: false
  }
}