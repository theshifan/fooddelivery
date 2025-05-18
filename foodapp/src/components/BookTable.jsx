import React from 'react'

function BookTable() {
  return (
    <>
     <br />
    <br />
    <br />
    <div className="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container" style={{"padding":"60px"}}>
            <h1 className="display-3 mb-3 animated slideInDown">Book A Table</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol className="breadcrumb mb-0">
                    {/* <li className="breadcrumb-item"><a className="text-body" href="#">Home</a></li>
                    <li className="breadcrumb-item"><a className="text-body" href="#">Pages</a></li>
                    <li className="breadcrumb-item text-dark active" aria-current="page">About Us</li> */}
                </ol>
            </nav>
        </div>
    </div>
    <br />
    <br />
    <br /><div style={{"padding":"20px",}}></div>
         <div className="container-fluid bg-primary bg-icon mt-5 py-6" style={{paddingBottom:"100px"}}>
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-md-7 wow fadeIn" data-wow-delay="0.1s">
                    <h1 className="display-5 text-white mb-3">Book a table</h1>
                    <p className="text-white mb-0">reserve your self a table for a complte different experience</p>
                </div>
                <div className="col-md-5 text-md-end wow fadeIn" data-wow-delay="0.5s">
                    <a className="btn btn-lg btn-secondary rounded-pill py-3 px-5" href="">book now</a>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default BookTable