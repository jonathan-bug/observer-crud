/** Class representing a behavior to be observed. */
class Behavior {
    constructor() {
        /**
         * Observers registered. @type {Array<Observer>}
         * @private
         */
        this.observers = []
        /**
         * State to be observed.
         * @type {any}
         * @public
         */
        this.state = null
    }

    /**
     * Registers an observer to the behavior.
     * @param {Observer} observer - The observer to be registered.
     */
    registerObserver(observer) {
        this.observers.push(observer)
    }

    /**
     * Removes an observer to the behavior.
     * @param {Observer} observer - The observer to be removed.
     */
    removeObserver(observer) {
        this.observers = this.observers.filter((item) => item != observer)
    }

    /**
     * Notifies all the observers to change their state as the behavior state.
     * @private
     */
    notifyObservers() {
        this.observers.forEach((item) => item.updateState(this.state))
    }

    /**
     * Updates the state of the behavior.
     * @param {any} state - The new state of the behavior.
     */
    changeState(state) {
        this.state = state
        this.notifyObservers()
    }
}

/** Class representing an observer. */
class Observer {
    /**
     * @param {Behavior} behavior - The behavior to be observed.
     */
    constructor(behavior) {
        // registers this observer
        behavior.registerObserver(this)
        /**
         * The state of the behavior.
         * @type {any} state
         * @public
         */
        this.state = null
    }

    /**
     * Updates the state in this observer as the behavior state.
     * @param {any} state - The new state of the behavior.
     */
    updateState(state) {
        this.state = state
    }
}
