export function isProd() {
  const env = process.env.NEXT_PUBLIC_ENV
  console.log(`isProd: ${env}`)
  return env === 'production'
}
