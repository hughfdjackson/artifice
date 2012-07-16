suite('artifice.entity()')

var artifice = require('../')
  , a        = require('assert')
  , sinon    = require('sinon')

test('initialises with correct properties', function(){
    
    var e = artifice.entity()
    
    a.ok(e.components instanceof artifice.map)
    a.ok(e.systems    instanceof artifice.set)
    a.ok(e.tags       instanceof artifice.set)

    // aliases
    a.equal(e.components,   e.c)
    a.equal(e.systems,      e.s)
    a.equal(e.tags,         e.t)
})
