import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // communicating with the backend using axios post request
    // the below axios call returns a then-promise which on succesful post request will print the data json in the console and if it is not succe
    axios({
      method: "post",
      url: "/api/addContactData",
      data: {
        name,
        email,
        phone,
        message,
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          console.log("successfully submitted contact details");
        }
      },
      (err) => {
        console.log(err);
      }
    );
    // cleanup functions defined above, called below
    clearInputs();
    setSubmit(true);
  };

  return (
    <>
      <div className="flex flex-col mt-16">
        <div className="flex flex-col items-center">
          <p className="text-center mt-[30px] mb-[10px] text-3xl font-light">
            Contact <span className="text-teal-600">Us</span>
          </p>
          <span className="text-gray-600 text-center">
            Feel free to connect with us and <br /> share your feedback
          </span>
        </div>
        <form
          className="flex flex-grow justify-center items-center mt-[10px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Name
            </label>
            <input
              type="text"
              required={true}
              id="name"
              name="name"
              className="border-[2px] w-[300px] sm:w-[500px] h-10 rounded-md pl-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label
              htmlFor="email"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required={true}
              name="email"
              className="border-[2px] w-[300px] sm:w-[500px] h-10 rounded-md pl-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label
              htmlFor="phone"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Phone No.
            </label>
            <input
              type="tel"
              name="phone"
              required={true}
              id="phone"
              className="border-[2px] w-[300px] sm:w-[500px] h-10 rounded-md pl-2"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <label
              htmlFor="message"
              className="text-gray-500 mt-[15px] text-sm pb-1 "
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              cols="30"
              rows="5"
              className="border-[2px] w-[300px] sm:w-[500px] rounded-md pl-2 pt-1"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Write your concerns here"
            ></textarea>
            {!submit && (
              <button
                type="submit"
                className="mt-[20px] w-[80px] text-gray-200 py-1 rounded-md hover:scale-105 transition transform duration-150 ease-out bg-[#111827] hover:bg-[#274074]"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        {submit && (
          <div className="text-center mt-5 font-semibold">
            Thank You Contacting Us <br /> We will get back to you soon!
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
