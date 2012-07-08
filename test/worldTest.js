var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')

suite('artifice.world')

test('world()', function(){
    var w = artifice.world()
    
    a.ok(_.isObject(w.components))
    a.ok(_.isObject(w.systems))
    a.ok(_.isArray(w.entities))
})

test('world add - entity', function(){
    var w = artifice.world()
      , e = {}
      , e2= {}
    
    w.add(e).add(e2)

    a.notEqual(e.id, e2.id)
    a.ok(_.contains(w.entities, e))
    a.ok(_.contains(w.entities, e2))
})
