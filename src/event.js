/**
 * @since 15-09-02 10:25
 * @author vivaxy
 */
'use strict';
class Event {
    constructor() {
        this.events = {};
    }

    /**
     *
     * @param event
     * @param callback
     * @returns {Event}
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
    }

    /**
     *
     * @param event
     * @returns {Event}
     */
    emit(event) {
        let callbacks = this.events[event],
            _this = this,
            _arguments = arguments;
        if (callbacks) {
            callbacks.forEach(callback => {
                callback.apply(_this, Array.prototype.slice.call(_arguments, 1))
            });
        }
        return this;
    }

    /**
     *
     * @param event
     * @param callback
     * @returns {Event}
     */
    off(event, callback) {
        if (this.events[event] && callback) {
            this.events[event].splice(this.events[event].indexOf(callback), 1);
        } else {
            this.events[event] = [];
        }
        return this;
    }

}
