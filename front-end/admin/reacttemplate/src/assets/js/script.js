// slider img home
const imgPosition = document.querySelectorAll(".slider__item img")
const imgContainer = document.querySelector('.slider__item')
let imgNumber = imgPosition.length;
let counter = 0;

imgPosition.forEach(function(image,counter){
    image.style.left = counter*100 + "%"
})

function prev(){
    if(counter>=1){
        counter--;
    imgContainer.style.left = "-" + counter*100 + "%"
    }else{
        counter=imgNumber-1;
        imgContainer.style.left = "-" + counter*100 + "%"
    }
};
function next(){
    counter++;
    if (counter>=imgNumber) {counter=0}
    imgContainer.style.left = "-" + counter*100 + "%"
};
setInterval("next()",5000);

// click select catogory
const entrance_ticket = document.querySelector(".entrance_ticket")
const games_ticket = document.querySelector(".games_ticket")
const rent = document.querySelector(".rent")

if(entrance_ticket){
    entrance_ticket.addEventListener("click",function(){
        document.querySelector(".col_services_entrance-ticket").style.display = "block"
        document.querySelector(".col_services_games-ticket").style.display = "none"
        document.querySelector(".col_services_rent").style.display = "none"
    })
}
if(games_ticket){
    games_ticket.addEventListener("click",function(){
        document.querySelector(".col_services_entrance-ticket").style.display = "none"
        document.querySelector(".col_services_games-ticket").style.display = "block"
        document.querySelector(".col_services_rent").style.display = "none"
    })
}
if(rent){
    rent.addEventListener("click",function(){
        document.querySelector(".col_services_entrance-ticket").style.display = "none"
        document.querySelector(".col_services_games-ticket").style.display = "none"
        document.querySelector(".col_services_rent").style.display = "block"
        
    })
}

// selectCategoryItem.forEach(function(menu,index){
//     menu.addEventListener("click",function(){
//         menu.classList.toggle("active")
//     })
// })


// folk-games-location 

const mainImg = document.querySelector(".image-collection_main img")
const containerImg = document.querySelectorAll(".image-collection_container img")
containerImg.forEach(function(imgItem,X){
    imgItem.addEventListener("click",function(){
        
        mainImg.src = imgItem.src

    })
})

