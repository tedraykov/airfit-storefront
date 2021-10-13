import { ReactionCommerceConfig } from '../api'
import getViewerIdQuery from '../utils/queries/get-viewer-id-query'
import getAuthorizationHeader from '@framework/api/utils/request-authorization'
import refreshTokensMutation from '@framework/utils/mutations/refresh-tokens'

async function getViewerId(
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) {
  const { data, res } = await config.fetch(
    getViewerIdQuery,
    {},
    {
      headers: getAuthorizationHeader(cookies[config.customerCookie]),
    }
  )
  if (res.status === 401) {
    await config.fetch(refreshTokensMutation, {
      variables: {
        refreshToken: cookies[config.refreshTokenCookie],
        accessToken: cookies[config.customerCookie],
      },
    })
  }

  return data.viewer?._id
}

export default getViewerId
