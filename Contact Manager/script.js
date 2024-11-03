import Components from "./components";

const addButton = document.querySelector(".add");
const contacts = document.querySelector(".contacts");
const addForm = document.querySelector("#form");

function displayData() {
       fetch("/display", {
              method: "GET"
       })
       .then(response => response.json())
       .then(data => {
              contacts.innerHTML = "";
              for (let contactInfo of data) {
                     contacts.appendChild(Components.createContact(contactInfo));
              }
       })
       .catch(err => {throw err});
}

function addContact() {
       fetch("/add", {
              method: "POST"
       })
       .then(res => res.text())
       .then(data => {
              console.log(data);
       })
       .catch(err => {
              throw err
       })
}

addButton.addEventListener("click", () => {
       addContact();
});

document.addEventListener("DOMContentLoaded", () => {
       displayData();
});

addForm.addEventListener("submit", (event) => {
       event.preventDefault();

       const formData = new FormData(addForm);

       fetch("/add", {
              method: "POST",
              body: formData
       })
       .then(response => response.text())
       .then(data => {
              console.log(data);
              addForm.reset();
              displayData();
       });
});