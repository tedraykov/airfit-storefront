export function isProd() {
  return (
    process.env.NODE_ENV === 'production' &&
    process.env.SERVER_ENV === 'production'
  )
}
