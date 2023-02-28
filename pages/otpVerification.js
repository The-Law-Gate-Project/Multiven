import React, { useState } from "react";
import { auth } from "../util/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OtpVerification = () => {
  
  const [number, setNumber] = useState(null);
  const [OTP, setOTP] = useState(null);
  const [expand, setExpand] = useState(false);

  const generateRecaptcha = () => {
    // ! recaptcha as mandatory by google
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const requestOTP = () => {
    if (number.length == 10) {
      setExpand(true);
      generateRecaptcha();
      // * allowing the user to sign in with the phone number
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, "+91" + number, appVerifier)
        .then((confirmationResult) => {
          // * creating global variable for confirmationResult to use it in other methods
          window.confirmationResult = confirmationResult;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      // verifying the otp here
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }
  };

  return (
    <div className="h-fit">
      <div className="flex flex-col">
        {/* phone input div */}
        <div>
          <input
            type="number"
            name="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className=" m-1 border-2 border-black"
          />
          <button
            onClick={() => {
              requestOTP();
            }}
          >
            Request OTP
          </button>
        </div>
        {/* OTP input div */}
        {expand && (
          <div>
            <input
              type="number"
              name="otp"
              id="otp"
              value={OTP}
              onChange={verifyOTP}
              className=" m-1 border-2 border-black"
              placeholder="enter otp"
            />
          </div>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpVerification;
