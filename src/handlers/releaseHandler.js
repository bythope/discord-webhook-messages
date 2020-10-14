const github = require('@actions/github')
const { WebhookClient } = require('discord.js')
const { extractDataFromWebhookUrl } = require('../helpers')

module.exports = ({ webhookUrl }) => {
    const { payload, eventName } = github.context

    if (eventName !== 'release') {
        console.warn('release handler can be executed only on "release" action triggers')
        return Promise.resolve()
    }
    const { action, release: { body, draft, html_url, name, prerelease, published_at, tag_name, target_commitish, } } = payload
    const object = {
        action, name, body, tag: tag_name, url: html_url, draft, prerelease, branch: target_commitish
    }

    const { id, token } = extractDataFromWebhookUrl(webhookUrl)
    const client = new WebhookClient(id, token)
        
    return client.send(JSON.stringify(object))
}