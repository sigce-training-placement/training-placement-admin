import Head from 'next/head'
import React from 'react'

const PageHead = ({title}) => {
  return (
	<Head>
		<title>{"SIGCE | " + title}</title>
		<link rel="shortcut icon" href="/assets/sigce.png" />
	</Head>
  )
}

export default PageHead