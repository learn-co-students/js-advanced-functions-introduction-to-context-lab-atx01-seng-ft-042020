// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map((employee) => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push( {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push( {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, dateStamp) {
    const timeInEvent = employee.timeInEvents.find((event) => event.date == dateStamp.split(' ')[0])
    const timeOutEvent = employee.timeOutEvents.find((event) => event.date == dateStamp.split(' ')[0])
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateStamp) {
    return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce(function(wages, timeInEvent) {
        let dateStamp = timeInEvent.date + ' ' + timeInEvent.hour
        return wages + wagesEarnedOnDate(employee, dateStamp)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName == firstName)
}

function calculatePayroll(employees) {
    return employees.reduce((payroll, employee) => payroll + allWagesFor(employee), 0)
}