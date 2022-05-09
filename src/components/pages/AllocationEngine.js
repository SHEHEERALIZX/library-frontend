import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllocationEngine() {
  const [bookid, setBookID] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(evt) {
    setBookID(evt.target.value);
  }

  console.log(bookid);

  const handle = (e) => {
    e.preventDefault(); // Otherwise the form will be submitted

    axios
      .post("/apiv3/addbook", { bookID: bookid })
      .then((res) => {
        console.log(res.data);

        if (res.data.status == 200) {
          let show = `${bookid} scanned Successfully`;

          toast.success(show, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (res.data.status == 422){
          let show = `Empty Content`;
          toast.error(show, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        } else  {
          let show = `${bookid} already Exits`;
          toast.info(show, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });

    setBookID("");
  };

  console.log(bookid);

  return (
    <div className="container">
      <nav class="navbar navbar-light bg-light">
        <form class="form-inline" onSubmit={(e) => handle(e)}>
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Scan Books"
            name="BookID"
            onChange={handleChange}
            value={bookid}
          />
        </form>
      </nav>

      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AllocationEngine;
