"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
/*export function tellraw(channel:Discord.TextChannel, text: string | chord.Loose<Discord.MessageEmbed>): Promise<Discord.Message> | undefined{
    if(!channel || !text) return;
    return channel.send(typeof text == "string" ? text : {embed : text})
}*/
class Command {
    constructor(selector, prefix, command, executeFunction) {
        this.selector = selector;
        this.prefix = prefix;
        this.command = command;
        this.executeFunction = executeFunction;
    }
    matchWithCommand(msg) {
        return msg.content == this.prefix + this.command;
    }
    setRule(rule) {
        if (!rule) {
            this.selector.on('message', msg => {
                if (this.command.match(/(.*?) (\[arg\] *)+/)) {
                    if (msg.content.startsWith(this.prefix + this.command.split(' ')[0])) {
                        let args = msg.content.substr(msg.content.indexOf(' ') + 1).split(' ');
                        this.executeFunction(msg, ...args);
                    }
                }
                else {
                    if (this.matchWithCommand(msg))
                        this.executeFunction(msg);
                }
            });
            return new Command(this.selector, this.prefix, this.command, this.executeFunction);
        }
        else { //여기가 룰을 정했을 때
            this.selector.on('message', msg => {
                if (this.command.match(/(.*?) (\[arg\] *)+/)) {
                    if (msg.content.startsWith(this.prefix + this.command.split(' ')[0])) {
                        let args = msg.content.substr(msg.content.indexOf(' ') + 1).split(' ');
                        this.executeFunction(msg, ...args);
                    }
                }
                else {
                    if (this.matchWithCommand(msg))
                        this.executeFunction(msg);
                }
            });
            return new Command(this.selector, this.prefix, this.command, this.executeFunction);
        }
    }
}
exports.Command = Command;
class Chord extends Discord.Client {
    constructor(prefix = "!") {
        super();
        this.prefix = prefix;
        this.channel = null;
        this.msg = null;
        this.on('message', msg => {
            this.channel = msg.channel;
            this.msg = msg;
        });
    }
    tellraw(value) {
        var _a, _b;
        if (typeof value != "string") {
            const newEmbed = value;
            newEmbed.color = Chord.EMBED_COLOR_TABLE[value.color];
            return (_a = this.channel) === null || _a === void 0 ? void 0 : _a.send({ embed: newEmbed });
        }
        else {
            return (_b = this.channel) === null || _b === void 0 ? void 0 : _b.send(value);
        }
    }
    setCommand(command, executeFunction) {
        this.on('message', msg => {
            if (command.match(/(.*?) (\[arg\] *)+/)) {
                if (msg.content.startsWith(this.prefix + command.split(' ')[0])) {
                    let args = msg.content.substr(msg.content.indexOf(' ') + 1).split(' ');
                    executeFunction(msg, ...args);
                }
            }
            else {
                if (msg.content == this.prefix + command) {
                    executeFunction(msg);
                }
            }
        });
    }
}
exports.Chord = Chord;
Chord.EMBED_COLOR_TABLE = {
    red: 0xFF0000,
    blue: 0x001EFF,
    yellow: 0xF0FF00,
    pink: 0xFF00FB,
    skyblue: 0x00FFEE,
    purple: 0x8C00FF,
    black: 0x000000,
    white: 0xFFFFFF,
    green: 0x30FF00
};
Chord.COMMAND_REGEX = /(.*?) (\[arg\] *)+/;
function area(title, value, inline = false) {
    return {
        name: title,
        value: value,
        inline: inline
    };
}
exports.area = area;
