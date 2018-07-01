/* eslint-env node, mocha */
const assert = require('chai').assert
const foreach = require('./index.js')
const pify = require('pify')
const fs = pify(require('fs'))

describe('foreach', function () {
  afterEach(async function () {
    try {
      await fs.rename('fixtures/frenchfries', 'fixtures/pizza')
    } catch (e) {
      if (e.code !== 'ENOENT') throw e
    }
    try {
      await fs.rename('fixtures/depth/frenchfries', 'fixtures/depth/pizza')
    } catch (e) {
      if (e.code !== 'ENOENT') throw e
    }
  })
  it('rename non-recursive', async function () {
    await foreach('fixtures', (p) => {
      return fs.rename(p, p.replace('pizza', 'frenchfries'))
    }, ['-maxdepth', 1])
    var frenchfries = await fs.readFile('./fixtures/frenchfries', 'utf-8')
    assert.equal(frenchfries, 'ny')
    var deepizza = await fs.readFile('./fixtures/depth/pizza', 'utf-8')
    assert.equal(deepizza, 'ny')
  })
  it('rename recursive', async function () {
    await foreach('fixtures', (p) => {
      return fs.rename(p, p.replace('pizza', 'frenchfries'))
    }, [])
    var frenchfries = await fs.readFile('./fixtures/frenchfries', 'utf-8')
    assert.equal(frenchfries, 'ny')
    var deepizza = await fs.readFile('./fixtures/depth/frenchfries', 'utf-8')
    assert.equal(deepizza, 'ny')
  })
})
