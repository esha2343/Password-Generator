const lengthDisplay = document.querySelector("[data-length]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const passwordDispaly = document.querySelector("#password");
const copybtn = document.querySelector(".copyBtn");
const copymsg = document.querySelector(".copyMsg");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const generateBtnn = document.querySelector("#Generatebutton");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const indicator = document.querySelector("#indicator");
const symbols = "~!@#$%^&*(){}[]?,./";


// password lenght and display
let password = "";
let passwordLength = 10; // default value
let checkCount = 0;
handleSlider();
setIndiator("#ccc");

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;

    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "%100%";

}

// setIndiator
function setIndiator(color){
    indicator.style.backgroundColor = color;
    // shadow wla kam
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`; 
}
   
// get random password  
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function RandomNumber(){
    return getRndInteger(0,9);
}
function RandomUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function RandomLowercase(){
    return String.fromCharCode(getRndInteger(96,123));
}
function RandomSymbols(){
    const random = getRndInteger(0,symbols.length);
    return symbols.charAt(random);
}

// shuffled password
function shufflePassword(array){
    
    for(let i=array.length-1; i>=0; i--){

        let j = Math.floor(Math.random()*(i+1));

        //swaping
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    for(let i=0; i<array.length; i++)
    {
        str += array[i];
    }

    return str;
}

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;
    let hasNum = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if((hasUpper && hasLower && (hasLower || hasSym)) && passwordLength <= 8){
        setIndiator("#0f0");
    }else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
        setIndiator("#ff0");
    }else{
        setIndiator("red");
    }
}

//copy msg
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDispaly.value);
        copymsg.innerText = "copied";
    }
    catch(e){
        copymsg.innerText = "failed";
    }
    copymsg.classList.add("active");

    setTimeout(()=>{
        copymsg.classList.remove("active");
    },2000); 
}

//changes slider value

inputSlider.addEventListener("input",(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copybtn.addEventListener("click",()=>{
    if(passwordDispaly.value) // also do... if(passwordlenght > 0)
    copyContent(); 
})

function handleCheckCount(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) checkCount++;
    });
    // special condition
    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach(checkbox => {
    checkbox.addEventListener("change",handleCheckCount);
});

generateBtnn.addEventListener("click",() => {
    console.log("start");

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    let funArr = [];
    password = ""; 
    
    if(uppercaseCheck.checked)
        funArr.push(RandomUppercase);
    if(lowercaseCheck.checked)
        funArr.push(RandomLowercase);
    if(numbersCheck.checked)
        funArr.push(RandomNumber);
    if(symbolsCheck.checked)
        funArr.push(RandomSymbols);
     

    for(let i=0; i<funArr.length; i++){
        password += funArr[i]();
    }

    console.log("comp array done")
    // remaining addition
    for(let i=0; i<passwordLength-funArr.length;i++){
        let randIndex = getRndInteger(0,funArr.length);
        password += funArr[randIndex]();
    }
    console.log("remainig done")

    // shuffled the password
    password = shufflePassword(Array.from(password));
    console.log("suffled");

    // display passowrd
    passwordDispaly.value = password;
    console.log("display done");

    //strenght display
    calStrength();  
    console.log("strength done")
});