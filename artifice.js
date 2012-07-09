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
            this.systems  = Object.create(artifice.systems)
            this.components = Object.create(artifice.components)

            return this
        }

      , entity: function(){
            var e = artifice.entity()
            e.id = this._id ++
            this.entities.push(e)
            return e
        }
      
      , component: function(name, fn){
            this.components[name] = fn
            return this
        }

      , system: function(name, deps, fn, opts){
            this.systems[name] = { 
                deps: deps
              , fn  : fn
              , opts: opts
            }
            return this
        }

    // , find: function(selector){}
    // , run: function(){}
    })

    artifice.entity     = factory({
        
        id  : null
      , init: function(){
            this.components = {}
            this.systems    = []
            return this
        }

      , addSystem: function(){
            var args = Array.prototype.slice.call(arguments)
            this.systems = this.systems.concat(args)
            return this
        }
    })

    // default systems
    artifice.systems    = {}

    // default components 
    artifice.components = {}

    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
