let addButton = document.querySelector('#addButton')
let selectedDrugs = document.querySelector('#selectedDrugs')
let drugSelector = document.querySelector("#cprescription")
let submitButton = document.querySelector('#')
let temp = document.querySelector('#temp')
addButton.addEventListener('click', addDrug)

let drugs = []

function addDrug(e) {
    e.preventDefault()
    let selectedDrug = drugSelector
    if (!(drugs.includes(selectedDrug.value))){
        drugs.push(selectedDrug.value)
        console.log(drugs)
        console.log(selectedDrug.options[selectedDrug.selectedIndex].text)
    
        let clone = temp.content.cloneNode(true)
        let text = clone.querySelector('strong')
        text.textContent = selectedDrug.options[selectedDrug.selectedIndex].text
        let button = clone.querySelector('button')
        button.id= selectedDrug.value+"Drug"
        button.value= selectedDrug.value
        button.addEventListener('click', close)
        selectedDrugs.appendChild(clone)
    }
   
}

function close(e){
    let drugId = event.target.value
    drugs.splice(drugs.indexOf(drugId), 1)
    console.log(drugs)
    let removable = event.target.parentNode.parentNode
    removable.parentNode.removeChild(removable)
}

