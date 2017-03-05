import ItemList from '../components/ItemList.vue'

export function createListView(type) {
    return {
        name: `${type}-stories-view`,

        render(h){
            return h(ItemList, { props: { type }})
        }
    }
}
