const isWebhookUrl = url => {
    let regExp = new RegExp(/https:\/\/discord(app|)\.com\/api\/webhooks\/\d+?\/.+/i)
    return regExp.exec(url)
}

const extractDataFromWebhookUrl = (url = "") => {
    if (isWebhookUrl(url)) {
        let regExp = new RegExp(/discordapp.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/)
        let [ _, id, token ] = url.match(regExp)
        return { id, token }
    } else {
        return null
    }
}

exports.isWebhookUrl = isWebhookUrl
exports.extractDataFromWebhookUrl = extractDataFromWebhookUrl