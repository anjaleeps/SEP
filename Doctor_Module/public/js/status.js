let statusLabels = document.querySelectorAll('.statusLabel')
console.log(statusLabels.length)
for (let i=0; i< statusLabels.length; i++){
    statusLabels[i].addEventListener('click', changeStatus)
}

function changeStatus(e){
    e.preventDefault()
    alert(e.target.textContent)
}