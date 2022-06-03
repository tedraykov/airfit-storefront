import type { GetStaticPropsContext } from 'next'
import { Layout } from '@components/common'
import { Text } from '@components/ui'
import commonStaticProps from '@utils/static/commonStaticProps'

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const commonProps = commonStaticProps(ctx)
  return {
    props: {
      ...commonProps,
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading">Not Found</Text>
      <Text className="">
        The requested page doesn't exist or you don't have access to it.
      </Text>
    </div>
  )
}

NotFound.Layout = Layout
