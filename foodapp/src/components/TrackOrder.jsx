import React, { useEffect, useState } from 'react'
import './css/TrackOrder.css'
import axios from 'axios'
import api from '../api'


function TrackOrder({ orderId }) {
    const [trackData, SetTrackdata]= useState("");
    useEffect(() => {
        api.get(`/api/track-order/?order=${orderId}`)
        .then(res =>{
            SetTrackdata(res.data[0])
            console.log(res.data)
        })
    .catch(err => console.error(err)); 
    },[orderId])
    
    const statusMap = {
        RECEIVED: 1,
        DISPATCHED: 2,
        IN_TRANSIT: 3,
        OUT_FOR_DELIVERY: 4,
        DELIVERED: 5
      };
    const currentStep = trackData ? statusMap[trackData.status] : 0;
    const progressPercent = ((currentStep - 1) / 4) * 100;
  return (
    <>
        <div className='headspace1'></div>
        {/* <TrackOrder orderId={x} /> */}

<div className="breadcrumb">Your Account › Your Orders › Order Summary › <strong>Delivery Tracking</strong></div>

<h1>Delivery Tracking</h1>
<div className='headspace'></div>

{trackData ? (
  <>
    <div className="status" id="delivery-status">{trackData.status.replaceAll('_', ' ')}</div>
    <div className="right-note">
      Your parcel is <span id="current-step">{trackData.status.replaceAll('_', ' ').toLowerCase()}</span>
      {' '}(Updated <span id="update-time">{new Date(trackData.updated_at).toLocaleString()}</span>)
    </div>
  </>
) : (
  <div>Loading tracking info...</div>
)}

<div className="expected-date">Expected delivery: <span>Friday, 8 November 2013</span></div>

<div className="progress-container">
  <div className="progress-bar"></div>
  <div className="progress-bar-filled" id="progress-bar" style={{ width: `${progressPercent}%` }}></div>

  <div className="stage" data-step="1">
    <div className={`stage-circle ${currentStep >= 1 ? 'active' : ''}`}></div>
    <div className="stage-label">Dispatching soon</div>
  </div>
  <div className="stage" data-step="2">
    <div className={`stage-circle ${currentStep >= 2 ? 'active' : ''}`}></div>
    <div className="stage-label">Dispatched</div>
  </div>
  <div className="stage" data-step="3">
    <div className={`stage-circle ${currentStep >= 3 ? 'active' : ''}`}></div>
    <div className="stage-label">In transit</div>
  </div>
  <div className="stage" data-step="4">
    <div className={`stage-circle ${currentStep >= 4 ? 'active' : ''}`}></div>
    <div className="stage-label"><strong>Out for delivery</strong></div>
  </div>
  <div className="stage" data-step="5">
    <div className={`stage-circle ${currentStep === 5 ? 'active' : ''}`}></div>
    <div className="stage-label">Delivered</div>
  </div>

  <div className='headspace2'></div>
</div>
    </>
  )
}

export default TrackOrder