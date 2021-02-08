const help = (prefix) => {
	return `> *Sticker Commands* <
command : *${prefix}sticker* or *${prefix}stiker*
desc : convert image/gif/video to sticker
usage : reply image/gif/video, or send image/gif/video with caption\n
command : *${prefix}sticker nobg* or *${prefix}stiker nobg*
desc : convert image to sticker while removing the background
usage : reply image, or send image with caption\n
command : *${prefix}toimg*
desc : convert sticker to image
usage : reply sticker\n
command : *${prefix}tsticker* or *${prefix}tstiker*
desc : convert text to sticker
usage : *${prefix}tsticker text in here*\n
> *Meme Commands* <
command : *${prefix}meme*
desc : random meme images [english]
usage : just send the command\n
> *Others Commands* <
command : *${prefix}tp*
desc : Text / Logo maker from textpro.me
usage : *${prefix}tp [no] [text]*\nexample : *${prefix}tp 1 YourText*
note : *${prefix}tp list* ( for show all theme )\n
command : *${prefix}ep*
desc : Text / Logo maker from ephoto360.com
usage : *${prefix}ep [no] [text]*\nexample : *${prefix}ep 1 YourText*
note : *${prefix}ep list* ( for show all theme )\n
command : *${prefix}tahta*
desc : Harta Tahta .....
usage : *${prefix}tahta [text]*\nexample : *${prefix}tahta YourText*\n
command : *${prefix}gtts*
desc : convert text to speech/audio
usage : *${prefix}gtts [cc] [text]*\nexample : *${prefix}gtts ja On2-chan*\n
command : *${prefix}loli*
desc : random loli images
usage : just send the command\n
command : *${prefix}nsfwloli*
desc : random nsfw loli images
usage : just send the command\n
command : *${prefix}url2img*
desc : take web screenshots
usage : *${prefix}url2img [tipe] [url]*\n
command : *${prefix}simi*
desc : your message will be replied to by simi
usage : *${prefix}simi yourmessage*\n
command : *${prefix}ocr*
desc : take the text in the picture
usage : reply image, or send image with caption\n
command : *${prefix}wait*
desc : search anime with image [ What Anime Is This/That ]
usage : reply image, or send image with caption\n
command : *${prefix}setprefix*
desc : replace prefix
usage : *${prefix}setprefix [text|optional]*\nexample : *${prefix}setprefix ?*
note : This command can only be used by the bot owner\n
> *Group Comands* <
command : *${prefix}add*
desc : add member into group
usage : *${prefix}add 62813xxxxx*\n
note : can only be used when the bot becomes admin, and the one who sends the command is admin!\n
command : *${prefix}kick*
desc : kick members from group
usage : *${prefix}kick @tagmember*\n
note : can only be used when the bot becomes admin, and the one who sends the command is admin!\n
command : *${prefix}promote*
desc : make the group member as group admin
usage : *${prefix}promote @tagmember*\n
note : can only be used when the bot becomes admin, and the one who sends the command is admin!\n
command : *${prefix}demote*
desc : make the group admin as group member
usage : *${prefix}demote @tagmember*\n
note : can only be used when the bot becomes admin, and the one who sends the command is admin!\n
command : *${prefix}linkgroup*
desc : take the group link
usage : just send the command
note : can only be used when the bot becomes admin, and the one who sends the command is admin!\n
command : *${prefix}leave*
desc : Make bot leave the group
usage : just send the command
note : Can only be used by Group admins and Bot owner\n
command : *${prefix}tagall*
desc : tags all group members including admins too
usage : just send the command
note : This command can be used if you are a group admin\n
command : *${prefix}simih*
desc : activate simi mode in the group
usage : *${prefix}simih 1* to activate simi mode and *${prefix}simih 0* to deactivate simi mode
note : This command can be used if you are a group admin\n`
}

exports.help = help
