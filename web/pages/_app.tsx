import { AppProps } from 'next/app'
import '../styles/globals.scss'
import 'antd/dist/antd.less'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}