statusArr = ['missed', 'completed', 'created']
let statusLabels = document.querySelectorAll('.statusLabel')

for (let i = 0; i < statusLabels.length; i++) {
    statusLabels[i].addEventListener('click', changeStatus)
}

async function changeStatus(e) {
    e.preventDefault()
    let status = e.target.textContent
    if (statusArr.includes(status)) {
        let appointmentId = document.querySelector('#appId').value
        let appointment = {
            appointment: {
                appointmentId: appointmentId,
                status: status
            }
        }
        try{
            await postStatus(appointmentId, appointment)
            window.location.reload(true)
        }
        catch(err){
            console.log(err)
        }
       
    }
}

async function postStatus(appointmentId, appointment){
    try{
        let response = await fetch(`/appointment/${appointmentId}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
    }
    catch(err){
        throw err
    }
   
}