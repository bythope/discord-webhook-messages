const core = require('@actions/core')
const { isWebhookUrl } = require('./helpers')
const HandlerExecutor = require('./HandlerExecutor')
const releaseHandler = require('./handlers/releaseHandler')
const pushHandler = require('./handlers/pushHandler')



const input = {
    webhookUrl: core.getInput('webhookUrl'),
    handler: core.getInput('handler')
}

const handlerExecutor = new HandlerExecutor(input)
handlerExecutor.add('release', releaseHandler)
handlerExecutor.add('push', pushHandler)

if (!isWebhookUrl(input.webhookUrl)) {
    core.setFailed('The given webhook url is not valid. Please ensure you give a full discord webhook url')
}

handlerExecutor.execute(input.handler)