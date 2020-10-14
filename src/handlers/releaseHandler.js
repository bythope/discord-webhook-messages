const github = require('@actions/github')
module.exports = () => {
    const { payload, eventName } = github.context

    if (eventName !== 'release') {
        console.warn('release handler can be executed only on release action triggers')
        return Promise.resolve()
    }
    const { action, release: { body, draft, html_url, name, prerelease, published_at, tag_name, target_commitish, } } = payload
    const object = {
        name, body, tag: tag_name, url: html_url, draft, prerelease, branch: target_commitish
    }
    
    console.log(object)
    return Promise.resolve()
}