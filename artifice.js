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
    }

    // exports
    if ( typeof module != 'undefined' && module.exports ) 
        module.exports = artifice
    else
        root.artifice = artifice

}(this)
