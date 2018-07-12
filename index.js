const { getSpawn } = require('guld-spawn')
const { getJS } = require('guld-env')
const path = require('path')
const spawn = getSpawn()

async function foreach (p, cmd, args) {
  if (getJS().startsWith('node')) {
    var found = await spawn('find', '', [path.resolve(p), '-type', 'f', ...args], true)
    found.split('\n').forEach(async f => {
      if (f === '') return
      return cmd(f)
    })
  } else throw new Error('This function only available in node for now.')
}

module.exports = foreach
