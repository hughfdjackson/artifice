void function(){

    // UTILITIES
    var factory = function(proto){
            var f = function(){ 
                var o = Object.create(proto)
                return o.init ? o.init.apply(o, arguments) : o
            }
            f.prototype = proto
            return f
        }
      , slice    = Function.prototype.call.bind([].slice)
      , hasOwnProp = Function.prototype.call.bind({}.hasOwnProperty)
      , contains = function(arr, val){ return arr.indexOf(val) != -1 }
      , extend   = function(t, f){ for ( var p in f ) t[p] = f[p]; return t }


    // PUBLIC LIBRARY
    var artifice = {}
    
    artifice.world = factory({ 

         init: function(){
            this.systems    = artifice.map()
            this.entities   = artifice.set()
            
            // ensure that entities have unique ids
            this.entities._id = 0
            this.entities.add = function(e){
                e.id = this._id ++
                return artifice.set.prototype.add.apply(this, arguments)
            }

            return this
        }

      , run: function(name){
            var s  = this.systems.get(name)
              , es = this.entities.items.filter(function(e){ return e.systems.has(name) })
              , w  = this

            if ( s.global ) s.update(w, es)
            else            es.forEach(function(e){ s.update.call(e, w) })

            return this
        }
    })

    // `entity` constructor
    artifice.entity = factory({
    
        init: function(){
            this.components = artifice.map()
            this.systems    = artifice.set()

            return this
        }
    })

    artifice.system = factory({ 
        update: null

      , init: function(o){
            return extend(this, o)
        }
      , global: false
    })
    
    // Base storage types
    
    // set; an unordered array of unique items
    artifice.set = factory({

        init: function(){
            this.items = []
            return this
        }

      , add: function(val){
            if ( !contains(this.items, val) ) this.items.push(val)
            return this
        }


      , remove: function(val){
            if ( contains(this.items, val) ) this.items.splice(this.items.indexOf(val), 1)
            return this
        }

      , has: function(val){
            return contains(this.items, val)
        }

      , clone: function(){
            var set = artifice.set()
            set.items = this.items.slice()
            return set
        }
    })

    // map; a key-value storage, with the same constraints as a regular js object
    // provided for API consistency
    artifice.map = factory({
        
        init: function(){
            this.items = Object.create(null)
            return this
        }

      , add: function(name, val){
            if ( !hasOwnProp(this.items, name) ) this.items[name] = val
            return this
        }       

      , remove: function(name){
            if ( hasOwnProp(this.items, name) ) delete this.items[name]
            return this
        }
 
      , has: function(name){
            return hasOwnProp(this.items, name)
        }

      , get: function(name){
            return this.items[name]
        }

      , clone: function(){
            var map = artifice.map()
            map.items = extend(Object.create(null), this.items)
            return map
        }
    })


    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
