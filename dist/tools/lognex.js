"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as path from 'path'
const FS = __importStar(require("fs"));
const color = __importStar(require("ansi-colors"));
class Lognex {
    static init() {
        process.on('uncaughtException', err => {
            Lognex.error(err.toString());
        });
        if (!FS.existsSync(Lognex.LOGFILE_PATH)) {
            FS.mkdirSync(Lognex.LOGFILE_PATH);
        }
    }
    static getNow() {
        let date = new Date();
        return [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-') + " " + [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ].join(':');
    }
    static async log(alertFile, type, value) {
        let path = await Promise.resolve().then(() => __importStar(require('path')));
        const FILE = path.basename(__filename, path.extname(__filename)) + path.extname(__filename);
        let date = new Date();
        let now = Lognex.getNow();
        let logType = '';
        switch (type) { //타입에 따른 색깔 부여
            case 'info':
                logType = color.black(color.bgCyan(type));
                break;
            case 'warn':
                logType = color.black(color.bgYellow(type));
                break;
            case 'error':
                logType = color.black(color.bgRed(type));
                break;
        }
        console.log(`${color.blue(now)}  ${logType} ${alertFile ? ` ${color.cyan(FILE)}` : ''}  |  ${value}`);
        /**
         * 로그 파일 저장 위치
         * 형식 : .../log/yyyy-mm-dd/type
         */
        let filePath = `${Lognex.LOGFILE_PATH}\\${[
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-')}`;
        if (!filePath)
            FS.mkdirSync(filePath);
        let lastLog = ''; //우선 마지막으로 저장된 로그의 값이 없을 수 있으므로 초기화한다.
        if (FS.existsSync(`${filePath}\\${type}.log`))
            lastLog = FS.readFileSync(`${filePath}\\${type}.log`).toString(); //마지막 로그가 있다면 불러온다.
        FS.writeFileSync(`${filePath}\\${type}.log`, lastLog + `${lastLog == '' ? '' : '\n'}${now}  ${type} ${alertFile ? ` ${FILE}` : ''}  |  ${value}`);
    }
    static info(value) {
        Lognex.log(true, 'info', value);
    }
    static error(value) {
        Lognex.log(true, 'error', value);
    }
    static warn(value) {
        Lognex.log(true, 'warn', value);
    }
}
exports.Lognex = Lognex;
Lognex.COLOR_TABLE = {
    info: ['bgBlue', 'white']
};
Lognex.LOGFILE_PATH = `../../log`;
