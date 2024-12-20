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
          token: result.token,
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

  console.log("print something");

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
  if (role === "admin") {
    mainContent.innerHTML = `<h2>Admin Dashboard</h2><p>welcome admin</p>`;
  } else {
    mainContent.innerHTML = `<h2>User Dashboard</h2><p>List of movies for users.</p>`;
  }
}

// Navigation logic
document.getElementById("MoviesBtn").addEventListener("click", () => {
  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem("user"));
    const decoded = jwt_decode(user.token);
    displayMovies(decoded.role);
  } else {
    alert("Please log in to access this section.");
    window.location.href = "login.html";
  }
});

// Display content based on role
async function displayMovies(role) {
  const mainContent = document.getElementById("main-content");

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      alert("User information not found. Please log in again.");
      return;
    }

    const authHeader = user ? user.token : null;

    const response = await fetch("/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authHeader}`,
      },
    });

    const movies = await response.json();

    if (!response.ok) {
      throw new Error(movies.message || "Failed to fetch movies");
    }

    let movieCards = "";

    // Add
    if (role === "admin") {
      movieCards += `
          <form id="add-movie-form" class="form-container">
            <h2>Add Movie</h2>
            <input type="text" id="title" placeholder="Title" required />
            <input type="text" id="genre" placeholder="Genre (comma-separated)" required />
            <input type="number" id="duration" placeholder="Duration (minutes)" required />
            <input type="text" id="language" placeholder="Language" required />
            <input type="number" id="rating" placeholder="Rating" step="0.1" required />
            <button type="submit">Add Movie</button>
          </form>
        `;
    }

    // Display
    movieCards += '<div class="movies-container">';
    movies.forEach((movie) => {
      movieCards += `
          <div class="movie-card">
          <img src="${movie.poster}" alt="${
        movie.title
      } Poster" style="width:100%; height:auto;"/>
              
          <h3>${movie.title}</h3>
            <p>Genre: ${movie.genre.join(", ")}</p>
            <p>Duration: ${movie.duration} mins</p>
            <p>Language: ${movie.language}</p>
            <p>Rating: ${movie.rating}</p>
            ${
              role === "admin"
                ? `<button onclick="deleteMovie(${movie.movie_id})">Delete</button>
                   <button onclick="editMovie(${movie.movie_id})">Edit</button>`
                : `<button onclick="bookMovie(${movie.movie_id})">Book Now</button>`
            }
          </div>
        `;
    });
    movieCards += "</div>";
    mainContent.innerHTML = movieCards;

    if (role === "admin") {
      document
        .getElementById("add-movie-form")
        .addEventListener("submit", handleAddMovie);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

async function handleAddMovie(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value.split(",");
  const duration = parseInt(document.getElementById("duration").value);
  const language = document.getElementById("language").value;
  const rating = parseFloat(document.getElementById("rating").value);

  try {
    await fetch("/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({ title, genre, duration, language, rating }),
    });
    alert("Movie added successfully!");
    displayMovies("admin");
  } catch (error) {
    console.error("Error adding movie:", error);
  }
}

async function deleteMovie(movieId) {
  try {
    await fetch(`/movies/${movieId}/delete`, {
      method: "DELETE",
      headers: { Authorization: getToken() },
    });
    alert("Movie deleted successfully!");
    displayMovies("admin");
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
}

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
              <div class="container">
                <h4><b>CRAFTS</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/1628756_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="container">
                <h4><b>DRAWING</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/6206962_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="container">
                <h4><b>BRUSHES</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://d1f0kjhjeqrfvd.cloudfront.net/media/catalog/category/382011_1605092214.png"
                alt=""
                style="width: 100%"
              />
              <div class="container">
                <h4><b>PRINTMAKING</b></h4>
              </div>
            </div>
          </div>
          </section>
        </div>
      `;
}
