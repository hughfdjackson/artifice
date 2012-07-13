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
      , contains = function(arr, val){ return arr.indexOf(val) != -1 }
      

    // PUBLIC LIBRARY

    // main constructor; makes a new 'world'
    var artifice = factory({ 

         init: function(){
            this.entities   = artifice.set()
            this.systems    = artifice.map()
            this.components = artifice.map()

            return this
        }
    })

    artifice.entity = factory({
    
        init: function(){
            this.components = artifice.map()    
            this.systems    = artifice.set()

            return this
        }
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
    })

    // map; a key-value storage, with the same constraints as a regular js object
    // provided for API consistency
    artifice.map = factory({
        
        init: function(){
            this.items = {}
            return this
        }

      , add: function(name, val){
            if ( !(name in this.items) ) this.items[name] = val
            return this
        }       

      , remove: function(name){
            if ( name in this.items ) delete this.items[name]
            return this
        }
 
      , has: function(name){
            return name in this.items
        }
    })


    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
