function addContent(state) {

    //*** Test Content Not Being Used ***
    
    /* var dvdWidth = 128;
    var dvdHeight = 65;
    var bdWidth = 128;
    var bdHeight = 70; */
    //let dvdSpawner = new BouncyImageSpawner(dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png", 10, "dvd");
    //let bdSpawner = new BouncyImageSpawner(bdWidth, bdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Blu_ray_logo.png/320px-Blu_ray_logo.png", 10, "bd");
    //let examplePoint = new Point(10, 10);
    //texas.clickShapeNums = texBox;
    //let line1 = new Line(new Position(10,10), new Position(20, 200));
    //let line2 = new Line(new Position(150,150), new Position(5, 20));
    //let line3 = new Line(new Position(80,70), new Position(100,50));
    //let testswitch = new BetterTestSwitch("switch1", new Position(500,0));
    //let testswitch = new TwoStateSpriteObject("switch1", new Position(500,0), 150, 150, "images/switch/switch1.png", "images/switch/switch5.png", ["images/switch/switch2.png","images/switch/switch3.png","images/switch/switch4.png"]);
    //let testswitch = new TwoStateSpriteObject("switch1", new Position(500,0), 150, 150, "images/switch/switch1.png", "images/switch/switch5.png", ["images/switch/switch2.png","images/switch/switch3.png","images/switch/switch4.png"], 5, [[54, 61], [124, 91], [111, 146], [75, 150], [4, 115], [2, 82], [9, 15], [35, 13]], [[6, 104], [6, 82], [29, 63], [81, 85], [119, 49], [136, 59], [133, 81], [112, 136], [102, 150], [91, 150]]);
    //let testswitch2 = new BetterTestSwitch("switch2", new Position(500,200));
    //let triangle = new Shape([new Point(517, 124), new Point(512, 180), new Point(416, 156)]);
    //let dragTexas = new DraggableSprite("dragTexas", new Position(100,100), 200, 195, "images/texas.png", texBox);
    //texasShape = new Shape([new Point(171,108), new Point(212,110), new Point(216,138), new Point(315,159),  new Point(324,221), new Point(268,255), new Point(267,293), new Point(236,287), new Point(196,225),new Point(170,225),new Point(160,235),new Point(107,188),new Point(171,188)]);
    //console.log(line1.isIntersecting(line2));
    //let marioSpawner = new BouncyImageSpawner(15, 28, "images/mario.png", 10, "mario");
    
    let texBox = [[55, 1], [101, 1], [101, 36], [191, 54], [192, 83], [199, 100], [193, 124], [150, 154], [142, 169], [146, 190], [140, 194], [115, 184], [108, 163], [91, 140], [79, 124], [61, 124], [54, 137], [30, 121], [29, 115], [1, 82], [54, 81]];
    let texas = new BouncyImageSpawner(200, 195, "images/texas.png", 3, "texas", 8, texBox);
    
    //[[34, 4], [51, 10], [61, 21], [64, 33], [61, 48], [52, 59], [35, 65], [19, 61], [11, 53], [5, 43], [4, 34], [7, 20], [13, 13], [24, 6]] ball I think
    //*** Content Being Used ***   
    
    let testswitch = new DragSwitch(new Position(500, 0));
    
    let mouse = new SpriteObject("mouse", new Position(138, 0), 385, 270, "images/mouse.png");
    
    let title = new SpriteObject("title", new Position(128, 254), 378, 81, "images/Fromagerie.png");
    let playButton = new PlayButton(new Position(185, 225));
    let playButton2 = new PlayButton(new Position(558, 5));
    let testTexas = new DraggableSprite("texas", new Position(483, 2), 150, 146, "images/texas2.png", "images/texas2bigger.png", [[42, 62], [44, 7], [76, 8], [75, 28], [138, 38], [144, 71], [141, 92], [108, 114], [107, 138], [102, 140], [85, 132], [76, 116], [59, 92], [47, 91], [44, 101], [33, 98], [27, 92], [24, 81], [4, 62]], [new Position(0,0), new Position(canvasSize.width, canvasSize.height)]);
    let paper = new ThrowableSprite("paper", new Position(16, 14), 122, 154, "images/paper.png", false, [new Position(0,0), new Position(canvasSize.width, canvasSize.height)], 0.9, 0.5);
    let block = new GravitySprite("block", new Position(20, 20), 68, 67, "images/block.png", false);
    let ball = new BouncyBall("ball", new Position(180,10), 68, 67, "images/ball.png", [[34, 4], [51, 10], [61, 21], [64, 33], [61, 48], [52, 59], [35, 65], [19, 61], [11, 53], [5, 43], [4, 34], [7, 20], [13, 13], [24, 6]],[new Position(0,0), new Position(canvasSize.width, 335)]);
    
    let titleScreen = new Scene("TitleScreen", [title, mouse, playButton, testTexas, paper/*dragTexas*/], [texas]);
    //titleScreen.spawn();
    let bouncyScene = new Scene("BouncyScene", [testswitch, block, ball, playButton2], [ /*dvdSpawner, bdSpawner, marioSpawner,texas*/], "images/bg.png");

    let wall1 = new SpriteObject("wall1", new Position(417,165), 50, 15, "images/black.png", false, 1);
    let wall2 = new SpriteObject("wall2", new Position(367,165), 50, 15, "images/black.png", false, 1);
    let wall3 = new SpriteObject("wall3", new Position(317,165), 50, 15, "images/black.png", false, 1);
    let wall4 = new SpriteObject("wall4", new Position(267,165), 50, 15, "images/black.png", false, 1);
    let dragMe = new DraggableSprite("dragMe", new Position(0,0), 20, 20, "images/black.png", false, false, [new Position(0,0), new Position(canvasSize.width, canvasSize.height)], 1);

    let collisionScene = new Scene("CollisionScene", [dragMe, wall1, wall2, wall3, wall4]);
    bouncyScene.spawn();
    state.addScenes([titleScreen, bouncyScene, collisionScene]);
    //state.addScene(bouncyScene);
    //state.addScene(collisionScene);
    console.log(gameState);
  }