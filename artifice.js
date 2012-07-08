void function(){
    
    // exports & lib obj
    var artifice = {}

    // artifice.world
    var world = artifice.world = function(){
        return Object.create(world.prototype).init()
    }

    world.prototype = { 

        _id: 0

      , init: function(){
            this.entities = []
            this.systems  = {}
            this.components = {}

            return this
        }

      , add: function(e){
            e.id = this._id
            this._id += 1
            this.entities.push(e)
            return this
        }

        // run a system, or all systems against all entities
      , run: function(name){
            if ( !name ) 
                Object.keys(this.systems).forEach(this.run.bind(this))
            else         
                this.systems[name](this, this._getEntitiesForSystem(name))

            return this
        }

      , _getEntitiesForSystem: function(name){
            var hasSys = function(e){ 
                return e.systems.indexOf(name) != -1 
            }

            return this.entities.filter(hasSys)
        }
    }

    /*
    // artifice.entity
    var entity = artifice.entity = function(){
        return {
            id: null
          , components: {}
          , systems: []
        }
    }
    */

    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
