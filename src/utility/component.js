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

    /**
     * Builds a string element.
     * @param {string} properties - String element properties.
     * @param {string} values - String element properties values.
     */
    template(properties, ...values) {
        let element = ``

        element += `<${properties[0]}`
        
        properties
            .slice(1, values.length)
            .map((property, key) => element += ` ${property}="${values[key + 1]}"`)

        if(properties[properties.length - 1] != "/") {
            if(values.length != 0) {
                element += `>${values[0]}</${properties[0]}>`
            }else {
                element += `></${properties[0]}>`
            }
            
        }else {
            element += ` />`
        }
        
        return element
    }
}
