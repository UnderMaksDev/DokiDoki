const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class UrbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'urban',
            aliases: ['ub'],
            group: 'utilisation',
            memberName: 'urban',
            description: 'Search Something on Urban',
            examples: ['{prifix}urban [text]'],
            guildOnly: true,
            args:[
                {
                    key: 'text',
                    prompt: 'what to search for',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }     
    async run(message,args) {
        const urban = require('relevant-urban','urban');
        if (!args.text) message.channel.send(`***Please specify some text!***`);
        urban(args.text)
          .then(res => {
            const embed = new RichEmbed()
            embed.setColor('RANDOM') 
            embed.setTitle(res.urbanURL) 
            embed.setDescription(`**Definition of ${res.word}:**\n${res.definition}`)

            var ex = res.example;

            if(ex.length > 1024){
              ex = ex.substring(0,1023);
              ex = ex.substring(0, ex.lastIndexOf('.')+1);
            }

            if(res.example){
              embed.addField('**Examples:**',ex)
            }
            embed.addField('Author', res.author, true) 
            embed.addField('Rating', `**\:thumbsup: \`Upvotes: ${res.thumbsUp}\` | :thumbsdown: \`Downvotes: ${res.thumbsDown}\`**`)
            
            var tag = "`" +  res.tags.join('`, `') + "`";

            if(res.tags.length > 0){
              embed.addField('Tags', tag, true)
            }
          return message.channel.send(embed);
          })
          .catch(e => { 
            return message.channel.send('***Sorry, that word was not found!***');
          });

        
          
      }
};