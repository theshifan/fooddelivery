import React from 'react'

function Footer() {
  return (
    <>
         <div className="container-fluid bg-dark footer mt-5 pt-5" >
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-2 col-md-3">
                    <h1 className="fw-bold text-primary mb-3">F<span className="text-secondary">oo</span>dy</h1>
                    <p className='text-light mb-3'>follow us on social media</p>
                    <div className="d-flex pt-2">
                        <a className="btn btn-square btn-outline-light rounded-circle me-1" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-outline-light rounded-circle me-1" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-outline-light rounded-circle me-1 " href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a className="btn btn-square btn-outline-light rounded-circle me-1 " href="#"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <h4 className="text-light mb-4">Address</h4>
                    <p className="text-light mb-3"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                    <p className="text-light mb-3"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="text-light mb-3"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                </div>
                <div className="col-md-3 col-md-6">
                    <h4 className="text-light mb-4">Quick Links</h4>
                    <a className="btn btn-link" href="">About Us</a>
                    <a className="btn btn-link" href="">Contact Us</a>
                    <a className="btn btn-link" href="">Our Services</a>
                    <a className="btn btn-link" href="">Terms & Condition</a>
                    <a className="btn btn-link" href="">Support</a>
                </div>
                {/* <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Newsletter</h4>
                    <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                    <div className="position-relative mx-auto" style={{"maxWidth":"00px"}}>
                        <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div> */}
            </div>
        </div>
        <div className="container-fluid copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        {/* <a href="#">Your Site Name</a>, All Right Reserved. */}
                        <div>
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer