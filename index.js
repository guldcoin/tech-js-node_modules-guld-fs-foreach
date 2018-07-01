const spawn = require('guld-spawn')
const { getJS } = require('guld-env')

async function foreach (p, cmd, args) {
  if (getJS().startsWith('node')) {
    var found = await spawn('find', '', [p, '-type', 'f', ...args])
    return Promise.all(found.split('\n').map(async f => {
      if (f === '') return
      return cmd(f)
    }))
  } else throw new Error('This function only available in node for now.')
}

module.exports = foreach
