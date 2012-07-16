suite('artifice.set')

var a        = require('assert')
  , _        = require('underscore')
  , artifice = require('../')


test('set.prototype.add', function(){
    var set = artifice.set()

    set.add(2).add(2)
    a.equal(set.items.length, 1)
})

test('set.prototype.has', function(){
    var set = artifice.set()
      , r   = set.add(2).has(2)

    a.ok(r)
    a.ok(!set.has(4))

})

test('set.prototype.remove', function(){
    var set = artifice.set()

    set.add(2).add(4).remove(2).add(3)
    a.ok(!set.has(2))
})


test('set.prototype.clone', function(){
    
    var set = artifice.set().add('foo').add('bar')
      , set2= set.clone().add('baz')

    a.ok(set.has('foo'))
    a.ok(set.has('bar'))
    a.ok(!set.has('baz'))

    a.ok(set2.has('foo'))
    a.ok(set2.has('bar'))
    a.ok(set2.has('baz'))
})

test('set.prototype.filter', function(){

    var set = artifice.set().add('foo').add('quux')
      , res = set.filter(function(v){ return v.length == 3 })

    a.ok(res.has('foo'))
    a.ok(!res.has('quux'))
})
