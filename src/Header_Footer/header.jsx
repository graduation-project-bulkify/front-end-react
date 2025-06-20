import './header.css';
import logoWhite from '../components/images/Logo.svg';
// import person from '../images/icons8-person-30.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTachometerAlt, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '@mui/material/Icon';

<Icon>star</Icon>;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const CustomerToken = localStorage.getItem("CustomerToken");
  const SupplierToken = localStorage.getItem("SupplierToken");
  const AdminToken = localStorage.getItem("AdminToken");
  const Admin = JSON.parse(localStorage.getItem("admin") || '{}');
  const Supplier = JSON.parse(localStorage.getItem("supplier") || '{}');
  const Customer = JSON.parse(localStorage.getItem("Customer") || '{}');
  // const suppiler = JSON.parse(localStorage.getItem("supplier") || '{}');
  const handleLogout = () => {
    localStorage.removeItem("CustomerToken");
    localStorage.removeItem("Customer");
    localStorage.removeItem("SupplierToken");
    localStorage.removeItem("supplier");
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("CustomerData");
    navigate('/');
    window.location.reload();
  };

  return (

    <>
      {/* <div className="upper-header">
        <h5>Welcome to bulkify online Community Purchase.</h5>
        <div className='theCard'>
          <p className='card-header'>Follow us on :</p>
          <div className="social-media d-flex justify-content-center align-items-center">
            <a href="#" className="social-link" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>

            <a href="#" className="social-link" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>

            <a href="#" className="social-link" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>

            <a href="#" className="social-link" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>


      </div> */}
      <hr></hr>
      <div className="lower-header">
        <a href="/"  className='logo' >

          <img src={logoWhite} style={{ width: '100%'  }}></img>
        </a>
        <div className='lower-header-box1'>
          <div className="">
            {!CustomerToken && !SupplierToken && !AdminToken && (
              <div className="d-flex align-items-center gap-2">
                <Link 
                  to="/Login"
                  className={`btn btn-success btn-sm ${location.pathname === '/Login' ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Login
                </Link>
                <Link
                  to="/Signup"
                  className={`btn btn-success btn-sm ${location.pathname === '/Signup' ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  Sign Up
                </Link>
              </div>
            )}
            {CustomerToken && (
              <div className="d-flex align-items-center gap-2">
                <Link 
                  to="/CustomerProfile" 
                  className={`btn btn-success btn-sm ${location.pathname === '/CustomerProfile' ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                  {Customer.fullName} Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </button>
              </div>
            )}
            {SupplierToken && (
              <div className="d-flex align-items-center gap-2">
                <Link 
                  to="/SuppDashboard" 
                  className={`btn btn-success btn-sm ${location.pathname === '/SuppDashboard' ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                  {Supplier.fullName} Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </button>
              </div>
            )}
            {
              AdminToken && (
                <div className="d-flex align-items-center gap-2">
                  <Link 
                    to="/AdminDashboard" 
                    className={`btn btn-success btn-sm ${location.pathname === '/AdminDashboard' ? 'active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    {Admin.fullName} Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn btn-danger btn-sm">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </button>
                </div>
              )}
            
          </div>
        </div>
      </div></>
  )
};
export default Header;