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
      , slice    = Function.prototype.call.bind([].slice)
      , contains = function(arr, val){ return arr.indexOf(val) != -1 }
      

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
            e.addSystem.apply(e, arguments)
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

      , run: function(){
            slice(arguments).forEach(this._runOne.bind(this))
            return this
        }
      , _runOne: function(name){
            var es = this.entities.filter(function(e){ return contains(e.systems, name) })
              , s  = this.systems[name].fn
        
            es.forEach(function(e){ s(this, e) }.bind(this))
        }

    // , find: function(selector){}
    })

    artifice.entity = factory({
        
        id  : null
      , init: function(){
            this.components = {}
            this.systems    = []

            return this
        }

      , addSystem: function(){
            var args = slice(arguments)
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
