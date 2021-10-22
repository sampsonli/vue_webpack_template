const DemoList = () => import('./pages/list/index.vue' /* webpackChunkName: "demo_list" */);
const Demo = () => import('./' /* webpackChunkName: "demo" */);
export default {
    component: Demo,
    children: [
        {
            path: 'list',
            name: 'demo/list',
            component: DemoList,
        },
        {
            path: '/*',
            redirect: { name: 'demo/list' },
        },
    ],
};
