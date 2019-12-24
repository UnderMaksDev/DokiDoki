const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const neko = require("nekos.life");
const superagent = require("superagent");
const send = require("quick.hook");

module.exports = class BakaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'baka',
            aliases: [],
            group: 'emo',
            memberName: 'baka',
            description: 'Mentions a User who is a Baka',
			args: [
				{
					key: 'member',
					prompt: 'Who is a Baka?',
					type: 'member',
                    default: ''
				},
                {
                    key: 'stuff',
                    prompt: 'What would u like to say?',
                    type: 'string',
                    default: '',
                    validate: stuff => {
                        if (stuff.length < 201) return true;
                        return 'Message Content is above 200 characters';
                    }
                }
			]
        });
    }
async run(message, args, neko) {
        superagent.get('https://nekos.life/api/v2/img/baka')
        .then(body => {
            body = body.body
        const baka = new RichEmbed()
            if(message.author.id == args.member.id){
                baka.setAuthor(`${message.author.username} thinks they are a baka!`)
            }else if(!args.member){
                baka.setAuthor(`Someone is being a Baka!`)
            } else {
                baka.setAuthor(`${message.author.username} thinks ${args.member.user.username} is a baka!`)
            }
                    
            baka.setDescription(args.stuff)
            baka.setImage(body.url)
            baka.setColor(0x23ff12)
            baka.setFooter(`Powered by Nekos.Life`)
        message.channel.send(baka)
        })
        .catch(err => {
            message.channel.send("The gif-API is currently down, plese try again later \n")
        })
    }	
};