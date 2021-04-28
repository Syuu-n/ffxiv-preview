import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
// import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {

  render(): React.ReactElement {
    return (
      <Html lang="ja-JP">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon.png" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          /> */}
          {/* Google Adsense */}
          {/* <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            data-ad-client={process.env.NEXT_PUBLIC_AD_ID}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    )
  }
}