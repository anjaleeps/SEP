let submitButton = document.querySelector("#submitButton").addEventListener('click', registerPatient)

async function registerPatient(e) {
    e.preventDefault()
    let formData = {
        firstName: document.querySelector('#cfirstname').value,
        lastName: document.querySelector('#clastname').value,
        phoneNumber: document.querySelector('#cphonenumber').value,
        birthDate: document.querySelector('#cbirthdate').value,
        email: document.querySelector('#cemail').value,
        houseNumber: document.querySelector('#chousenumber').value,
        street: document.querySelector('#cstreet').value,
        city: document.querySelector('#ccity').value
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