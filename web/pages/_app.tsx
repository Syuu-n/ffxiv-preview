import { AppProps } from 'next/app'
import '../styles/globals.scss'
import 'antd/dist/antd.less'
import nprogress from 'nprogress'
import { useRouter } from 'next/router'
import '../static/scss/nprogress.scss'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // nprogress 設定
  nprogress.configure()

  // ページ遷移時
  router.events?.on('routeChangeStart', () => {
    nprogress.start()
  })
  // ページ遷移完了
  router.events?.on('routeChangeComplete', () => {
    nprogress.done()
  })
  // ページ遷移時エラー
  router.events?.on('routeChangeError', () => {
    nprogress.done()
  })

  return (
    <Component {...pageProps} />
  )
}