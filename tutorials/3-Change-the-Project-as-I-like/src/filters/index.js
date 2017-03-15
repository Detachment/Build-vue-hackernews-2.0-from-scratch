export function host(url) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if(parts[0] == 'www') parts.shift()
    return parts.join('.')
}

export function timeAgo(time){
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    }else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    }else {
        return pluralize(~~(between / 86400), ' day')
    }
}

export function time(milliseconds) {
    const readTime = milliseconds * 1000
    const date = new Date(readTime)
    const Y = date.getFullYear() + '-'
        , M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 ) + '-'
        , D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ) + ' '
        , h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ) + ':'
        , m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ) + ':'
        , s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )

    return Y + M + D + "\n " + h + m + s
}

function pluralize(time, label) {
    if(time == 1){
        return time + label
    }
    return time + label + 's'
}
