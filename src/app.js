/** Class representing an html component. */
class Component extends Observer {
    constructor(behavior) {
        super(behavior)
        /**
         * Callback to be runned when the state changes.
         * @type {function}
         */
        this.callback = null
    }
    
    /**
     * Updates the state in this observer as the behavior state and calls the callback with the new state.
     * @param {any} state - The new state of the behavior.
     */
    updateState(state) {
        super.updateState(state)

        if(this.callback) {
            this.callback(state)
        }
    }

    /**
     * Registers the callback to be runned every time that the state changes.
     * @param {function} callback - Function to be runned every time that the state changes.
     */
    render(callback) {
        this.callback = callback
    }
}

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
