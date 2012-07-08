void function(){
    
    // exports & lib obj
    var artifice = {}

    // artifice.world
    var World = artifice.World = function(){
        return Object.create(World.prototype).init()
    }

    World.prototype = { 

        init: function(){
            this._id = 0
            this.entities = []
            this.systems  = {}
            this.components = {}

            return this
        }

      , component: function(name, fn){
            this.components[name] = fn
            return this
        }
      , system: function(name, o){
            this.systems[name] = o
            return this
        }
      , entity: function(systems, components){
            var e = Entity()
            e.id = this._id ++
            this.entities.push(e)
            return e
        }
    }

    // entity
    var Entity = function(){
        return {
            id: null
          , components: {}
          , systems: {}
        }
    }

    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
