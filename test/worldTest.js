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


test('world.component', function(){
    var w = World()
      , fn= function(){}
    
    var r = w.component('foo', fn)

    a.equal(r, w)
    a.equal(w.components.foo, fn)
})

test('world.system', function(){
    var w = World()
      , o = {}

    var r = w.system('foo', o)

    a.equal(r, w)
    a.equal(w.systems.foo, o)
})

test('world.entity', function(){
    var w = World()
    
    var e = w.entity()
      , e2= w.entity("foo, bar")

    // has the right components
    a.ok(_.isObject(e.components))
    a.ok(_.isObject(e.systems))
    
    // unique, meaningful ids
    a.notEqual(e.id, e2.id)
    a.ok(e.id != null && !_.isNaN(e.id))
    a.ok(e2.id != null && !_.isNaN(e2.id))

    // is added to the world.entities list
    a.ok(_.contains(w.entities, e))
    a.ok(_.contains(w.entities, e2))

    // systems list into system keys
    a.ok(e2.systems.foo)
    a.ok(e2.systems.bar)

})
