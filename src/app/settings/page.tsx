import dynamic from 'next/dynamic'

import Layout from '@/components/layout'
import LoadingIcon from '@/icons/three-dots.svg'

const Settings = dynamic(() => import('@/components/settings'), {
  loading: () => <LoadingIcon />
})

const Page = () => {
  return (
    <Layout>
      <Settings />
    </Layout>
  )
}

export default Page
