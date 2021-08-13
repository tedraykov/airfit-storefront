import { ReactionCommerceConfig } from '../api'
import getViewerIdQuery from '../utils/queries/get-viewer-id-query'
import getAuthorizationHeader from '@framework/api/utils/request-authorization'

async function getViewerId(
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) {
  const { data } = await config.fetch(
    getViewerIdQuery,
    {},
    {
      headers: getAuthorizationHeader(cookies[config.customerCookie]),
    }
  )

  return data.viewer?._id
}

export default getViewerId
