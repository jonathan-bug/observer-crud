// values to be observed.
let records = [
    {
        id: 0,
        value1: 1,
        value2: 2
    },
    {
        id: 1,
        value1: 2,
        value2: 2
    }
]

let recordsCount = records.length

const manager = new Behavior() // component manager. (Triggers the component changes).
const component = new Component(manager) // component

// jobs to modify the state
function clear() {
    $("input").val("")
}

function deleteRecord(id) {
    manager.changeState(manager.state.filter((item) => item.id != id))
}

function modifyRecord(id) {
    let record = manager.state.filter((item) => item.id == id)[0]

    $("input[name='id']").val(record.id)
    $("input[name='value1']").val(record.value1)
    $("input[name='value2']").val(record.value2)
}

function storeRecord() {
    if($("input[name='id']").val() == "") {
        let record = {
            id: recordsCount,
            value1: $("input[name='value1']").val(),
            value2: $("input[name='value2']").val(),
        }

        recordsCount += 1
        
        manager.changeState([...manager.state, record])
    }else {
        manager.changeState(manager.state.map((item) => {
            if(item.id == $("input[name='id']").val()) {
                item.value1 = $("input[name='value1']").val()
                item.value2 = $("input[name='value2']").val()

                return item
            }else {
                return item
            }
        }))
    }
    
    clear()
}

// register the callback
component.render((state) => {
    $("table").find("tbody").children().remove()
    
    state.forEach((item) => {
        let row = ""
        row += `<tr>`
        row += `<td>${item.id}</td>`
        row += `<td>${item.value1}</td>`
        row += `<td>${item.value2}</td>`
        row += `<td class="d-flex justify-content-end gap-2">`
        row += `<button class="btn btn-warning" onclick="modifyRecord(${item.id})">Modificar</button>`
        row += `<button class="btn btn-danger" onclick="deleteRecord(${item.id})">Borrar</button>`
        row += `</td>`
        row += `</tr>`

        $("table").find("tbody").append(row)
    })
})

$(() => {
    // when the DOM is loaded change the state
    manager.changeState(records)

    $(".btn-primary").click(() => storeRecord())
})
