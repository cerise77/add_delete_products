import './main.css';

 import _ from 'lodash';

$(document).ready(function () {
 function get(url) {
   return new Promise(function(succeed, fail) {
     let request = new XMLHttpRequest();
     request.open("GET", url, true);
     request.addEventListener("load", function() {
       if (request.status < 400)
         succeed(request.response);
       else
         fail(new Error("Request failed: " + request.statusText));
     });
     request.addEventListener("error", function() {
       fail(new Error("Network error"));
     });
     request.send();
   });
 }

 get("http://localhost:5000/data.json").then(function(text) {

  let numbers = JSON.parse(text);

  addData(numbers);

}, function(error) {
  console.log("Error!!!");
  console.log(error);
});


  function addData(num){

      var col = [];
        for (let i = 0; i < num.length; i++) {
            for (let key in num[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        let table = document.createElement("table");

        let tr = table.insertRow(-1);

        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < num.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = num[i][col[j]];
            }
        }

        let divContainer = document.querySelector(".table-product");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }


    $('.but-add').on('click', function () {

      let co = document.forms["myForm"]["codde"].value;
      let na = document.forms["myForm"]["name"].value;
      let pri = document.forms["myForm"]["price"].value;
      let im = document.forms["myForm"]["image"].value;
      let des = document.forms["myForm"]["description"].value;

      if (co == "" || na == "" || pri == "" || im == "" || des == "") {
          alert("Fill the form");
          return false;
      } else {
        let code = $('#in1').val();
        let name = $('#in2').val();
        let price = $('#in3').val();
        let image = $('#in4').val();
        let desc = $('#in5').val();

        let nameData = [];
        nameData.push(code, name, price, image, desc);

        let row = '<tr>#ddd</tr>';
        let thChildren = "";

        for (let n = 0; n < nameData.length; n++) {
          thChildren += '<th>'+ nameData[n] +'</th>';
        }

        row = row.replace(/#ddd/, thChildren);
        $("table").find('tbody').append(row);

        $('#in1').val("");
        $('#in2').val("");
        $('#in3').val("");
        $('#in4').val("");
        $('#in5').val("");
      }


    });


    $('.delete-b').on('click', function () {
      $("table").find('tbody').find("tr:last").remove();
    });

})
