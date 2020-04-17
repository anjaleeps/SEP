let submitButton = document.querySelector("#submitButton").addEventListener('click', registerPatient)

async function registerPatient(e) {
    e.preventDefault()
    let formData = {
        firstName: document.querySelector('#inputFirstName').value,
        lastName: document.querySelector('#inputLastName').value,
        phoneNumber: document.querySelector('#inputPhoneNumber').value,
        birthDate: document.querySelector('#inputBirthDate').value,
        email: document.querySelector('#inputEmail').value,
        houseNumber: document.querySelector('#inputHouseNumber').value,
        street: document.querySelector('#inputStreet').value,
        city: document.querySelector('#inputCity').value
    }

    try {
        let response = await sendPatientData(formData)
        if (response.ok) {
            let data = await response.json()

            let patientId = data.patientId
            window.location.pathname = '/patient/' + patientId

        }
    }
    catch (err) {
        console.log(err)
    }

}

async function sendPatientData(formData) {
    try {
        let response = await fetch('/patient/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        return response
    }
    catch (err) {
        throw err
    }
}