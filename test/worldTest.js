var World = require('../').World
  , a     = require('assert')
  , _     = require('underscore')
  , sinon = require('sinon')

suite('artifice.World')

test('World()', function(){
    var w = World()
    
    a.ok(_.isArray(w.entities))
    a.ok(_.isObject(w.systems))
    a.ok(_.isObject(w.components))

    a.ok(_.isEmpty(w.entites))
    a.ok(_.isEmpty(w.systems))
    a.ok(_.isEmpty(w.components))
})

