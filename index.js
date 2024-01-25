// write your code here 
function fetchCustomers() {
  return fetch("http://localhost:3000/customers") // fetch url
    .then(resp => resp.json()) // convert json to javascript
    .then(customers => renderCustomerCard(customers)) // add information from json to html 
}

function renderCustomerCard(customers) { // create interactive img into html that list customer's value
  const customerImage = document.getElementById("login-screen"); // get customer-menu id element
  const detailImage = document.querySelector(".detail-image"); // get detail-image class element
  const name = document.getElementById("name-display");
  const email = document.getElementById("email-display");
  const service = document.getElementById("service-display");
  const request = document.getElementById("request-display");

  customerImage.innerHTML = "";

  customers.forEach(customer => { // go through json's aray to get every individual object
    const img = document.createElement("img"); // create img element
    const src = document.createAttribute("src"); // create src attribute
    src.value = customer.image; // set src attribute image url
    img.setAttributeNode(src); // give img element a src attribute

    img.addEventListener("click", () => { // on click show customer's information  
      detailImage.setAttribute("src", `${src.value}`); // show image
      name.textContent = `${customer.name}`; // show name
      email.textContent = `${customer.email}`; // show email
      service.textContent = `${customer.service}`; // show email
      request.textContent = `${customer.request}`; // show email
    })

    customerImage.appendChild(img); // give customer-menu a img element   
  });
}

// get form element with new-customer-id, add event listener with submit function
document.getElementById("new-customer").addEventListener("submit", async event => {
  event.preventDefault();
  await fetch("http://localhost:3000/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value,
      email: event.target.email.value,
      service: event.target.service.value,
      request: event.target.request.value,
      image: event.target.image.value
    })
  });
  await fetchCustomers();
})

function fetchAdmins() {
  return fetch("http://localhost:3000/admins") // fetch url
    .then(resp => resp.json()) // convert json to javascript
    .then(admins => renderCustomerCard(customers)) // add information from json to html 
}

// admin login
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const adminPage = document.getElementById("admin-page");
const logOut = document.getElementById("logout-screen");
const logIn = document.getElementById("login-screen");

loginButton.addEventListener("mouseover", () => {
  loginButton.setAttribute("style", "background-color: white;")
})

loginButton.addEventListener("mouseout", () => {
  loginButton.setAttribute("style", "background-color: black;")
})

function login() {
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("password").value;
  return fetch("http://localhost:3000/admins")
    .then(resp => resp.json())
    .then(admins => {
      const admin = admins.find(admin => admin.username === userName);
      if (admin && admin.password === passWord) {
        alert('Welcome Back, ' + userName + "!");
        loginForm.style.display = "none";
        adminPage.style.display = "block";
        logOut.style.display = "none";
        logIn.style.display = "block";
      } else {
        alert('Intruder Alert!');
      }
    })
}

document.addEventListener('DOMContentLoaded', function () {
  fetchCustomers();
});