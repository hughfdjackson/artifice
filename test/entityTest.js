var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')
  , sinon    = require('sinon')

suite('artifice.entity()')

test('initialises with correct properties', function(){
    
    var e = artifice.entity()
    
    a.equal(e.id, null)
    a.ok(_.isObject(e.components))
    a.ok(_.isArray(e.systems))
})

test('entity#addSystem()', function(){
    var e = artifice.entity()
      , r  = e.addSystem('render', 'player', 'collision')
    
    a.equal(r, e)
    a.ok(_.contains(e.systems, 'render'))
    a.ok(_.contains(e.systems, 'player'))
    a.ok(_.contains(e.systems, 'collision'))
})
