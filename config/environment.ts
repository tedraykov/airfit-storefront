export function isProd() {
  const env = process.env.NEXT_PUBLIC_ENV
  return env === 'production'
}
