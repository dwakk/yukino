const client = require('..');
const { EmbedBuilder } = require('discord.js');
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }
    if (typeof step == 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};

client.on("interactionCreate", async (interaction) => {
    const guildData = await client.database.fetchGuild(interaction.guildId);
    let data = {};
    data.guild = guildData;
    if(!interaction.isSelectMenu()) return;
    let embed = new EmbedBuilder()
    .setThumbnail(client.user.avatarURL())
    .setColor("Aqua")
    .setFooter({iconURL: client.user.displayAvatarURL(), text: client.user.tag})
    .setTimestamp()

    if(interaction.customId === "menu") {
        if (interaction.values[0] === "admin") {
            const admin = require("../ressources/cmds");
			const adminfr = require('../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = adminfr.adminfr;
			} else {
				a = admin.admin;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

            embed.setDescription(list.join(""));
            return interaction.update({embeds: [embed]});
        }

        if (interaction.values[0] === "fun") {
            const fun = require("../ressources/cmds");
                const funfr = require('../ressources/cmds');
                let a;
                if (data.guild.language === "fr") {
                    a = funfr.funfr;
                } else {
                    a = fun.fun;
                }
                let name = [];
                let desc = [];
                for (let i of range(a.length))
                name.push(a[i].name),
                desc.push(a[i].description);
                name = name.map(n => {
                    return `**${n}:**\n`;
                })
                desc = desc.map(d => {
                    return `${d}\n\n`;
                })
                let list = [];
                for (let i of range(a.length))
                list.push(name[i], desc[i]);
    
                embed.setDescription(list.join(""));
                return interaction.update({embeds: [embed]});
        }

        if (interaction.values[0] === "info") {
            const info = require("../ressources/cmds");
			const infofr = require('../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = infofr.infofr;
			} else {
				a = info.info;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

            embed.setDescription(list.join(""));
            return interaction.update({embeds: [embed]});
        }

        if (interaction.values[0] === "moderation") {
            const moderation = require("../ressources/cmds");
			const moderationfr = require('../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = moderation.moderation;
			} else {
				a = moderationfr.moderationfr;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

            embed.setDescription(list.join(""));
            return interaction.update({embeds: [embed]});
        }

        if (interaction.values[0] === "utility") {
            const utility = require("../ressources/cmds");
			const utilityfr = require('../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = utilityfr.utilityfr;
			} else {
				a = utility.utility;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

            embed.setDescription(list.join(""));
            return interaction.update({embeds: [embed]});
        };
        
        if (interaction.values[0] === "support") {
			const support = require("../ressources/cmds");
			const supportfr = require('../ressources/cmds');
			let a;
			if (data.guild.language === "fr") {
				a = supportfr.supportfr;
			} else {
				a = support.support;
			}
			let name = [];
			let desc = [];
			for (let i of range(a.length))
			name.push(a[i].name),
			desc.push(a[i].description);
			name = name.map(n => {
				return `**${n}:**\n`;
			})
			desc = desc.map(d => {
				return `${d}\n\n`;
			})
			let list = [];
			for (let i of range(a.length))
			list.push(name[i], desc[i]);

			embed.setDescription(list.join(""));
            return interaction.update({embeds: [embed]});
		}
    }
});