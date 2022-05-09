import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function BookShelf() {
  let [results, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();



  useEffect(() => {
    function fetchData() {
      setLoading(false);
      axios.get("/apiv3/getbooks").then((response) => {
        setLoading(true);

        setResult(response.data);

        // console.log(response.data);
      });
    }

    fetchData();
  }, []);

  console.log(results);


  let keys = Object.keys(results);



  return(
    <div>
    <div className="form-group  d-flex justify-content-end ">
      <button
        className="btn btn-success btn-md "
        type="submit"
        onClick={() => {
          navigate("/addbook");
        }}
      >
        Add Book to Library
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

    <table className="table mt-3 table-responsive">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">AuthorName</th>
          <th scope="col">BookTitle</th>
          <th scope="col">PublishedDate</th>
          <th scope="col">PublisherName</th>
          <th scope="col">BookCount</th>
          <th scope="col">PageCount</th>
          <th scope="col">Language</th>
          <th scope="col">ISBN13</th>
          <th scope="col">ISBN10</th>
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
          {keys.reverse().map((itm, k) => {
            let obj = results[itm];

            return (
              <>
                <tr>
                  <th scope="row">{k + 1}</th>
          <th scope="row">{obj.AuthorName}</th>
          <th scope="row">{obj.BookTitle}</th>
          <th scope="row">{obj.PublishedDate}</th>
          <th scope="row">{obj.PublisherName}</th>
          <th scope="row">{obj.BookCount}</th>
          <th scope="row">{obj.PageCount}</th>
          <th scope="row">{obj.Language}</th>
          <th scope="row">{obj.ISBN13}</th>
          <th scope="row">{obj.ISBN10}</th>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
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

export default BookShelf;
