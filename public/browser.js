//initial page load render 
let ourhtml = items.map(function(item){
return itemtemplate(item)
}).join('')
document.getElementById("item-list").insertAdjacentHTML('beforeend', ourhtml)
let creatfield= document.getElementById("create-field")
function itemtemplate(item){
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
  <button data-id = "${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
  <button data-id ="${item._id}"class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
  </li>`
}
document.getElementById("myform").addEventListener('submit',function(e){
  e.preventDefault()
  axios.post('/create-item',{text: creatfield.value}).then(function (response) {
    //create the html for a new item 
    document.getElementById('item-list').insertAdjacentHTML('beforeend',itemtemplate(response.data))
    creatfield.value=""
    creatfield.focus()
  }).catch(function() {
    console.log("Please try again later.")
  })
})

document.addEventListener("click", function(e) {
  //delete feature 
  if (e.target.classList.contains("delete-me")){
    if(confirm("do you really want to do that")){
      axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function () {
        e.target.parentElement.parentElement.remove()
      }).catch(function() {
        console.log("Please try again later.")
      })
    }
  }

  //update feature
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("Enter your desired new text",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if (userInput){
      axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
      }).catch(function() {
        console.log("Please try again later.")
      })
    }

  }

})
