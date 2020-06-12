// Your code here

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push(createTimeEvent('TimeIn', dateStamp))
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push(createTimeEvent('TimeOut', dateStamp))
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(time => time.date == date)
    const timeOut = employee.timeOutEvents.find(time => time.date == date)
    return (timeOut.hour - timeIn.hour) / 100
}
function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    const totalWages = datesWorked.reduce((wage, date) => wage + wagesEarnedOnDate(employee, date), 0)
    return totalWages
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
    return employees.reduce((payroll, employee) => payroll + allWagesFor(employee), 0)
}










function createTimeEvent(type, dateStamp) {
    const parsedDate = parseDate(dateStamp)
    return {
        type: type,
        hour: parsedDate.hour,
        date: parsedDate.date
    }
}

function parseDate(dateStamp) {
    // "YYYY-MM-DD HHMM"
    const dateArr = dateStamp.split(' ')
    const date = dateArr[0]
    const hour = parseInt(dateArr[1])
    return {
        date,
        hour
    }
}
