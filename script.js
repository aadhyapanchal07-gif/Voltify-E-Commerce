// =========================================
// VOLTIFY E-COMMERCE
// script.js
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // OFFER TABS
    // ===============================

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".offer-tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");

            const target = document.getElementById(button.dataset.tab);

            if (target) {
                target.classList.add("active");
            }

        });

    });

    // ===============================
    // LOGIN / SIGNUP SWITCH
    // ===============================

    const loginBox = document.getElementById("loginBox");
    const signupBox = document.getElementById("signupBox");

    const showLogin = document.getElementById("showLogin");
    const showSignup = document.getElementById("showSignup");

    if (showLogin) {

        showLogin.addEventListener("click", function (e) {

            e.preventDefault();

            signupBox.style.display = "none";
            loginBox.style.display = "block";

        });

    }

    if (showSignup) {

        showSignup.addEventListener("click", function (e) {

            e.preventDefault();

            loginBox.style.display = "none";
            signupBox.style.display = "block";

        });

    }

    // ===============================
    // SEARCH
    // ===============================

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function filterProducts() {

        const keyword = searchInput.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(keyword)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }

    if (searchBtn) {

        searchBtn.addEventListener("click", filterProducts);

    }

    if (searchInput) {

        searchInput.addEventListener("keyup", filterProducts);

    }

    // ===============================
    // CART VARIABLES
    // ===============================

    let cart = [];

    const cartOverlay = document.getElementById("cartOverlay");
    const cartIcon = document.getElementById("cartIcon");
    const closeCart = document.getElementById("closeCart");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    // ===============================
    // UPDATE CART
    // ===============================

    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    Your cart is empty.
                </div>
            `;

            cartTotal.innerHTML = "<h3>Total : ?0</h3>";
            cartCount.textContent = "0";
            return;
        }

        cart.forEach((item, index) => {

            total += item.price;

            const div = document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `

                <div class="cart-item-info">

                    <div>

                        <div class="cart-item-name">${item.name}</div>

                        <div class="cart-item-price">
                            ?${item.price.toLocaleString()}
                        </div>

                    </div>

                </div>

                <button class="cart-item-remove" data-index="${index}">
                    Remove
                </button>

            `;

            cartItems.appendChild(div);

        });

        cartCount.textContent = cart.length;

        cartTotal.innerHTML =
            "<h3>Total : ?" + total.toLocaleString() + "</h3>";



        document.querySelectorAll(".cart-item-remove").forEach(button => {

            button.addEventListener("click", function () {

                const index = this.dataset.index;

                cart.splice(index, 1);

                updateCart();

            });

        });

    }

    // ===============================
    // ADD TO CART
    // ===============================

    document.querySelectorAll(".cart-btn").forEach(button => {

        button.addEventListener("click", function () {

            const card = this.closest(".product-card");

            const name = card.querySelector("h3").innerText;

            let priceText = card.querySelector(".price").innerText;

            priceText = priceText.replace(/[?,]/g, "");

            const price = parseInt(priceText);

            cart.push({

                name: name,

                price: price

            });

            updateCart();

            alert(name + " added to cart.");

        });

    });

    // ===============================
    // BUY NOW
    // ===============================

    document.querySelectorAll(".buy-btn").forEach(button => {

        button.addEventListener("click", function () {

            const productName =
                this.closest(".product-card")
                    .querySelector("h3")
                    .innerText;

            alert(
                "Thank you for purchasing\n\n" +
                productName +
                "\n\nYour order has been placed successfully."
            );

        });

    });

    // ===============================
    // OPEN CART
    // ===============================

    if (cartIcon) {

        cartIcon.addEventListener("click", function (e) {

            e.preventDefault();

            cartOverlay.classList.add("open");

        });

    }

    // ===============================
    // CLOSE CART
    // ===============================

    if (closeCart) {

        closeCart.addEventListener("click", function () {

            cartOverlay.classList.remove("open");

        });

    }

    cartOverlay.addEventListener("click", function (e) {

        if (e.target === cartOverlay) {

            cartOverlay.classList.remove("open");

        }

    });
    // ===============================
    // ACTIVE MENU
    // ===============================

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => item.classList.remove("active"));

            this.classList.add("active");

            // Close mobile menu after clicking
            const navToggle = document.getElementById("nav-toggle");
            if (navToggle) {
                navToggle.checked = false;
            }

        });

    });

    // ===============================
    // SMOOTH SCROLL
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        });

    });

    // ===============================
    // SIGNUP FORM
    // ===============================

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("Account created successfully!");

            this.reset();

        });

    }

    // ===============================
    // LOGIN FORM
    // ===============================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("Login successful!");

            this.reset();

        });

    }

    // ===============================
    // HIGHLIGHT MENU WHILE SCROLLING
    // ===============================

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    // ===============================
    // INITIALIZE CART
    // ===============================

    updateCart();

}); // End DOMContentLoaded