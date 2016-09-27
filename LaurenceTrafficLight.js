

var colourArray = ["#FF0000", "#4C3100", "#003200", "#660000", "#FFA500", "#007F00"]; //Hex for each colour. (Red, Dark Orange, Dark Green, Dark Red, Orange, Green)
var redIndex = 0;
var orangeIndex = 1;
var greenIndex = 2;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pi = Math.PI; //This is used to store PI so that I dont keep caling from a module (which is inefficient)

var count = 0; //Count for the colour change. Used to tell which light is on.
var startClicked = false; //Boolean for checking when the lights are on / off.
var intervalArray = [1000, 1000, 1000, 1000]; //Array that stores integers that are how many milliseconds a certain light stays on for.

function setColours(redIndex, orangeIndex, greenIndex){

    ctx.shadowBlur = 75;
    ctx.shadowColor = "rgba(0,0,0, 1.0)";

    <!--Red circle creation-->
    ctx.beginPath();
    ctx.arc(125, 110, 70, 0, 2 * pi);
    ctx.fillStyle = colourArray[redIndex];
    ctx.fill();
    
    <!--Orange-->
    ctx.beginPath();
    ctx.arc(125, 275, 70, 0, 2 * pi);
    ctx.fillStyle = colourArray[orangeIndex];
    ctx.fill();
	
    <!--Green-->
    ctx.beginPath();
    ctx.arc(125, 440, 70, 0, 2 * pi);
    ctx.fillStyle = colourArray[greenIndex];
    ctx.fill();
    ctx.shadowBlur = 0;
    loadSequence();
}

function changeLights() {

    if(count == 0){
        orangeIndex = 4;
	count++;
	setColours(redIndex, orangeIndex, greenIndex);
    } else if(count == 1){
        redIndex = 3;
	orangeIndex = 1;
	greenIndex = 5;
	count++;
	setColours(redIndex, orangeIndex, greenIndex);
    } else if(count == 2){
        greenIndex = 2;
	orangeIndex = 4;
	count++;
	setColours(redIndex, orangeIndex, greenIndex);
    } else if(count == 3){
	redIndex = 0;
	orangeIndex = 1;
        //Sets variables back to their starting values and reloads the default traffic light. So that the sequence can start over.
        count=0;
	setColours(redIndex, orangeIndex, greenIndex);
	}
}

function resetCanvas() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    changeLights();
}

function startClick() { //This function is called when the user clicks the start button.

    if(!startClicked) { //Check if the start button hasn't been clicked (if the boolean is false). I use this check so that the user can not use the start button more than once.

        startClicked = true; //Then set the boolean to true - because it has now been clicked.
        loadSequence(); //And call the loadSequence function which will start the traffic light sequence.
    }
}


function loadSequence() { //This function is called from the startClick function if the start button has been clicked. 

    if(startClicked) { //Because this function is in the setColours function it is called when the website starts up (since that is when the setColours funtion is ran). I don't want this function to run though because the user hasn't pressed the start button yet, therefore I use this if statement to check if the user has actually pressed the button.

        pageInterval = setTimeout("resetCanvas()", intervalArray[count]); //And if they have the function resetCanvas will be called after a timeout. The value of the timeout is retrieved from the intervalArray using count as the index - this means that different values will be called when different lights display. For example the red light might display for longer than the green light. This setTimeout method is given a name pageInterval - so it can be cancelled later on.
    }
}

function stopClick() { //This function is called when the stop button is clicked.
    
    clearTimeout(pageInterval); //The method called pageInterval that runs in the loadSequence function (above) is cancelled because the user wants to stop the traffic light sequence.
    startClicked = false; //Finally, the boolean startClicked is set to false because the traffic lights are no longer running and the user can use the start button again.
}

function getIntervals() {

    var redInterval = document.getElementById("redInterval").value;
    var redorangeInterval = document.getElementById("redorangeInterval").value;
    var greenInterval = document.getElementById("greenInterval").value;
    var orangeInterval = document.getElementById("orangeInterval").value;
    
    if(redInterval == "" || redorangeInterval == "" || greenInterval == "" || orangeInterval == "") {

        document.getElementById("timeText").innerHTML="FAILED! Please enter a valid number in each box!";
    }

    else {
        document.getElementById("timeText").innerHTML="Success! The times have been updated!";
        //Convert the input values to miliseconds
        redInterval *= 1000;
        redorangeInterval *= 1000;
        greenInterval *= 1000;
        orangeInterval *= 1000;

        //Start the sequence with the given intervals for each light
        intervalArray = [redInterval, redorangeInterval, greenInterval, orangeInterval];
    }
}

setColours(redIndex, orangeIndex, greenIndex);

</script>