import { BLOCKS } from '@contentful/rich-text-types'
import { Text } from 'components/ui'

export const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <Text variant={'pageHeading'} className="pt-2">
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <Text variant={'sectionHeading'} className="pt-10">
        {children}
      </Text>
    ),
  },
}
