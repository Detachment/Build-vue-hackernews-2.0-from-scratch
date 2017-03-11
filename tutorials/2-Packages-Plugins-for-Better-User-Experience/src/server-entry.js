import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// this exported function will be called by 'bundleRenderer'.
// this is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// since data fetching is async, this function is expected to
// return a Promise that resolve to the app instance
export default context => {
    const s = isDev && Date.now()

    // set router's location
    router.push(context.url)
    const matchedComponents = router.getMatchedComponents()

    // no matched routes
    if(!matchedComponents.length){
        return Promise.reject({code: '404'})
    }

    // call preFetch hooks on components matched by the route.
    // a preFetch hook dispatches a store action and returns a Promise,
    // which is resolved when the action is complete and store state has been
    // updated
    return Promise.all(matchedComponents.map(component => {
        if(component.preFetch){
            return component.preFetch(store)
        }
    })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
        // after all preFetch hooks are resolved, out store is now
        // filled with the state needed to render the app
        // expose the state on the render context, and let the request
        // handler inline the state in the HTML response. This allows the
        // client-side store to pick-up the server-side state without having to
        // duplicate the initial data fetching on the client
        context.initialState = store.state
        return app
    })
}
