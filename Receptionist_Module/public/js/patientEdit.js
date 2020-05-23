let submitButton = document.querySelector("#submitButton").addEventListener('click', registerPatient)

async function registerPatient(e) {
    e.preventDefault()
    let formData = {
        patientId: document.querySelector('#patientId').value,
        firstName: document.querySelector('#cfirstname').value,
        lastName: document.querySelector('#clastname').value,
        phoneNumber: document.querySelector('#cphonenumber').value,
        birthDate: document.querySelector('#cbirthdate').value,
        email: document.querySelector('#cemail').value,
        houseNumber: document.querySelector('#chousenumber').value,
        street: document.querySelector('#cstreet').value,
        city: document.querySelector('#ccity').value
    }
    console.log(formData)
    try {
        let response = await sendPatientData(formData)
        if (response.ok) {
            let patientId= formData.patientId
            window.location.pathname = '/patient/' + patientId
            return
        }
        let err= await response.json()
        console.log(err)
    }
    catch (err) {
        console.log(err)
    }

}

async function sendPatientData(formData) {
    try {
        let response = await fetch(`/patient/${formData.patientId}`, {
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