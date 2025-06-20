import React from 'react';
import './AboutUs.css';
import aboutImage from './cover.png';
const AboutUs = () => {
    return (
            <>
            <div class="hero">
    <img src={aboutImage} />
    <div class="hero-text">
      <h4>About Us</h4>
      <p><em>Welcome to Bulkify where shopping smarter meets community power.</em></p>
    </div>
  </div>

  <div class="container contentAboutUs">
    <div class="row">
      <div class="col-md-6">
        <h5>At Bulkify, we believe that buying in bulk shouldn’t be a burden—it should be a benefit.</h5>
        <p>That’s why we’ve created a platform that helps individuals come together, form buying groups, and enjoy wholesale prices without needing to own a store.</p>
        <h6>How It Works</h6>
        <p>We connect buyers within the same area or community who are interested in the same products. Once a group reaches the required quantity, the product is shipped at a discounted bulk price—no middlemen, no extra markups.</p>
      </div>
      <div class="col-md-6">
        <h6>Our Mission</h6>
        <p><em>To empower communities by making everyday products more affordable through the power of group purchasing. We strive to create a platform that builds trust, convenience, and financial relief for people everywhere.</em></p>
        <h6>Why Bulkify?</h6>
        <ul>
          <li>Lower Prices: The more you buy together, the more you save.</li>
          <li>Smart Shopping: Get quality products without overpaying for individual packaging.</li>
          <li>Community First: We’re building a network of buyers who support each other to save more.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="team-section">
    <h4>Meet the Team</h4>
    <div class="team-grid">
      <div class="team-member">Anton Raafat</div>
      <div class="team-member">Bola Samir</div>
      <div class="team-member">Marina Nazih</div>
      <div class="team-member">Beshoy Raafat</div>
      <div class="team-member">Geovani Zarif</div>
      <div class="team-member">Mina Saad</div>
      <div class="team-member">Mina Hany</div>
      <div class="team-member">Youssab Said</div>
    </div>
  </div>
            
            </>
    );
};

export default AboutUs;
