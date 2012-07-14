suite('artifice.map')

var a = require('assert')
  , artifice = require('../')

test('map.prototype.add', function(){

    var map = artifice.map()

    map.add('foo', 'bar')
       .add('quux', 'bim')
       .add('quux', 'bam')      // no overwrite

    a.equal(map.items.foo, 'bar')
    a.equal(map.items.quux, 'bim')
})

test('map.prototype.remove', function(){ 

    var map = artifice.map()

    map.add('foo', 'bar')
       .add('bar', 'baz')
       .remove('foo') 
       .remove('quux')      // no consequence to a remove with nothing to remove

    a.ok(!map.items.foo)
    a.equal(map.items.bar, 'baz')
})

test('map.prototype.has', function(){

    var map = artifice.map()

    map.add('foo', 'bar')

    a.ok(map.has('foo'))
    a.ok(!map.has('baz'))

    // edge case testing
    a.ok(!map.has('__proto__'))
})

test('map.prototype.get', function(){
    
    var map = artifice.map()

    map.add('foo', 'bar')
    a.equal(map.get('foo'), 'bar')
})
