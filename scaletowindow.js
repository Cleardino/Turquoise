function scaleToWindow() {
    //console.log("helloworld");
    windowSize = {height: window.innerHeight, width: window.innerWidth}
    canvasDivided = canvasSize.width/canvasSize.height;
    windowDivided = windowSize.width/windowSize.height;
    //console.log(h);
    var hmm = (windowSize.height/canvasSize.height)*canvasSize.width;
    //console.log(canvasDivided);
    //console.log(windowDivided);

    //let hither = document.getElementById("mydiv");
    //console.log(canvasScreenLeft);

    //let calculatedScale = canvasSize.width * (windowSize.width/canvasSize.width);
    let thing = windowSize.width/canvasSize.width;
    let thang = windowSize.height/canvasSize.height;

    let grr = (windowSize.height/2) - (canvasSize.height*thing/2);
    let brr = (windowSize.width/2) - (canvasSize.width * thang/2);
    if (canvasDivided > windowDivided) {
        
        c.style = "width: "+windowSize.width.toString()+"px;"+"top: "+grr.toString()+"px; background-color: white"
        //c.style = "width: "+grr.toString();+"px;"




        /*c.style = "width: "+calculatedScale.toString()+"px;";*/
        /*c.style = "height: 1000px;"*/
        //c.style = "width: 100%;"
        /*c.style = "top: 100px"*/
        //c.style = "margin-top: 100 px;"
        //c.style = "padding-top: 100px;"
    } else {
        c.style = "height: "+windowSize.height+"px;" + "left: "+brr.toString()+"px; background-color: white"
        //c.style = "width: "+grr.toString();+"px;"
        /*c.style = "width: "+hmm.toString()+  "px;"*/
        //c.style = "width: 500px; border:1px solid #000000;"
    }

   
}

window.addEventListener("orientationchange", function() {
    if (!runSettings.trueSize) {
        scaleToWindow();
    }
    updateGlobalCanvasPositionAndSizeCache();

  });

window.addEventListener("resize", function() {
    if (!runSettings.trueSize) {
        scaleToWindow();
        if(runSettings.customCursors) {
            c.style.cursor = 'none';
          }
    }
    updateGlobalCanvasPositionAndSizeCache();
  });