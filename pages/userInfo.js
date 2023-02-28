import { useState } from "react";
import axios from "axios";
import {
  BsFillInfoCircleFill,
  BsCheckCircleFill,
  BsCheck,
} from "react-icons/bs";
import { auth } from "../util/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import "firebase/database";
import { FirebaseApp } from "firebase/app";

const UserInfo = () => {
  const router = useRouter();
  // ! form regex
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+[@][a-zA-Z0-9.-]+[\.][a-zA-Z]{2,4}$/;
  const PHONE_REGEX = /^(?!0)[1-9][0-9]{9}/;
  // ! form regex end

  // ! form states
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [expand, setExpand] = useState(false);
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  // * info state
  const [emailInfo, setEmailInfo] = useState(false);
  const [phoneInfo, setPhoneInfo] = useState(false);
  // * otp input state
  const [otpInput, setOtpInput] = useState(false);
  const [OTP, setOTP] = useState("");
  const [otpLoading, setOtpLoading] = useState(false); // this loading state is only for the otp request
  // ! form states end

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post("http://localhost:3000/api/login", {
      fname,
      email,
      landmark,
      phone: verifiedPhone,
      address,
    });
    router.push("/orderConfirm");
  };

  // ! email validation block

  const validateEmail = (email) => {
    if (!EMAIL_REGEX.test(email)) {
      if (email === "") {
        setEmailInfo(false);
      } else {
        setEmailInfo(true);
      }
    } else {
      setEmailInfo(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  // ! email validation block end

  // ! phone number validation
  const validatePhone = (num) => {
    if (num.length > 10) {
      setPhoneInfo(true);
      setExpand(false);
    } else {
      setExpand(false);
      if (!PHONE_REGEX.test(num)) {
        if (num === "") {
          setPhoneInfo(false);
        } else {
          setPhoneInfo(true);
        }
      } else {
        if (num.length == 10) {
          setExpand(true);
        } // * this will open the otp enter input and the request otp and verify otp buttons
        else {
          setExpand(false);
        }
        setPhoneInfo(false);
      }
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    validatePhone(e.target.value);
  };
  // ! phone number validation end

  // * phone number verification code with firebase here

  const generateRecaptcha = () => {
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
    generateRecaptcha();
    // * allowing the user to sign in with the phone number
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91" + phone, appVerifier)
      .then((confirmationResult) => {
        // * creating global variable for confirmationResult to use it in other methods
        window.confirmationResult = confirmationResult;
        setOtpLoading(false);
        setOtpInput(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOTP = (otp) => {
    if (otp.length === 6) {
      // verifying the otp here
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setOtpLoading(false);
          setExpand(false);
          setVerifiedPhone(user.phoneNumber);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }
  };
  // * phone number verification code end

  return (
    <>
      <div className="flex flex-col mt-16">
        <div className="flex flex-col items-center">
          <p className="text-center mt-[30px] mb-[10px] text-3xl font-light">
            Address & Details
          </p>
        </div>
        <form
          className="flex flex-grow justify-center items-center mt-[10px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="fname"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              First Name
            </label>
            <input
              type="text"
              required={true}
              id="fname"
              name="fname"
              className="border-[2px] border-gray-300 w-[300px] sm:w-[500px] h-10 rounded-md pl-2 outline-blue-200"
              onChange={(e) => setFname(e.target.value)}
            />
            <label
              htmlFor="email"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Email <span className="italic text-sm">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border-[2px] border-gray-300 w-[300px] sm:w-[500px] h-10 rounded-md pl-2 outline-blue-200"
              onChange={handleEmailChange}
            />
            {emailInfo && (
              <span className="w-[295px] bg-black bg-opacity-30 p-2 flex rounded-md my-2 ">
                <BsFillInfoCircleFill className=" text-5xl pb-5 pr-1" />
                <span className="">
                  Email format should match as the example below
                  "example@company.com"
                </span>
              </span>
            )}
            <label
              htmlFor="address"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              cols="30"
              rows="2"
              className="border-[2px] border-gray-300 w-[300px] sm:w-[500px] rounded-md pl-2 pt-1 outline-blue-200"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Locality, apartment, etc..."
              required={true}
            ></textarea>
            <label
              htmlFor="landmark"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              required={true}
              placeholder="example: Near Green Valley"
              className="border-[2px] border-gray-300 w-[300px] sm:w-[500px] h-10 rounded-md pl-2 outline-blue-200"
              onChange={(e) => setLandmark(e.target.value)}
            />
            <label
              htmlFor="phone"
              className="text-gray-500 mt-[15px] text-sm pb-1 flex items-end space-x-2"
            >
              <span>Phone No.</span>
              {verifiedPhone !== "" && (
                <span className="mb-[2px]">
                  <BsCheckCircleFill className="text-green-600" />
                </span>
              )}
            </label>
            <div className="flex items-center">
              <span className="border-y-[2px] border-l-[2px] border-gray-300 py-[6px] px-[2px] rounded-tl-md rounded-bl-md outline-blue-200">
                +91
              </span>
              <input
                type="text"
                name="phone"
                required={true}
                id="phone"
                className="border-[2px] border-gray-300 w-[268px] sm:w-[500px] h-10 rounded-md rounded-tl-none rounded-bl-none pl-2 outline-blue-200"
                onChange={handlePhoneChange}
                disabled={verifiedPhone !== ""}
                maxLength={10}
              />
            </div>
            {phoneInfo && (
              <span className="w-[295px] bg-black bg-opacity-30 p-2 flex rounded-md my-2 ">
                <BsFillInfoCircleFill className=" text-5xl pb-5 pr-1" />
                <span className="">
                  Phone number should contain only numbers and should have 10
                  digits.
                </span>
              </span>
            )}{" "}
            {expand && (
              <div className="flex justify-end">
                {otpInput ? (
                  <div className="mt-3 flex space-x-3 ">
                    <span></span>
                    <input
                      type="text"
                      maxLength={6}
                      className="outline-blue-200 rounded-md border-[2px] border-gray-300 pl-1 w-[150px]"
                      placeholder="Enter 6 digit OTP"
                      onChange={(e) => setOTP(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setOtpLoading(true);
                        verifyOTP(OTP);
                      }}
                      className={`${
                        otpLoading ? "opacity-50 cursor-not-allowed" : null
                      } text-white p-2 text-sm rounded-md hover:scale-105 transition transform duration-150 ease-out bg-blue-400`}
                      disabled={otpLoading}
                    >
                      Verify OTP
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpLoading(true);
                      requestOTP();
                    }}
                    className={`${
                      otpLoading ? "opacity-50 cursor-not-allowed" : null
                    } mt-[20px] text-white p-2 text-sm rounded-md hover:scale-105 transition transform duration-150 ease-out bg-blue-400`}
                    disabled={otpLoading}
                  >
                    Request OTP
                  </button>
                )}
              </div>
            )}
            {/* recaptcha container */}
            <div className="mt-2" id="recaptcha-container"></div>
            <button
              type="submit"
              className={`${
                verifiedPhone === "" || emailInfo || phoneInfo
                  ? "opacity-50 cursor-not-allowed"
                  : null
              } mt-[20px] w-[80px] text-white py-2 rounded-md hover:scale-105 transition transform duration-150 ease-out bg-blue-400`}
              disabled={verifiedPhone === ""}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserInfo;
