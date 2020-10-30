
const Admin = [
    {
        path: '/Admin',
        name: 'Admin',
        icon: 'group',
        open: false,
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/UserMonitoring', component: () => import('pages/Admin/User'), name: 'User', icon: 'group_add' },
        ]
    },
]

export default Admin
