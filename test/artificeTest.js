var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')
  , sinon    = require('sinon')

suite('artifice()')

test('initialises with correct properties', function(){

    var world = artifice()

    a.ok(_.isObject(world.components))
    a.ok(_.isObject(world.systems))

    a.equal(Object.getPrototypeOf(world.components), artifice.components)
    a.equal(Object.getPrototypeOf(world.systems), artifice.systems)

    a.ok(_.isArray(world.entities))
})

test('is extensible via prototype', function(){

    var world = artifice()
    artifice.prototype.foo = sinon.spy()

    world.foo()

    a.ok(artifice.prototype.foo.called)
})

test('artifice#entity() - creates & adds an entity', function(){

    var world = artifice()
      , e     = world.entity()
      , e2    = world.entity('render')

    // have the right prototype
    a.ok(e instanceof artifice.entity)
    a.ok(e2 instanceof artifice.entity)

    // numerical ids
    a.ok(_.isNumber(e.id))
    a.ok(_.isNumber(e2.id))

    // that are unique
    a.notEqual(e.id, e2.id)
    
    // automatically added to the entities of the world
    a.ok(_.contains(world.entities, e))
    a.ok(_.contains(world.entities, e2))

    // calls addSystem (or has the same effect) with the arguments passed in
    a.ok(_.contains(e2.systems, 'render'))
    
})

test('artifice#component() - register a component', function(){

    var world = artifice()
      , fn    = function(){}
      , r     = world.component('render', fn)

    a.equal(r, world)
    a.equal(world.components.render, fn)
})

test('artifice#system() - register a system', function(){
    
    var world = artifice()
      , fn    = function(){}
      , deps  = ['foo', 'bar']
      , opts  = { global: true }
      , r     = world.system('renderer', deps, fn, opts)

    a.equal(r, world)
    a.equal(world.systems.renderer.deps, deps)
    a.equal(world.systems.renderer.fn, fn)
    a.equal(world.systems.renderer.opts, opts)
})

test('artifice#run() - run a system, or systems, against the state of the world', function(){

    var world = artifice()
      , render= sinon.spy()
      , move  = sinon.spy()

    world.system('render', [], render)
    world.system('move', [], move)
    
    var r = world.run('render', 'move')

    a.equal(r, world)
    a.ok(!render.called)
    a.ok(!move.called)

    var e = world.entity('render')

    world.run('render')
    a.ok(render.calledWith(world, e))
})
