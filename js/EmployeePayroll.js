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


const getDeptHtml = (deptList) => {
    let deptHtml ='';
    for(const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
  let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
  if(!empPayrollData) return;
  const index = empPayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
}

const update = (node) => {
  let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
  if(!empPayrollData) return;
  localStorage.setItem('editEmp',JSON.stringify(empPayrollData))
  window.location.replace(site_properties.add_emp_payroll_page);
}
