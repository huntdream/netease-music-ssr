const crypto = require('crypto')

const params =
  's+K7s0f7z1U8ohrp/zZxrMD7QX6YX+maM19CmN8pMRTAfi84e7LD0IuWN32XotWNwOPb4fZoECQSNKYLRU7yck9wEBT4aliwEtlm1xcpufC55QRQo60BNDpekgsPs+ut1BWmhU589qRbHoXF3D4h2+6LUenAgfmUvyLhOHGH3eS3mv9By/ii6QhBtAZnILaB'

function createSecretKey(size = 16) {
  const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let key = ''
  for (let i = 0; i < size; i++) {
    let pos = Math.random() * keys.length
    pos = Math.floor(pos)
    key = key + keys.charAt(pos)
  }

  return key
}

function aesDecrypt(encrypted) {
  const _encrypted = encrypted
  const secKey = createSecretKey()
  const lv = new Buffer('0102030405060708', 'binary')
  const _secKey = new Buffer(secKey, 'binary')
  const decipher = crypto.createDecipheriv('AES-128-CBC', _secKey, lv)

  let decrypted = decipher.update(_encrypted, 'base64', 'utf8')
  decrypted += decipher.final('utf8')

  console.log(decrypted)
}

aesDecrypt(params)
