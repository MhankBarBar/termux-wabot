const {
    WAConnection,
    MessageType,
    MessageOptions
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait } = require('./lib/functions')
const { getBuffer, fetchJson } = require('./lib/fetcher')
const fs = require('fs')
const client = new WAConnection()
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const imgbb = require('imgbb-uploader')
const speed = require('performance-now')

async function start() {
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Scan the qr code above'))
	})

	client.on('credentials-updated', () => {
		fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')

	await client.connect({timeoutMs: 30*1000})

	client.on('group-participants-update', async (anu) => {
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo *${mdata.participants[1].notify}*\nSelamat datang di group *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks})
			} else if (anu.action == 'remove') {
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara 👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Api-Key' // You can get Apikey at https://mhankbarbars.herokuapp.com/api
			const msgType = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			console.log(color('[','white'), color(time), color(']','white'), 'from', color(from.split('@')[0]), 'type' , color(type))
			if (mek.key.fromMe) return // replace (mek.key.fromMe) to (!mek.key.fromMe) for make self bot
			if (type == 'conversation') {
				const body = mek.message.conversation.toLowerCase()
				const args = body.split(' ')
				if (body.startsWith('!gtts ')) {
					rendom = `${Math.floor(Math.random() * 10000)}.mp3`
					random = `${Math.floor(Math.random() * 20000)}.ogg`
					if (args.length < 1) return client.sendMessage(from, 'Masukkan kode bahasanya juga mas e', msgType.text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[1])
					const dtt = body.slice(8)
					if (!dtt) return client.sendMessage(from, 'Masukkan teks buat di jadiin suaranya juga mas e', msgType.text, {quoted: mek})
					if (dtt.length > 600) return client.sendMessage(from, 'Ngotak mas', msgType.text, {quoted: mek})
					gtts.save(rendom, dtt, function () {
						exec(`ffmpeg -i ${rendom} -ar 48000 -vn -c:a libopus ${random}`, (error, stdout, stder) => {
							let res = fs.readFileSync(random)
							client.sendMessage(from, res, msgType.audio, {ptt: true})
							fs.unlinkSync(random)
							fs.unlinkSync(rendom)
						})
					})
				} else if (body == '!ping') {
					const timestamp = speed();
					const latensi = speed() - timestamp
					client.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, msgType.text, {quoted: mek})
				} else if (body == '!meme') {
					const meme = await kagApi.memes()
					const buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, msgType.image, {quoted: mek})
				} else if (body == '!memeindo') {
					const memeindo = await kagApi.memeindo()
					const buffer = await getBuffer(`https://imgur.com/${memeindo.hash}.jpg`)
					client.sendMessage(from, buffer, msgType.image, {quoted: mek})
				} else if (body.startsWith('!nulis ')) {
					try {
						const teks = encodeURIComponent(body.slice(7))
						if (!teks) return client.sendMessage(from, 'Input teks yang ingin di tulis', msgType.text, {quoted: mek})
						const anu = await fetchJson(`https://mhankbarbars.herokuapp.com/nulis?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
						const buffer = await getBuffer(anu.result)
						client.sendMessage(from, buffer, msgType.image, {quoted: mek, caption: 'Sukses nulis ✓'})
					} catch (e) {
						console.log(`Error : ${e}`)
						client.sendMessage(from, 'Gagal nulis *X*', msgType.text, {quoted: mek})
					}
					// uncomment if you want to activate this feature
				/*} else if (body.startsWith('!tsticker ') || body.startsWith('!tstiker ')) {
					const teks = encodeURIComponent(body.slice(args[0].length))
					random = `${Math.floor(Math.random() * 10000)}.png`
					rendom = `${Math.floor(Math.random() * 20000)}.webp`
					if (!teks) return client.sendMessage(from, 'Input teks yang ingin dijadikan stiker', msgType.text, {quoted: mek})
					const anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					exec(`wget ${anu.result} -O ${random} && ffmpeg -i ${random} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(random)
						fs.unlinkSync(rendom)
					})*/
				} else if (body == '!help' || body == '!menu') {
					client.sendMessage(from, help(), msgType.text, {quoted: mek})
				} else {
					return false
				}

			} else if (type == 'imageMessage') {
				const captimg = mek.message.imageMessage.caption.toLowerCase()
				if (captimg == '!stiker' || captimg == '!sticker') {
					media = await client.downloadAndSaveMediaMessage(mek)
					rendom = `${Math.floor(Math.random() * 10000)}.webp`
					exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(rendom)
						fs.unlinkSync(media)
					})
				} else if (captimg == '!wait') {
					media = await client.downloadAndSaveMediaMessage(mek)
					let buffer = fs.readFileSync(media)
					await wait(buffer).then(res => {
						client.sendMessage(from, res.video, msgType.video, {caption: hasil.teks, quoted: mek})
						fs.unlinkSync(media)
					}).catch(err => {
						client.sendMessage(from, err, msgType.text, {quoted: mek})
						fs.unlinkSync(media)
					})
				} else {
					return
				}

			} else if (type == 'videoMessage') {
				const captvid = mek.message.videoMessage.caption.toLowerCase()
				if (captvid == '!stiker' || captvid == '!sticker') {
					media = await client.downloadAndSaveMediaMessage(mek)
					rendom = `${Math.floor(Math.random() * 10000)}.webp`
					exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(rendom)
						fs.unlinkSync(media)
					})
				} else {
					return
				}

			} else if (type == 'extendedTextMessage') {
				mok = JSON.parse(JSON.stringify(mek).replace('quotedM','m'))
				qtdMsg = mek.message.extendedTextMessage.text.toLowerCase()
				if (qtdMsg == '!stiker' || qtdMsg == '!sticker' && content.includes('imageMessage') || content.includes('videoMessage')) {
					media = await client.downloadAndSaveMediaMessage(mok.message.extendedTextMessage.contextInfo)
					rendom = `${Math.floor(Math.random() * 10000)}.webp`
					exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rendom}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(rendom)
						client.sendMessage(from, buffer, msgType.sticker, {quoted: mek})
						fs.unlinkSync(rendom)
						fs.unlinkSync(media)
					})
				} else if (qtdMsg == '!wait' && content.includes('imageMessage')) {
					media = await client.downloadAndSaveMediaMessage(mok.message.extendedTextMessage.contextInfo)
					let buffer = fs.readFileSync(media)
					await wait(buffer).then(res => {
						client.sendMessage(from, res.video, msgType.video, {caption: res.hasil, quoted: mek})
						fs.unlinkSync(media)
					}).catch(err => {
						client.sendMessage(from, err, msgType.text, {quoted: mek})
						fs.unlinkSync(media)
					})
				} else if (qtdMsg == '!toimg' && content.includes('stickerMessage')) {
					media = await client.downloadAndSaveMediaMessage(mok.message.extendedTextMessage.contextInfo)
					random = `${Math.floor(Math.random() * 10000)}.png`
					exec(`ffmpeg -i ${media} ${random}`, (error, stdout, stderr) => {
						let buffer = fs.readFileSync(random)
						client.sendMessage(from, buffer, msgType.image, {quoted: mek, caption: '>//<'})
					})
				} else {
					return
				}
			} else {
				return false
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
start().catch((err) => console.log(`Error : ${err}`))
