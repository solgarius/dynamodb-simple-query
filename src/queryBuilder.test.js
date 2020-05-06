import { addWhereFilterToParams } from './queryBuilder'

const describe = global.describe
const it = global.it
const expect = global.expect

describe('function addWhereFilterToParams (params, where, options)', () => {
  it('supports multiple data points anded together', () => {
    const params = {}
    const where = { cIdA: 'c1', oIdA: 'o1' }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#oIdA': 'oIdA', '#cIdA': 'cIdA' },
        ExpressionAttributeValues: { ':oIdA': 'o1', ':cIdA': 'c1' },
        FilterExpression: '#cIdA = :cIdA and #oIdA = :oIdA'
      }
    )
  })
  it('supports nested "$or"s and "$and"s', () => {
    const params = {}
    const where = {
      $or: [
        { cIdA: 'c1', oIdA: 'o1' },
        { cIdB: 'c2', oIdB: 'o2' }
      ]
    }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#oIdA': 'oIdA', '#cIdA': 'cIdA', '#oIdB': 'oIdB', '#cIdB': 'cIdB' },
        ExpressionAttributeValues: { ':oIdA': 'o1', ':cIdA': 'c1', ':oIdB': 'o2', ':cIdB': 'c2' },
        FilterExpression: '(#cIdA = :cIdA and #oIdA = :oIdA) or (#cIdB = :cIdB and #oIdB = :oIdB)'
      }
    )
  })
  it('supports deeply nested "$or"s and "$and"s - redunant or', () => {
    const params = {}
    const where = {
      $or: [
        { $or: [{ cIdA: 'c1' }], oIdA: 'o1' },
        { cIdB: 'c2', oIdB: 'o2' }
      ]
    }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#oIdA': 'oIdA', '#cIdA': 'cIdA', '#oIdB': 'oIdB', '#cIdB': 'cIdB' },
        ExpressionAttributeValues: { ':oIdA': 'o1', ':cIdA': 'c1', ':oIdB': 'o2', ':cIdB': 'c2' },
        FilterExpression: '(#cIdA = :cIdA and #oIdA = :oIdA) or (#cIdB = :cIdB and #oIdB = :oIdB)'
      }
    )
  })
  it('supports deeply nested "$or"s and "$and"s', () => {
    const params = {}
    const where = {
      $or: [
        { $or: [{ cIdA: 'c1' }, { xIdA: 'x1' }], oIdA: 'o1' },
        { cIdB: 'c2', oIdB: 'o2' }
      ]
    }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#xIdA': 'xIdA', '#oIdA': 'oIdA', '#cIdA': 'cIdA', '#oIdB': 'oIdB', '#cIdB': 'cIdB' },
        ExpressionAttributeValues: { ':xIdA': 'x1', ':oIdA': 'o1', ':cIdA': 'c1', ':oIdB': 'o2', ':cIdB': 'c2' },
        FilterExpression: '((#cIdA = :cIdA or #xIdA = :xIdA) and #oIdA = :oIdA) or (#cIdB = :cIdB and #oIdB = :oIdB)'
      }
    )
  })
  it('supports deeply nested "$or"s and "$and"s - redundant and', () => {
    const params = {}
    const where = {
      $or: [
        { $and: [{ cIdA: 'c1', xIdA: 'x1' }], oIdA: 'o1' },
        { cIdB: 'c2', oIdB: 'o2' }
      ]
    }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#xIdA': 'xIdA', '#oIdA': 'oIdA', '#cIdA': 'cIdA', '#oIdB': 'oIdB', '#cIdB': 'cIdB' },
        ExpressionAttributeValues: { ':xIdA': 'x1', ':oIdA': 'o1', ':cIdA': 'c1', ':oIdB': 'o2', ':cIdB': 'c2' },
        FilterExpression: '(#cIdA = :cIdA and #xIdA = :xIdA and #oIdA = :oIdA) or (#cIdB = :cIdB and #oIdB = :oIdB)'
      }
    )
  })
  it('supports empty expressions', () => {
    const params = {}
    const where = {
      $or: [
        { $and: [], oIdA: 'o1' },
        { cIdB: 'c2', oIdB: 'o2' }
      ]
    }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#oIdA': 'oIdA', '#oIdB': 'oIdB', '#cIdB': 'cIdB' },
        ExpressionAttributeValues: { ':oIdA': 'o1', ':oIdB': 'o2', ':cIdB': 'c2' },
        FilterExpression: '#oIdA = :oIdA or (#cIdB = :cIdB and #oIdB = :oIdB)'
      }
    )
  })
  it('supports duplicate key names', () => {
    const params = {}
    const where = {
      $or: [
        { oIdA: 'o1' },
        { cIdB: 'c2', oIdA: 'o2' },
        { cIdB: 'c2', oIdA: 'o3' }
      ]
    }
    const resultParams = addWhereFilterToParams(params, where)
    expect(resultParams).toEqual(
      {
        ExpressionAttributeNames: { '#oIdA': 'oIdA', '#oIdA_1': 'oIdA', '#oIdA_2': 'oIdA', '#cIdB': 'cIdB', '#cIdB_1': 'cIdB' },
        ExpressionAttributeValues: { ':oIdA': 'o1', ':oIdA_1': 'o2', ':oIdA_2': 'o3', ':cIdB': 'c2', ':cIdB_1': 'c2' },
        FilterExpression: '#oIdA = :oIdA or (#cIdB = :cIdB and #oIdA_1 = :oIdA_1) or (#cIdB_1 = :cIdB_1 and #oIdA_2 = :oIdA_2)'
      }
    )
  })
})
