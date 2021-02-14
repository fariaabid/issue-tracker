document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    console.log(getInputValue);
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    // const status = 'Open';//bug fixed
    let status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}
const setStatusClosed = id => { //bug fixed
    let confirmMessage = confirm("Are you confirm to close this issue?");
    if (confirmMessage) {
        const issues = JSON.parse(localStorage.getItem('issues'));
        const currentIssue = issues.find(issue => parseInt(issue.id) === parseInt(id));
        currentIssue.status = 'Closed';
        localStorage.setItem('issues', JSON.stringify(issues)); //bug fixed
        fetchIssues();
    }
}

const deleteIssue = id => {
    let confirmMessage = confirm("Are you confirm to delete this issue?");
    if (confirmMessage) {
        const issues = JSON.parse(localStorage.getItem('issues'));
        const remainingIssues = issues.filter(issue => parseInt(issue.id) !== parseInt(id));
        localStorage.setItem('issues', JSON.stringify(remainingIssues));
        fetchIssues();
    }
}

function countIssue() {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const openIssue = issues.filter(issue => issue.status === "Open");
    const closeIssue = issues.filter(issue => issue.status === "Closed");
    const totalIssue = openIssue.length + closeIssue.length;

    document.getElementById('open-issues').innerText = openIssue.length;
    document.getElementById('close-issues').innerText = closeIssue.length;
    document.getElementById('total-issues').innerText = totalIssue;
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    // console.log(issues.length);
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];
        const red = `background-color: #dd3232`;
        const green = `background-color:#03be03`;

        const lineThrough = `text-decoration:line-through`;
        const normal = `text-decoration:none`;

        issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-danger" style=${status === "Closed" ? green : red }> ${status} </span></p>
                                <h3 style=${status === "Closed" ? lineThrough : normal}> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
    countIssue();
}