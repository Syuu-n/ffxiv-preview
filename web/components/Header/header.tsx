import { Input } from 'antd'
import styles from '../../styles/components/header.module.scss'

export default function Header() {
  const { Search } = Input

  return (
    <div className={styles.headerInner}>
      <Search
        placeholder="アイテム検索"
        enterButton
        className={styles.searchContainer}
      />
    </div>
  )
}