import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userdata, setUserData] = useState({});


  function handleChange(evt) {
    const value = evt.target.value;
    setUserData({
      ...userdata,
      [evt.target.name]: value,
    });
  }

  // console.log(userdata);


  return (
    
    <div className='container'>
        <from>

        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Enter Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />
        </div>


        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
        </div>



        {!loading && (
          <div className="mt-3">
            <button
              href=""
              type="submit"
              className="btn btn-primary"
              onClick={async () => {
                let data = {
                 email:userdata.email,
                 password:userdata.password
                };

                setLoading(true)

                axios
                  .post("/apiv3/login", data)
                  .then((res) => {
                    console.log(res.data)
                    localStorage.setItem('token', res.data.token)

                    // navigate("/");
                  });
              }}
            >
              Login
            </button>
          </div>
        )}



        {loading === true && (
          <div className="mt-3">
            <i className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Logginng...</span>
            </i>
          </div>
        )}




        </from>
    </div>
  )
}

export default LoginPage