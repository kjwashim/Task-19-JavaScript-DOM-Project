
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
    }
];

let currentIndex = 0;
let total = 0;
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

// ================= DISPLAY SELECTED ITEMS =================

function showSelectedItems() {
    const tbody = document.getElementById("cartItems");

    tbody.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr id="emptyRow">
                <td colspan="3">
                    <div class="empty-box">
                        <div class="icon">ⓘ</div>
                        <h3>No Items Added</h3>
                        <p>Add Items to the cart from the services bar</p>
                    </div>
                </td>
            </tr>
        `;
    }

    cart.forEach(function(item, index) {
        total += item.price;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById("totalPrice").innerText = total;
}

// ================= ADD ITEM =================

function addItem() {
    const service = services[currentIndex];

    cart.push({
        name: service.name,
        price: service.price
    });

    showSelectedItems();
    skipItem();
}

// ================= SAVE ITEMS TO CART =================

function saveCart() {
    const savedItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    const updatedItems = savedItems.concat(cart);

    const updatedTotal = updatedItems.reduce(function(sum, item) {
        return sum + Number(item.price);
    }, 0);

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    localStorage.setItem("totalAmount", updatedTotal);
    localStorage.setItem("totalPrice", updatedTotal);

    cart = [];
    showSelectedItems();

    return updatedItems.length;
}

// ================= ADD TO CART =================

function addToCart() {
    if (cart.length === 0) {
        alert("Please add at least one service first.");
        return;
    }

    saveCart();

    alert("Items added to your cart successfully!");

    window.location.href = "cart.html";
}

// ================= BOOK NOW =================


function goToBooking() {
    const name = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !mobile || !email || !password) {
        alert("Please fill in all details.");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    const savedItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    const allItems = savedItems.concat(cart);

    if (allItems.length === 0) {
        alert("Please add at least one service before booking.");
        return;
    }

    const updatedTotal = allItems.reduce(function(sum, item) {
        return sum + Number(item.price);
    }, 0);

    localStorage.setItem("cartItems", JSON.stringify(allItems));
    localStorage.setItem("totalAmount", updatedTotal);
    localStorage.setItem("totalPrice", updatedTotal);

    localStorage.setItem("customerName", name);
    localStorage.setItem("customerMobile", mobile);
    localStorage.setItem("customerEmail", email);

    window.location.href = "booking.html";
}

// ================= BOOKING FORM =================

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();
    goToBooking();
});

// ================= LOGOUT =================

document.querySelector(".logout-btn").addEventListener("click", function() {
    if (confirm("Do you want to logout?")) {
        localStorage.removeItem("customerName");
        localStorage.removeItem("customerEmail");
        window.location.href = "index.html";
    }
});
