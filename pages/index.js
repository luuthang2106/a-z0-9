import Head from 'next/head'
import Link from 'next/link'
import LayoutClient from '../components/layout_client'

export default function Home() {

  return (
    <div><Link href="/">
    <a>About</a>
  </Link></div>
  )
}
Home.Layout = LayoutClient
