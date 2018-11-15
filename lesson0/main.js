const fs = require('fs')
const log = console.log.bind(console, '###')

const getBufferMap = (buf) => {
  const bufferMapper = new Map()

  // 取前 50个 buffer 中的数来解析
  for (let i = 0; i < 50; i++) {
    if (bufferMapper.has(buf[ i ])) {
      bufferMapper.set(buf[ i ], bufferMapper.get(buf[ i ]) + 1)
    } else {
      bufferMapper.set(buf[ i ], 0)
    }
  }
  return bufferMapper
}

const getTarget = (bufferMapper) => {
  let maxNumber = 0
  let k = ''
  for (let [ key, value ] of bufferMapper) {
    if (value > maxNumber) {
      [ k, maxNumber ] = [ key, value ]
    }
  }
  return k
}

const translate = (k, buf) => {
  let res = ''
  for (let bit of buf) {
    const b = bit ^ k
    if (0 <= b && b <= 127) {
      res += String.fromCharCode(b)
    } else {
      res += b
    }
  }
  return res
}

const test = (buf) => {
  const buffer = buf.slice(0, 1000)
  for (let i = 0; i <= 255; i++) {
    const result = translate(i, buffer)
    log(`第${i}：`, result)
  }
}

const __main = () => {
  const buf = fs.readFileSync('main.pak')
  const bufferMapper = getBufferMap(buf)
  // k === 247 for sure
  const k = getTarget(bufferMapper)
  const plainTxt = translate(k, buf.slice(0, 100000))
  log('plainTxt', plainTxt)
  // test(buf)
}

__main()
