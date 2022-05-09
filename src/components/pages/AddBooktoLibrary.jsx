import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../reuseComponents/LoadingButton";

function AddBooktoLibrary() {
  let navigate = useNavigate();

  let initialValue = {
    AuthorName: "",
    BookSubtitle: "",
    BookTitle: "",
    ISBN10: "",
    ISBN13: "",
    Language: "",
    PageCount: "",
    PublishedDate: "",
    PublisherName: "",
    BookCount: "",
  };

  // UseState here .........

  const [bookid, setBookID] = useState("");
  const [IsbnID, setIsbnID] = useState("");
  const [bookData, setBookData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [Searchloading, setSearchLoading] = useState(false);

  const handle = (e) => {
    e.preventDefault(); // Otherwise the form will be submitted

    axios.post("/apiv3/addbook", { bookID: bookid }).then((res) => {
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
      } else if (res.data.status == 422) {
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
      } else {
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

  const BookApiCall = (e) => {
    e.preventDefault(); // Otherwise the form will be submitted
    setSearchLoading(true)
    setBookData(initialValue)
    axios.post("/apiv3/searchbook", { bookID: IsbnID }).then((res) => {
      let result = res.data.result;
     setSearchLoading(false)


      if (res.data.info.status == 422) {
        let show = `Book Not Found`;
        toast.error(show, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        

        let obj 

        if(result.industryIdentifiers[1]==undefined){
           obj = {
            BookTitle: result.title,
            AuthorName: result.authors[0],
            BookSubtitle: result.description,
            PublishedDate: result.publishedDate,
            PageCount: result.pageCount,
            Language: result.language,
            PublisherName: result.publisher,
            ISBN13: result.industryIdentifiers[0].identifier,
            BookCount: 1,
          };
  
          setBookData(obj);

        } else {
          if (result.industryIdentifiers[0].identifier.length != 10) {
            let temp = result.industryIdentifiers[1].identifier;
            result.industryIdentifiers[1].identifier =
              result.industryIdentifiers[0].identifier;
            result.industryIdentifiers[0].identifier = temp;
          }

          obj = {
            BookTitle: result.title,
            AuthorName: result.authors[0],
            BookSubtitle: result.description,
            PublishedDate: result.publishedDate,
            PageCount: result.pageCount,
            Language: result.language,
            PublisherName: result.publisher,
            ISBN10: result.industryIdentifiers[0].identifier,
            ISBN13: result.industryIdentifiers[1].identifier,
            BookCount: 1,
          };
  
          setBookData(obj);

        }

      

        console.log(obj);
      }
    });
  };

  function handleSearchInput(evt) {
    setIsbnID(evt.target.value);
  }

  console.log(IsbnID);

  function handleChange(evt) {
    const value = evt.target.value;

    setBookData({
      ...bookData,
      [evt.target.name]: value,
    });
  }

  const style = {
    style: "width:10px",
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="form-group mt-3 col ">
            <form className="form-inline" onSubmit={(e) => BookApiCall(e)}>
              <input
                className="form-control mr-sm-2"
                type="number"
                placeholder="Scan ISBN ID"
                name="isbnID"
                onChange={handleSearchInput}
                autoComplete="off"
                value={IsbnID}
              />
            </form>
          </div>
          {!Searchloading && (
            <div className="form-group mt-3 col ">
              <i
                href=""
                type="submit"
                className="btn btn-primary"
                onClick={(e) => BookApiCall(e)}
              >
                Search
              </i>
            </div>
          )}
          {Searchloading && (
            <div className="form-group mt-3 col ">
              <i className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </i>
            </div>
          )}
          <div className="col"></div> <div className="col"></div>
          <div className="col"></div> <div className="col"></div>
        </div>

        <form>
          <div className="row">
            <div className="form-group mt-3 col ">
              <label htmlFor="exampleInputEmail1">Book Title</label>
              <input
                type="text"
                className="form-control"
                name="BookTitle"
                id="exampleInputName"
                aria-describedby="emailHelp"
                placeholder="Enter Book Title"
                required
                onChange={handleChange}
                value={bookData.BookTitle}
              />
            </div>

            <div className="form-group mt-3 col ">
              <label htmlFor="exampleInputEmail1">Author Name</label>
              <input
                type="text"
                className="form-control"
                name="AuthorName"
                // id="exampleInputName"
                // aria-describedby="emailHelp"
                placeholder="Enter Author Name"
                required
                onChange={handleChange}
                value={bookData.AuthorName}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group mt-3 col ">
              <label htmlFor="exampleInputEmail1">Subtitle</label>
              <input
                type="text"
                className="form-control"
                name="BookSubtitle"
                // id="exampleInputName"
                // aria-describedby="emailHelp"
                placeholder="Enter Subtitle/Description"
                required
                onChange={handleChange}
                value={bookData.BookSubtitle}
              />
            </div>

            <div className="form-group mt-3 col">
              <label htmlFor="exampleInputEmail1">Publish Date</label>
              <input
                type="text"
                className="form-control"
                // id="exampleInputDesignation"
                name="PublishedDate"
                // aria-describedby="emailHelp"
                placeholder="Publish Date"
                required
                onChange={handleChange}
                value={bookData.PublishedDate}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group mt-3 col ">
              <label htmlFor="exampleInputEmail1">No of pages</label>
              <input
                type="number"
                className="form-control"
                name="PageCount"
                // id="exampleInputName"
                // aria-describedby="emailHelp"
                placeholder="No of Pages"
                required
                onChange={handleChange}
                value={bookData.PageCount}
              />
            </div>

            <div className="form-group mt-3 col">
              <label htmlFor="exampleInputEmail1">Language</label>
              <input
                type="text"
                className="form-control"
                // id="exampleInputDesignation"
                name="Language"
                // aria-describedby="emailHelp"
                placeholder="Language"
                required
                onChange={handleChange}
                value={bookData.Language}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group mt-3 col ">
              <label htmlFor="exampleInputEmail1">Publisher Name</label>
              <input
                type="text"
                className="form-control"
                name="PublisherName"
                // id="exampleInputName"
                // aria-describedby="emailHelp"
                placeholder="Enter Publisher Name"
                required
                onChange={handleChange}
                value={bookData.PublisherName}
              />
            </div>

            <div className="form-group mt-3 col">
              <label htmlFor="exampleInputEmail1">No Of Books</label>
              <input
                type="number"
                className="form-control"
                // id="exampleInputDesignation"
                name="BookCount"
                // aria-describedby="emailHelp"
                placeholder="Enter Books Count"
                required
                onChange={handleChange}
                value={bookData.BookCount}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mt-3 col">
              <label htmlFor="exampleInputEmail1">ISBN 13</label>
              <input
                type="number"
                className="form-control"
                // id="exampleInputDesignation"
                name="ISBN13"
                // aria-describedby="emailHelp"
                placeholder="ISBN 13"
                required
                onChange={handleChange}
                value={bookData.ISBN13}
              />
            </div>

            <div className="form-group mt-3 col">
              <label htmlFor="exampleInputEmail1">ISBN 10</label>
              <input
                type="number"
                className="form-control"
                // id="exampleInputDesignation"
                name="ISBN10"
                // aria-describedby="emailHelp"
                placeholder="ISBN 10"
                required
                onChange={handleChange}
                value={bookData.ISBN10}
              />
            </div>

            {!loading && (
              <div className="row">
                <div className="mt-3">
                  <i
                    href=""
                    type="submit"
                    className="btn btn-primary"
                    onClick={async () => {
                      setLoading(true);

                      axios.post("/apiv3/savebook", bookData).then((result) => {
                        console.log(result);
                        setLoading(false);
                        // setIsbnID("");
                        setBookID("");
                        setIsbnID("");

                        setBookData(initialValue);
                        let show = `Book added Successfully`;

                        toast.success(show, {
                          position: "bottom-left",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      });
                    }}
                  >
                    Submit
                  </i>
                </div>
              </div>
            )}

            {loading == true && <LoadingButton value="Creating Book....." />}
          </div>
        </form>

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
    </>
  );
}

export default AddBooktoLibrary;
