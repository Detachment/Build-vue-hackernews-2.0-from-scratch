var config = {
    databaseURL: "https://hacker-news.firebaseio.com"
};
firebase.initializeApp(config);

var api = firebase.database().ref('/v0');

// cache the latest story ids
api.__ids__ = {};
['top', 'new', 'show', 'ask', 'job'].forEach(type => {
    api.child(`${type}stories`).on('value', snapshot =>{
        api.__ids__[type] = snapshot.val()
    })
});

// console.log(api);

// warm the front page cache every 15 mins
warmCache();
function warmCache() {
    fetchItems((api.__ids__.top || [] ).slice(0, 30));
    setTimeout(warmCache, 1000*15*60);
};

// use Promise here to ensure have got datas before rendering
function fetch(child) {
    return new Promise((resolve, reject) => {
        api.child(child).once('value', snapshot => {
            const val = snapshot.val();
            resolve(val);
        }, reject)
    })
};

function fetchIdsByType(type) {
    return api.__ids__[type]
    ? Promise.resolve(api.__ids__[type])
    : fetch(`${type}stories`)
};

function fetchItem(id) {
    return fetch(`item/${id}`)
};

function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
};

function fetchUser(id) {
    return fetch(`user/${id}`)
};

function watchList(type, cb) {
    let first = true;
    const ref = api.child(`${type}stories`);
    const handler = snapshot => {
        if(first){
            first = false;
        }else {
            cb(snapshot.val())
        }
    };
    ref.on('value', handler)
    return () => {
        ref.off('value', handler)
    }
}
