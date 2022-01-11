const Discord = require("discord.js");
const fs = require("fs");
const ms = require("parse-ms");
const client = new Discord.Client();
const moment = require("moment");
const akardiyan = require("./ayarlar.json");
const { Player } = require("discord-player");
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
const Alone = "#36393e";
const Dogru = "#22BF41";
const Hata = "#f30707";
const fetch = require("node-fetch");
const aktiviteler = {
    "pkr": {
        id: "755827207812677713",
        name: "Poker Night"
    },
    "bio": {
        id: "773336526917861400",
        name: "Betrayal.io"
    },
    "yt": {
        id: "755600276941176913",
        name: "YouTube Together"
    },
    "fio": {
        id: "814288819477020702",
        name: "Fishington.io"
    }
};

//------------- Aktivite Bölümü---------------\\

client.on("message", async message => {
    let prefix = (await db.fetch(`prefix.${message.guild.id}`)) || akardiyan.prefix;
    if (message.author.bot || !message.guild) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
  
    const hataxd = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | <@${message.author.id}> Lütfen Geçerli Bir Sesli Kanal İd Girin`)
    .setThumbnail(client.user.avatarURL)
    
    const formatlar = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | Doğru Formatlar İçin **${prefix}aktiviteler** Kullanınız`)
    .setThumbnail(client.user.avatarURL)
    
    const hatasj = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **Davet Oluştur** İznine İhtiyacım Var`)
    .setThumbnail(client.user.avatarURL)
    
    
    if (cmd === "aktivite") {
        const channel = message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send(hataxd);
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send(hatasj);
        const activity = aktiviteler[args[1] ? args[1].toLowerCase() : null];
        if (!activity) return message.channel.send(formatlar) 
      
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: activity.id,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
    
    .then(res => res.json())
    .then(invite => {
          
    const hata31 = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **${activity.name}** Başlatılamadı`)
    .setThumbnail(client.user.avatarURL)
    
    if (invite.error || !invite.code) return message.channel.send(hata31);
    const aktivite = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`✅ | **${channel.name}** Adlı Ses Kanalında **${activity.name}** Başlatmak İçin [Tıklayın](<https://discord.gg/${invite.code}>)`)
    .setThumbnail(client.user.avatarURL)
          message.channel.send(aktivite) 
            })   
    const hata31 = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **${activity.name}** Başlatılamadı`)
    .setThumbnail(client.user.avatarURL)
            .catch(e => {
                message.channel.send(hata31);
            })
    }
});

 client.on("guildMemberRemove", async member => {
  
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
    if (!canvaskanal) return;
  
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/792483949364248626/844937080395661322/HosGELDIn_1.gif");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
  
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "ovankovic-bb.png"
    );
  
      canvaskanal.send(attachment);; 
  });
  
  client.on("guildMemberAdd", async member => {
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  
    if (!canvaskanal || canvaskanal ===  undefined) return;
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage( "https://cdn.discordapp.com/attachments/792483949364248626/844936220698083348/HosGELDIn.gif");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
  
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "ewing-hg.png"
    );
  
    canvaskanal.send(attachment);
  });



//-------------Bot Eklenince Bir Kanala Mesaj Gönderme Komutu ---------------\\

const emmmmbed = new Discord.MessageEmbed()
  .addField(`Teşekkürler\n **Beni sunucunuza eklediğiniz için teşekkür ederim**`,true)
  .addField(`Nasıl Kullanılır ?\n **Beni kullanmak için \`${akardiyan.prefix}yardım\` yazmanız yeterlidir.**`,true)
  .addField(`Nasıl Davet Ederim ?\n **\`${akardiyan.prefix}davet\` yazmanız yeterlidir**`,true) 
  .setFooter(`Ewing Bot`)
  .setTimestamp();

client.on("guildCreate", guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(emmmmbed);
});

client.on("message", async msg => {
  let prefix = (await db.fetch(`prefix.${msg.guild.id}`)) || akardiyan.prefix;
  if (msg.content.toLowerCase() == `ewing`)
    return msg.channel.send(`<@${msg.author.id}> Sanırım Komutlarımı Görmek İstiyorsun\nYardım İçin => \`${prefix}yardım\``);
});

//----------------------------------------------\\

client.on("message", async message => {
  let prefix =
    (await db.fetch(`prefix.${message.guild.id}`)) || akardiyan.prefix;
  const messageArray = message.content.split(" ");
  const cmd = messageArray[0].toLowerCase();
  const args = messageArray.slice(1);
  if (!message.content.startsWith(prefix)) return;
  const commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(client, message, args);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  const jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    return console.log("Herhangi bir komut bulunamadı!");
  }
  jsfiles.forEach(file => {
    console.log(`${file} Komutu Hazır`);
    const command = require(`./komutlar/${file}`);
    client.commands.set(command.config.name, command);
    command.config.aliases.forEach(alias => {
      client.aliases.set(alias, command.config.name);
    });
  });
});

//---------------------------------------------------------\\
const ayarlar = require('./ayarlar.json');
client.login(ayarlar.token).then(
  function() {
    console.log("Tüm Sistemler Çalışır Durumda Bot Başlatılıyor...");
  },
  function(err) {
    console.log("Malesef Tüm Sistemler Çalışır Değil Tekrar Deneniyor...");
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);

//------------------Değişen Oynuyor---------------------------\\

const bot = new Discord.Client();
let prefix = akardiyan.prefix

var oyun = [
  `✨ Yardım Al | ${prefix}yardım`,
  `🔔 Yepyeni Özellikler İle`,
  `⚡️ Botu Davet Et | ${prefix}davet`,
  `😁 Bizi Tercih Ettiğiniz İçin Teşekkürler`,
  `🔔 Sponsorumuz: Game Doping!`,
  `🖼 Grafiker: Aranıyor!`,
  `🌟 Prefixi Ayarla | ${prefix}prefix`
];

client.on("ready", () => {
  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);
    client.user.setActivity(oyun[random], { type: "PLAYING" });
  }, 2 * 2000);
});

//-----------------Etiket Prefix-----------------\\

client.on("message", async msg => {
  let prefix = (await db.fetch(`prefix.${msg.guild.id}`)) || akardiyan.prefix;
  if (msg.content == `<@!784517399314432050>`)
    return msg.channel.send(`Bunu mu arıyorsun ?\nPrefix => \`${prefix}\``);
});

//---------------------------------------------------\\

// MOD LOG

