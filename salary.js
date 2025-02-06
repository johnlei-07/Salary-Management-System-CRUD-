
// to keep salary computation data
var salary_computation = [];
//searhing the name to see the employees salary computation
$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
//for submitting employee's data
$("#submitData").click(function(){
   //para makuha yung input value
    var empName = $("#empName").val();
    var perHour = $("#perHour").val();
    var workingHour = $("#workingHour").val();
    var perOT = $("#perOT").val();
    var otHour = $("#otHour").val();
    var attend =$("#attend").val();
    var tax = "15%";
    var deduction = 0.15 ;

    // Calculate salary for the day and month
    var salaryDay = ((( parseFloat(perHour) * parseFloat(workingHour)) 
                    + (parseFloat(perOT) * parseFloat(otHour) )) * parseFloat(deduction) );
    var salaryMonth = ((( parseFloat(perHour) * parseFloat(workingHour)) 
        + (parseFloat(perOT) * parseFloat(otHour) )) - salaryDay ) * parseFloat(attend);
    
       // if condition for no input
        if (empName == ""){
            alert("PLASE INPUT YOUR NAME CLICK EDIT");
        }else if (perHour ==""){
            alert("PLEASE INPUT YOUR PER HOUR CLICK EDIT");
        }else if (workingHour ==""){
            alert("PLEASE INPUT YOUR WORKING HOURS CLICK EDIT");
        }else if (perOT == ""){
            alert("PLASE INPUT YOUR PER OVERTIME CLICK EDIT");
        }else if (otHour == ""){
            alert("PLEASE INPUT YOUR TOTAL MONTH OVERTIME HOURS CLICK EDIT");
        }else if (attend == ""){
            alert("PLASE INPUT YOUR ATTENDANCE CLICK EDIT");
        }
    // Create an object to store employee salary information
    var arrSalary ={
        empName: empName, // Employee name
        perHour: perHour,  // Payment per hour
        workingHour: workingHour,  // Total working hours
        perOT: perOT,   // Overtime payment per hour
        otHour: otHour,  // Total overtime hours
        tax: tax,   // Tax percentage (15%)
        deduction: deduction, // Deduction percentage for tax
        attend:attend,  //Total Attendance information
        salaryMonth: salaryMonth // Calculated monthly salary   
        
    };
     // Add the salary information to the array
    salary_computation.push(arrSalary);
    // Update the displayed salary table
    showSalary();

     // Clear input fields after submission
    clearFields();
});
// Function to display the salary information in the HTML table
function showSalary(){
    var tb_myTable = $("#myTable");
    tb_myTable.empty();
     // Loop through the salary_computation array 
    for (var i = 0; i < salary_computation.length; i++) {
        var info = salary_computation[i];
        var tbRow = `<tr>
      
        <td>${info.empName}
        </td><td>${info.perHour}</td><td>${info.workingHour}</td>
        <td>${info.perOT}</td><td>${info.otHour}</td>
        <td>${info.tax}</td><td>${info.salaryMonth}</td>
        <td><button type="button" class="btn btn-primary" onclick="editRecord(${i})">Edit</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteRecord(${i})">Delete</button></td>
        </tr>`;
       $('#myTable').append(tbRow);//same as push
    }

}

function editRecord(index){
    var info = salary_computation[index];
     // populate the fields based on salary_computation values.
     //this is the info of the salary computation of the employees

     $("#empName").val(info.empName);
     $("#perHour").val(info.perHour);
     $("#workingHour").val(info.workingHour);
     $("#perOT").val(info.perOT);
     $("#otHour").val(info.otHour);
     $("#tax").val(info.tax);
     $("#attend").val(info.attend);

      // Remove the edited record from the salary_computation array
      //Maalis sya sa table
     salary_computation.splice(index, 1);
      // Updated the displayed salary table
      showSalary();
    
}
// Function to delete a salary record 
function deleteRecord(index){
     // Remove the record from the salary_computation array
     //splice = Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements. 
     //this is similar to the other array functions we discussed during prelims pop/unshift
     // pop = remove last element unshift = insert first element
    salary_computation.splice(index, 1);
   

    showSalary();
}
// Function to clear all input fields in HTML
function clearFields(){
    // Clear All Input Fields in HTML
    $("#empName").val("");
    $("#perHour").val("");
    $("#workingHour").val("");
    $("#perOT").val("");
    $("#otHour").val("");
    $("#tax").val("");
    $("#attend").val("");

}
    
