function createEmployeeRecord(arr){
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
};

function createEmployeeRecords(arr){
    let empRecArr = [];

    empRecArr = arr.map(e => createEmployeeRecord(e));

    return empRecArr;
};

function createTimeInEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(' ');
    
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    };

    employeeRecord.timeInEvents.push(timeInEvent);

    return employeeRecord
};

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(' ');

    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    };

    employeeRecord.timeOutEvents.push(timeOutEvent);

    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const timeIn = employeeRecord.timeInEvents.filter(obj => {return obj.date === dateStamp});
    const timeOut = employeeRecord.timeOutEvents.filter(obj => {return obj.date === dateStamp});

    return (timeOut[0].hour - timeIn[0].hour)/100;
};

function wagesEarnedOnDate(employeeRecord, dateStamp){
    const rate = employeeRecord.payPerHour;
    const hours = hoursWorkedOnDate(employeeRecord, dateStamp);

    return rate*hours;
};

function allWagesFor(employeeRecord){
    let totalArr = [];
    let total = 0;

    totalArr = employeeRecord.timeInEvents.map(e => wagesEarnedOnDate(employeeRecord, e.date));
    totalArr.forEach(e => total += e);

    return total;
};

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.filter(e => e.firstName)[0];
};

function calculatePayroll(arr){
    let allEmployeeWages = [];
    let total = 0;

    allEmployeeWages = arr.map(employee => allWagesFor(employee));
    allEmployeeWages.forEach(e => total += e);

    return total;
};
