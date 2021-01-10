import 'tailwindcss/tailwind.css'
// import '../styles/globals.css'
import '../styles/loading.css'

import Head from "next/dist/next-server/lib/head"

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <>
      <Head><title>My Blog</title></Head>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
