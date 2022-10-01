const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: "role",
	description: "Gérer les rôles des membres du serveur",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    botPerms: ["ManageRoles"],
    userPerms: ["ManageRoles"],
	options: [
        {
            name: 'members',
            description: 'Gérer les rôles des membres',
            type: 2,
            options: [
                {
                    name: 'add',
                    description: 'Ajouter un rôle à un membre',
                    type: 1,
                    options: [
                        {
                            name: 'role',
                            description: 'Le rôle que vous souhaitez ajouter',
                            type: 8,
                            required: true
                        },
                        {
                            name: 'member',
                            description: 'Le membre à qui vous souhaitez ajouter le rôle',
                            type: 6,
                            required: true
                        }
                    ],
                },
                {
                    name: 'remove',
                    description: 'Retirer un rôle à un membre',
                    type: 1,
                    options: [
                        {
                            name: 'role',
                            description: 'Le rôle que vous souhaitez retirer',
                            type: 8,
                            required: true
                        },
                        {
                            name: 'member',
                            description: 'Le membre à qui vous souhaitez retirer le rôle',
                            type: 6,
                            required: true
                        }
                    ],
                },
            ]
        },
        {
            name: 'manage',
            description: 'Gérer les rôles sur le serveur',
            type: 2,
            options: [
                {
                    name: 'delete',
                    description: 'Supprimer un rôle',
                    type: 1,
                    options: [
                        {
                            name: 'role',
                            description: 'Le rôle que vous souhaitez supprimer',
                            type: 8,
                            required: true
                        },
                    ],
                },
            ],
        }
    ],
	run: async (client, interaction) => {
	 if(interaction.options._subcommand === 'ajouter') {
                const role = interaction.options.getRole('role');
    
                let membre =  interaction.options.getUser('membre');
                membre = interaction.guild.members.cache.get(membre.id);

                await membre.roles.add(role.id);
                const embed = new EmbedBuilder()
                .setTitle('Rôle ajouté')
                .setDescription(`Le rôle ${role} a bien été ajouté à <@${membre.id}>`)
                .setColor('Green')
                .setTimestamp()
                .setThumbnail(membre.user.displayAvatarURL())
                .setFooter({ text: client.user.tag, iconURL: client.user.avatarURL() });
        
                return interaction.reply({ embeds: [embed] })

        } else if(interaction.options._subcommand === 'retirer') {
                const role = interaction.options.getRole('role');
    
                let membre =  interaction.options.getUser('membre');
                membre = interaction.guild.members.cache.get(membre.id);

                await membre.roles.remove(role.id);
                const embed = new EmbedBuilder()
                .setTitle('Rôle enlevé')
                .setDescription(`Le rôle ${role} a bien été enlevé à <@${membre.id}>`)
                .setColor('Red')
                .setTimestamp()
                .setThumbnail(membre.user.displayAvatarURL())
                .setFooter({ text: client.user.tag, iconURL: client.user.avatarURL() });
        
                return interaction.reply({ embeds: [embed] })
        } else if(interaction.options._subcommand === 'supprimer') {

                const role = interaction.options.getRole('role');
                await interaction.guild.roles.delete(role.id);

                const embed = new EmbedBuilder()
                .setTitle('Rôle supprimé')
                .setDescription(`Le rôle ${role} a bien été supprimé`)
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: client.user.tag, iconURL: client.user.avatarURL() });

                return interaction.reply({ embeds: [embed] });
        }
    }
};
