import { GetServerSidePropsContext } from 'next'
import { IncomingMessage } from 'http'
import getPages from '@utils/static/getPages'
import getCatalogProducts from '@server/operations/getCatalogProducts'
import getCatalogProductPaths from '@server/operations/getCatalogProductPaths'
import { SHOP_ID } from '@config/index'
import { CatalogProduct, QueryCatalogItemsArgs } from '@graphql/schema'

function productsSitemapFragment(
  req: IncomingMessage,
  products: CatalogProduct[]
) {
  return products
    .map(({ slug }) => {
      return `
       <url>
           <loc>https://${req.headers.host}/product/${slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     `
    })
    .join('')
}

function pagesSitemapFragment(req: IncomingMessage, pages: any[]) {
  return pages
    .map((page) => {
      return `
      <url>
          <loc>https://${req.headers.host}/article${page?.url || ''}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
    })
    .join('')
}

function homeSitemapFragment(req: IncomingMessage) {
  return `
    <url>
        <loc>https://${req.headers.host}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `
}

function combineSitemapFragments(...sitemapFragments: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${sitemapFragments.join('')}
   </urlset>`
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({
  res,
  req,
}: GetServerSidePropsContext) {
  const products = await getCatalogProductPaths({
    shopIds: [SHOP_ID],
    first: 200,
  } as QueryCatalogItemsArgs)

  const pages = await getPages()

  const productsSitemap = productsSitemapFragment(req, products)
  const pagesSitemap = pagesSitemapFragment(req, pages)
  const homeSitemap = homeSitemapFragment(req)

  const sitemap = combineSitemapFragments(
    productsSitemap,
    pagesSitemap,
    homeSitemap
  )
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
