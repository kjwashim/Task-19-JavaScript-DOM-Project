// ================= SERVICES =================

const services = [
     {
        name: "Dry Cleaning",
        price: 200,
        image: "https://github.com/kjwashim/Laundry-Wallah_Laundry-Mart/blob/main/task2_image.png?raw=true"
    },
    {
            name: "Shoe",
        price: 250,
        image: "https://github.com/kjwashim/Task-11-CSS-Mini-Project/blob/main/Screenshot%202026-06-26%20065615.png?raw=true"
    },
   
    {
        name: "Wash & Fold",
        price: 150,
        image: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=800"
    },
    {
        name: "Steam Iron",
        price: 120,
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800"
    },
    {
        name: "Premium Laundry",
        price: 350,
        image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800"
    },
    
];

let currentIndex = 0;
let total = 0;
let serial = 1;
let cart = [];

// ================= SHOW SERVICE =================

function showService() {

    document.getElementById("serviceImage").src =
        services[currentIndex].image;

    document.getElementById("serviceName").innerText =
        services[currentIndex].name;

    document.getElementById("servicePrice").innerText =
        services[currentIndex].price;
}

showService();

// ================= SKIP ITEM =================

function skipItem() {

    currentIndex++;

    if (currentIndex >= services.length) {
        currentIndex = 0;
    }

    showService();

}

// ================= ADD ITEM =================

function addItem() {

    const service = services[currentIndex];

    const tbody = document.getElementById("cartItems");

    const emptyRow = document.getElementById("emptyRow");

    if (emptyRow) {
        emptyRow.remove();
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${serial}</td>
        <td>${service.name}</td>
        <td>₹${service.price}</td>
    `;

    tbody.appendChild(row);

    total += service.price;

    document.getElementById("totalPrice").innerText = total;

    cart.push(service);

    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("totalPrice", total);

    serial++;

    skipItem();

}

// ================= BOOK NOW =================

document.getElementById("bookingForm").addEventListener("submit", function(e){

    e.preventDefault();

    if(cart.length === 0){
        alert("Please add at least one service.");
        return;
    }

    alert("Booking Successful!");

    window.location.href = "index.html";

});

// ================= LOGOUT =================

document.querySelector(".logout-btn").addEventListener("click", function(){

    if(confirm("Do you want to logout?")){

        localStorage.clear();

        location.reload();

    }

});