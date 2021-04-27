import { AppProps } from 'next/app'
import 'antd/dist/antd.less'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}