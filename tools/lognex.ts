//import * as path from 'path'
import * as FS from 'fs'
import * as color from 'ansi-colors'

export class Lognex {
    private static COLOR_TABLE : {[type:string] : string[]} = {
        info : ['bgBlue', 'white']
    }
    private static LOGFILE_PATH = `../../log`
    public static init():void {
        process.on('uncaughtException', err => {
            Lognex.error(err.toString())
        })
        if(!FS.existsSync(Lognex.LOGFILE_PATH)){
            FS.mkdirSync(Lognex.LOGFILE_PATH)
        }
    }
    private static getNow():string { //yyyy-mm-dd H:M:SC:MC
        let date = new Date()
        return [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-') + " " + [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ].join(':')
    }
    private static async log<T extends keyof typeof Lognex.COLOR_TABLE>(alertFile:boolean, type:T, value:string):Promise<void> {
        let path = await import('path')
        const FILE =  path.basename(__filename, path.extname(__filename)) + path.extname(__filename)
        let date = new Date()
        let now = Lognex.getNow()
        let logType:string = ''
        switch(type){ //타입에 따른 색깔 부여
            case 'info':
                logType = color.black(color.bgCyan(type as string))
                break;
            case 'warn':
                logType = color.black(color.bgYellow(type as string))
                break;
            case 'error':
                logType = color.black(color.bgRed(type as string))
                break;
        }
        console.log(`${color.blue(now)}  ${logType} ${alertFile ? ` ${color.cyan(FILE)}` : ''}  |  ${value}`)
        /**
         * 로그 파일 저장 위치
         * 형식 : .../log/yyyy-mm-dd/type
         */
        let filePath = `${Lognex.LOGFILE_PATH}\\${[ 
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-')}`

        if(!filePath) FS.mkdirSync(filePath)
        let lastLog = '' //우선 마지막으로 저장된 로그의 값이 없을 수 있으므로 초기화한다.
        if(FS.existsSync(`${filePath}\\${type}.log`)) lastLog = FS.readFileSync(`${filePath}\\${type}.log`).toString() //마지막 로그가 있다면 불러온다.
        FS.writeFileSync(`${filePath}\\${type}.log`, lastLog + `${lastLog == '' ? '' : '\n'}${now}  ${type} ${alertFile ? ` ${FILE}` : ''}  |  ${value}`)
    }
    public static info(value:string):void {
        Lognex.log(true, 'info', value)
    }
    public static error(value:string):void {
        Lognex.log(true, 'error', value)
    }
    public static warn(value:string):void {
        Lognex.log(true, 'warn', value)
    }
}