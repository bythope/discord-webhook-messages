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
    const data = {commits, default_branch, language, login, repos_url}

    const { id, token } = extractDataFromWebhookUrl(webhookUrl)
    const client = new WebhookClient(id, token)
    
    return client.send(createEmbed(data)).then(result => {
        client.destroy()
        return ''
    }).catch(error => {
        client.destroy()
        throw error
    })
    console.log(JSON.stringify(payload), eventName)
    return Promise.resolve()
}


function createEmbed({ commits, default_branch, language, login, repos_url}) {
    let embed = new MessageEmbed({ type: 'rich' })
    let description = 'Writen in: ' + language + '\n'
        + 'Following commits were added: \n'
    for(let commit of commits){
        description += `\`${commit.id.substring(0, 6)}\` - ` + commit.message + '\n'
    }
    embed.setColor(0x32ecab)
    embed.setTitle(login + ' pushed some changes')
    embed.setURL(repos_url)
    embed.setDescription(description)
    embed.setFooter(`Default branch: ${default_branch}`)
    embed.setTimestamp(new Date(commits[commits.length-1].timestamp))
    return embed
}

function trimBody(body = '') {
    if (body.length < 2000) return body
    return `${body.substring(0, 2000)}...`
}