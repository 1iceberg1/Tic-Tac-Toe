// selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXbtn = selectBox.querySelector(".playerx"),
selectObtn = selectBox.querySelector(".playero"),
playBoard = document.querySelector(".playboard"),
allbox = document.querySelectorAll("section span"),
player = document.querySelector(".player"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = () => { // once window load
    for (let i = 0; i < allbox.length; i++) { // add onclick attritube in all availble section's spans
        allbox[i].setAttribute("onclick", "clickedBox(this)")
    }

    selectXbtn.onclick = () => {
        selectBox.classList.add("hide"); // hide the select box on playerx button clicked
        playBoard.classList.add("show"); // show the playboard on playerx button clicked
    }
    selectObtn.onclick = () => {
        selectBox.classList.add("hide"); // hide the select box on playero button clicked
        playBoard.classList.add("show"); // show the playboard on playero button clicked
        player.setAttribute("class", "player active players");
    }
}

let playerXicon = "fa-solid fa-x"; // class name of fontawesome cross icon
let playerOicon = "fa-regular fa-circle"; // class name of fontawesome circle icon
let playerSign = "x"; // suppose player will be x
let runbot = true;


// user click function 
function clickedBox(element) {
    if(player.classList.contains("players")) { // if player element has contains .players
        
        element.innerHTML = `<i class="${playerOicon}"></i>`; // adding circle icon tag inside user clicked element
        player.classList.add("active");
        playerSign = "o"; // if the player select O then we'll change the playerSign value to O
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXicon}"></i>`; // adding cross icon tag inside user clicked element
        player.classList.add("active"); 
        element.setAttribute("id", playerSign);
    }

    selectWinner(); // calling the winner function
    playBoard.style.pointerEvents = "none"; // once user select then user can't select any other box until box select
    element.style.pointerEvents = "none"; // once user select any box then that box can't be selected again
    let randomDelaytime = ((Math.random() * 1000) + 200).toFixed(); // generating random time delay so bot will delay randomly
    setTimeout(() => {
        bot(runbot); // calling bot function
    }, randomDelaytime); // passing random delay time
}

// bot click function 
function bot(runbot) {
   if(runbot) { // if runbot is true then run the following codes
     //first change the playerSign... so if user value in id then bot will have O
     playerSign = "o";
     let array = []; // creating empty array... we'll store unselected box index in this array
     for (let i = 0; i < allbox.length; i++) {
         if(allbox[i].childElementCount == 0) { //if span has no any child element
             array.push(i); // inserting unclicked or unselected boxes inside array means that span has no children
         }
         
     }
     let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array to bot will select random 
     if(array.length > 0) {
         if(player.classList.contains("players")) { // if player element has contains .players
             allbox[randomBox].innerHTML = `<i class="${playerXicon}"></i>`; // adding cross icon tag inside user clicked element
             player.classList.remove("active");
             playerSign = "x"; // if user is O then the box id value will be X
             allbox[randomBox].setAttribute("id", playerSign);
         } else {
             allbox[randomBox].innerHTML = `<i class="${playerOicon}"></i>`; // adding circle icon tag inside user clicked element
             player.classList.remove("active");
             allbox[randomBox].setAttribute("id", playerSign);
         }
         selectWinner(); // calling the winner function
     }
     allbox[randomBox].style.pointerEvents = "none"; // once bot select any box then user can't select or click on that box
     playBoard.style.pointerEvents = "auto";
     playerSign = "x"; // passing the x value
   }
}

// let's work on select the winner
function getClass(idname) {
    return document.querySelector(".box" + idname).id; // returing id name
}

function checkClasses(val1, val2, val3, sign) {
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() { // if one combination of them matched the select the winner
    if(checkClasses(1,2,3,playerSign) || checkClasses(3,6,9,playerSign) || checkClasses(7,8,9,playerSign) || checkClasses(1,4,7,playerSign) || checkClasses(4,5,6,playerSign) || checkClasses(2,5,8,playerSign) || checkClasses(1,5,9,playerSign) || checkClasses(3,5,7,playerSign)) {
        console.log(playerSign + " " + "is the winner");
        // if someone won the match stop the runbot
        runbot = false;
        bot(runbot);
        setTimeout(() => { // we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // 700ms delay

        wonText.innerHTML = `Player <span>${playerSign}</span> won the game!`;
    } else {
        // if match has drawn
        // first we'll check all id ... if all span has id and no one won the game then we'll draw the game
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runbot = false;
        bot(runbot);
        setTimeout(() => { // we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // 700ms delay

        wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); // reload the current page
}