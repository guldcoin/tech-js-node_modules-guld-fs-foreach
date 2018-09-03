const spawn = require('guld-spawn').getSpawn()
const guldEnv = require('guld-env')
const path = require('path')

async function foreach (p, cmd, args) {
  if (guldEnv.JS.startsWith('node')) {
    var found = await spawn('find', '', [path.resolve(p), '-type', 'f', ...args], true)
    return Promise.all(found.split('\n').map(async f => {
      if (f === '') return
      return cmd(f)
    }))
  } else throw new Error('This function only available in node for now.')
}

module.exports = foreach
