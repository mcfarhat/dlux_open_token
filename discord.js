const { Webhook, MessageBuilder } = require('discord-webhook-node');
const config = require('./config');
const hook = new Webhook(config.hookurl);
const fetch = require('node-fetch')


exports.contentToDiscord = (author, permlink) => {
    let params = [author, permlink];
    let method = 'condenser_api.get_content'
    let body = {
        jsonrpc: "2.0",
        method,
        params,
        id: 1
    };
    fetch(config.clientURL, {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        .then(j => j.json())
        .then(result => {
            r = result.result
            const embed = new MessageBuilder()
                .setTitle('New DLUX content!')
                .setAuthor(author, 'https://cdn.discordapp.com/embed/avatars/0.png', `https://www.dlux.io/@${author}`)
                .setURL(`https://www.dlux.io/dlux/@${author}/${permlink}`)
                .addField(r.title, (JSON.parse(r.json_metadata).description || 'View this on dlux.io'), true)
                //.addField('Second field', 'this is not inline')
                .setColor('#00b0f4')
                //.setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
                //.setDescription('Oh look a description :)')
                //.setImage('https://cdn.discordapp.com/embed/avatars/0.png')
                //.setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
                .setTimestamp();

            hook.send(embed)
                .catch(e => console.log(e))
        }).catch(e => { console.log(e) })

}

//exports.contentToDiscord('disregardfiat', 'dlux-development-update-jan-15')

exports.postToDiscord = (msg) => {
    hook.send(msg)
}