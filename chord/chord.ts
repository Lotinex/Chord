import * as Discord from 'discord.js'
import * as fs from 'fs'
/*export function tellraw(channel:Discord.TextChannel, text: string | chord.Loose<Discord.MessageEmbed>): Promise<Discord.Message> | undefined{
    if(!channel || !text) return;
    return channel.send(typeof text == "string" ? text : {embed : text})
}*/
export class Command {

    private readonly selector : Chord;
    private readonly prefix : string;
    private readonly command : string;
    private readonly executeFunction : chord.commandExecuteFunction;

    constructor(selector: Chord, prefix: string, command: string, executeFunction: chord.commandExecuteFunction){
        this.selector = selector
        this.prefix = prefix
        this.command = command
        this.executeFunction = executeFunction
    }
    private matchWithCommand(msg: Discord.Message):boolean {
        return msg.content == this.prefix + this.command
    }
    public setRule(rule?:chord.ARGS_TYPE_TABLE):Command {
        if(!rule){
            this.selector.on('message', msg => {
                if(this.command.match(/(.*?) (\[arg\] *)+/)){
                    if(msg.content.startsWith(this.prefix + this.command.split(' ')[0])){
                        let args = msg.content.substr(msg.content.indexOf(' ') + 1).split(' ')
                        this.executeFunction(msg, ...args)
                    }
                }else {
                    if(this.matchWithCommand(msg)) this.executeFunction(msg)
                }
            })
            return new Command(this.selector, this.prefix, this.command, this.executeFunction)
        }else { //여기가 룰을 정했을 때
            this.selector.on('message', msg => {
                if(this.command.match(/(.*?) (\[arg\] *)+/)){
                    if(msg.content.startsWith(this.prefix + this.command.split(' ')[0])){
                        let args = msg.content.substr(msg.content.indexOf(' ') + 1).split(' ')
                        this.executeFunction(msg, ...args)
                    }
                }else {
                    if(this.matchWithCommand(msg)) this.executeFunction(msg)
                }
            })
            return new Command(this.selector, this.prefix, this.command, this.executeFunction)
        }
    }
}
export class Chord extends Discord.Client {
    public static EMBED_COLOR_TABLE : {[colorKey in chord.COLORS] : number} = {
        red : 0xFF0000,
        blue : 0x001EFF,
        yellow : 0xF0FF00,
        pink : 0xFF00FB,
        skyblue : 0x00FFEE,
        purple : 0x8C00FF,
        black : 0x000000,
        white : 0xFFFFFF,
        green : 0x30FF00
    }
    public static COMMAND_REGEX = /(.*?) (\[arg\] *)+/
    public prefix : string;
    private channel : Discord.TextChannel | null;
    private msg : Discord.Message | null;
    constructor(prefix :string = "!"){
        super()
        this.prefix = prefix
        this.channel = null
        this.msg = null
        this.on('message', msg => {
            this.channel = msg.channel as Discord.TextChannel
            this.msg = msg
        })
    }
    public tellraw(value: string | chord.Loose<chord.Embed>): Promise<Discord.Message> | undefined {
        if(typeof value != "string"){

            const newEmbed : any = value;

            newEmbed.color = Chord.EMBED_COLOR_TABLE[value.color as chord.COLORS]

            return this.channel?.send({embed : newEmbed})

        }else {
            return this.channel?.send(value)
        }
    }
    public setCommand(command: string, executeFunction: chord.commandExecuteFunction):void {
        this.on('message', msg => {
            if(command.match(/(.*?) (\[arg\] *)+/)){
                if(msg.content.startsWith(this.prefix + command.split(' ')[0])){
                    let args = msg.content.substr(msg.content.indexOf(' ') + 1).split(' ')
                    executeFunction(msg, ...args)
                }
            }else {
                if(msg.content == this.prefix + command){
                    executeFunction(msg)
                }
            }
        })
    }
}
export function area(title: string | number, value: string | number, inline:boolean= false):Discord.EmbedField {
    return {
        name : title as string,
        value : value as string,
        inline : inline
    }
}