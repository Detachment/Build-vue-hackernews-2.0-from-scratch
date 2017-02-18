function sync(store, router, options) {
    var moduleName = (options || {}).moduleName || 'route'

    store.registerModule(moduleName, {
        state: cloneRoute(router),
        mutations: {
            'router/ROUTE_CHANGED': function(state, transition) {
                store.state[moduleName] = cloneRoute(transition.to, transition.from)
            }
        }
    })

    var isTimeTraveling = false
    var currentPath

    // sync router on store change
    store.watch(
        function(state) {
            return state[moduleName]
        },
        function(route) {
            if (route.fullPath === currentPath) {
                return
            }
            isTimeTraveling = true
            currentPath = route.fullPath
            router.push(route)
        }, {
            sync: true
        }
    )

    // sync store on router navigation
    router.afterEach(function(to, from) {
        if (isTimeTraveling) {
            isTimeTraveling = false
            return
        }
        currentPath = to.fullPath
        store.commit('router/ROUTE_CHANGED', {
            to: to,
            from: from
        })
    })
}

function cloneRoute(to, from) {
    var clone = {
        name: to.name,
        path: to.path,
        hash: to.hash,
        query: to.query,
        params: to.params,
        fullPath: to.fullPath,
        meta: to.meta
    }
    if (from) {
        clone.from = cloneRoute(from)
    }
    return Object.freeze(clone)
}
