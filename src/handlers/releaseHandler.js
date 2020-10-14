const github = require('@actions/github')
module.exports = () => {

    const { payload: { action }, eventName } = github.context
    console.log(`${eventName} :: ${action}`)
    return Promise.resolve()
}