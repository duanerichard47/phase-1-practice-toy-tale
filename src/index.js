let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
/// Start of my code
const toyCollection = document.querySelector('#toy-collection')
const btnClass = document.getElementsByClassName("like-btn")
const newToyBtn = document.querySelector('#new-toy-btn')
const addToyForm = document.getElementsByClassName("add-toy-form")[0]

console.log( document.getElementsByClassName("add-toy-form"))
console.log( document.querySelectorAll(".add-toy-form"))
fetch("http://localhost:3000/toys")

.then(response=>response.json())
.then(response=>response.forEach(toy=>createCard(toy)))



function createCard(toy) 
{
const newDiv= document.createElement('div')
newDiv.className = "card"
toyCollection.appendChild(newDiv)

const newh2= document.createElement('h2')
newh2.textContent = toy.name 
newDiv.appendChild(newh2)

const imgToy =document.createElement('img')

imgToy.src = toy.image

imgToy.className ='toy-avatar'
newDiv.appendChild(imgToy)


const newP = document.createElement('p')
newP.textContent = `${toy.likes} likes`
newDiv.appendChild(newP)

const newBtn = document.createElement('button')
newBtn.className = 'like-btn'
newBtn.id = toy.id
newBtn.textContent = 'Like  ♥'
newDiv.appendChild(newBtn)

newBtn.addEventListener('click', event =>patchToy(event))
}

console.log(addToyForm)
addToyForm.addEventListener('submit', event=> postToy(event))



function postToy(event){
  event.preventDefault();

  console.log('hellow world')

  let newToyName = addToyForm.name.value
  let newToyImg = addToyForm.image.value

console.log(newToyName)
console.log(newToyImg)

fetch("http://localhost:3000/toys",{
  method:'POST',
  headers:
    {
  "Content-Type": "application/json",        //header content
  Accept: "application/json"                    //header content
    },   

body: JSON.stringify(
  {
  "name": newToyName ,  //"Jessie",                  //body content      console.log(addToyForm[1]) 
  "image": newToyImg ,  //"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
                                                            //console.log(addToyForm[2]) 
  "likes": 0                                       //body content
  }
) 
                                    })  // end of fetch and 2nd parameter function

 }     //end of function postToy

function patchToy(event) {
  event.preventDefault();  
let newNumberOfLikes = (parseInt(event.target.previousSibling.textContent))

let toyUrl =  `http://localhost:3000/toys/${event.target.id}`  //or is it newBtn.id

fetch(toyUrl,{
  method:'PATCH',
  headers:
  {
    "Content-Type": "application/json",  //header content
    Accept: "application/json"            //header content
  },
  
  body: JSON.stringify(
    {
    "likes": newNumberOfLikes += 1      //body content
    }
)
                                    }) // end of fetch and 2nd parameter function
                                                                 
 } //end of function patchToy

