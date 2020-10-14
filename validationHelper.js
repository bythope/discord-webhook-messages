const isWebhookUrl = url => {
    let regExp = new RegExp(/https:\/\/discord(app|)\.com\/api\/webhooks\/\d+?\/.+/i)
    return regExp.exec(url)
}

exports.isWebhookUrl = isWebhookUrl