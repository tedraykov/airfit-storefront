import commerce from '@lib/api/commerce'
import { GetServerSidePropsContext } from 'next'
import { IncomingMessage } from 'http'
import getAllProductPaths, {
  ProductPathNode,
} from '@framework/product/get-all-product-paths'
import { Page } from '@commerce/types/page'

function productsSitemapFragment(
  req: IncomingMessage,
  products: ProductPathNode[]
) {
  return products
    .map(({ node }) => {
      return `
       <url>
           <loc>${req.headers.host}/product${node.path}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
       </url>
     `
    })
    .join('')
}

function pagesSitemapFragment(req: IncomingMessage, pages: Page[]) {
  return pages
    .map((page) => {
      return `
      <url>
          <loc>${req.headers.host}/article${page?.url || ''}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
    })
    .join('')
}

function homeSitemapFragment(req: IncomingMessage) {
  return `
    <url>
        <loc>${req.headers.host}</loc>
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
  preview,
  locale,
  locales,
  res,
  req,
}: GetServerSidePropsContext) {
  const config = { locale, locales }

  const { products } = await getAllProductPaths()
  const { pages } = await commerce.getAllPages({ config, preview })

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
