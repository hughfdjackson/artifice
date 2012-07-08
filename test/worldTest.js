var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')
  , sinon    = require('sinon')

suite('artifice.world')

test('world()', function(){
    var w = artifice.world()
    
    a.ok(_.isObject(w.components))
    a.ok(_.isObject(w.systems))
    a.ok(_.isArray(w.entities))
})

test('world.prototype.add', function(){
    var w = artifice.world()
      , e = {}
      , e2= {}
    
    w.add(e).add(e2)

    a.notEqual(e.id, e2.id)
    a.ok(_.contains(w.entities, e))
    a.ok(_.contains(w.entities, e2))
})

test('world.prototype.run', function(){
    var w = artifice.world()

    var fooE    = { systems: ['foo'] }
      , barE    = { systems: ['bar'] }
      , foobarE = { systems: ['foo', 'bar'] }

    w.add(fooE)
     .add(barE)
     .add(foobarE)

    var foo = w.systems.foo = sinon.spy()
      , bar = w.systems.bar = sinon.spy()

    var r = w.run()

    a.equal(r, w)

    a.ok(foo.calledWith(w))
    a.notEqual(foo.args[0][1].indexOf(fooE), -1)
    a.notEqual(foo.args[0][1].indexOf(foobarE), -1)

    a.ok(bar.calledWith(w))
    a.notEqual(bar.args[0][1].indexOf(barE), -1)
    a.notEqual(bar.args[0][1].indexOf(foobarE), -1)


    foo.reset()
    bar.reset()

    w.run('foo')
    a.equal(r, w)
    a.ok(foo.calledWith(w))
    a.ok(!bar.called)
})
