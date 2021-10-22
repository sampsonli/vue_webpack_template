const PcList = () => import('./pages/list/index.vue' /* webpackChunkName: "pc_list" */);
const Pc = () => import('./' /* webpackChunkName: "pc" */);
export default {
    component: Pc,
    children: [
        {
            path: 'list',
            name: 'pc/list',
            component: PcList,
        },
        {
            path: '',
            redirect: { name: 'pc/list' },
        },
    ],
};
