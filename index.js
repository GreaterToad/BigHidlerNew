const Discord = require('discord.js');
const roblox = require('roblox-js');
const noblox = require('noblox.js');
const client = new Discord.Client();

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_394EEE28196C0D9F098B3B2978B55E047AB5C97F55DCA596EE53235CF9175E12E71E647CADD54EA42C1F5286DB26180D53A3A506DCADE0903371AAFAAA8CEFB71BAB270C8EE51FD0FC47A4918074666B2001242BC066B782C52129D56CCDA76E3BF6E97C53D59FC7D38E31245DECE91243310C6DBD2A72BA28E4547B56E5B280EA20606AA0CBE3152149ABF484851174EF725542DAB006716A26C9BCE8D51C556F1C9B9A3EB420B905B4F2150D02F6A83B51C0139FE969D0017872F45F8E4F77CC86761D4E786706671FCAA4F026FC582596FFED0107C1BB6953FAAA0C79A6239FC3E62807C90E2460EB3F3649AC4D616858E92FA787540E64D187C8B324A87CA58832CAA0D0E0053DEF051C437ADCE9E57143A27B23ACD25BBD397D7691B0C038B51BE8"

noblox.cookieLogin(cookie);

let prefix = "hail!";

//Text commands
client.on('message', message => {
  //Return prefix when asked
  if (message.mentions.members && message.mentions.members.first() && message.mentions.members.first().id == client.user.id){
    message.channel.send(`${prefix} is prefix`);
  };
  //-------------

  //Add hearts if message is annoucment in sneakpeaks
  if (message.channel.name == "sneak-peak"){
    if (message.content.includes('gyazo.com/' || '@everyone' || '@here')){
       message.react(`❤`);
    };
  };
  //------------------------------------------------

  if (message.author.bot || !message.content.toLowerCase().startsWith(prefix)){return;};

  let args = message.content.split(" ");
  let command = args[0].toLowerCase();
  
  let logChannel = message.guild.channels.find(x => x.name === "log");
  let DataChannel = message.guild.channels.find(x => x.name === "database");
  var groupId = 4877038;

  //Roblox promotion
  if (message.member.hasPermission("ADMINISTRATOR")){
    switch(command){
      case `${prefix}rank`:
        var username = args[1];
        var Rank = parseInt(args[2]);
        if (username && Rank){
          message.channel.send(`Checking ROBLOX for ${username}`);
          roblox.getIdFromUsername(username).then(function(id){
            roblox.getRankInGroup(groupId, id).then(function(rank){
              if(252 <= Rank){
                message.channel.send(`${username}(${id}) is ${rank} and not changable`)
              }else{
                message.channel.send(`${username}(${id}) is ${rank} and changable`)
                noblox.setRank(groupId,id,Rank).then(function(newRole){
                  message.channel.send(`Changed their rank to ${newRole.name}`)
                }).catch(function(err){
                  message.channel.send(`Failed to change rank because ${err}`);
                });
              };
            });
          });

        }else{
          if (!username){
            roblox.getIdFromUsername(username).then(function(id){
              roblox.handleJoinRequest(groupId,username,true).then (function(){
                message.channel.send(`${username} has been accepted`)
              });
            });
          };
          if (!Rank){
           message.channel.send("Please specify rank");
          };
        };
      break;
    };
  };
  //------------------------------

  //Accepting people
  if (message.member.hasPermission("ADMINISTRATOR")){
    switch(command){
      case `${prefix}accept`:
        var username = args[1];
        
        if (username){

        }else{
          message.channel.send("Please specify username");
        };
      break;
    };
  };
  //-----------------------------

  //Birthdays
  switch(command){
    case `${prefix}birthday`:
      let BirthDates = [[25,04],[23,07],[10,05],[13,05],[7,10],[2,6],[19,3],[23,3],[16,3],[14,10],[20,4],[28,6],[9,6],[21,11]];
      let Names = ["Zip","Koko","Mark","Fat Cunt","Adventure","Ari","Bread","Shin","Gio","Big Cunt","Hitler","Otad","Unknown Cunt","Shimz"];
      let List = "";
  
      for (var i = 0, name; name = Names[i];i++){
        Date.daysBetween = function( date1, date2 ) {
          var one_day=1000*60*60*24;
        
          var date1_ms = date1.getTime();
          var date2_ms = date2.getTime();
        
          var difference_ms = date2_ms - date1_ms;
            
          return Math.round(difference_ms/one_day); 
        };

        const birthdayDay = BirthDates[i][0];
        const birthdayMonth = BirthDates[i][1]; 
        var today = new Date();
        let YearOfNextBirthday = (today.getMonth() + 1 < birthdayMonth && today.getFullYear()) || (today.getMonth() + 1 == birthdayMonth && today.getDate() <= birthdayDay && today.getFullYear()) || today.getFullYear() + 1
        var BirthDate  = new Date(YearOfNextBirthday, birthdayMonth - 1, birthdayDay); 

        var daysLeft = Date.daysBetween(today, BirthDate);

        if (daysLeft > 31){
        List = List + `
${i + 1}.${name}: ${BirthDates[i][0]}/${BirthDates[i][1]} (${daysLeft} Days left until birthday) 
`
        }
        if(daysLeft <= 31 && daysLeft > 7){
          List = List + `
__${i + 1}.${name}: ${BirthDates[i][0]}/${BirthDates[i][1]} (${daysLeft} Days left until birthday__) 
          `
        }
        if(daysLeft <= 7 && daysLeft > 0){
          List = List + `
**${i+ 1}.${name}: ${BirthDates[i][0]}/${BirthDates[i][1]} (${daysLeft} Days left until birthday**) 
          `
        }else if (daysLeft <= 7 && daysLeft <= 0){
          List = List + `
**__${i+ 1}.${name}: ${BirthDates[i][0]}/${BirthDates[i][1]} (TODAY IS THEIR BIRTHDAY__**) 
          `
        };
      };

      message.channel.send(List);

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      let Nobodys = true;

      for (var i = 0, row ; row = BirthDates[i];i++ ){
        let Names = ["Zip","Koko","Mark","Cunt","Advanture","Ari","Bread"];

        Date.daysBetween = function( date1, date2 ) {
          var one_day=1000*60*60*24;
        
          var date1_ms = date1.getTime();
          var date2_ms = date2.getTime();
        
          var difference_ms = date2_ms - date1_ms;
            
          return Math.round(difference_ms/one_day); 
        };

        const birthdayDay = BirthDates[i][0];
        const birthdayMonth = BirthDates[i][1]; 
        var today = new Date();
        let YearOfNextBirthday = (today.getMonth() + 1 < birthdayMonth && today.getFullYear()) || (today.getMonth() + 1 == birthdayMonth && today.getDate() <= birthdayDay && today.getFullYear()) || today.getFullYear() + 1
        var BirthDate  = new Date(YearOfNextBirthday, birthdayMonth - 1, birthdayDay); 

        var daysLeft = Date.daysBetween(today, BirthDate);

        if (parseInt(daysLeft) <= 0){
          Nobodys = false;
          message.channel.send(`:tada: It's ${Names[i]}'s birthday! :tada:`);
        };
      };

      if (Nobodys){
        message.channel.send(`It's no ones birthday.`);
      };
    break;
  };
  //----------------
  
  //Ban command
  if (message.member.hasPermission("BAN_MEMBERS")){
    switch(command){
      case `${prefix}ban`:
      console.log("passed");
      if (message.mentions.members.first()){
        if (message.mentions.members.first().bannable){
          message.mentions.members.first().ban();
          message.channel.send(`${message.mentions.members.first().displayName} has been banned by ${message.member.displayName}`);

          logChannel.send(`
----------------------------
${message.mentions.members.first().displayName} has been banned by ${message.member.displayName}
At
${message.createdAt.getDate()}/${message.createdAt.getMonth() + 1}/${message.createdAt.getFullYear()} (${message.createdAt.getHours()}:${message.createdAt.getMinutes()})
----------------------------
          `);

        }else{
          message.channel.send(`I can't ban ${message.mentions.members.first().displayName}`);
        };
      }else{
        message.channel.send("You have to mention someone");
      };
      break;
    };
  };
  //----------------------

  //Count role members
  switch(command){
    case `${prefix}count`:
      if (args[1]){
        let Role = message.guild.roles.find(x => x.name === args[1]);

        if (Role){
          let Amount = 0;
          let Members = message.guild.members.array();

          for (var i = 0, member; member = Members[i]; i++){
            if (member.roles.has(Role.id)){
              Amount += 1
            };
          };

          message.channel.send(`${Role.name} has total amount of ${Amount} members`);
        }else{
          message.channel.send(`Role not found.`);
        };
      }else{
        message.channel.send(`You need to specify name of role.`);
      };
    break;
  };
  //----------------------

  //How long has target been in this server
  switch(command){
    case `${prefix}age`:
      let Target = message.mentions.members.first();

      function SayTime(Tar){
        let Time = Tar.joinedAt;
        let Today = new Date();

        let Ms = Today.getTime() - Time.getTime();

        let OneDay = 1000 * 60 * 60 * 24;
        let OneHour = 1000 * 60 * 60;
        let OneMin = 1000 * 60;

        if (Math.round(Ms/OneDay) !== 0){
          let TimeLeft = Ms;

          let Day = TimeLeft/OneDay;
          TimeLeft = TimeLeft % OneDay;

          let Hours = TimeLeft/OneHour;
          TimeLeft = TimeLeft % OneHour;

          let Mins = TimeLeft/OneMin;
          TimeLeft = TimeLeft % OneMin;

          let Seconds = TimeLeft/1000

          message.channel.send(`${Tar.displayName} is ${Math.ceil(Day)}D|${Math.ceil(Hours)}H|${Math.ceil(Mins)}M|${Math.ceil(Seconds)}S old.`);
        };
      };

      if (Target){
        SayTime(Target);
      }else{
        SayTime(message.member);
      };
    break;
  };
  //-------------------------

  //Add swastikas to nickname
  switch(command){
    case `${prefix}blessme`:
    if (!message.member.hasPermission("ADMINISTRATOR")){
      message.member.setNickname("卍" + message.member.user.username + "卍");
      message.channel.send("You have been blessed");
    }else{
      message.channel.send("I cant change your nickname");
    };
    break;
  };
  //------------------------

  //Help command
  switch(command){
    case `${prefix}help`:
      let Text = `
${prefix}BlessMe: "Adds 卍 to your nickname" ("You" => "卍You卍")
------------------
${prefix}Kick: "Kicks player" (${prefix}Kick @Mention)
------------------
${prefix}Ban: "Bans player" (${prefix}Ban @Mention)
------------------
${prefix}Count: "It counts how many member role has" (${prefix}Count @RoleMention)
------------------
${prefix}Mute: "It makes players unable to speak for specified amount of time" (${prefix}Mute @Mention 5(Number)M(Minute,Hour or Seconds))
------------------
${prefix}Age: "It says how many Days or Hours or Minutes someone has been in server" (${prefix}Age @Mention)
------------------
${prefix}Pfp: "Gives you your pfp or if you mention someone their pfp" (${prefix}Pfp @Mention or ${prefix}Pfp)
Ping bot to get current prefix.
      `;

      message.author.send(Text);
    break;  
  };
  //--------------

  //Kick command
  if (message.member.hasPermission("KICK_MEMBERS")){
    switch(command){
      case `${prefix}kick`:
      if (message.mentions.members.first()){
        if (message.mentions.members.first().kickable){
          message.mentions.members.first().kick();
          message.channel.send(`${message.mentions.members.first().displayName} has been kicked by ${message.member.displayName}`);

          logChannel.send(`
----------------------------
${message.mentions.members.first().displayName} has been banned by ${message.member.displayName}
At
${message.createdAt.getDate()}/${message.createdAt.getMonth() + 1}/${message.createdAt.getFullYear()} (${message.createdAt.getHours()}:${message.createdAt.getMinutes()})
----------------------------
          `);

        }else{
          message.channel.send(`I can't kick ${message.mentions.members.first().displayName}`);
        };
      }else{
        message.channel.send("You have to mention someone");
      };
      break;
    };
  };
  //------------------------------

  //Give pfps
  switch(command){
    case `${prefix}pfp`:
      let User = message.mentions.users.first();

      if (User){
        let embed = new Discord.RichEmbed().setImage(User.avatarURL).setColor('#275BF0')
        message.channel.send("Here is the pfp:",{embed});
      }else{
        let embed = new Discord.RichEmbed().setImage(message.author.avatarURL).setColor('#275BF0')
        message.channel.send("Here is the pfp:",{embed});
      };
    break;
  };
  //--------------------

  //Mute command
  if (message.member.hasPermission("MUTE_MEMBERS")){
      let MuteRole = message.guild.roles.find(x => x.name === "Mute") || message.guild.roles.find(x => x.name === "Muted");

      function Mute(Role) {
        switch(command){
        case `${prefix}mute`:
        let Target = message.mentions.members.first();

        if (Target && Target.kickable){
          let Time = args[2];
          if (Time){
            Target.addRole(Role);
            
            Time = Time.substr(0,Time.length - 1).toLowerCase();
            let T = parseInt(Time);

            message.channel.send(`${Target.displayName} has been muted.`);
            let LogTime = (T && T) || "unspecified time";

            logChannel.send(`
  ----------------------------
  ${message.mentions.members.first().displayName} has been muted by ${message.member.displayName} for ${LogTime}
  At
  ${message.createdAt.getDate()}/${message.createdAt.getMonth() + 1}/${message.createdAt.getFullYear()} (${message.createdAt.getHours()}:${message.createdAt.getMinutes()})
  ----------------------------
            `);

            if (T){
              let Bonus = (args[2].toLowerCase().endsWith("m") && 60) || (args[2].toLowerCase().endsWith("h") && 60 * 60) || 1
              let waitFor = T * 1000 * Bonus;

              function removeIt(){
                if (Target.roles.has(Role.id)){
                  Target.removeRole(Role);
                  message.channel.send(`${Target.displayName} Has been unmuted!`);
                };
              };

              setTimeout(removeIt,waitFor);
            }else{
              message.channel.send("Can't find time");
            };
          }else{
            message.channel.send("Time not specified");
          };
        }else{
          if (!Target){
           message.channel.send("Target is invalid");
          }else{
            message.channel.send(`I can't mute ${Target.displayName}`);
          };
        };
        break;
      };
    };

    if (MuteRole){
      Mute(MuteRole);
    }else{
      message.channel.send(`
Can't find role named "Mute" or "Muted.
`);
    };
  };
  //-----------------

});
//---------------------------------------

