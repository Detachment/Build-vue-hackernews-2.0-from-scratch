import Firebase from "firebase"
import 'firebase/database'

const config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
}
const version = '/v0'

Firebase.initializeApp(config)
const api = Firebase.database().ref(version)


if(api.onServer && !api.warmCacheStarted){
    api.warmCacheStarted = true
    warmCache()
}

function warmCache() {
    fetchItems((api.cachedIds.top || []).slice(0, 30))
    setTimeout(warmCache, 1000*60*15)
}

function fetch(child) {
    const cache = api.cachedItems
    if (cache && cache.has(child)) {
        return Promise.resolve(cache.get(child))
    }else {
        return new Promise((resolve, reject) => {
            api.child(child).once('value', snapshot => {
                const val = snapshot.val()

                if(val) val.__lastUpdated = Date.now()
                cache && cache.set(child. val)
                resolve(val)
            }, reject)
        })
    }
}

export function fetchIdsByType(type) {
    return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem(id) {
    return fetch(`item/${id}`)
}

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
    return fetch(`user/${id}`)
}

export function watchList(type, cb) {
    let first = true
    const ref = api.child(`${type}stories`)
    const handler = snapshot => {
        if (first) {
            first = false
        }else {
            cb(snapshot.val())
        }
    }
    ref.on('value', handler)
    return () => {
        ref.off('value', handler)
    }
}
