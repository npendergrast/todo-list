loadUp();

function add() {
    // Creat new list item and cancel box after clicking add button or pressing enter
    var myText = document.getElementById("textinput").value;
    var minusSpace = myText.replace(/ /g, "");  // ignore value if only spaces are input by user
    var listArray = document.querySelectorAll("li");
    if (minusSpace === "") {
        openModal("Please enter text for new item");
    } else if (listArray.length == 12) {
        openModal("Maximum number of list items reached");
    } else {
        var myText = document.getElementById("textinput").value;
        var newListItem = document.createElement('li');   // create new list item
        newListItem.innerHTML = myText;
        var newButt = document.createElement('button');  // create new cancel box
        newButt.innerHTML = "X";
        newListItem.addEventListener("click", classChange);  // add click event to new list element to toggle item completed class
        var list = document.getElementById('list-area');
        list.insertBefore(newListItem, list.childNodes[0]);  // insert new list element within main list box
        newListItem.appendChild(newButt);     // insert new cancel button after new list element
        newButt.addEventListener("click", deleteItem);  // add click event to cancel button to activate cancel function
        save();
    }
    updateListNum();
}

function classChange(ev) {
    // Toggle class of list item so that CSS can style it as completed or active
    ev.target.classList.toggle('done');
    updateListNum();
    save();
}

function deleteItem(ev) {
    // Delete list item
    ev.target.classList.toggle('delete');
    var par = ev.target.parentNode;
    par.remove();
    updateListNum()
    save();
}

function isReturn(event) {
    // Allows enter key to be used instead of 'add' button
    if (event.key == 'Enter') {
        add();
    }
}

function updateListNum() {
    var listArray = document.querySelectorAll("li");
    var listDone = document.querySelectorAll(".done");
    var leftToDo = listArray.length - listDone.length;
    var listcounter = document.getElementsByClassName('counter');
    listcounter[0].innerHTML = "You currently have " + leftToDo + " things to do";
}


function openModal(text) {
    var modal = document.querySelector(".modal");
    var everything = document.querySelector(".everything");
    var modalText = document.querySelector(".modaltext");
    modalText.innerHTML = text;
    everything.style.display = "block";
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.querySelector(".modal");
    var everything = document.querySelector(".everything");
    everything.style.display = "none";
    modal.style.display = "none";
}



function save() {
    var toDoArray = [];
    var myArray = document.querySelectorAll("li:not(.done)");
    for (i = 0; i < myArray.length; i++) {
        var liItem = myArray[i].childNodes[0].textContent;
        toDoArray.push(liItem);
    }
    localStorage.setItem('todos', JSON.stringify(toDoArray));

    var toDoArray2 = [];
    var myArray2 = document.querySelectorAll("li.done");
    for (i = 0; i < myArray2.length; i++) {
        var liItem2 = myArray2[i].childNodes[0].textContent;
        toDoArray2.push(liItem2);
    }
    localStorage.setItem('donetodos', JSON.stringify(toDoArray2));
}

function loadUp() {
    var storage2 = JSON.parse(localStorage.getItem('donetodos'));
    if (storage2 != null) {
        for (i = 0; i < storage2.length; i++) {
            var myText2 = storage2[i].toString();

            var newListItem2 = document.createElement('li');   // create new list item
            newListItem2.innerHTML = myText2;
            newListItem2.classList.add("done");
            var newButt2 = document.createElement('button');  // create new cancel box
            newButt2.innerHTML = "X";
            newListItem2.addEventListener("click", classChange);  // add click event to new list element to toggle item completed class
            var list2 = document.getElementById('list-area');
            list2.insertBefore(newListItem2, list2.childNodes[0]);  // insert new list element within main list box
            newListItem2.appendChild(newButt2);     // insert new cancel button after new list element
            newButt2.addEventListener("click", deleteItem);  // add click event to cancel button to activate cancel function
        }
    }

    var storage = JSON.parse(localStorage.getItem('todos'));
    if (storage != null) {
        for (i = (storage.length - 1); i >= 0; i--) {
            var myText = storage[i].toString();

            var newListItem = document.createElement('li');   // create new list item
            newListItem.innerHTML = myText;
            var newButt = document.createElement('button');  // create new cancel box
            newButt.innerHTML = "X";
            newListItem.addEventListener("click", classChange);  // add click event to new list element to toggle item completed class
            var list = document.getElementById('list-area');
            list.insertBefore(newListItem, list.childNodes[0]);  // insert new list element within main list box
            newListItem.appendChild(newButt);     // insert new cancel button after new list element
            newButt.addEventListener("click", deleteItem);  // add click event to cancel button to activate cancel function

            updateListNum();
        }
    }

    var storage3 = JSON.parse(localStorage.getItem("userTitle"))
    var title = document.querySelector("h1");
    if (storage3 != null) {
        title.innerHTML = storage3;
    }
}

function renameHead() {
    var title = document.querySelector("h1");
    var newTitle = window.prompt("Please enter a new title for your to do list");
    var minusSpace = newTitle.replace(/ /g, "");
    if (minusSpace === "") {
        openModal("Please enter text for heading");
    } else if (newTitle.length > 17) {
        openModal("Maximum heading length is 17 characters");
    } else {
        title.innerHTML = newTitle;
        localStorage.setItem("userTitle", JSON.stringify(newTitle))
    }
}