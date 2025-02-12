document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners for login and registration forms
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegistration);
  }

  const authButton = document.getElementById("auth-button");
  const mainContent = document.getElementById("main-content");

  // Handle login/logout button click
  authButton.textContent = isLoggedIn() ? "Logout" : "Login";
  authButton.addEventListener("click", handleAuthClick);

  // Display appropriate content based on authentication state
  if (mainContent) {
    if (isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const decoded = jwt_decode(user.token);
      displayDashboard(decoded.role);
    } else {
      displayIndex();
    }
  }
});

// Redirect based on login state
function handleAuthClick() {
  if (isLoggedIn()) {
    logoutUser();
  } else {
    window.location.href = "login.html";
  }
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: result.data.Token,
        })
      );
      // Save user data
      window.location.href = "index.html";
    } else {
      alert(result.message || "Login failed!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

// Handle Registration
async function handleRegistration(event) {
  event.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    } else {
      alert(result.message || "Registration failed!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}

// Logout user
function logoutUser() {
  localStorage.removeItem("user");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// Display navigation bar and initialize content
function displayDashboard(role) {
  const mainContent = document.getElementById("main-content");
  if (role === "ADMIN") {
    mainContent.innerHTML = `<h2>Admin Dashboard</h2><p>welcome admin</p>`;
  } else {
    mainContent.innerHTML = `<h2>User Dashboard</h2><p>welcome user</p>`;
  }
}

// Navigation logic
document.getElementById("ProductsBtn").addEventListener("click", () => {
  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem("user"));
    const decoded = jwt_decode(user.token);
    displayProducts(decoded.role);
  } else {
    alert("Please log in to access this section.");
    window.location.href = "login.html";
  }
});

// Display navigation bar and initialize content
function displayIndex() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
        <div class="indexDiv">
        <section class="coverSection">
          <div><b>HEY ARTIST</b><p>Welcome to the India Art</P></div>
        </section>
          <section class="RecoProducts">
          <h1>Recommended Products</h1>
          <div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/7246037_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="recontainer">
                <h4><b>CRAFTS</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/1628756_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="recontainer">
                <h4><b>DRAWING</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/6206962_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="recontainer">
                <h4><b>BRUSHES</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/382011_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="recontainer">
                <h4><b>PRINTMAKING</b></h4>
              </div>
            </div>
          </div>
          </section>
        </div>
      `;
}

const navCatButton = document.getElementById("paintsBtn");
navCatButton.addEventListener("click", displayProduct());

async function displayProduct() {
  const mainContent = document.getElementById("main-content");

  try {
    // Fetch product data from the backend
    const response = await fetch("/product");

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const productsJson = await response.json(); // Assuming the API returns an array of products

    const products = productsJson.data;

    // Generate HTML dynamically
    const productHTML = products
      .map(
        (product) => `
      <div class="card">
        <img src="${product.imgLink}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.detail}</p>
        <div class="price">₹${product.price}</div>
        <button>Buy Now</button>
      </div>
    `
      )
      .join("");

    // Add the dynamic HTML to the main content
    mainContent.innerHTML = `<div class="container">${productHTML}</div>`;
  } catch (error) {
    // Handle errors
    mainContent.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    console.error("Error fetching products:", error);
  }
}

function displayAboutUs() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
<section class="about-section">
            <h1>About Us</h1>
            <p>Welcome to the Art Supplies Store, your one-stop destination for all your creative needs. Whether you’re a professional artist or just beginning your artistic journey, we have everything you need to bring your ideas to life.</p>

            <h2>Our Offerings</h2>
            <ul>
                <li><strong>Paints and Mediums:</strong> A wide variety of acrylics, oils, and watercolors to suit every style.</li>
                <li><strong>Studio Supplies:</strong> Easels, canvases, and tools to set up your perfect creative space.</li>
                <li><strong>Crafts:</strong> Unique materials for DIY projects and handcrafted items.</li>
                <li><strong>Brands:</strong> Top-quality products from trusted art supply brands.</li>
                <li><strong>Printmaking:</strong> Supplies for block printing, etching, and more.</li>
                <li><strong>Brushes and Painting Tools:</strong> Brushes, palettes, and knives for precise application.</li>
                <li><strong>Drawing and Illustration:</strong> Pencils, markers, and sketchbooks for illustrators and designers.</li>
            </ul>

            <p>At the Art Supplies Store, we’re committed to providing high-quality products and exceptional customer service to support your creative endeavors.</p>
        </section>
  `;
}

function displayContactUs() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
<section class="contact-section">
            <h1>Contact Us</h1>
            <p>We’d love to hear from you! Whether you have a question about our products, need assistance, or just want to share your creative projects, feel free to reach out.</p>

            <form action="#" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <button type="submit">Submit</button>
            </form>

            <div class="contact-info">
                <h2>Our Address</h2>
                <p>123 Creative Lane, Pune City, MH 456781</p>

                <h2>Phone</h2>
                <p>+1 234 567 890</p>

                <h2>Email</h2>
                <p><a href="mailto:info@indiaart.com">info@indiaart.com</a></p>
            </div>
        </section>
  `;
}
