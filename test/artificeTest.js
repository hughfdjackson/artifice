var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')
  , sinon    = require('sinon')


test('init', function(){

    var world = artifice()

    a.ok(_.isObject(world.components))
    a.ok(_.isObject(world.systems))
    a.ok(_.isArray(world.entities))
})

test('is extensible via prototype', function(){

    var world = artifice()
    artifice.prototype.foo = sinon.spy()

    world.foo()

    a.ok(artifice.prototype.foo.called)
})

test('artifice.prototype.e', function(){

    var world = artifice()
      , e     = world.e()
      , e2    = world.e()

    a.ok(e instanceof artifice.entity)
    a.ok(_.isNumber(e.id))
    a.ok(_.contains(world.entities, e))

    a.ok(e2 instanceof artifice.entity)
    a.ok(_.isNumber(e2.id))
    a.ok(_.contains(world.entities, e2))

    a.notEqual(e.id, e2.id)
})

test('artifice.prototype.c', function(){

    var world = artifice()
      , fn    = function(){}
      , r     = world.c('render', fn)

    a.equal(r, world)
    a.equal(world.components.render, fn)
})

test('artifice.prototype.s', function(){
    
    var world = artifice()
      , fn    = function(){}
      , deps  = ['foo', 'bar']
      , opts  = { global: true }
      , r     = world.s('renderer', deps, fn, opts)

    a.equal(r, world)
    a.equal(world.systems.renderer.deps, deps)
    a.equal(world.systems.renderer.fn, fn)
    a.equal(world.systems.renderer.opts, opts)
})
