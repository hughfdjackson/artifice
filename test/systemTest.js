suite('artimis.system')

var a        = require('assert')
  , artifice = require('../')

test('init with correct properties', function(){
    
    var s = artifice.system({ testVariable: 'was extended' })

    a.equal(s.update, null)
    a.equal(s.global, false)
    a.equal(s.testVariable, 'was extended')
})
