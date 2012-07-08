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