//Give roles to new members
client.on('guildMemberAdd',member =>{
  let role = member.guild.roles.find(x => x.name === "Member");
  member.addRole(role);
});
//------------------------

//Log comment deleting
client.on('messageDelete',message =>{
  let logChannel = message.guild.channels.find(x => x.name === "log");
  if (logChannel){
    let Things = "```";
    let Text = `
----------------------------
${message.member.displayName} deleted comment:
${Things}${(message.content == "" && "Nil" || message.content)}${Things}
At
${message.createdAt.getDate()}/${message.createdAt.getMonth() + 1}/${message.createdAt.getFullYear()} (${message.createdAt.getHours()}:${message.createdAt.getMinutes()})
----------------------------
   `
    logChannel.send(Text);
  };
});
//--------------------

//Log comment editting 
client.on('messageUpdate',(oldMessage,newMessage) =>{
  let logChannel = newMessage.guild.channels.find(x => x.name === "log");
  if (logChannel){
    let Things = "```";
    logChannel.send(`
----------------------------
${newMessage.member.displayName} edited comment:
${Things}${oldMessage.content}${Things}
To
${Things}${newMessage.content}${Things}
At
${newMessage.createdAt.getDate()}/${newMessage.createdAt.getMonth() + 1}/${newMessage.createdAt.getFullYear()} (${newMessage.createdAt.getHours()}:${newMessage.createdAt.getMinutes()})
----------------------------
   `);
  };
});

client.on('ready', () => {
  console.log("Im ready!");
});

// THIS  MUST  BE  THIS  WAY
client.login("NTcyMzY4Mzk0NTk1MDc0MDUw.XMbRow.5bt8hbEIbrLmeRaMKBgSzKwXEmk");