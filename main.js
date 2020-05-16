const fs = require("fs");
const Discord = require("discord.js");
const {
  Client
} = require("discord.js");
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const Enmap = require("enmap");


//stores all  the logs
db_logs = new Enmap({
  name: "logs"
});
if (db_logs != undefined) {
  console.log("Loaded DB: logs");
}

//stores the message that needs to be reacted to with the creator
db_reactmsg = new Enmap({
  name: "reactmsg"
});
if (db_reactmsg != undefined) {
  console.log("Loaded DB: reactmsg");
}




//config section
const config = require("./config.json");
const prefix = (config.prefix);


//startup setup
client.on("ready", async () => {
  console.log("Bot Status: On");
});

//main command
client.on("message", async message => {
  //anti-bot
  if (message.author.bot) return;

  //check prefix
  if (!message.content.startsWith(prefix)) return;

  //command parse
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //logging stuff for console
  if (args[0] != undefined) {
    console.log("-> Command Ran: " + command + " / " + "Discord ID: " + message.author.id + " / " + "Arguments: " + args.join(' '));
  } else {
    console.log("-> Command Ran: " + command + " / " + "Discord ID: " + message.author.id);
  }

  switch (command) {
    //log channel command
    case 'logme': {
      if (message.member.hasPermission('ADMINISTRATOR')) {
        //Testing to see if the channel is being logged
        if (db_logs.get(message.channel.id) === undefined && db_reactmsg.get(message.channel.id) === undefined) {
          db_logs.set(message.channel.id, []);
          let embed = new Discord.MessageEmbed()
            .setAuthor('Channel Log', message.guild.iconURL())
            .setDescription(`Hi! I will keep a track of the channel.\nI will end the log when you react with ✅\n\nHave fun chatting!`);
          let reactmsg = await message.channel.send(embed);
          db_reactmsg.set(message.channel.id, [reactmsg.id, message.author.id]);
          reactmsg.react('✅');
        } else {
          let embed = new Discord.MessageEmbed()
            .setAuthor('Channel Log', message.guild.iconURL())
            .setDescription(`You already have a log in this channel. You can end it [here](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${db_reactmsg.get(message.channel.id)[0]})`);
          message.channel.send(embed);
        }
      } else {
        let embed = new Discord.MessageEmbed()
          .setAuthor('Channel Log', message.guild.iconURL())
          .setDescription(`You need **ADMIN** permission to do that!`);
        message.channel.send(embed);
      }
      break;
    }

    //if you mess up the command
    default:
      let embed = new Discord.MessageEmbed()
        .setAuthor('Server Commands', message.guild.iconURL())
        .setDescription(`Hey the command you wrote doesn't exist!\n\nTry typing **${prefix}logme** since it's the only command.`);
      message.channel.send(embed);
      break;
  }
});

client.on("message", async message => {
  if (db_logs.get(message.channel.id) !== undefined && db_reactmsg.get(message.channel.id) !== undefined) {
    db_logs.push(message.channel.id, `${message.author.tag}: ${message.content}`)
  }

});


client.on("messageReactionAdd", async (MessageReaction, User) => {
  if (!User.bot) {
    if (db_logs.get(MessageReaction.message.channel.id) !== undefined && db_reactmsg.get(MessageReaction.message.channel.id) !== undefined) {
      const msgdata = db_reactmsg.get(MessageReaction.message.channel.id);
      if (msgdata[0] === MessageReaction.message.id) {
        if (User.id === msgdata[1]) {
          MessageReaction.message.reactions.removeAll();
          const fs = require('fs');
          fs.writeFile(`./logs/${msgdata[0]}.log`, db_logs.get(MessageReaction.message.channel.id).join('\n'), function (err) {
            if (err) {
              return console.log(err);
            }
            db_logs.delete(MessageReaction.message.channel.id);
            db_reactmsg.delete(MessageReaction.message.channel.id);
            let embed = new Discord.MessageEmbed()
              .setAuthor('Channel Log', MessageReaction.message.guild.iconURL())
              .setDescription(`The log has been saved!\n**File Path:** /logs/${msgdata[0]}.log\n\nHave a nice day!`);
            MessageReaction.message.channel.send(embed)
          });
        }
      }
    }
  }
});





//login
client.login(config.token);