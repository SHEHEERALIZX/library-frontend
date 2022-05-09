import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../reuseComponents/LoadingButton";

function AddUser() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [userdata, setUserData] = useState({});

  // console.log(userdata);

  function handleChange(evt) {
    const value = evt.target.value;
    setUserData({
      ...userdata,
      [evt.target.name]: value,
    });
  }

  return (
    <div className="container">
      <form>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullname"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter Full Name"
            required
            onChange={handleChange}
          />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Designation</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputDesignation"
            name="designation"
            aria-describedby="emailHelp"
            placeholder="Enter Designation"
            required
            onChange={handleChange}
          />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            onChange={handleChange}
          />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Phone Number</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPhoneNumber"
            name="phonenumber"
            aria-describedby="emailHelp"
            placeholder="Enter Phone number"
            required
            onChange={handleChange}
          />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>

        {!loading && (
          <div className="mt-3">
            <i
              href=""
              type="submit"
              className="btn btn-primary"
              onClick={async () => {
                let data = {
                  phonenumber: Number(userdata.phonenumber),
                  email: userdata.email,
                  fullname: userdata.fullname,
                  designation: userdata.designation,
                };

                setLoading(true)

                axios
                  .post("/apiv3/persons", data)
                  .then((res) => {
                    navigate("/");
                  });
              }}
            >
              Submit
            </i>
          </div>
        )}

        {loading === true && (
          <LoadingButton value='Submitting'/>
        )}


      </form>
    </div>
  );
}

export default AddUser;
