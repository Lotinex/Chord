declare namespace chord {
    type Loose<T> = {
        [P in keyof T]?: Loose<T[P]>;
    };
    type commandExecuteFunction = (message: import('discord.js').Message, ...args:string[]) => void
    type ARGS_TEXTTYPE = "string" | "number" | "special" | "korean" | "english"
    type ARGS_TYPE_TABLE = {
        arg : {length: number; type: ARGS_TEXTTYPE; ban: string | RegExp;};
        sentense : {length: number; type: ARGS_TEXTTYPE; ban: string | RegExp;};
        mention : {id: string; ban: string;};
    }
    type RULE_TABLE = {
        [argName in keyof ARGS_TYPE_TABLE] : ARGS_TYPE_TABLE[argName];
    }
    type COLORS = "red" | "blue" | "yellow" | "purple" | "pink" | "skyblue" | "green" | "black" | "white"

    type Discord_Embed = import('discord.js').MessageEmbed

    interface Embed extends Omit<Discord_Embed, 'color'>{
        color : COLORS;
    }
}