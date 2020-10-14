const core = require('@actions/core')

class HandlerExecutor {

    constructor() {
        this.handlers = {}
    }

    add(key, handler) {
        if (typeof this.handlers[key] === 'function') {
            console.error(`Handler ${key} already exists!`)
        }
        if (typeof handler !== 'function') {
            console.error(`Handler ${key} can not be added. handler must be a function`)
        }
        this.handlers[key] = handler
    }

    execute(key) {
        if (typeof this.handlers[key] !== 'function') {
            core.setFailed(`Handler of type ${key} is not supported, available handlers: ${Object.keys(this.handlers).join(', ')}`)
        }
        const promise = this.handlers[key]()
        if (typeof promise.then !== 'function') {
            console.error(`Handler ${key} must return promise!`)
            return
        }

        promise.then(result => {
            core.setOutput(result, JSON.stringify(result))
        }).catch(error => {
            core.setFailed(`Handler ${key} failed. Reason: ${error.message}`)
            console.error(error)
        })
    }

}

module.exports = HandlerExecutor