![GitHub](https://img.shields.io/github/license/bythope/discord-webhook-messages?style=for-the-badge)
![](https://img.shields.io/badge/-Github_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![GitHub tag](https://img.shields.io/github/v/tag/bythope/discord-webhook-messages?include_prereleases&style=for-the-badge)
[![Discord](https://img.shields.io/discord/669238716782346252?style=for-the-badge&logo=discord)](https://discord.gg/nRmqzq5)

The goal of this action is to produce helpful messages on your Discord server based on GitHub events.

### Supported events:

- [x] Release
- [ ] Pull Request
- [x] Push (branches / tags)
- [ ] Page build

## Getting Started:

### Inputs
---
#### `webhookUrl`
The webhook URL to use. This should be in a repository secret and the secret should be included here using `${{ secrets.DISCORD_WEBHOOK }}`. For security reasons it is not possible to default this to the secret name, so it must be supplied in every action invocation.

#### `handler`
Handler defines background logic of the action. Currently avaiable handlers:
 - `release`: Publishes message to your discord server when release is created.
 - `push`: Publishes message to your discord server when push action occurs.
---
### Example
#### Release Handler
```yaml
name: Discord Webhook Messages
on:
  release:
    types: [published]
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Discord Webhook
        uses: bythope/discord-webhook-messages@v1.1.0
        with:
          webhookUrl: ${{ secrets.DISCORD_WEBHOOK }}
          handler: 'release'
```
#### Push Handler
```yaml
name: Discord Webhook Messages
on:
  push:
    branches: 
      - '*'
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Discord Webhook
        uses: bythope/discord-webhook-messages@v1.1.0
        with:
          webhookUrl: ${{ secrets.DISCORD_WEBHOOK }}
          handler: 'push'
```

## Contributing

#### Resolve an issue
1. Read [CONTRIBUTING](CONTRIBUTING.md) guide
2. Make the changes
3. Read [Pull request](PULL_REQUEST_TEMPLATE.md) guide 

#### Create feature request
1. Create issue for an idea
2. Explain your needs
