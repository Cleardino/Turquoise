class TurquoiseState {
    constructor() {
        this.scenes = [];
        this.currentSceneIndex = 0;
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
        return this.currentSceneIndex;
    }
    
    getNameOfCurrentScene(){
        return this.currentSceneIndex.getName();
    }
    getCurrentScene(){
        //console.log("test");
        return this.scenes[this.currentSceneIndex];
        
        //return this.scenes[currentScene];
    }

    getGobjects() {
        return this.scenes[this.currentSceneIndex].getGobjects();
    }
    goToNextScene() {
        this.currentSceneIndex++;
    }

/*    goToPreviousScene() {

    } */ //not necesary?

    //goToScene(name)? {

    //}

    update() {

        
        //console.log(this.getNumberOfTopBillers());

        for (let i = 0; i < this.getGobjects().length; i++) {
            this.getGobjects()[i].update();
            //console.log(gameState.getGobjects());
            if(this.getGobjects()[i].requestsTopBilling && (i < (this.getGobjects().length - this.getNumberOfTopBillers()))) {
                let sliced = this.getGobjects().splice(i, 1);
                console.log(this.getGobjects());
                this.getGobjects().push(sliced[0]);
                i--;
            }
            if (this.getGobjects()[i].isRequestingDestroy()) {
                this.getCurrentScene().destroyGobject(i);
                //console.log(gameState.getGobjects());
                i--; // hoping this prevents skipping an object's update, but untested. going through the array backwards supposedly prevents this also
                
            }
            
        }
    }


    //return how many objects are requesting top billing
    getNumberOfTopBillers() {
        let numberOfTopBillers = 0;
        for (let i = 0; i < this.getGobjects().length; i++) {
            if (this.getGobjects()[i].requestsTopBilling) {
                numberOfTopBillers++;
            }
        }
        return numberOfTopBillers;
    }

    getTopObjectAtPositionIfInteractableElseFalse(clicked) {
        if (this.interactable) {
            for (let i = (this.getGobjects().length - 1); (i > -1); i--) {
                if ((this.getGobjects()[i].doCoordsCollideWithThis(clicked)) && (this.getGobjects()[i].interactable)) {
                    return this.getGobjects()[i];
                }
            }
        }
        return false;
    }

}

class Scene {
    constructor(name, gobjects = [], spawners = []){
        this.name = name;
        this.gobjects = gobjects;
        this.spawners = spawners;
    }
    spawn() {
        while (this.spawners.length > 0) { //this while loop is disconcerting. Easy fix could stop this from potentially looping forever. For loop through then remove them at the end?
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