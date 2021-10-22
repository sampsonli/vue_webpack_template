const H5List = () => import('./pages/list/index.vue' /* webpackChunkName: "h5_list" */);
const H5 = () => import('./' /* webpackChunkName: "h5" */);
export default {
    component: H5,
    children: [
        {
            path: 'list',
            name: 'h5/list',
            component: H5List,
        },
        {
            path: '',
            redirect: { name: 'h5/list' },
        },
    ],
};
