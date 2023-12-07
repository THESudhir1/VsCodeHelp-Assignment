// const axios = require('axios');

var acc = document.getElementsByClassName("btn-click");

// FOR SLIDER
const wrapper = document.querySelector(".slider");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".slider i");
const carouselChildrens = [...carousel.children];
const card1  = document.getElementsByClassName("card1");
// FOR SLIDER ACTION
var arr = document.getElementsByClassName("card");
var arrcard = document.getElementsByClassName("card-btn");
var changecard = document.getElementsByClassName("changecard");
const btn = document.getElementById("btn");
const detail = document.getElementsByClassName("detail");
const otp = document.getElementsByClassName("otp");
const timeslot = document.getElementsByClassName("timeslot");
var panel = document.getElementsByClassName("panel");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        var panel = this.nextElementSibling;
        // TOGGLE THE "active" CLASS ON THE CLICKED BUTTON
        this.classList.toggle("active");

        // TOGGLE THE VISIBILITY OF THE PANEL
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// SEND OTP
function sendOTP() {
    const email = document.getElementById("email-input");

    // Create the SMTP credentials you verifying user
    // THIS NOT IMPLIES THE BACKEND IT IS A DEMO 

    // generating random otp
    let otp_val = Math.floor(Math.random() * 10000)
    let emailbody = `
        <h1>This is vert sensitive. So, don't share </h1> <br>
        <h2>Your one Time Password is<h2> ${otp_val}
    `;

    Email.send({
        SecureToken : "ENTER THE SECURE TOKEN OF SMTP SERVER FROM ELASTIC EMAIL",
        To : "ENTER THE EMAIL OF RECEIVER@gmail.com",
        From : "ENTER THE EMAIL OF SENDER@gmail.com",
        Subject : "Your ONE TIME PASSWORD",
        Body : emailbody
    }).then(
        // if success it return "OK"
      message => {
        alert(message)
        if(message === "OK"){
            // now verifying the user
            const otp_inp = document.getElementById("otp-input");
            const submitbtn = document.getElementById("bookbtn");

            submitbtn.addEventListener('click', () => {
                if(otp_inp.value == otp_val){
                    alert("Email Address verified...");
                }else{
                    alert("Invalid OTP");
                }
            })
        }else{
            alert("failed");
        }
      }
    );
}

if(btn){
    btn.addEventListener("click", function() {
        if(otp){
            otp[0].classList.add("otpactive");
            timeslot[0].classList.add("timeslotactive");
        }else{
            console.log("error occured during continue button"); 
        }
        
    });
}else{
    console.error('Element with id "myButton" not found');
}


// ASSUNMING arr IS AN ARRAY OF ELEMENTS YOOU WANT TO ATTACH THE CLICK EVENT TO
function borderclear() {
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.remove("carouselactive");
    }
}
for (var i = 0; i < arr.length; i++) {
    if(i === 0){
        arr[i].addEventListener("click", function () {
            borderclear();
            this.classList.add("carouselactive");
            // ADDING THE "card1active" CLASS TO THE ELEMENT WITH THE CLASS "card1"
            btn.classList.remove("btnactive");
            clear(); 
            var card1 = document.querySelector(".card1");
            if(card1){
                card1.classList.remove("card1active")
            }
            var grid = document.querySelector(".card-container");
            if (grid) {
                grid.classList.remove("card-containeractive");
            }
        })
    }else{
        arr[i].addEventListener("click", function() {
            clear();
            borderclear();
            this.classList.add("carouselactive");
            // ADDING THE "card1active" CLASS TO THE ELEMENT WITH THE CLASS "card1"
            var card1 = document.querySelector(".card1");
            if (card1) {
                card1.classList.add("card1active");
            }

            // ADDING THE "card-containeractive" CLASS TO THE ELEMENT WITH THE CLASS "grid"
            var grid = document.querySelector(".card-container");
            if (grid) {
                card1.classList.remove("card12active");
                grid.classList.add("card-containeractive");
            }
        });
    }
}
// SLOT JS EVENT LISTNER
for (var i = 0; i < arrcard.length; i++) {
    arrcard[i].addEventListener("click", function() {
        // TOGGLE THE "active" CLASS ON THE CLICKED BUTTON
        clear();
        this.classList.add("card-btnactive");
        // TOGGLE THE "active" CLASS ON THE CLICKED BUTTON
        btn.classList.add("btnactive");        
    });
}

// CARD SWITCHING BETWEEN THREE CARDS
for (var i = 0; i < changecard.length; i++) {
    if(i === 0){
        changecard[i].addEventListener("click", function() {
            // TOGGLE THE "active" CLASS ON THE CLICKED BUTTON
            clear();
            clear1();
            borderclear();
            this.classList.add("changecardactive");
            this.classList.remove("changecardnoactive");
            detail[0].classList.remove("detailactive");
            otp[0].classList.remove("otpactive");
            timeslot[0].classList.remove("timeslotactive");
            card1[0].classList.add("card12active");
            var grid = document.querySelector(".card-container");
            if (grid) {
                grid.classList.remove("card-containeractive");
            }       
        });   
    }else{
        changecard[i].addEventListener("click", function() {
            // TOGGLE THE "active" CLASS ON THE CLICKED BUTTON
            clear();
            clear1();
            this.classList.add("changecardactive");
            this.classList.remove("changecardnoactive");
            detail[0].classList.add("detailactive");
            otp[0].classList.remove("otpactive");
            timeslot[0].classList.remove("timeslotactive");
            card1.classList.remove("card1active");         
        });
    }
}
function clear1() {
    for (var i = 0; i < changecard.length; i++) {
        console.log("i am removing the all green card");
        changecard[i].classList.add("changecardnoactive");
    }
}
function clear() {
    btn.classList.remove("btnactive");
    for (var i = 0; i < arrcard.length; i++) {
        console.log("i am removing the all green card");
        arrcard[i].classList.remove("card-btnactive");
    }
}

// SLIDER
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// GET THE NUMBERS OF CARD THAT CAN BE FIT IN THE CAROUSEL AT ONCE
let cardPerView = 3;

//ADD EVENT LISTNER TO THE ARROW BUTTON TO SCROLL THE CAROUSEL FROM LEFT TO RIGHT
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // RECORDS THE INITIAL POSITION OF CURSOR AND SCROLL THE POSITION OF THE CAROUSEL
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // IF isDRAGGING IS FALSE RETURN FROM HERE
    // UPDATE THE SCROLL POSITION OF THE CAROUSEL BASED ON THE CURSOR MOVEMENT
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);