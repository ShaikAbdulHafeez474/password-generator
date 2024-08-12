const inputslider=document.querySelector("[datalengthslider]");

const lengthdisplay=document.querySelector("[data-lengthnumber]");

const passworddisplay=document.querySelector("[datapassworddisplay]");
const copybtn=document.querySelector("[datacopy]");
const copymsg=document.querySelector("[ datacopymsg]");

const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const  numberscheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#symbols");
const indicator=document.querySelector("[dataindicator]");
const generatebtn=document.querySelector(".generatebutton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");

const symbols='~`;:?!@#$%^&*(){}<>.,"|+-=';

// initialise all the default cases//
let password="";

let passwordlength=10;

let checkcount=0; //count of checkboxes ticked



handleslider();
//default circle color->gray///
setindicator("#ccc");
 //set lenght
 function handleslider(){
     inputslider.value=passwordlength;
     lengthdisplay.innerText=passwordlength;
   // passworddisplay.value='';
     const min=inputslider.min;
     const max=inputslider.max;
     inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min)) + "% 100";

 }

 function setindicator(color){
         indicator.style.background=color;
         indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
 }

 function getrndinteger(min,max){
    return  Math.floor(Math.random()*(max-min))+min;

 }

 function generaterandomnumber(){
    return getrndinteger(0,9);
 }

 function generatelowercase(){
      return String.fromCharCode (getrndinteger(97,123));
 }
 function generateuppercase(){
    return String.fromCharCode (getrndinteger(65,91));
}

function generatesymbol(){
    const randnum=getrndinteger(0,symbols.length);
     return symbols.charAt(randnum);
}
  
function calcstrength(){
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;
    if(uppercasecheck.checked) hasupper=true;
    if(lowercasecheck.checked)haslower=true;
    if(numberscheck.checked)hasnum=true;
    if(symbolscheck.checked)hassym=true;

    if(hasupper && haslower && (hasnum||hassym) && passwordlength>=8)
        {
            setindicator("#0f0");
        }
    else if((haslower || hasupper) && (hasnum || hassym) && passwordlength>=6)
        { 
            setindicator("#ff0");
        }
        else{
            setindicator("#f00");
        }
}

async function copycontent(){
     try{
        await navigator.clipboard.writeText(passworddisplay.value);  //this function returns a promise// 
        copymsg.innerText="copied";
     }
     catch(e){
        copymsg.innerText="failed";
     }

     copymsg.classList.add("active");

     setTimeout(()=>{
        copymsg.classList.remove("active");
     },2);


}

inputslider.addEventListener('input',(event)=>{
      passwordlength=event.target.value;
      handleslider();
})

copybtn.addEventListener('click',()=>{
    if(passworddisplay.value){  //passwordlength>0
        copycontent();
    }
})


 function shufflepassword(array){
     //fisher yates method//
     for(let i=array.length-1;i>0;i--)
        { 
            const j=Math.floor(Math.random()*(i+1));
            const temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }

        let str="";
        array.forEach((el)=>(str+=el));
        return str;
 }



function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            {
                checkcount++;
            }
    });

    if(passwordlength<checkcount)
        { 
            passwordlength=checkcount;
            handleslider();
        }
}
 
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
})
generatebtn.addEventListener('click',()=>{
    if(checkcount==0) return;

    if(passwordlength<checkcount)
        { 
            passwordlength=checkcount;
            handleslider();
        }

     console.log("start the journey");

    password="";
    
    let farr=[];
    if(uppercasecheck.checked)
        farr.push(generateuppercase);

    if(lowercasecheck.checked)
        farr.push(generatelowercase);

    if(numberscheck.checked)
        farr.push(generaterandomnumber);

    if(symbolscheck.checked)
        farr.push(generatesymbol);

    for(let i=0;i<farr.length;i++)
        { 
            password+=farr[i]();
        }

        console.log("compulsory addition done");

       for(let i=0;i<passwordlength-farr.length;i++)
        { 
            let randomindex=getrndinteger(0,farr.length);
            console.log("randindex");
            password+=farr[randomindex]();
        }
          console.log("remaining addition done");
        //shuffle the password//
           password=shufflepassword(Array.from(password));

           console.log("shuffling done");
           passworddisplay.value=password;

           calcstrength();

});



