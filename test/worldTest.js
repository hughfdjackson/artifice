var World = require('../').World
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

/*
test('entity - basic', function(){
    var w = World()
      , e = w.entity()
    
    a.notEqual(e.id, undefined)
    a.notEqual(e.id, w.entity().id)

    a.ok(_.isObject(e.components))
    a.ok(_.isObject(e.systems))
})

test('entity - with systems', function(){
    var w = World()
    
    w.system('foo', ['bar'], function(){})
    w.component('bar', function(){ return { x: 3 } })

    var e = w.entity(['foo'])

    a.equal(e.components.bar.x, 3)
})

*/
