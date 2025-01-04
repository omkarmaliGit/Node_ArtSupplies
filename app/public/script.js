document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  displayIndex();
});

function displayIndex() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
        <div class="indexDiv">
        <section class="coverSection">
          <div><h2>Welcome to Wedding Planner</h2><h6>Making your dream wedding a reality</h6></div>
        </section>
          <section class="RecoProducts">
          <h1>Our Services</h1>
          <div>
            <div class="productCard">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFv35_unrlGRMJ3oFWqoN2qBrcHq6y8PI-9w&s"
                alt=""
              />
              <div class="recontainer">
                <h4><b>Invitations</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://image.wedmegood.com/resized/450X/uploads/images/4ba2f64476e9490b9e1683e73238e1barealwedding/024A3170LargeLarge.jpeg"
                alt=""
              />
              <div class="recontainer">
                <h4><b>Flowers</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://www.theweddingcardsonline.com/cdn/shop/articles/feature-10.jpg?v=1661685208"
                alt=""
              />
              <div class="recontainer">
                <h4><b>Ceremony</b></h4>
              </div>
            </div>
            <div class="productCard">
              <img
                src="https://modernwedding.com.au/wp-content/uploads/2019/11/28/ALL-0463.jpg"
                alt=""
              />
              <div class="recontainer">
                <h4><b>Reception</b></h4>
              </div>
            </div>
          </div>
          </section>
        </div>
      `;
}

const aboutUsButton = document.getElementById("aboutUsBtn");
aboutUsButton.addEventListener("click", displayAboutUs());

function displayAboutUs() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
        <section class="about-section">
            <h1>About Us</h1>
            <div class="about-content">
                <div class="about-text">
                    <p>Welcome to Wedding Planner, where dreams are turned into reality. With years of experience in crafting unforgettable weddings, we pride ourselves on delivering excellence in every detail.</p>
                    <p>Our team of expert planners, designers, and coordinators work closely with you to ensure your special day is as unique as your love story. From venue selection to the final dance, we are dedicated to making your wedding day perfect.</p>
                </div>
                <div class="about-image">
                    <img src="images/coverWedding.jpg" alt="Wedding planning team">
                </div>
            </div>
           
        </section>
      `;
}

const venuesButton = document.getElementById("venuesBtn");
venuesButton.addEventListener("click", displayVenues());

function displayVenues() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
        <section class="venues-section">
            <h1>Our Featured Venues</h1>
            <p>Discover the perfect settings for your dream wedding. Each venue is handpicked to provide an unforgettable experience.</p>
            <div class="venues-grid">
                <div class="venue-card">
                    <img src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Wedding-in-udaipur.jpg" alt="Venue 1">
                    <h2>A regal affair in Udaipur</h2>
                    <p>Capacity: 300 guests</p>
                    <p>A luxurious space with stunning chandeliers and a grand dance floor.</p>
                </div>
                <div class="venue-card">
                    <img src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/60e548b58a373a7f865900fd_04d99656_bf8a_4a2d_a2b2_30833018c575-1024x680.jpg" alt="Venue 2">
                    <h2>Scenic sunset pheras in Kerala</h2>
                    <p>Capacity: 200 guests</p>
                    <p>An open-air garden with breathtaking views and lush greenery.</p>
                </div>
                <div class="venue-card">
                    <img src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/andaman-wedding.jpg" alt="Venue 3">
                    <h2>A dreamy affair on golden sand, under stunning skies</h2>
                    <p>Capacity: 150 guests</p>
                    <p>Celebrate your day with the soothing sound of waves and stunning sunsets.</p>
                </div>
                <div class="venue-card">
                    <img src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/goabeachhotel10-1024x682.jpg" alt="Venue 4">
                    <h2>A beach-themed Goan wedding</h2>
                    <p>Capacity: 350 guests</p>
                    <p>Goa is the perfect wedding destination for couples who want to have their wedding under the open sky.</p>
                </div>
                <div class="venue-card">
                    <img src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/Oberoi-Amarvilas-Agra-3.jpg" alt="Venue 5">
                    <h2>In dreamy and romantic Agra</h2>
                    <p>Capacity: 500 guests</p>
                    <p>What better way than getting married in front of the Taj Mahal, the epitome of true love. It is considered like a paradise for Agra lovers.</p>
                </div>
                <div class="venue-card">
                    <img src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/01/jw-marriott-mussoorie-4-1024x804.jpg" alt="Venue 6">
                    <h2>Amidst snow capped mountains in Mussoorie</h2>
                    <p>Capacity: 100 guests</p>
                    <p>The best romantic wedding destination in India for couples who dream of having a beach wedding amidst snow-capped peaks and beautiful hills.</p>
                </div>
            </div>
        </section>
      `;
}

const servicesButton = document.getElementById("servicesBtn");
servicesButton.addEventListener("click", displayServices());

function displayServices() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
        <section class="services-section">
            <h1>Our Services</h1>
            <p>We offer a wide range of services to make your special day truly unforgettable.</p>
            <div class="services-grid">
                <div class="service-card">
                    <h2>First Things First</h2>
                    <p>Comprehensive planning and organization to kickstart your wedding journey. From budget planning to scheduling, we cover all the initial steps.</p>
                </div>
                <div class="service-card">
                    <h2>Invitations</h2>
                    <p>Beautifully designed wedding invitations that set the tone for your big day. Custom designs are available to match your theme and preferences.</p>
                </div>
                <div class="service-card">
                    <h2>Flowers</h2>
                    <p>Stunning floral arrangements to enhance the beauty of your venue. Choose from a variety of flowers to match your color palette and theme.</p>
                </div>
                <div class="service-card">
                    <h2>Pampering</h2>
                    <p>Exclusive pampering sessions to ensure you look and feel your best. Our packages include spa treatments, makeup, and grooming for the bride and groom.</p>
                </div>
                <div class="service-card">
                    <h2>Apparel</h2>
                    <p>Elegant wedding attire for the bride, groom, and bridal party. We provide consultation and fittings to ensure a perfect look for your big day.</p>
                </div>
                <div class="service-card">
                    <h2>Ceremony</h2>
                    <p>Perfectly planned ceremonies tailored to your preferences. From officiants to rituals, we ensure every detail aligns with your vision.</p>
                </div>
                <div class="service-card">
                    <h2>Reception</h2>
                    <p>Exceptional reception planning to create unforgettable memories. We handle everything from seating arrangements to entertainment.</p>
                </div>
            </div>
        </section>
      `;
}

const contactUsButton = document.getElementById("contactUsBtn");
contactUsButton.addEventListener("click", displayContactUs());

function displayContactUs() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
         <section class="contact-section">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Fill out the form below or reach us using the contact details provided.</p>
            <div class="contact-container">
                <div class="contact-info">
                    <h2>Our Contact Details</h2>
                    <p><strong>Email:</strong> info@weddingplanner.com</p>
                    <p><strong>Phone:</strong> +1 123 456 7890</p>
                    <p><strong>Address:</strong> 123 Wedding Lane, Pune City</p>
                </div>
                <div class="contact-form">
                    <form>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>

                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>

                        <label for="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
      `;
}
