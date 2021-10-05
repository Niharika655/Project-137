status1 = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectName = document.getElementById("objectName").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;
}

function gotResults(error, results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects = results;
}
}

function draw() {
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == objectName){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectStatus").innerHTML = objectName+" Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectStatus").innerHTML = objectName+" Not Found"; 
            }
        }
    }
}