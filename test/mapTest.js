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

test('map.prototype.clone', function(){

    var map = artifice.map().add('foo', '').add('bar', '') 
      , map2= map.clone().add('baz', '')
    
    a.ok(map.has('foo'))
    a.ok(map.has('bar'))
    a.ok(!map.has('baz'))

    a.ok(map2.has('foo'))
    a.ok(map2.has('bar'))
    a.ok(map2.has('baz'))
})

test('map.prototype.filter', function(){

    var map = artifice.map().add('foo', { x: true }).add('bar', { x: false })
      , res = map.filter(function(v, k){ return v.x == true })

    a.ok(res.has('foo'))
    a.ok(!res.has('bar'))
})
