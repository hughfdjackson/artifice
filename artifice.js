void function(){

    // factory
    var factory = function(proto){
        var f = function(){ 
            var o = Object.create(proto)
            return o.init ? o.init.apply(o, arguments) : o
        }
        f.prototype = proto
        return f
    }

    // main constructor; makes a new 'world'
    var artifice = factory({ 

        _id: 0

      , init: function(){
            this.entities = []
            this.systems  = {}
            this.components = {}

            return this
        }

      , e: function(){
            var e = artifice.entity()
            e.id = this._id ++
            this.entities.push(e)
            return e
        }
      
      , c: function(name, fn){
            this.components[name] = fn
            return this
        }

      , s: function(name, deps, fn, opts){
            this.systems[name] = { 
                deps: deps
              , fn  : fn
              , opts: opts
            }
            return this
        }
    })

    artifice.entity    = factory({})

    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