client.on("messageDelete", async message => {
  // mod-log
  let modlogs = db.get(`log_${message.guild.id}`);
  const modlogkanal = message.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("MESAJ SİLİNDİ")
    .setDescription(`❌ | <@!${message.author.id}> **adlı kullanıcı tarafından** <#${message.channel.id}> **kanalına gönderilen mesaj silindi!** \n\nSilinen Mesaj: **${message.content}**`)
    .setTimestamp()
    .setFooter("Ewing Bot");
  modlogkanal.send(embed);
});

client.on("guildBanAdd", async message => {
  let modlogs = db.get(`log_${message.guild}`);
  const modlogkanal = message.guild.channel.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`❌ | **Üye Sunucudan Yasaklandı!** \n<@!${message.user.id}>, ${message.user.tag}`)
    .setTimestamp()
    .setThumbnail(message.user.avatarURL)
    .setFooter("Ewing Bot");
  modlogkanal.send(embed);
});

client.on("channelCreate", async channel => {
  let modlogs = db.get(`log_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ | **Metin Kanalı Oluşturuldu**\n\nOluşturulan Metin Kanalı => **${channel.name}**`)
      .setTimestamp()
      .setFooter(`Ewing Bot`);
    
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ | **Ses Kanalı Oluşturuldu**\n\nOluşturulan Ses Kanalı => **${channel.name}**`)
      .setTimestamp()
      .setFooter(`Ewing Bot`);

    modlogkanal.send({ embed });
  }
});
client.on("channelDelete", async channel => {
  let modlogs = db.get(`log_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`⛔ | **Metin Kanalı Silindi**\n\nSilinen Metin Kanalı => **${channel.name}**`)
      .setTimestamp()
      .setFooter(`Ewing Bot`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`⛔ | **Ses Kanalı Silindi**\n\nSilinen Ses Kanalı => **${channel.name}**`)
      .setTimestamp()
      .setFooter(`Ewing Bot`);
    modlogkanal.send({ embed });
  }
});

/////////////////// KÜFÜR ENGEL

