import dynamic from 'next/dynamic'

import Layout from '@/components/layout'
import LoadingIcon from '@/icons/three-dots.svg'

const Chat = dynamic(() => import('@/components/chat'), {
  loading: () => <LoadingIcon />
})

const Page = () => {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}

export default Page
