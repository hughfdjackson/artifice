void function(){
    
    // exports & lib obj
    var artifice = ( typeof module != 'undefined' && module.exports ) ? module.exports : (root.artifice = {})

    // deps
    var _ = _ || (require && require('underscore'))

    var world = artifice.world = {}
    
    world.make = function(){
        return {
            _id         : 0
          , entities    : []
          , systems     : {}
          , components  : {}
        }
    }

    // World, string, System -> World
    world.addSystem = function(world, name, o){
        world.systems[name] = o
        return world
    }

    // World, string, Function -> World
    world.addComponent = function(world, name, fn){
        world.components[name] = fn
        return world
    }

    // World, Entity -> World
    world.addEntity = function(world, entity){
        entity.id = world._id += 1
        entity.systems.forEach(function(systemName){
            resolveSystemDeps(world, entity, systemName)
        })
        world.entities.push(entity)
        return world
    }

    // World, Entity, string -> undefined
    var resolveSystemDeps = function(world, entity, systemName){
        var sys = world.systems[systemName]
        if ( !sys.deps ) return
        sys.deps.forEach(function(depName){
            var componentFn = world.components[depName]
            if ( !entity.components[depName] ) entity.components[depName] = componentFn()
        })
    }


    var entity = artifice.entity = {}
    
    entity.make = function(){
        return {
            id: null
          , systems: []
          , components: {}
        }
    }
    

}(this)
