const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')
const { isWebhookUrl } = require('./validationHelper')

const input = {
    webhookUrl: core.getInput('webhookUrl')
}
const { payload } = github.context

if (!isWebhookUrl(input.webhookUrl)) {
    core.setFailed('The given webhook url is not valid. Please ensure you give a full discord webhook url')
}


axios.post(input.webhookUrl, { content: '', embeds: [ {
    title: 'raw payload',
    description: JSON.stringify(payload)
}] }).catch(error => {
    console.error(error)
})