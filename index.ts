import { Chord, area } from './chord/chord'
import { Lognex } from './tools/lognex'
import * as Config from './json/config.json'
const Bot = new Chord(';')
Lognex.init()
Bot.setCommand('방만들기 [arg]', (msg, roomName) => {
    Bot.tellraw({
        title : '방 생성',
        color : 'blue',
        description : roomName
    })
    Lognex.info(`${msg.author.username} 님이 ${roomName} 방을 생성했습니다.`)
})


Bot.login(Config.token)