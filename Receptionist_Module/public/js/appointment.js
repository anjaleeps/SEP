const nextButton = document.querySelector('#nextButton')
const cancelButton = document.querySelector('#cancelButton')
const dataButton = document.querySelector('#dataButton')
const inputDoctorName = document.querySelector('#inputDoctorName')
const inputDoctorType = document.querySelector('#inputDoctorType')
const inputSession = document.querySelector('#inputSession')
const inputDate = document.querySelector('#inputDate')
const sessionContent = document.querySelector('#sessionContent')

let formStatus = 0
let handlers = [showDoctors, showSessions, schedule]

nextButton.addEventListener('click', showDoctors)
cancelButton.addEventListener('click', cancel)
dataButton.addEventListener('click', showSessionInfo)

async function showDoctors(e) {
    e.preventDefault()
    let doctorType = inputDoctorType.value
    if (formStatus === 0 && doctorType != 0) {
        try {
            let data = await getDoctorList(doctorType)
            let doctorList = data.doctors
            console.log(doctorList)
            addDoctors(doctorList)
            formStatus = 1
            addNextHandler()
        }
        catch (err) {
            console.log(err)
        }
    }
}

async function getDoctorList(doctorType) {
    try {
        let response = await fetch(`/doctor?doctorTypeId=${doctorType}`, { method: 'GET' })
        let data = await response.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

function addDoctors(doctorList) {
    doctorList.forEach(doctor => {
        let newOption = document.createElement('option')
        let text = document.createTextNode(doctor.doctor_name)
        newOption.appendChild(text)
        newOption.value = doctor.doctor_id
        inputDoctorName.appendChild(newOption)
    })
    inputDoctorName.parentElement.classList.remove('d-none')
    cancelButton.classList.remove('d-none')
    inputDoctorType.disabled = true
}

async function showSessions(e) {
    e.preventDefault()
    let doctorId = inputDoctorName.value
    if (formStatus === 1 && doctorId != 0) {
        try {
            let data = await getSessionList(doctorId)
            let sessionList = data.sessions
            console.log(sessionList)
            addSessions(sessionList)
            formStatus = 2
            addNextHandler()
        }
        catch (err) {
            console.log(err)
        }
    }
}

async function getSessionList(doctorId) {
    try {
        let response = await fetch(`/session?doctorId=${doctorId}`, { method: 'GET' })
        let data = await response.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

function addSessions(sessionList) {
    sessionList.forEach(session => {
        inputSession.innerHTML += `<div class="form-check"> 
                <input class="form-check-input" type="radio" name="gridRadios" value="${session.session_id}"> 
                <label class="form-check-label" for="gridRadios1"> 
                    ${session.day} from ${session.start_time} to ${session.end_time} 
                </label> 
            </div>`
    })
    inputSession.parentElement.classList.remove('d-none')
    inputDate.parentElement.classList.remove('d-none')
    dataButton.parentElement.classList.remove('d-none')
    inputDoctorName.disabled = true
}

async function showSessionInfo(e) {
    e.preventDefault()
    let checked = document.querySelector('input[type="radio"]:checked')
    let date = inputDate.value
    if (checked && inputDate) {
        let sessionId = checked.value
        console.log(sessionId)
        console.log(date)
        let data = await getSessionInfo(date, sessionId)
        let info = data.appointment
        addSessionInfo(info)
    }
}

async function getSessionInfo(date, sessionId) {
    try {
        let response = await fetch(`/session/${sessionId}?date=${date}`, { method: 'GET' })
        let data = await response.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

function addSessionInfo(data) {
    if (data) {
        sessionContent.innerHTML = `<ul class='list-group'> 
            <li class='list-group-item'>
                <div class="row">
                    <div class="col-sm-3">Date:</div>
                    <div class="col-sm-9"> ${data.date}</div>
                </div>
            </li>
            <li class='list-group-item'>
                <div class="row">
                    <div class="col-sm-3">Availabe number:</div>
                    <div class="col-sm-9"> ${data.available_number}</div>
                </div>
            </li>
            <li class='list-group-item'>
                <div class="row">
                    <div class="col-sm-3">Apointment time:</div>
                    <div class="col-sm-9"> ${data.appointment_time}</div>
                </div>
            </li>
        </ul>`
    }
    else {
        sessionContent.innerHTML= `<ul class='list-group'> 
            <li class='list-group-item'>No appointments scheduled yet</li>
        </ul>`
    }
    sessionContent.parentElement.classList.remove('d-none')
}

async function schedule(e){
    e.preventDefault()
    let checked = document.querySelector('input[type="radio"]:checked')
    let date = inputDate.value

    if (formStatus === 2 && checked && date) {
        let appointment = {
            appointment: {
                sessionId: checked.value,
                date: date,   
                patientId: document.querySelector('#staticPatientId').value
            }
        }
        try {
            let data = await postAppointment(appointment)
            let appointmentId = data.appointmentId
            console.log(appointmentId)
            window.location.pathname = `/appointment/${appointmentId}`
        }
        catch (err) {
            console.log(err)
        }
    }
}

async function  postAppointment(appointment){
    try{
        let response = await fetch('/appointment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
        let data = await response.json()
        return data
    }
    catch(err){
        throw err
    }
}

function addNextHandler(e) {
    nextButton.removeEventListener('click', handlers[formStatus - 1])
    nextButton.addEventListener('click', handlers[formStatus])
}

function cancel(e) {
    e.preventDefault()
    location.reload()
}