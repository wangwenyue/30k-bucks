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

const __main = () => {
  const buf = fs.readFileSync('main.pak')
  const bufferMapper = getBufferMap(buf)
  const k = getTarget(bufferMapper)
  log('xor index', k)
}

__main()












