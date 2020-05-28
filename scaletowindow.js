function scaleToWindow() {
    //console.log("helloworld");
    windowSize = {height: window.innerHeight, width: window.innerWidth}
    canvasDivided = canvasSize.width/canvasSize.height;
    windowDivided = windowSize.width/windowSize.height;
    //console.log(h);
    var hmm = (windowSize.height/canvasSize.height)*canvasSize.width;
    //console.log(canvasDivided);
    //console.log(windowDivided);

    let hither = document.getElementById("mydiv");
    //console.log(canvasScreenLeft);




    if (canvasDivided > windowDivided) {
        c.style = "width: 100%;"
        //c.style = "margin-top:100;"
    } else {
        c.style = "width: "+hmm.toString()+  "px;"
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