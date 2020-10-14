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
    const data = {
        action, name, body, tag: tag_name, url: html_url, draft, prerelease, branch: target_commitish
    }

    const { id, token } = extractDataFromWebhookUrl(webhookUrl)
    const client = new WebhookClient(id, token)
    
    let embed = createEmbed(data)

    return client.send(embed).then(result => {
        client.destroy()
        return data
    })
}

function createEmbed({ action, name, body, tag, url, draft, prerelease, branch }) {
    let embed = new MessageEmbed()
    embed.setColor(prerelease ? 0xf66a0a : 0x28a745)
    embed.setDescription(`${draft ? 'Draft release\n': ''}Branch: ${branch}\n${body}`)
    embed.setTitle(`${prerelease ? 'Pre-release:' : 'Release'}: ${tag} ${name} ${action}`)
    embed.setURL(url)
    embed.setFooter(`Tag: ${tag}`)
    return embed
}