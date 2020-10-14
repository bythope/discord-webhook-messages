const core = require('@actions/core')
const github = require('@actions/github')
const { WebhookClient, MessageEmbed } = require('discord.js')
const { extractDataFromWebhookUrl } = require('../helpers')

module.exports = ({ webhookUrl }) => {
    const { payload, eventName } = github.context

    // if (eventName !== 'push') {
    //     console.warn('push handler can be executed only on "push" action triggers')
    //     return Promise.resolve()
    // }

    const {commits, repository: {default_branch, language}, sender: {login, repos_url}} = payload

    const { id, token } = extractDataFromWebhookUrl(webhookUrl)
    const client = new WebhookClient(id, token)
    
    return client.send(JSON.stringify({commits, default_branch, language, login, repos_url})).then(result => {
        client.destroy()
        return ''
    }).catch(error => {
        client.destroy()
        throw error
    })
    console.log(JSON.stringify(payload), eventName)
    return Promise.resolve()
}


function createEmbed({ action, name, body, tag, url, draft, prerelease, published, branch }) {
    let embed = new MessageEmbed({ type: 'rich' })
    embed.setColor(prerelease ? 0xf66a0a : 0x28a745)
    embed.setTitle(`${prerelease ? 'Pre-release' : 'Release'}: ${tag} ${name} ${draft ? '(Draft)': ''}`)
    embed.setURL(url)
    embed.setDescription(`${trimBody(body)}`)
    embed.setFooter(`Branch: ${branch}`)
    embed.setTimestamp(new Date(published))
    return embed
}

function trimBody(body = '') {
    if (body.length < 2000) return body
    return `${body.substring(0, 2000)}...`
}