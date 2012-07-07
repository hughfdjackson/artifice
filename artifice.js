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

    World.addEntity = function(world, entity){
        entity.id = world._id += 1
        entity.systems.forEach(function(systemName){
            World._resolveSystemDeps(world, entity, systemName)
        })
        world.entities.push(entity)
    }

    World._resolveSystemDeps = function(world, entity, systemName){
        var sys = world.systems[systemName]
        if ( !sys.deps ) return
        sys.deps.forEach(function(depName){
            var componentFn = world.components[depName]
            if ( !entity.components[depName] ) entity.components[depName] = componentFn()
        })
    }

    var Entity = artifice.Entity = function(){
        return {
            id: null
          , systems: []
          , components: {}
        }
    }


}(this)
