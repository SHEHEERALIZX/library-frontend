const  axios = require('axios')


let data = {
    phonenumber:9947425355,
    email: "nssheheerali@gmail.com",
    fullname: "SHEHEER ALI",
    designation: "Developer"
  };

async function fetchData(){
    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:97846185&key=AIzaSyB-QlMlotYmsLV0s8oSxUfgzXc-5hizT1g').then((res)=>{
        console.log(res);



    })

}


fetchData()




// console.log(fetchData().then(


// ));


// let result =  fetchData()


// console.log(result);