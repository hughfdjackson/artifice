suite('artifice()')

var artifice = require('../')
  , a        = require('assert')
  , _        = require('underscore')
  , sinon    = require('sinon')


test('initialises with correct properties', function(){

    var world = artifice()

    a.ok(world.components   instanceof artifice.map)
    a.ok(world.systems      instanceof artifice.map)
    a.ok(world.entities     instanceof artifice.set)
})

test('is extensible via prototype', function(){

    var world = artifice()
    artifice.prototype.foo = sinon.spy()

    world.foo()

    a.ok(artifice.prototype.foo.called)

})

