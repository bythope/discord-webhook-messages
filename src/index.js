const core = require('@actions/core')
const testHandler = require('./handlers/testHandler')
const { isWebhookUrl } = require('./helpers/validationHelper')
const HandlerExecutor = require('./HandlerExecutor')

const handlerExecutor = new HandlerExecutor()
handlerExecutor.add('test', testHandler)

const input = {
    webhookUrl: core.getInput('webhookUrl'),
    handler: core.getInput('handler')
}

if (!isWebhookUrl(input.webhookUrl)) {
    core.setFailed('The given webhook url is not valid. Please ensure you give a full discord webhook url')
}

handlerExecutor.execute(input.handler)