import crypto from 'crypto'

const hashPassword = (password: string) =>
  crypto.createHash('sha256').update(password).digest('hex')

export default hashPassword
