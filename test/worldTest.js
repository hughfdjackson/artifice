var artifice = require('../')
  , world = require('../').world
  , entity= require('../').entity
  , a     = require('assert')
  , _     = require('underscore')
  , sinon = require('sinon')

suite('artifice.world')

test('world.make', function(){
    var w = world.make()
    
    a.ok(_.isArray(w.entities))
    a.ok(_.isObject(w.systems))
    a.ok(_.isObject(w.components))
})

test('world.addSystem', function(){
    var w = world.make()
     , fn = function(){}

    world.addSystem(w, 'foo', { deps: ['bar'], fn: fn })
    
    a.equal(w.systems.foo.deps[0], 'bar')
    a.equal(w.systems.foo.fn, fn)
})

test('world.addComponent', function(){
    var w = world.make()
      , fn= function(){}

    world.addComponent(w, 'bar', fn)
    a.equal(w.components.bar, fn)
})


test('world.addEtity', function(){
    var w = world.make()
      , e = entity.make()
      , e2= entity.make()

    world.addEntity(w, e)
    world.addEntity(w, e2)
    a.notEqual(e.id, null)
    a.notEqual(e2.id, null)
    a.notEqual(e.id, e2.id)
})

test('world.addentity.make - with systems', function(){
    var w   = world.make()
      , e   = entity.make()
      , spy = sinon.spy(function(){ return { x: 0, y: 2 } })

    world.addSystem(w, 'render', { deps: ['position'] })
    world.addComponent(w, 'position', spy)

    e.systems = ['render']

    world.addEntity(w, e)
    a.equal(e.components.position.x, 0)
    a.equal(e.components.position.y, 2)
})
