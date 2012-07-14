suite('artifice()')

var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')
  , sinon    = require('sinon')


test('initialises with correct properties', function(){

    var world = artifice()

    a.ok(world.systems      instanceof artifice.map)
    a.ok(world.entities     instanceof artifice.set)
})

test('is extensible via prototype', function(){

    var world = artifice()
    artifice.prototype.foo = sinon.spy()

    world.foo()

    a.ok(artifice.prototype.foo.called)
})

test('artifice.prototype.run', function(){
    
    var w = artifice()
      , s = artifice.system()
      , s2= artifice.system()
      , e = artifice.entity()
      , e2= artifice.entity()

    w.entities.add(e).add(e2)

    s.update = sinon.spy()
    s.global = true
    w.systems.add('render', s)

    s2.update = sinon.spy()
    w.systems.add('player', s2)

    e.systems.add('player').add('render')
    e2.systems.add('render')

    w.run('render').run('player')

    var args = s.update.lastCall.args
    a.equal(args[0], w)
    a.ok(_.contains(args[1], e))
    a.ok(_.contains(args[1], e2))
    a.equal(args[1].length, 2)


    a.ok(s2.update.calledWith(w))
    a.equal(s2.update.lastCall.thisValue, e)
})
