"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chord_1 = require("./chord/chord");
const lognex_1 = require("./tools/lognex");
const Config = __importStar(require("./json/config.json"));
const Bot = new chord_1.Chord(';');
lognex_1.Lognex.init();
Bot.setCommand('방만들기 [arg]', (msg, roomName) => {
    Bot.tellraw({
        title: '방 생성',
        color: 'blue',
        description: roomName
    });
    lognex_1.Lognex.info(`${msg.author.username} 님이 ${roomName} 방을 생성했습니다.`);
});
Bot.login(Config.token);
