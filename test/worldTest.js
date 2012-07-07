var World = require('../').World
  , Entity= require('../').Entity
  , a     = require('assert')
  , _     = require('underscore')
  , sinon = require('sinon')

suite('World')

test('init', function(){
    var w = World()
    
    a.ok(_.isArray(w.entities))
    a.ok(_.isObject(w.systems))
    a.ok(_.isObject(w.components))
})

test('World.addSystem', function(){
    var w = World()
     , fn = function(){}

    World.addSystem(w, 'foo', { deps: ['bar'], fn: fn })
    
    a.equal(w.systems.foo.deps[0], 'bar')
    a.equal(w.systems.foo.fn, fn)
})

test('component', function(){
    var w = World()
      , fn= function(){}

    World.addComponent(w, 'bar', fn)
    a.equal(w.components.bar, fn)
})


test('World.addEntity', function(){
    var w = World()
      , e = Entity()
      , e2= Entity()

    World.addEntity(w, e)
    World.addEntity(w, e2)
    a.notEqual(e.id, null)
    a.notEqual(e2.id, null)
    a.notEqual(e.id, e2.id)

})

test('World.addEntity - with systems', function(){
    var w   = World()
      , e   = Entity()
      , spy = sinon.spy(function(){ return { x: 0, y: 2 } })

    World.addSystem(w, 'render', { deps: ['position'] })
    World.addComponent(w, 'position', spy)

    e.systems = ['render']

    World.addEntity(w, e)
    a.equal(e.components.position.x, 0)
    a.equal(e.components.position.y, 2)
})
