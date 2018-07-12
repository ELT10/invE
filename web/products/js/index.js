$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});

function togvr()
{
    var x = document.getElementById("adinv");
    var y = document.getElementById("adina");
    var z = document.getElementById("vwtab");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        z.style.display = "block";
    }
}
function togva()
{
    var x = document.getElementById("adina");
    var y = document.getElementById("adinv");
    var z = document.getElementById("vwtab");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        z.style.display = "block";
    }
}
function togvt()
{
    var x = document.getElementById("vwtab");
    var y = document.getElementById("adina");
    var z = document.getElementById("adinv");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
    }
}

//To insert a new product
function addpro()
{   
    var pcode= document.getElementById("pcode").value;
    var pname= document.getElementById("pname").value;
    var pd= document.getElementById("pd").value;
    var mn= document.getElementById("mn").value;
    var dman= document.getElementById("dman").value;
    var dexp= document.getElementById("dexp").value;
    var stype= document.getElementById("stype").value;
    var stock= document.getElementById("stock").value;
    var cost= document.getElementById("cost").value;
    var bcode= document.getElementById("bcode").value;

var xhr = new XMLHttpRequest();
    var url = "http://localhost:8060/insert";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
                    //var json = /*JSON.parse(xhr.responseText);
            if(xhr.responseText==="1")
            {document.location.reload();
             confirm("New product added.");
        }
             else
            {
             confirm("A product with same bcode already exists.");
        }
        }
    };
    var data = JSON.stringify({"ProductCode" : pcode,
    "name" : pname,
    "Productdescription" : pd,
    "ManufacturerName" : mn,                           
    "DateManufactured" : dman,
    "ExpiryDate" : dexp,
    "StorageType" : stype,
    "RemainingStock" : stock,
    "UnitCost" : cost,
    "Bcode" : bcode});
    console.log(data);
    xhr.send(data); 
}


//to restock from manufacturer
function addinv()
{
    var pcode= document.getElementById("pcode2").value;
    var stock= document.getElementById("stock2").value;
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8070/reqst";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
                    //var json = /*JSON.parse(xhr.responseText);
            if(xhr.responseText==="MANUFACTURER 1"){
                document.location.reload();
            
                confirm('Order confirmed at '+xhr.responseText);
        }}
    };
    var data= JSON.stringify({"pcode": pcode, "stock": stock});
 console.log(data);
    xhr.send(data);
    order();
}

//To generate table
function viewdat()
{
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8060/findinv";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
                    //var json = /*JSON.parse(xhr.responseText);
            if(xhr.responseText)
            {          var x=JSON.parse(xhr.responseText);
                        console.log(x.length);
                        var i=0;
                        while(i<x.length)
                            {   var idt="treatment-plan-row"+i;
                                var tr = document.createElement('tr');
                                tr.setAttribute("id",idt);


                                tr.innerHTML =
                                    '<td>'+x[i]["ProductCode"]+'</td>\
                                    <td>'+x[i]["name"]+'</td>\
                                    <td class="prod">'+x[i]["Productdescription"]+'</td>\
                                    <td>'+x[i]["ManufacturerName"]+'</td>\
                                    <td class="madate">'+x[i]["DateManufactured"]+'</td>\
                                    <td class="exdate">'+x[i]["ExpiryDate"]+'</td>\
                                    <td class="stype">'+x[i]["StorageType"]+'</td>\
                                    <td class="stock">'+x[i]["RemainingStock"]+'</td>\
                                    <td class="price">'+x[i]["UnitCost"]+'</td>\
                                    <td>'+x[i]["Bcode"]+'</td>';

                                document.getElementById('tbd').appendChild(tr);
                             i++;
                            }
            }
        }
        };
    xhr.send();
}
function order()
{
    var pcode= document.getElementById("pcode2").value;
    var stock= document.getElementById("stock2").value;
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8070/worder";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
                    //var json = /*JSON.parse(xhr.responseText);
            if(xhr.responseText==="MANUFACTURER 1"){
                document.location.reload();
        }}
    };
    var data= JSON.stringify({"pcode": pcode, "stock": stock});
    xhr.send(data); 
}