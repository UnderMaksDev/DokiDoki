const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TestHelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'testhelp',
            group: 'group4',
            memberName: 'testhelp',
            description: 'Shows commands of the Bot',
            args: [
                    {
                        key: 'command',
                        prompt: 'Which command would you like to view the help for?',
                        type: 'string',
                        default: ''
                    }
            ]
        });
    }
    async run(msg, args) {
        const groups = this.client.registry.groups;
        const commands = this.client.registry.findCommands();

        const grp1c = commands.findAll('groupID','group1');
        var grp1 = "";

        for(var i = 0; i < grp1c.length; i++){
            grp1=grp1+"`"+grp1c[i].name+"`";
            if(i+1 < grp1c.length){
                grp1=grp1+", ";
            }
        }


        const grp2c = commands.findAll('groupID','group2');
        var grp2 = "";
        for(var i = 0; i < grp2c.length; i++){
            grp2=grp2+"`"+grp2c[i].name+"`";
            if(i+1 < grp2c.length){
                grp2=grp2+", ";
            }
        }
/*
        const grp3c = commands.findAll('groupID','group3');
        var grp3 = "";
        for(var i = 0; i < grp3c.length; i++){
            grp3=grp3+"`"+grp3c[i].name+"`";
            if(i+1 < grp3c.length){
                grp3=grp3+", ";
            }
        }

        const grp4c = commands.findAll('groupID','group4');
        var grp4 = "";
        for(var i = 0; i < grp4c.length; i++){
            grp4=grp4+"`"+grp4c[i].name+"`";
            if(i+1 < grp4c.length){
                grp4=grp4+", ";
            }
        }

        const grp5c = commands.findAll('groupID','group5');
        var grp5 = "";
        for(var i = 0; i < grp5c.length; i++){
            grp5=grp5+"`"+grp5c[i].name+"`";
            if(i+1 < grp5c.length){
                grp5=grp5+", ";
            }
        }
*/
        const embed = new RichEmbed()
                .setTitle('DokiDoki Commands')
                .addField(groups.find('id','group1').name+"",grp1)
                .addField(groups.find('id','group2').name+"",grp2)
            //    .addField(groups.find('id','group3').name,grp3)
            //    .addField(groups.find('id','group4').name,grp4)
            //    .addField(groups.find('id','group5').name,grp5)
            .setColor(0x23ff12)
        return msg.embed(embed);
    }

};
