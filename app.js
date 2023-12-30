//Elements to be accessed: all 9 boxes
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn=document.querySelector("#turn");

let turnO=true; //player O if true its player O's turn if False it is player X's turn

//to store all of the winning patterns we will use a 2D array
let winningPatterns= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


const resetGame=()=>{
    count=0;
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");//to hide the winner and new game button
}




//on clicking any of the box out of the boxes, either x or O should appear
//to click each of the box--for Each loop
//to click and make certain operation work-->addEventListener
let count=0;
boxes.forEach((box)=>{

    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
            turn.innerHTML="Player X's turn";
            
        }
        else{
            box.innerText="X";
            turnO=true;
            turn.innerHTML="Player O's turn";

        }
        //Loop hole: if after 9 clicks we again click on any of the button, it overwrites the existing text and thus the game continues infinetly
        // Hence Disable the button once the innerText is written
        box.disabled=true;
        count++;
        // box.style.backgroundColor="#AED2FF";

        //Check at any time the button is clicked is the winner found or not?
        checkWinner();
        console.log(count);
        if(count==9){
            msg.innerText=`Oops! Match Drawn`;
            msgContainer.classList.remove("hide");
            turn.innerHTML="";
            
        }

    })
});


const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");//to make the winner text visible
    turn.innerHTML="";
}


const checkWinner=()=>{
    for(let pattern of winningPatterns ){
        // //pattern= individual array element i.e. a single array []


        // console.log(pattern[0],pattern[1],pattern[2]);
        // //to check the elemnts present in each of the boxes
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);


        let posVal1=boxes[pattern[0]].innerText;
        let posVal2=boxes[pattern[1]].innerText;
        let posVal3=boxes[pattern[2]].innerText;

        //Wining pattern possible only when the specific boxes are filled with some value and is not empty
        if(posVal1!="" && posVal2!="" && posVal3!=""){
            if(posVal1 === posVal2 && posVal2 === posVal3)
           { //console.log("winner ", posVal1 );
            showWinner(posVal1);
            disableBoxes();
            //to disable all other buttons once winner is declared
        }

        }

    }
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }

}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);