client.on("message", async message => {
  const lus = await db.fetch(`kufurE_${message.guild.id}`);
  if (lus) {
    const küfür = [
      "abaza",
      "abazan",
      "aq",
      "ağzınasıçayım",
      "ahmak",
      "am",
      "amarım",
      "ambiti",
      "OC",
      "0C",
      "ambiti",
      "amcığı",
      "amcığın",
      "amcığını",
      "amcığınızı",
      "amcık",
      "amcıkhoşafı",
      "amcıklama",
      "amcıklandı",
      "amcik",
      "amck",
      "amckl",
      "amcklama",
      "amcklaryla",
      "amckta",
      "amcktan",
      "amcuk",
      "amık",
      "amına",
      "amınako",
      "amınakoy",
      "amınakoyarım",
      "amınakoyayım",
      "amınakoyim",
      "amınakoyyim",
      "amınas",
      "amınasikem",
      "amınasokam",
      "amınferyadı",
      "amını",
      "amınıs",
      "amınoglu",
      "amınoğlu",
      "amınoğli",
      "amısına",
      "amısını",
      "amina",
      "aminakoyarim",
      "aminakoyayım",
      "aminakoyayim",
      "aminakoyim",
      "aminda",
      "amindan",
      "amindayken",
      "amini",
      "aminiyarraaniskiim",
      "aminoglu",
      "aminoglu",
      "amiyum",
      "amk",
      "amkafa",
      "amkçocuğu",
      "amlarnzn",
      "amlı",
      "amm",
      "amna",
      "amnda",
      "amndaki",
      "amngtn",
      "amnn",
      "amq",
      "amsız",
      "amsiz",
      "amuna",
      "ana",
      "anaaann",
      "anal",
      "anan",
      "anana",
      "anandan",
      "ananı",
      "ananı",
      "ananın",
      "ananınam",
      "ananınamı",
      "ananındölü",
      "ananınki",
      "ananısikerim",
      "ananısikerim",
      "ananısikeyim",
      "ananısikeyim",
      "ananızın",
      "ananızınam",
      "anani",
      "ananin",
      "ananisikerim",
      "ananisikerim",
      "ananisikeyim",
      "ananisikeyim",
      "anann",
      "ananz",
      "anas",
      "anasını",
      "anasınınam",
      "anasıorospu",
      "anasi",
      "anasinin",
      "angut",
      "anneni",
      "annenin",
      "annesiz",
      "aptal",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "atkafası",
      "atmık",
      "avrat",
      "babaannesikaşar",
      "babanı",
      "babanın",
      "babani",
      "babasıpezevenk",
      "bacına",
      "bacını",
      "bacının",
      "bacini",
      "bacn",
      "bacndan",
      "bitch",
      "bok",
      "boka",
      "bokbok",
      "bokça",
      "bokkkumu",
      "boklar",
      "boktan",
      "boku",
      "bokubokuna",
      "bokum",
      "bombok",
      "boner",
      "bosalmak",
      "boşalmak",
      "çük",
      "dallama",
      "daltassak",
      "dalyarak",
      "dalyarrak",
      "dangalak",
      "dassagi",
      "diktim",
      "dildo",
      "dingil",
      "dingilini",
      "dinsiz",
      "dkerim",
      "domal",
      "domalan",
      "domaldı",
      "domaldın",
      "domalık",
      "domalıyor",
      "domalmak",
      "domalmış",
      "domalsın",
      "domalt",
      "domaltarak",
      "domaltıp",
      "domaltır",
      "domaltırım",
      "domaltip",
      "domaltmak",
      "dölü",
      "eben",
      "ebeni",
      "ebenin",
      "ebeninki",
      "ecdadını",
      "ecdadini",
      "embesil",
      "fahise",
      "fahişe",
      "feriştah",
      "ferre",
      "fuck",
      "fucker",
      "fuckin",
      "fucking",
      "gavad",
      "gavat",
      "geber",
      "geberik",
      "gebermek",
      "gebermiş",
      "gebertir",
      "gerızekalı",
      "gerizekalı",
      "gerizekali",
      "gerzek",
      "gotlalesi",
      "gotlu",
      "gotten",
      "gotundeki",
      "gotunden",
      "gotune",
      "gotunu",
      "gotveren",
      "göt",
      "götdeliği",
      "götherif",
      "götlalesi",
      "götlek",
      "götoğlanı",
      "götoğlanı",
      "götoş",
      "götten",
      "götü",
      "götün",
      "götüne",
      "götünekoyim",
      "götünekoyim",
      "götünü",
      "götveren",
      "götveren",
      "götverir",
      "gtveren",
      "hasiktir",
      "hassikome",
      "hassiktir",
      "hassiktir",
      "hassittir",
      "ibine",
      "ibinenin",
      "ibne",
      "ibnedir",
      "ibneleri",
      "ibnelik",
      "ibnelri",
      "ibneni",
      "ibnenin",
      "ibnesi",
      "ipne",
      "itoğluit",
      "kahpe",
      "kahpenin",
      "kaka",
      "kaltak",
      "kancık",
      "kancik",
      "kappe",
      "kavat",
      "kavatn",
      "kocagöt",
      "koduğmunun",
      "kodumun",
      "kodumunun",
      "koduumun",
      "mal",
      "malafat",
      "malak",
      "manyak",
      "meme",
      "memelerini",
      "oc",
      "ocuu",
      "ocuun",
      "0Ç",
      "o.çocuğu",
      "orosbucocuu",
      "orospu",
      "orospucocugu",
      "orospuçoc",
      "orospuçocuğu",
      "orospuçocuğudur",
      "orospuçocukları",
      "orospudur",
      "orospular",
      "orospunun",
      "orospununevladı",
      "orospuydu",
      "orospuyuz",
      "orrospu",
      "oruspu",
      "oruspuçocuğu",
      "oruspuçocuğu",
      "osbir",
      "öküz",
      "penis",
      "pezevek",
      "pezeven",
      "pezeveng",
      "pezevengi",
      "pezevenginevladı",
      "pezevenk",
      "pezo",
      "pic",
      "pici",
      "picler",
      "piç",
      "piçinoğlu",
      "piçkurusu",
      "piçler",
      "pipi",
      "pisliktir",
      "porno",
      "pussy",
      "puşt",
      "puşttur",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sakso",
      "salaak",
      "salak",
      "serefsiz",
      "sexs",
      "sıçarım",
      "sıçtığım",
      "sıkecem",
      "sicarsin",
      "sie",
      "sik",
      "sikdi",
      "sikdiğim",
      "sike",
      "sikecem",
      "sikem",
      "siken",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikersin",
      "sikertir",
      "sikertmek",
      "sikesen",
      "sikey",
      "sikeydim",
      "sikeyim",
      "sikeym",
      "siki",
      "sikicem",
      "sikici",
      "sikien",
      "sikienler",
      "sikiiim",
      "sikiiimmm",
      "sikiim",
      "sikiir",
      "sikiirken",
      "sikik",
      "sikil",
      "sikildiini",
      "sikilesice",
      "sikilmi",
      "sikilmie",
      "sikilmis",
      "sikilmiş",
      "sikilsin",
      "sikim",
      "sikimde",
      "sikimden",
      "sikime",
      "sikimi",
      "sikimiin",
      "sikimin",
      "sikimle",
      "sikimsonik",
      "sikimtrak",
      "sikin",
      "sikinde",
      "sikinden",
      "sikine",
      "sikini",
      "sikip",
      "sikis",
      "sikisek",
      "sikisen",
      "sikish",
      "sikismis",
      "sikiş",
      "sikişen",
      "sikişme",
      "sikitiin",
      "sikiyim",
      "sikiym",
      "sikiyorum",
      "sikkim",
      "sikleri",
      "sikleriii",
      "sikli",
      "sikm",
      "sikmek",
      "sikmem",
      "sikmiler",
      "sikmisligim",
      "siksem",
      "sikseydin",
      "sikseyidin",
      "siksin",
      "siksinler",
      "siksiz",
      "siksok",
      "siksz",
      "sikti",
      "siktigimin",
      "siktigiminin",
      "siktiğim",
      "siktiğimin",
      "siktiğiminin",
      "siktii",
      "siktiim",
      "siktiimin",
      "siktiiminin",
      "siktiler",
      "siktim",
      "siktimin",
      "siktiminin",
      "siktir",
      "siktiret",
      "siktirgit",
      "siktirgit",
      "siktirir",
      "siktiririm",
      "siktiriyor",
      "siktirlan",
      "siktirolgit",
      "sittimin",
      "skcem",
      "skecem",
      "skem",
      "sker",
      "skerim",
      "skerm",
      "skeyim",
      "skiim",
      "skik",
      "skim",
      "skime",
      "skmek",
      "sksin",
      "sksn",
      "sksz",
      "sktiimin",
      "sktrr",
      "skyim",
      "slaleni",
      "sokam",
      "sokarım",
      "sokarim",
      "sokarm",
      "sokarmkoduumun",
      "sokayım",
      "sokaym",
      "sokiim",
      "soktuğumunun",
      "sokuk",
      "sokum",
      "sokuş",
      "sokuyum",
      "soxum",
      "sulaleni",
      "sülalenizi",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "s.k",
      "s.keyim",
      "vajina",
      "vajinanı",
      "xikeyim",
      "yaaraaa",
      "yalarım",
      "yalarun",
      "orospi",
      "orospinin",
      "orospının",
      "orospı",
      "yaraaam",
      "yarak",
      "yaraksız",
      "yaraktr",
      "yaram",
      "yaraminbasi",
      "yaramn",
      "yararmorospunun",
      "yarra",
      "yarraaaa",
      "yarraak",
      "yarraam",
      "yarraamı",
      "yarragi",
      "yarragimi",
      "yarragina",
      "yarragindan",
      "yarragm",
      "yarrağ",
      "yarrağım",
      "yarrağımı",
      "yarraimin",
      "yarrak",
      "yarram",
      "yarramin",
      "yarraminbaşı",
      "yarramn",
      "yarran",
      "yarrana",
      "yarrrak",
      "yavak",
      "yavş",
      "yavşak",
      "yavşaktır",
      "yrrak",
      "zigsin",
      "zikeyim",
      "zikiiim",
      "zikiim",
      "zikik",
      "zikim",
      "ziksiin",
      "ağzına",
      "am",
      "mk",
      "amcık",
      "amcıkağız",
      "amcıkları",
      "amık",
      "amın",
      "amına",
      "amınakoyim",
      "amınoğlu",
      "amina",
      "amini",
      "amk",
      "amq",
      "anan",
      "ananı",
      "ananızı",
      "ananizi",
      "aminizi",
      "aminii",
      "avradını",
      "avradini",
      "anasını",
      "b.k",
      "bok",
      "boktan",
      "boşluk",
      "dalyarak",
      "dasak",
      "dassak",
      "daşak",
      "daşşak",
      "daşşaksız",
      "durum",
      "ensest",
      "erotik",
      "fahişe",
      "fuck",
      "g*t",
      "g*tü",
      "g*tün",
      "g*tüne",
      "g.t",
      "gavat",
      "gay",
      "gerızekalıdır",
      "gerizekalı",
      "gerizekalıdır",
      "got",
      "gotunu",
      "gotuze",
      "göt",
      "götü",
      "götüne",
      "götünü",
      "götünüze",
      "götüyle",
      "götveren",
      "götvern",
      "guat",
      "hasiktir",
      "hasiktr",
      "hastir",
      "i.ne",
      "ibne",
      "ibneler",
      "ibneliği",
      "ipne",
      "ipneler",
      "it",
      "iti",
      "itler",
      "kavat",
      "kıç",
      "kıro",
      "kromusunuz",
      "kromusunuz",
      "lezle",
      "lezler",
      "nah",
      "o.ç",
      "oç.",
      "okuz",
      "orosbu",
      "orospu",
      "orospucocugu",
      "orospular",
      "otusbir",
      "otuzbir",
      "öküz",
      "penis",
      "pezevenk",
      "pezevenkler",
      "pezo",
      "pic",
      "piç",
      "piçi",
      "piçinin",
      "piçler",
      "pis",
      "pok",
      "pokunu",
      "porn",
      "porno",
      "puşt",
      "sex",
      "s.tir",
      "sakso",
      "salak",
      "sanane",
      "sanane",
      "sçkik",
      "seks",
      "serefsiz",
      "serefsz",
      "serefszler",
      "sex",
      "sıçmak",
      "sıkerım",
      "sıkm",
      "sıktır",
      "si.çmak",
      "sicmak",
      "sicti",
      "sik",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikert",
      "sikertirler",
      "sikertmek",
      "sikeyim",
      "sikicem",
      "sikiim",
      "sikik",
      "sikim",
      "sikime",
      "sikimi",
      "sikiş",
      "sikişken",
      "sikişmek",
      "sikm",
      "sikmeyi",
      "siksinler",
      "siktiğim",
      "siktimin",
      "siktin",
      "siktirgit",
      "siktir",
      "siktirgit",
      "siktirsin",
      "siqem",
      "skiym",
      "skm",
      "skrm",
      "sktim",
      "sktir",
      "sktirsin",
      "sktr",
      "sktroradan",
      "sktrsn",
      "snane",
      "sokacak",
      "sokarim",
      "sokayım",
      "sülaleni",
      "şerefsiz",
      "şerefsizler",
      "şerefsizlerin",
      "şerefsizlik",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "travesti",
      "yarak",
      "yark",
      "yarrağım",
      "yarrak",
      "yarramın",
      "yarrk",
      "yavşak",
      "yrak",
      "yrk",
      "ebenin",
      "ezik",
      "o.ç.",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sperm",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "amına",
      "ebenin",
      "ezik",
      "fahişe",
      "gavat",
      "gavurundölü",
      "gerizekalı",
      "göte",
      "götü",
      "götüne",
      "götünü",
      "lan",
      "mal",
      "o.ç.",
      "orospu",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikilmiş",
      "siktir",
      "sperm",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "ebenin",
      "fahişe",
      "gavat",
      "gerizakalı",
      "gerizekalı",
      "göt",
      "göte",
      "götü",
      "götüne",
      "götsün",
      "piçsin",
      "götsünüz",
      "piçsiniz",
      "götünüze",
      "kıçınız",
      "kıçınıza",
      "götünü",
      "hayvan",
      "ibne",
      "ipne",
      "kahpe",
      "kaltak",
      "lan",
      "mal",
      "o.c",
      "oc",
      "manyak",
      "o.ç.",
      "oç",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikiim",
      "siktim",
      "siki",
      "sikilmiş",
      "siktir",
      "siktir",
      "sperm",
      "şerefsiz",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "yosma",
      "aq",
      "a.q.",
      "amk",
      "amına",
      "amınakoyim",
      "amina",
      "ammına",
      "amna",
      "sikim",
      "sikiym",
      "sikeyim",
      "siktr",
      "kodumun",
      "amık",
      "sikem",
      "sikim",
      "sikiym",
      "s.iktm",
      "s.ikerim",
      "s.ktir",
      "amg",
      "am.k",
      "a.mk",
      "amık",
      "rakı",
      "rak",
      "oruspu",
      "oc",
      "ananın",
      "ananınki",
      "bacının",
      "bacını",
      "babanın",
      "sike",
      "skim",
      "skem",
      "amcık",
      "şerefsiz",
      "piç",
      "piçinoğlu",
      "amcıkhoşafı",
      "amınasokam",
      "amkçocuğu",
      "amınferyadı",
      "amınoglu",
      "piçler",
      "sikerim",
      "sikeyim",
      "siktiğim",
      "siktiğimin",
      "amını",
      "amına",
      "amınoğlu",
      "amk",
      "ipne",
      "ibne",
      "serefsiz",
      "şerefsiz",
      "piç",
      "piçkurusu",
      "götün",
      "götoş",
      "yarrak",
      "amcik",
      "sıçarım",
      "sıçtığım",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "a.g.",
      "ag.",
      "amınak",
      "aminak",
      "amınag",
      "aminag",
      "amınıs",
      "amınas",
      "ananı",
      "babanı",
      "anani",
      "babani",
      "bacını",
      "bacini",
      "ecdadını",
      "ecdadini",
      "sikeyim",
      "sulaleni",
      "sülaleni",
      "dallama",
      "dangalak",
      "aptal",
      "salak",
      "gerızekalı",
      "gerizekali",
      "öküz",
      "angut",
      "dalyarak",
      "sikiyim",
      "sikeyim",
      "götüne",
      "götünü",
      "siktirgit",
      "siktirgit",
      "siktirolgit",
      "siktirolgit",
      "siktir",
      "hasiktir",
      "hassiktir",
      "hassiktir",
      "dalyarak",
      "dalyarrak",
      "kancık",
      "kancik",
      "kaltak",
      "orospu",
      "oruspu",
      "fahişe",
      "fahise",
      "pezevenk",
      "pezo",
      "kocagöt",
      "ambiti",
      "götünekoyim",
      "götünekoyim",
      "amınakoyim",
      "aminakoyim",
      "amınak",
      "aminakoyayım",
      "aminakoyayim",
      "amınakoyarım",
      "aminakoyarim",
      "aminakoyarim",
      "ananısikeyim",
      "ananisikeyim",
      "ananısikeyim",
      "ananisikeyim",
      "ananisikerim",
      "ananısikerim",
      "ananisikerim",
      "ananısikerim",
      "orospucocugu",
      "oruspucocu",
      "amk",
      "amq",
      "sikik",
      "götveren",
      "götveren",
      "amınoğlu",
      "aminoglu",
      "amınoglu",
      "gavat",
      "kavat",
      "anneni",
      "annenin",
      "ananın",
      "ananin",
      "dalyarak",
      "sikik",
      "amcık",
      "siktir",
      "piç",
      "pic",
      "sie",
      "yarram",
      "göt",
      "meme",
      "dildo",
      "skcem",
      "skerm",
      "skerim",
      "skecem",
      "orrospu",
      "annesiz",
      "kahpe",
      "kappe",
      "yarak",
      "yaram",
      "dalaksız",
      "yaraksız",
      "amlı",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sikim",
      "orospuçocukları",
      "oç"
    ];
    if (küfür.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
          message.delete();
          
    const küfürengelx = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **Bu Sunucuda** "\`Küfür Engel\`" **Sistemi Aktif**`)
    .setThumbnail(client.user.avatarURL)  

          return message.channel
            .send(küfürengelx)
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
client.on("messageUpdate", async (newMessage, oldMessage) => {
  const lus = await db.fetch(`kufurE_${newMessage.guild.id}`);
  if (lus) {
    const küfür = [
      "abaza",
      "abazan",
      "aq",
      "ağzınasıçayım",
      "ahmak",
      "am",
      "amarım",
      "ambiti",
      "OC",
      "0C",
      "ambiti",
      "amcığı",
      "amcığın",
      "amcığını",
      "amcığınızı",
      "amcık",
      "amcıkhoşafı",
      "amcıklama",
      "amcıklandı",
      "amcik",
      "amck",
      "amckl",
      "amcklama",
      "amcklaryla",
      "amckta",
      "amcktan",
      "amcuk",
      "amık",
      "amına",
      "amınako",
      "amınakoy",
      "amınakoyarım",
      "amınakoyayım",
      "amınakoyim",
      "amınakoyyim",
      "amınas",
      "amınasikem",
      "amınasokam",
      "amınferyadı",
      "amını",
      "amınıs",
      "amınoglu",
      "amınoğlu",
      "amınoğli",
      "amısına",
      "amısını",
      "amina",
      "aminakoyarim",
      "aminakoyayım",
      "aminakoyayim",
      "aminakoyim",
      "aminda",
      "amindan",
      "amindayken",
      "amini",
      "aminiyarraaniskiim",
      "aminoglu",
      "aminoglu",
      "amiyum",
      "amk",
      "amkafa",
      "amkçocuğu",
      "amlarnzn",
      "amlı",
      "amm",
      "amna",
      "amnda",
      "amndaki",
      "amngtn",
      "amnn",
      "amq",
      "amsız",
      "amsiz",
      "amuna",
      "ana",
      "anaaann",
      "anal",
      "anan",
      "anana",
      "anandan",
      "ananı",
      "ananı",
      "ananın",
      "ananınam",
      "ananınamı",
      "ananındölü",
      "ananınki",
      "ananısikerim",
      "ananısikerim",
      "ananısikeyim",
      "ananısikeyim",
      "ananızın",
      "ananızınam",
      "anani",
      "ananin",
      "ananisikerim",
      "ananisikerim",
      "ananisikeyim",
      "ananisikeyim",
      "anann",
      "ananz",
      "anas",
      "anasını",
      "anasınınam",
      "anasıorospu",
      "anasi",
      "anasinin",
      "angut",
      "anneni",
      "annenin",
      "annesiz",
      "aptal",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "atkafası",
      "atmık",
      "avrat",
      "babaannesikaşar",
      "babanı",
      "babanın",
      "babani",
      "babasıpezevenk",
      "bacına",
      "bacını",
      "bacının",
      "bacini",
      "bacn",
      "bacndan",
      "bitch",
      "bok",
      "boka",
      "bokbok",
      "bokça",
      "bokkkumu",
      "boklar",
      "boktan",
      "boku",
      "bokubokuna",
      "bokum",
      "bombok",
      "boner",
      "bosalmak",
      "boşalmak",
      "çük",
      "dallama",
      "daltassak",
      "dalyarak",
      "dalyarrak",
      "dangalak",
      "dassagi",
      "diktim",
      "dildo",
      "dingil",
      "dingilini",
      "dinsiz",
      "dkerim",
      "domal",
      "domalan",
      "domaldı",
      "domaldın",
      "domalık",
      "domalıyor",
      "domalmak",
      "domalmış",
      "domalsın",
      "domalt",
      "domaltarak",
      "domaltıp",
      "domaltır",
      "domaltırım",
      "domaltip",
      "domaltmak",
      "dölü",
      "eben",
      "ebeni",
      "ebenin",
      "ebeninki",
      "ecdadını",
      "ecdadini",
      "embesil",
      "fahise",
      "fahişe",
      "feriştah",
      "ferre",
      "fuck",
      "fucker",
      "fuckin",
      "fucking",
      "gavad",
      "gavat",
      "geber",
      "geberik",
      "gebermek",
      "gebermiş",
      "gebertir",
      "gerızekalı",
      "gerizekalı",
      "gerizekali",
      "gerzek",
      "gotlalesi",
      "gotlu",
      "gotten",
      "gotundeki",
      "gotunden",
      "gotune",
      "gotunu",
      "gotveren",
      "göt",
      "götdeliği",
      "götherif",
      "götlalesi",
      "götlek",
      "götoğlanı",
      "götoğlanı",
      "götoş",
      "götten",
      "götü",
      "götün",
      "götüne",
      "götünekoyim",
      "götünekoyim",
      "götünü",
      "götveren",
      "götveren",
      "götverir",
      "gtveren",
      "hasiktir",
      "hassikome",
      "hassiktir",
      "hassiktir",
      "hassittir",
      "ibine",
      "ibinenin",
      "ibne",
      "ibnedir",
      "ibneleri",
      "ibnelik",
      "ibnelri",
      "ibneni",
      "ibnenin",
      "ibnesi",
      "ipne",
      "itoğluit",
      "kahpe",
      "kahpenin",
      "kaka",
      "kaltak",
      "kancık",
      "kancik",
      "kappe",
      "kavat",
      "kavatn",
      "kocagöt",
      "koduğmunun",
      "kodumun",
      "kodumunun",
      "koduumun",
      "mal",
      "malafat",
      "malak",
      "manyak",
      "meme",
      "memelerini",
      "oc",
      "ocuu",
      "ocuun",
      "0Ç",
      "o.çocuğu",
      "orosbucocuu",
      "orospu",
      "orospucocugu",
      "orospuçoc",
      "orospuçocuğu",
      "orospuçocuğudur",
      "orospuçocukları",
      "orospudur",
      "orospular",
      "orospunun",
      "orospununevladı",
      "orospuydu",
      "orospuyuz",
      "orrospu",
      "oruspu",
      "oruspuçocuğu",
      "oruspuçocuğu",
      "osbir",
      "öküz",
      "penis",
      "pezevek",
      "pezeven",
      "pezeveng",
      "pezevengi",
      "pezevenginevladı",
      "pezevenk",
      "pezo",
      "pic",
      "pici",
      "picler",
      "piç",
      "piçinoğlu",
      "piçkurusu",
      "piçler",
      "pipi",
      "pisliktir",
      "porno",
      "pussy",
      "puşt",
      "puşttur",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sakso",
      "salaak",
      "salak",
      "serefsiz",
      "sexs",
      "sıçarım",
      "sıçtığım",
      "sıkecem",
      "sicarsin",
      "sie",
      "sik",
      "sikdi",
      "sikdiğim",
      "sike",
      "sikecem",
      "sikem",
      "siken",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikersin",
      "sikertir",
      "sikertmek",
      "sikesen",
      "sikey",
      "sikeydim",
      "sikeyim",
      "sikeym",
      "siki",
      "sikicem",
      "sikici",
      "sikien",
      "sikienler",
      "sikiiim",
      "sikiiimmm",
      "sikiim",
      "sikiir",
      "sikiirken",
      "sikik",
      "sikil",
      "sikildiini",
      "sikilesice",
      "sikilmi",
      "sikilmie",
      "sikilmis",
      "sikilmiş",
      "sikilsin",
      "sikim",
      "sikimde",
      "sikimden",
      "sikime",
      "sikimi",
      "sikimiin",
      "sikimin",
      "sikimle",
      "sikimsonik",
      "sikimtrak",
      "sikin",
      "sikinde",
      "sikinden",
      "sikine",
      "sikini",
      "sikip",
      "sikis",
      "sikisek",
      "sikisen",
      "sikish",
      "sikismis",
      "sikiş",
      "sikişen",
      "sikişme",
      "sikitiin",
      "sikiyim",
      "sikiym",
      "sikiyorum",
      "sikkim",
      "sikleri",
      "sikleriii",
      "sikli",
      "sikm",
      "sikmek",
      "sikmem",
      "sikmiler",
      "sikmisligim",
      "siksem",
      "sikseydin",
      "sikseyidin",
      "siksin",
      "siksinler",
      "siksiz",
      "siksok",
      "siksz",
      "sikti",
      "siktigimin",
      "siktigiminin",
      "siktiğim",
      "siktiğimin",
      "siktiğiminin",
      "siktii",
      "siktiim",
      "siktiimin",
      "siktiiminin",
      "siktiler",
      "siktim",
      "siktimin",
      "siktiminin",
      "siktir",
      "siktiret",
      "siktirgit",
      "siktirgit",
      "siktirir",
      "siktiririm",
      "siktiriyor",
      "siktirlan",
      "siktirolgit",
      "sittimin",
      "skcem",
      "skecem",
      "skem",
      "sker",
      "skerim",
      "skerm",
      "skeyim",
      "skiim",
      "skik",
      "skim",
      "skime",
      "skmek",
      "sksin",
      "sksn",
      "sksz",
      "sktiimin",
      "sktrr",
      "skyim",
      "slaleni",
      "sokam",
      "sokarım",
      "sokarim",
      "sokarm",
      "sokarmkoduumun",
      "sokayım",
      "sokaym",
      "sokiim",
      "soktuğumunun",
      "sokuk",
      "sokum",
      "sokuş",
      "sokuyum",
      "soxum",
      "sulaleni",
      "sülalenizi",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "s.k",
      "s.keyim",
      "vajina",
      "vajinanı",
      "xikeyim",
      "yaaraaa",
      "yalarım",
      "yalarun",
      "orospi",
      "orospinin",
      "orospının",
      "orospı",
      "yaraaam",
      "yarak",
      "yaraksız",
      "yaraktr",
      "yaram",
      "yaraminbasi",
      "yaramn",
      "yararmorospunun",
      "yarra",
      "yarraaaa",
      "yarraak",
      "yarraam",
      "yarraamı",
      "yarragi",
      "yarragimi",
      "yarragina",
      "yarragindan",
      "yarragm",
      "yarrağ",
      "yarrağım",
      "yarrağımı",
      "yarraimin",
      "yarrak",
      "yarram",
      "yarramin",
      "yarraminbaşı",
      "yarramn",
      "yarran",
      "yarrana",
      "yarrrak",
      "yavak",
      "yavş",
      "yavşak",
      "yavşaktır",
      "yrrak",
      "zigsin",
      "zikeyim",
      "zikiiim",
      "zikiim",
      "zikik",
      "zikim",
      "ziksiin",
      "ağzına",
      "am",
      "mk",
      "amcık",
      "amcıkağız",
      "amcıkları",
      "amık",
      "amın",
      "amına",
      "amınakoyim",
      "amınoğlu",
      "amina",
      "amini",
      "amk",
      "amq",
      "anan",
      "ananı",
      "ananızı",
      "ananizi",
      "aminizi",
      "aminii",
      "avradını",
      "avradini",
      "anasını",
      "b.k",
      "bok",
      "boktan",
      "boşluk",
      "dalyarak",
      "dasak",
      "dassak",
      "daşak",
      "daşşak",
      "daşşaksız",
      "durum",
      "ensest",
      "erotik",
      "fahişe",
      "fuck",
      "g*t",
      "g*tü",
      "g*tün",
      "g*tüne",
      "g.t",
      "gavat",
      "gay",
      "gerızekalıdır",
      "gerizekalı",
      "gerizekalıdır",
      "got",
      "gotunu",
      "gotuze",
      "göt",
      "götü",
      "götüne",
      "götünü",
      "götünüze",
      "götüyle",
      "götveren",
      "götvern",
      "guat",
      "hasiktir",
      "hasiktr",
      "hastir",
      "i.ne",
      "ibne",
      "ibneler",
      "ibneliği",
      "ipne",
      "ipneler",
      "it",
      "iti",
      "itler",
      "kavat",
      "kıç",
      "kıro",
      "kromusunuz",
      "kromusunuz",
      "lezle",
      "lezler",
      "nah",
      "o.ç",
      "oç.",
      "okuz",
      "orosbu",
      "orospu",
      "orospucocugu",
      "orospular",
      "otusbir",
      "otuzbir",
      "öküz",
      "penis",
      "pezevenk",
      "pezevenkler",
      "pezo",
      "pic",
      "piç",
      "piçi",
      "piçinin",
      "piçler",
      "pis",
      "pok",
      "pokunu",
      "porn",
      "porno",
      "puşt",
      "sex",
      "s.tir",
      "sakso",
      "salak",
      "sanane",
      "sanane",
      "sçkik",
      "seks",
      "serefsiz",
      "serefsz",
      "serefszler",
      "sex",
      "sıçmak",
      "sıkerım",
      "sıkm",
      "sıktır",
      "si.çmak",
      "sicmak",
      "sicti",
      "sik",
      "sikenin",
      "siker",
      "sikerim",
      "sikerler",
      "sikert",
      "sikertirler",
      "sikertmek",
      "sikeyim",
      "sikicem",
      "sikiim",
      "sikik",
      "sikim",
      "sikime",
      "sikimi",
      "sikiş",
      "sikişken",
      "sikişmek",
      "sikm",
      "sikmeyi",
      "siksinler",
      "siktiğim",
      "siktimin",
      "siktin",
      "siktirgit",
      "siktir",
      "siktirgit",
      "siktirsin",
      "siqem",
      "skiym",
      "skm",
      "skrm",
      "sktim",
      "sktir",
      "sktirsin",
      "sktr",
      "sktroradan",
      "sktrsn",
      "snane",
      "sokacak",
      "sokarim",
      "sokayım",
      "sülaleni",
      "şerefsiz",
      "şerefsizler",
      "şerefsizlerin",
      "şerefsizlik",
      "tasak",
      "tassak",
      "taşak",
      "taşşak",
      "travesti",
      "yarak",
      "yark",
      "yarrağım",
      "yarrak",
      "yarramın",
      "yarrk",
      "yavşak",
      "yrak",
      "yrk",
      "ebenin",
      "ezik",
      "o.ç.",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sperm",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "amına",
      "ebenin",
      "ezik",
      "fahişe",
      "gavat",
      "gavurundölü",
      "gerizekalı",
      "göte",
      "götü",
      "götüne",
      "götünü",
      "lan",
      "mal",
      "o.ç.",
      "orospu",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikilmiş",
      "siktir",
      "sperm",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "bok",
      "aq",
      "a.q.",
      "amk",
      "am",
      "ebenin",
      "fahişe",
      "gavat",
      "gerizakalı",
      "gerizekalı",
      "göt",
      "göte",
      "götü",
      "götüne",
      "götsün",
      "piçsin",
      "götsünüz",
      "piçsiniz",
      "götünüze",
      "kıçınız",
      "kıçınıza",
      "götünü",
      "hayvan",
      "ibne",
      "ipne",
      "kahpe",
      "kaltak",
      "lan",
      "mal",
      "o.c",
      "oc",
      "manyak",
      "o.ç.",
      "oç",
      "orospu",
      "öküz",
      "pezevenk",
      "piç",
      "puşt",
      "salak",
      "serefsiz",
      "sik",
      "sikkırığı",
      "sikerler",
      "sikertmek",
      "sikik",
      "sikiim",
      "siktim",
      "siki",
      "sikilmiş",
      "siktir",
      "siktir",
      "sperm",
      "şerefsiz",
      "taşak",
      "totoş",
      "yarak",
      "yarrak",
      "yosma",
      "aq",
      "a.q.",
      "amk",
      "amına",
      "amınakoyim",
      "amina",
      "ammına",
      "amna",
      "sikim",
      "sikiym",
      "sikeyim",
      "siktr",
      "kodumun",
      "amık",
      "sikem",
      "sikim",
      "sikiym",
      "s.iktm",
      "s.ikerim",
      "s.ktir",
      "amg",
      "am.k",
      "a.mk",
      "amık",
      "rakı",
      "rak",
      "oruspu",
      "oc",
      "ananın",
      "ananınki",
      "bacının",
      "bacını",
      "babanın",
      "sike",
      "skim",
      "skem",
      "amcık",
      "şerefsiz",
      "piç",
      "piçinoğlu",
      "amcıkhoşafı",
      "amınasokam",
      "amkçocuğu",
      "amınferyadı",
      "amınoglu",
      "piçler",
      "sikerim",
      "sikeyim",
      "siktiğim",
      "siktiğimin",
      "amını",
      "amına",
      "amınoğlu",
      "amk",
      "ipne",
      "ibne",
      "serefsiz",
      "şerefsiz",
      "piç",
      "piçkurusu",
      "götün",
      "götoş",
      "yarrak",
      "amcik",
      "sıçarım",
      "sıçtığım",
      "aq",
      "a.q",
      "a.q.",
      "aq.",
      "a.g.",
      "ag.",
      "amınak",
      "aminak",
      "amınag",
      "aminag",
      "amınıs",
      "amınas",
      "ananı",
      "babanı",
      "anani",
      "babani",
      "bacını",
      "bacini",
      "ecdadını",
      "ecdadini",
      "sikeyim",
      "sulaleni",
      "sülaleni",
      "dallama",
      "dangalak",
      "aptal",
      "salak",
      "gerızekalı",
      "gerizekali",
      "öküz",
      "angut",
      "dalyarak",
      "sikiyim",
      "sikeyim",
      "götüne",
      "götünü",
      "siktirgit",
      "siktirgit",
      "siktirolgit",
      "siktirolgit",
      "siktir",
      "hasiktir",
      "hassiktir",
      "hassiktir",
      "dalyarak",
      "dalyarrak",
      "kancık",
      "kancik",
      "kaltak",
      "orospu",
      "oruspu",
      "fahişe",
      "fahise",
      "pezevenk",
      "pezo",
      "kocagöt",
      "ambiti",
      "götünekoyim",
      "götünekoyim",
      "amınakoyim",
      "aminakoyim",
      "amınak",
      "aminakoyayım",
      "aminakoyayim",
      "amınakoyarım",
      "aminakoyarim",
      "aminakoyarim",
      "ananısikeyim",
      "ananisikeyim",
      "ananısikeyim",
      "ananisikeyim",
      "ananisikerim",
      "ananısikerim",
      "ananisikerim",
      "ananısikerim",
      "orospucocugu",
      "oruspucocu",
      "amk",
      "amq",
      "sikik",
      "götveren",
      "götveren",
      "amınoğlu",
      "aminoglu",
      "amınoglu",
      "gavat",
      "kavat",
      "anneni",
      "annenin",
      "ananın",
      "ananin",
      "dalyarak",
      "sikik",
      "amcık",
      "siktir",
      "piç",
      "pic",
      "sie",
      "yarram",
      "göt",
      "meme",
      "dildo",
      "skcem",
      "skerm",
      "skerim",
      "skecem",
      "orrospu",
      "annesiz",
      "kahpe",
      "kappe",
      "yarak",
      "yaram",
      "dalaksız",
      "yaraksız",
      "amlı",
      "s1kerim",
      "s1kerm",
      "s1krm",
      "sikim",
      "orospuçocukları",
      "oç"
    ];
    if (küfür.some(word => newMessage.content.toLowerCase().includes(word))) {
      try {
        if (!newMessage.member.permissions.has("BAN_MEMBERS")) {
          newMessage.delete();
          
    const küfürengel = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **Bu Sunucuda** "\`Küfür Engel\`" **Sistemi Aktif**`)
    .setThumbnail(client.user.avatarURL)  

          return newMessage.channel
            .send(küfürengel)
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});

///////// KÜFÜR EGEL

//////////////////REKLAM ENGEL

client.on("message", async message => {
  const lus = await db.fetch(`reklamengel_${message.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glitch.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www",
      ".gg",
      ".tk",
      ".tr.ht",
      ".ml",
      ".ga",
      ".cf",
      ".cq"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
          message.delete();
          
    const reklamengelx = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **Bu Sunucuda** "\`Reklam Engel\`" **Sistemi Aktif**`)
    .setThumbnail(client.user.avatarURL)  

          return message.channel
            .send(reklamengelx)
          
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
client.on("messageUpdate", async (newMessage, oldMessage) => {
  const lus = await db.fetch(`reklamengel_${newMessage.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glitch.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www",
      ".gg",
      ".tk",
      ".tr.ht",
      ".ml",
      ".ga",
      ".cf",
      ".cq"
    ];
    if (
      reklamengel.some(word => newMessage.content.toLowerCase().includes(word))
    ) {
      try {
        if (!newMessage.member.permissions.has("BAN_MEMBERS")) {
          newMessage.delete();
          
    const reklamengel = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`⛔ | **Bu Sunucuda** "\`Reklam Engel\`" **Sistemi Aktif**`)
    .setThumbnail(client.user.avatarURL)  

          return newMessage.channel
            .send(reklamengel)
  
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});

// SA-AS SİSTEMİ

client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "s.a." ||
      msg.content.toLowerCase() == "selam" ||
      msg.content.toLowerCase() == "slm"
    ) {
      try {
        return msg.channel.send(`${msg.author} **Aleyküm Selam Hoşgeldin**`);
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g
moment.locale('tr');
const { S_IFREG } = require("constants");
const data = require('quick.db');
const logs = require('discord-logs');

client.on('message', async message => {
if(message.channel.type !== 'text') return;
const datas = await data.fetch(`tag.${message.guild.id}`);
if(message.content.toLowerCase().toString().includes('tag')) {
if(datas) return message.channel.send('`'+datas+'`');
};
});





client.on('message', async message => {
  if(message.channel.type !== 'text') return;
const chimped = await data.fetch(`chimped.${message.guild.id}`);
if(!chimped) return;
let command = chimped.find(a => a.command === message.content.toLocaleLowerCase());
if(command) {
message.channel.send(`${message.author} ${command.respond}`);
};
});

/// OTOROL SİSTEMİ

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;
    const otorolmesaj = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription("✅ | <@!"+ member.user.id +"> Adlı Kullanıcıya <@&"+ rol +"> Rolü Verildi")
  if (!mesaj) {
    client.channels.cache
    .get(kanal)
    .send(otorolmesaj);
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace(".üye.", `${member.user}`)
      .replace(".tag.", `${member.user.tag}`)
      .replace(".rol.", `${member.guild.roles.cache.get(rol).name}`)
      .replace(".sncad.", `${member.guild.name}`)
      .replace(".üyesayısı.", `${member.guild.memberCount}`)
      .replace(".botsayısı.", `${member.guild.members.cache.filter(m => m.user.bot).size}`)
      .replace(".bölge.", `${member.guild.region}`)
      .replace(".kanalsayısı.", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    return client.channels.cache
      .get(kanal)
      .send(mesajs);
  }
});

client.on("message", async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = "Burayı silme yoksa hatalı olur";
  else ozelkomutYazi = "" + ozelkomut + "";
  if (msg.content.toLowerCase() === ozelkomutYazi) {
    let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
    let mesajYazi;
    if (mesaj == null) mesajYazi = "Burayı silme yoksa hatalı olur";
    else mesajYazi = "" + mesaj + "";
    msg.channel.send(mesajYazi);
  }
});

/// YASAKLI TAG

client.on("guildMemberAdd", async member => {
  let guild = member.guild;
  let user = guild.members.cache.get(member.id);

  const tag = await db.fetch(`banned-tag.${guild.id}`);
  const sayı = await db.fetch(`atıldın.${guild.id}.${user.id}`);
  if (user.user.username.includes(tag)) {
    if (sayı === null) {
      await db.add(`atıldın.${guild.id}.${user.id}`, 1);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(`⛔ | ${guild.name} Adlı Sunucunun Yasaklı Tagında Bulunduğunuz İçin Atıldınız Tekrar Giriş Yapmayı Denerseniz **YASAKLANACAKSINIZ**`)
      );
      await user.kick();
    }

    if (sayı === 1) {
      await db.delete(`atıldın.${guild.id}.${user.id}`);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(`⛔ | ${guild.name} Adlı Sunucunun Yasaklı Tagında Bulunduğunuz İçin Atılmıştınız Tekrar Giriş Yapmayı Denediğiniz İçin Kalıcı Olarak **YASAKLANDINIZ**`)
       );
      await user.ban();
    }
  }
});
