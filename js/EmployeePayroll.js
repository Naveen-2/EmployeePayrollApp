let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : []; 
}

createInnerHtml = () => {
    const headerHtml = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    `;
    let innerHtml = `${headerHtml}`;
   
    for(const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" src="${empPayrollData._profileImage}" alt="profile_img-1"></td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>
                    ${getDeptHtml(empPayrollData._department)}
                    </td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img src="..\\assets\\icons/delete-black-18dp.svg" alt="delete" id="${empPayrollData.id}" onclick="remove(this)">
                    <img src="..\\assets\\icons/create-black-18dp.svg" alt="edit" id="${empPayrollData.id}" onclick="update(this)">
                </td>
            </tr>
        `;
    }
    
    document.querySelector("#table-display").innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
          "_name": "Naveen",
          "_gender": "Male",
          "_department": [
            "Finance",
            "Engineering"
          ],
          "_salary": "40000",
          "_startDate": "2 Nov 2020",
          "_notes": "",
          "_id": new Date().getTime(),
          "_profileImage": "../assets/profile-images/Ellipse -2.png"
        },
        {
          "_name": "Kumar",
          "_gender": "Male",
          "_department": [
            "HR"
          ],
          "_salary": "70000",
          "_startDate": "1 July 2019",
          "_notes": "",
          "_id": new Date().getTime(),
          "_profileImage": "../assets/profile-images/Ellipse -3.png"
        },
        {
          "_name": "Raji",
          "_gender": "Female",
          "_department": [
            "HR",
            "Testing"
          ],
          "_salary": "20000",
          "_startDate": "23 Oct 2020",
          "_notes": "",
          "_id": new Date().getTime(),
          "_profileImage": "../assets/profile-images/Ellipse -4.png"
        },
        {
          "_name": "test",
          "_gender": "Female",
          "_department": [
            "Development"
          ],
          "_salary": "30000",
          "_startDate": "17 Jan 2016",
          "_notes": "",
          "_id": new Date().getTime(),
          "_profileImage": "../assets/profile-images/Ellipse 1.png"
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml ='';
    for(const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}