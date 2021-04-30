import Link from 'next/link'

interface Props {
  href?: string
  passHref?: boolean
  children?: React.ReactNode
}

export default function CustomLink(props: Props) {
  const { href, passHref, children } = props

  return (
    <Link
      href={href}
      passHref={passHref}
      prefetch={false}
    >
      {children}
    </Link>
  )
}