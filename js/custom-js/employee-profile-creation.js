const employeeProfileCreationForm = document.querySelector('#employeeProfileCreation');
const userType = document.querySelector("#userType");
const hngId = document.querySelector("#hngId");
const userInformation = JSON.parse(localStorage.getItem("user"));

userType.addEventListener('click', (e) => {
    for ( var i = 0, len = userType.options.length; i < len; i++ ) {
        opt = userType.options[i];
        if ( opt.selected === true ) {
            if(opt.value == "hng") {
                hngId.removeAttribute('disabled');
            } else {
                hngId.setAttribute('disabled', true);
            }
        }
    }
})

const employeeAvailability = document.querySelector('#employeeAvailability');
function getAvailability() {
    let opt;
    for ( var i = 0, len = employeeAvailability.options.length; i < len; i++ ) {
        opt = employeeAvailability.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt.innerText;
}
// employeeAvailability.addEventListener('click', (e) => {
//    console.log(getAvailability()) 
// })

const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));

employeeProfileCreationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const employeeImage = document.querySelector('#employeeImg').value,
        employeeFirstName = document.querySelector("#employeeFirstName").value,
        employeeLastName = document.querySelector('#employeeLastName').value,
        userTypeName = document.querySelector('#userType').value,
        hngIdValue = document.querySelector("#hngId").value,
        employeeAge = document.querySelector('#employeeAge').value,
        employeeAvailability = getAvailability(),
        dob = document.querySelector('#employeeDOB').value,
        employeeCv = document.querySelector("#employeeCV").value,
        userPhoneNumber = document.querySelector("#employeePhone").value,
        userId = userInfo.userId;

        console.log(employeeImage)

    fetch('http://127.0.0.1:3000/v1/employee/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "User-Agent": "Developers Lancers",
            Authorization: `Bearer ${userInformation.token}`,
        },
        body: JSON.stringify({
            "firstName": employeeFirstName,
            "lastName": employeeLastName,
            "userType": userTypeName,
            "hngId": hngIdValue,
            "age": employeeAge,
            "phoneNo": userPhoneNumber,
            "pictureUrl": employeeImage,
            "avaliability": employeeAvailability,
            "dateOfBirth": dob,
            "employeeCv": employeeCv,
            "userId": userId
        })
    })
        .then ( res => res.json() )
        .then( data => console.log(data) );
})