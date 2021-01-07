//生成随机戳
export function createTimestamp() {
    return parseInt(new Date().getTime()) + '';
}