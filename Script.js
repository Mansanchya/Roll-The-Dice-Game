// Variable define or initialize with let.
let score = 0;
let randomVar;
let trialNumber = 1;
let playMusic = true;

// Access the values by let variables with getElementsById.
let buttonVal = document.getElementsByTagName("button");
let result = document.getElementById("result");
let report = document.getElementById("text-init-loading");
let timeS = document.getElementById("timeS");
let dice = document.getElementById("dice");

//The onclick event is handled here and it will react whenever the user will click on the selected elements. It just stores the number that user select and matches with the dice number. And in the response it will shows the results on screen with massage. 
const Clicked = (e) => {
  let userSelectedNumber = (e.target.innerText);
  dice.src = `img/${randomVar}.png`;

  // Shows selected number
  document.getElementById("text-user-selected").innerHTML = userSelectedNumber;
  document.getElementById("text-user-selected").style.visibility="visible";
  if (randomVar == userSelectedNumber) {
    result.style.color = "#1CE1BE";
    result.innerHTML = "You guess it right!";
    score++;

    // shows score
    document.getElementById("text-total-score").innerHTML = score;
    //playSoundSuccess();
    playSound("right");
  } else {
    result.style.color = "#FFFFFF";
    result.innerHTML = "Sorry, it was a wrong number!";
    //playSoundFailure();
    playSound("wrong");
  }
  // It will just use to ensure that no input will take from the user while dice is not rolling.
  Array.from(buttonVal).forEach(element => {
    element.disabled = true;
    element.classList.toggle("disabled");
  }); 
  trialNumber++;

  // shows trial number
  document.getElementById("text-ttrial-number").innerHTML = trialNumber; 
}

// This will shows the "Loading..." massage and hide the "Dice will change in seconds" and hide the "Can you guess it" massage.
const load = () => {
  report.innerHTML = `<h2>Loading...</h2>
    <span style="font-size:0.7em;">
      The game will start in few seconds!
    </span>`;
  document.getElementById('h').style.visibility="hidden";
  result.style.visibility="hidden";
  document.getElementById("text-user-selected").style.visibility="hidden";

  // It will just use to ensure that input will take from the user while dice is rolling after open/refresh the webpage.
  Array.from(buttonVal).forEach(element => {
    element.addEventListener("click", Clicked);
    element.disabled = false;
    element.classList.add("disabled");
  });
  
  // This will hide the "Loading..." massage and shows the "Dice will change in seconds" massage after first 6 Seconds.
  setTimeout(() => {
    report.style.display="none";
    document.getElementById('h').style.visibility="visible";
  }, 6000);
}

// This will showing interval of the countdown from 9 to 1 after 1 second shows the "Can you guess it" massage.
const DisplayTime = () => {
  let timesecond = 9;
  setInterval(() => {
    timeS.innerHTML = timesecond;
    timesecond--;
    if (timesecond == 0) {
      result.style.color = "#FFFFFF";
      result.innerHTML="Can you guess it?";
      result.style.visibility="visible";
      timesecond = 10;
    }
  }, 1000);
}

// This will generate random number from 1 to 6. And also display that rolling dice gif on the screen.
const addNewRandom = () => {
  setInterval(() => {
    randomVar = Math.floor(Math.random() * 6) + 1;
    dice.src = `img/load.gif`;
    dice.style.width = "37.5%";
    dice.style.marginTop= "12.5px";
    dice.style.border = "5px solid black";
    dice.style.borderRadius = "25px";
    document.getElementById("text-user-selected").style.visibility="hidden";

    // It will just use to ensure that input will take from the user while dice is rolling.
    Array.from(buttonVal).forEach(element => {
      element.disabled = false;
      element.classList.remove("disabled");
    });
  }, 10000);
}

// This musicImageHandler function handle the Music speaker ON/OFF functionality with click on the speaker image.
function musicImageHandler(){
  if (playMusic){
    playMusic = false;
    document.getElementById("image-music").src = `img/music-off.png`;
  }else{
    playMusic = true;
    document.getElementById("image-music").src = `img/music-on.png`;
  }
}

// This palysound function handles the sound of any guessed number. If the user gussed the correct number then the IF condition will exicute and if the user gussed wrong number then the ELSE IF condition will exicute. And this function will only runs when the playMusic condition is true which tell about that speaker is on.
function playSound(state){
  if(playMusic){
    if (state == "right"){
      var audio = new Audio("./assets/audio/success-1-6297.mp3");
      audio.play();
    }else if(state == "wrong"){
      var audio = new Audio("./assets/audio/negative_beeps-6008.mp3");
      audio.play();
    }
  } 
}

// Wherever open or refresh the webpage then these 3 function which inside window.onload, will be called.
window.onload = () => {
  load();
  DisplayTime();
  addNewRandom();
}