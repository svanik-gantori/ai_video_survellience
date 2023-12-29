 video="";
 status="";
 objects=[];

 function preload()
 {
    video=createVideo('video.mp4');
    video.hide();
 }

 function setup()
 {
    canvas=createCanvas(450,350);
    canvas.center();
 }

 function draw()
{
    image(video,0,0,450,350);
    if(status != "")
    {
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++)
        {
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+objects.length;
            fill(r,g,b);
            noFill();
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
    console.log(results);
    objects=results;
    
    }
}