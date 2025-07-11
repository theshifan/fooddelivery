import React from 'react'

function About() {
  return (
    <>
    {/* page header */}
    <br />
    <br />
    <br />
    <div className="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
            <h1 className="display-3 mb-3 animated slideInDown">About Us</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol className="breadcrumb mb-0">
                    {/* <li className="breadcrumb-item"><a className="text-body" href="#">Home</a></li>
                    <li className="breadcrumb-item"><a className="text-body" href="#">Pages</a></li>
                    <li className="breadcrumb-item text-dark active" aria-current="page">About Us</li> */}
                </ol>
            </nav>
        </div>
    </div>
    {/* about */}
        <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="about-img position-relative overflow-hidden p-5 pe-0">
                        <img className="img-fluid w-100" src="img/about.jpg"/>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <h1 className="display-5 mb-4">Best Organic Fruits And Vegetables</h1>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                    <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
                    <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
                    <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
                    {/* <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Read More</a> */}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default About