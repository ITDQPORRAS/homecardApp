import Vue from 'vue'
const components = {
    'q-dlg': () =>
        import ('#/dlg'),
    'q-filter': () =>
        import ('#/filter'),
    'q-info': () =>
        import ('#/Information'),
    'q-command': () =>
        import ('#/Command'),
    'q-menus': () =>
        import ('#/menu'),
    'q-tlbr': () =>
        import ('#/Toolbar'),
}
Object.entries(components).forEach(([name, component]) => Vue.component(name, component))