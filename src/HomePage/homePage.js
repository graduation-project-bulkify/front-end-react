import React from 'react';
import './homePage.css';
import logo from '../logo.svg';
// import '../bootstrap-5.3.3-dist/css/bootstrap.min.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap-grid.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap-grid.min.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap-reboot.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap-reboot.min.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap-utilities.css';
// import '../bootstrap-5.3.3-dist/css/bootstrap-utilities.min.css';

function HomePage() {
    return (
        <>
            <main className="container">
                <article className="row">
                    <header className="col-md-6 col-lg-8 d-flex align-items-center">
                        <div>
                            <h2 className="h4">Men /</h2>
                            <h1 className="display-4">Laid Back Loafers &mdash;</h1>
                            <p className="mt-0">Summer-ready slip-ons for office and weekend wear.</p>
                            <div className="bg-primary" style={{width: "8rem", height: "2rem"}}></div>
                        </div>
                    </header>

                    <div className="col-md-6 col-lg-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 bg-secondary text-white p-4">
                        <div className="h5">
                            Free pickup in store or Free shipping on all online orders!
                            <hr className="border-white w-25 mt-3"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-8 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>

                    <div className="col-md-4 overflow-hidden pointer">
                        <div className="zoom bg-center w-100 h-100">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </div>
                    </div>
                </article>
            </main>

            <a href="https://github.com/winkerVSbecks/grid-experiments" target="_blank" className="btn btn-link position-fixed bottom-0 end-0 m-3">
                <svg className="bg-white rounded-circle text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
                    <path fillRule="nonzero" fill="currentColor" d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8"/>
                </svg>
            </a>
        </>
    );
}

export default HomePage;