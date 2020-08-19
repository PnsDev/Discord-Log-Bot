# LogBot 📝
Discord.js Bot for Logs (now with a website!)

## __Pre-installation:__  

For This project, you will need a website host and a machine that can run a Node.Js Bot. These do not have to be hosted within the same machine.

1. Install Node.Js in the machine that will be running the bot
2. Install all the pre-requisites for Enmap in the same machine found [here](https://enmap.evie.dev/install#pre-requisites)
3. Create a bot inside [Discord's Developer Portal](https://discord.com/developers/applications/)

Now you should be ready to get started 👌

## __Installation:__
1. Move the contents of the Website folder into your main directory of your website.
2. Open to the [up.php](/Website/up.php) and edit `$secret_key = "make a key here";` with a key. You'll need it later so make sure it's saved.
3. Move the contents of the Discord Bot folder into the machine you'll be using to host the bot.
4. Once the files have been transferred, open up the [config.json](/Discord%20Bot/config.json) and replace the contents with the information it ask's for.
5. The last thing needed to be filled inside the [config.json](/Discord%20Bot/config.json) in is they key you made in step 2.
6. Open up the bot folder in the command prompt and run this command:
```
npm i
```
7. You're done. Start the bot with: `node App.js`
8. You can look into [pm2](https://www.npmjs.com/package/pm2) to keep your bot up 24/7

If you get any error make sure everything is filled in properly 🙂

## __Commands:__
- logMe: starts the logs for the channel.

## __Planned Features:__
- Basic Website ✅
- Website Embeds
- Website Markdown
- Multi-line support
- Ping support
- Chat information (like server, channel, etc)

### Thank you! Make sure to star if you used it 🎉
