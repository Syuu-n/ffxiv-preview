import Head from "next/head"
import styles from '../../styles/components/layout.module.scss'
import {
  SITE_FULL_NAME, SITE_NAME, SITE_DOMAIN, SITE_DESCRIPTION,
} from '../../lib/config/config'
import { Layout as AntLayout, Menu, Breadcrumb, Divider, BackTop } from "antd"
import { HomeOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import CustomHeader from '../../components/Header/header'
import { IMAGE_BASE_URL } from '../../lib/config/config'

type MenuList = "home" | "earrings"

interface BreadcrumbItem {
  key: string | number
  name: string
}

export default function Layout (props: {
  children: React.ReactNode
  title?: string
  description?: string
  noindex?: boolean
  pageUrl?: string
  ogImageUrl?: string
  menuSelected?: MenuList
  breadcrumbs?: BreadcrumbItem[]
}) {
  const { children, title, description, noindex, pageUrl, ogImageUrl, menuSelected, breadcrumbs } = props
  const { Header, Sider, Content, Footer } = AntLayout
  const router = useRouter()

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
          className={styles.sider}
          zeroWidthTriggerStyle={{ top: "10px"}}
        >
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[menuSelected ? menuSelected : "home"]}>
            <Menu.Item
              key="home"
              icon={<img src={`${IMAGE_BASE_URL}/commons/home_icon.png`} />}
              className={styles.menuIcon}
              onClick={() => router.push("/")}
            >
              ホーム
            </Menu.Item>
            <Menu.Item
              key="earrings"
              icon={<img src={`${IMAGE_BASE_URL}/commons/earring_icon.png`} />}
              className={styles.menuIcon}
              onClick={() => router.push("/earrings/1")}
            >
              耳飾り
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout className={styles.contentWrapper}>
          {/* ---header--- */}
          <Header className={styles.siteLayoutSubHeader} style={{ padding: 0 }}>
            <CustomHeader />
          </Header>
          {/* パンくずリスト */}
          <div className={styles.breadcrumb}>
            <Breadcrumb>
              { breadcrumbs ? (
                breadcrumbs.map((breadcrumb) =>
                  <Breadcrumb.Item href={`/${breadcrumb.key}`} key={breadcrumb.key}>
                    { breadcrumb.key === "" && (
                      <HomeOutlined />
                    )}
                    <span>{breadcrumb.name}</span>
                  </Breadcrumb.Item>
                )
              ) : (
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                  <span>ホーム</span>
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
            <Divider className={styles.breadcrumbDivider} />
          </div>
          {/* ---main--- */}
          <Content className={styles.content}>
            {children}
          </Content>
          {/* ---footer--- */}
          <Footer className={styles.footer}>
            記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。
            (C) SQUARE ENIX CO., LTD. All Rights Reserved. / 
            &copy; 2021 {SITE_FULL_NAME}
          </Footer>
          {/* BackToTop */}
          <BackTop className={styles.BackToTopWrap}>
            <DoubleLeftOutlined className={styles.BackToTop} />
          </BackTop>
        </AntLayout>
      </AntLayout>
    </>
  )
}