import './footer.css';
import logo from '../images/Layer_1.png';
import apple from'../images/Apple---Negative 1.png';
import googlePlay from'../images/Group.png';
function Footer() {
    return (
        <>
            <footer>
      <div className="footer">
        <div className="contanier">
          <div className="item">
            <img src={logo} alt="not found" />
            <h5>Customer Supports:</h5>
            <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
            <a href="">info@kinbo.com</a>
          </div>

          <div className="item">
            <h3>Top Category</h3>
            <ul>
              <li>Computer & Laptop</li>
              <li>SmartPhone</li>
              <li>Headphone</li>
              <h3>Accessories</h3>
              <li>Camera & Photo</li>
              <li>TV & Homes</li>
            </ul>
          </div>

          <div className="item">
            <h3>Quick links</h3>
            <ul>
              <li><a href="#">Shop Product</a></li>
              <li><a href="#">Shoping Cart</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Compare</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Customer Help</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          <div className="item">
            <h3>Download APP</h3>
            <button>
              <img src={googlePlay} alt="" />
              Google Play
            </button>

            <button>
              <img src={apple} alt="" />
              App Store
            </button>
          </div>

          <div className="item">
            <h3>Popular Tag</h3>
            <a href="">Game</a>
            <a href="">iphone</a>
            <a href="">TV</a>
            <a href="">SSD</a>
            <a href="">Graphics Card </a>
            <a href="">Power Bank </a>
            <a href="">Smart TV</a>
            <a href="">Speaker</a>
            <a href="">Tablet</a>
            <a href="">Microwave</a>
            <a href="">Samsung</a>
          </div>
          <div className="clear-fix"></div>
        </div>
      </div>
    </footer>
        </>
    );
}

export default Footer;
