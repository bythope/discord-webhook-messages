const core = require('@actions/core')
const github = require('@actions/github')
const { WebhookClient, MessageEmbed } = require('discord.js')
const { extractDataFromWebhookUrl } = require('../helpers')

module.exports = ({ webhookUrl }) => {
    const { payload, eventName } = github.context

    if (eventName !== 'release') {
        console.warn('release handler can be executed only on "release" action triggers')
        return Promise.resolve()
    }
    const { action, release: { body, draft, html_url, name, prerelease, published_at, tag_name, target_commitish, } } = payload
    const data = { action, name, body, tag: tag_name, url: html_url, draft, prerelease, published: published_at, branch: target_commitish }

    const { id, token } = extractDataFromWebhookUrl(webhookUrl)
    const client = new WebhookClient(id, token)
    
    let embed = createEmbed(data)
    return client.send(embed).then(result => {
        client.destroy()
        return data
    }).catch(error => {
        client.destroy()
        throw error
    })
}


function createEmbed({ action, name, body, tag, url, draft, prerelease, published, branch }) {
    let embed = new MessageEmbed({ type: 'rich' })
    embed.setColor(prerelease ? 0xf66a0a : 0x28a745)
    embed.setTitle(`${prerelease ? 'Pre-release' : 'Release'}: ${tag} ${name} ${draft ? '(Draft)': ''}`)
    embed.setURL(url)
    embed.setDescription(`${trimBody(body)}\n[Read more](${url})`)
    embed.setFooter(`Branch: ${branch}`)
    embed.setTimestamp(new Date(published))
    return embed
}

function trimBody(body = '') {
    if (body.length < 2000) return body
    return `${body.substring(0, 2000)}...`
}