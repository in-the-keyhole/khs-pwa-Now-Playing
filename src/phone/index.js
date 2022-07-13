import { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { LS_PREFIX } from "../config";
import "./phone-styles.css";

function notify() {
	//const button = document.getElementById('notifications');
	//button.addEventListener('click', () => {
	  Notification.requestPermission().then((result) => {
	  	console.log("result: ", result);
	    if (result === 'granted') {
	      //randomNotification();
	      alert('notifications granted');
	    }
	  });
	//});
}

const Phone = () => {
	notify();
	
	return (
		<div id="phone">

			<label>Email
				<a href="mailto:repoman003@gmail.com">Email here</a>
			</label>
			<label>Area code with dashes, 1 and + sign
				<a href="tel:+1-555-555-1212">555-555-1212</a>
			</label>
			<label>Area code with no dashes, 1 and + sign
				<a href="tel:+15555551212">555-555-1212</a>
			</label>
			<label>Enter phone number (opens native telephone pad)
				<input type="tel" placeholder="555-555-5555" />
			</label>
			<label>Enter number (opens native number pad)
				<input type="number" placeholder="123" />
			</label>

			<label>Open link in phone map app<br />
				<a href="https://goo.gl/maps/VDahBSPMNfahJtEn9" target="_blank">Keyhole Software</a>
				<br />
				<a href="https://www.google.com/maps/place/Kansas+City" target="_blank">Kansas City</a>
			</label>
			
			<label>Image capture:camera
				<input type="file" name="image" accept="image/*" capture="camera" />
			</label>

			<label>Image capture:environment
				<input type="file" name="image" accept="image/*" capture="environment" />
			</label>

			<label>Image capture:user
				<input type="file" name="image" accept="image/*" capture="user" />
			</label>

			<label>Video capture:user
				<input type="file" name="video" accept="video/*" capture="environment" />
			</label>
		</div>
	);
}

export default Phone;