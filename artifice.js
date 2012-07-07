void function(){
    
    // exports & lib obj
    var artifice = ( typeof module != 'undefined' && module.exports ) ? module.exports : (root.artifice = {})

    // deps
    var _ = _ || (require && require('underscore'))

    var World = artifice.World = function(){
        return {
            _id         : 0
          , entities    : []
          , systems     : {}
          , components  : {}
        }
    }

    World.addSystem = function(world, name, o){
        world.systems[name] = o
    }

    World.addComponent = function(world, name, fn){
        world.components[name] = fn
    }

    /*
    World.addEntity = function(world, entity){
        world.entities.push(entity)
    }
    */

}(this)
