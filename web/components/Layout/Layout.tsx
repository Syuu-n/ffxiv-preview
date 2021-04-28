import Head from "next/head"
import styles from '../../styles/compoments/layout.module.scss'
import {
  SITE_FULL_NAME, SITE_NAME, SITE_DOMAIN, SITE_DESCRIPTION,
} from '../../lib/config/config'
import { Layout as AntLayout, Menu } from "antd"
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"

export default function Layout (props: {
  children: React.ReactNode
  title?: string
  description?: string
  noindex?: boolean
  pageUrl?: string
  ogImageUrl?: string
}) {
  const { children, title, description, noindex, pageUrl, ogImageUrl } = props
  const { Header, Sider, Content, Footer } = AntLayout

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${SITE_FULL_NAME}` : SITE_FULL_NAME}</title>
        <meta name="description" content={description ? description : SITE_DESCRIPTION} />
        {/* 検索エンジンにインデックスされない */}
        { noindex ? (
          <>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
          </>
        ) : (
          <>
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
          </>
        )}
        {/* 重複ページを1つのアドレスへまとめる */}
        <link rel="canonical" href={pageUrl ? SITE_DOMAIN + pageUrl : SITE_DOMAIN} />
        <meta property="viewport" content="width=device-width, initial-scale=1" />
        <meta property="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={pageUrl ? SITE_DOMAIN + pageUrl : SITE_DOMAIN} />
        <meta property="og:title" content={title ? title : SITE_FULL_NAME} />
        <meta property="og:description" content={description ? description : SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_DOMAIN}/images/macroshare_ogp.png`} />
        {/* <meta name="twitter:site" content={TWITTER_ACCOUNT} /> */}
        { ogImageUrl ? (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={ogImageUrl} />
          </>
        ) : (
          <>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content={`${SITE_DOMAIN}/images/macroshare_ogp.png`} />
          </>
        )}
      </Head>
      <AntLayout className={styles.mainPage}>
        {/* ---sider--- */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout>
          {/* ---header--- */}
          <Header className={styles.siteLayoutSubHeaderBackground} style={{ padding: 0 }} />
          {/* ---main--- */}
          <Content
            className={styles.siteLayoutBackground}
            style={{ margin: '24px 16px 0' }}
          >
            {children}
          </Content>
          {/* ---footer--- */}
          <Footer className={styles.footer}>
            記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。
            (C) SQUARE ENIX CO., LTD. All Rights Reserved. / 
            &copy; 2021 {SITE_FULL_NAME}
          </Footer>
        </AntLayout>
      </AntLayout>
    </>
  )
}