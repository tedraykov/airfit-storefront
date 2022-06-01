import type { GetStaticPropsContext } from 'next'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import commonStaticProps from '@utils/static/commonStaticProps'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const commonProps = commonStaticProps({ preview, locale, locales })

  return {
    props: { ...commonProps },
  }
}

export default function Profile() {
  // const { data } = useCustomer()
  return (
    <Container>
      <Text variant="pageHeading">My Profile</Text>
      {/*{data && (*/}
      {/*  <div className="grid lg:grid-cols-12">*/}
      {/*    <div className="lg:col-span-8 pr-4">*/}
      {/*      <div>*/}
      {/*        <Text variant="sectionHeading">Full Name</Text>*/}
      {/*        <span>*/}
      {/*          {data.firstName} {data.lastName}*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*      <div className="mt-5">*/}
      {/*        <Text variant="sectionHeading">Email</Text>*/}
      {/*        <span>{data.primaryEmailAddress}</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </Container>
  )
}

Profile.Layout = Layout
