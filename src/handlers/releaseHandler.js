const github = require('@actions/github')
module.exports = () => {

    const context = github.context
    console.log(JSON.stringify(context))
    return Promise.resolve()
}