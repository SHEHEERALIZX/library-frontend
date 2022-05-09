import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let [results, setResult] = useState([]);

  useEffect(() => {
    function fetchData() {
      setLoading(false);
      axios.get("/apiv3/persons").then((response) => {
        setLoading(true);

        setResult(response.data);

        // console.log(response.data);
      });
    }

    fetchData();
  }, []);

  let keys = Object.keys(results);

  console.log((keys));

  return (
    <div>
      <div className="form-group  d-flex justify-content-end ">
        <button
          className="btn btn-success btn-md "
          type="submit"
          onClick={() => {
            navigate("/add-user");
          }}
        >
          Add User
        </button>

        <button
          className="btn btn-warning btn-md ms-3 "
          type="submit"
          onClick={async () => {
            setLoading(false);

            axios
              .get("/apiv3/persons")
              .then((response) => {
                setResult(response.data);
                setLoading(true);
              });
          }}
        >
          Refresh Page
        </button>
      </div>

      <table className="table mt-3">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Designation</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        {!loading && (
          <div className="d-flex justify-content-center mt-5 ml-5">
            <div className="spinner-border">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {loading && (
          <tbody>
            {keys.map((itm, k) => {
              let obj = results[itm];

              return (
                <>
                  <tr>
                    <th scope="row">{k + 1}</th>
                    <td>{obj.name}</td>
                    <td>{obj.email}</td>
                    <td>{obj.PhoneNumber}</td>
                    <td>{obj.designation}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={async () => {
                          let obj = results[itm];

                          let data = {
                            id: obj._id,
                          };

                          // console.log(obj._id);

                          axios
                            .post(
                              "/apiv3/deleteuser",
                              data
                            )
                            .then((res) => {



                              // let removeArr = [...results].filter(obj => obj._id!== _id)

                              // setResult(removeArr)

                              



                            });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Dashboard;
