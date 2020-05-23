class TurquoiseState {
    constructor() {
        this.scenes = [];
        this.currentScene = 0;
        this.interactable = true;
        //console.log(this.scenes);
    }
    
    addScene(scene) {
        this.scenes.push(scene);
    }
    getSceneByArrayPosition(i){
        //console.log("test");
        return this.scenes[i];
        //var i;
        //for (i = 0; (i < this.scenes.length(); i++) {
            //if (scenes[i].getName == name) {
                //return scenes[i];
            //}
        //}
    }

    getSceneByName(name) {
        var i;
        for (i = 0; i < this.scenes.length; i++) {
            if (this.scenes[i].getName() == name) {
                //console.log('helllooo');
                return this.scenes[i];
            }
        }
        
    }

    getArrayPosOfCurrentScene() {
        return this.currentScene;
    }
    
    getNameOfCurrentScene(){
        return this.currentScene.getName();
    }
    getCurrentScene(){
        //console.log("test");
        return this.scenes[0];
        
        //return this.scenes[currentScene];
    }

    getGobjects() {
        return this.scenes[this.currentScene].getGobjects();
    }
/*     goToNextScene() {

    }

    goToPreviousScene() {

    } */ //not necesary?

    //goToScene(name) {

    //}

    update() {
        for (let i = 0; i < this.getGobjects().length; i++) {
            this.getGobjects()[i].update();
            //console.log(gameState.getGobjects());
            if (this.getGobjects()[i].isRequestingDestroy()) {
                this.getCurrentScene().destroyGobject(i);
                //console.log(gameState.getGobjects());
                i--; // hoping this prevents skipping an object's update, but untested. going through the array backwards supposedly prevents this also
                
            }
            
        }
    }

}

class Scene {
    constructor(name, gobjects = [], spawners = []){
        this.name = name;
        this.gobjects = gobjects;
        this.spawners = spawners;
        console.log(gameState);
    }
    spawn() {
        while (this.spawners.length > 0) {
            this.gobjects = this.gobjects.concat(this.spawners[0].spawned);
            this.spawners.splice(0,1);
        }
    }
    addGobject(gobject) {
        this.gobjects.push(gobject);
    }
    getName() {
        //console.log("so this is happening");
        return this.name;
    }
    destroyGobject(i) {
        this.gobjects.splice(i,1);
    }
    getGobjects() {
        return this.gobjects;
    }
}