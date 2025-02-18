/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './validation.css';
function Validation() {
return (<>
<div class="container-validation">
<div class="card-validation"> 
  <button type="button" class="dismiss">×</button> 
  <div class="header"> 
    <div class="image">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
      </div> 
      <div class="content">
         <span class="title">Order validated</span> 
         <p class="message">your purchase is successfully started</p> 
         </div>
         <button type="button" style={{backgroundColor: '#61AE45', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '12px'}}>
           View purchase that has started
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
             <path d="M5 12h14M12 5l7 7-7 7"/>
           </svg>
         </button>
         <div class="actions">
            <button type="button" class="history">History</button> 
            <button type="button" class="track">Track my package</button> 
            </div> 
            </div> 
            </div>
</div>





</>)};
export default Validation;
