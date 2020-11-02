const Admin = [{
    path: '/Admin',
    name: 'Admin',
    icon: 'group',
    open: false,
    component: () =>
        import ('layouts/MainLayout.vue'),
    children: [{
            path: '/UserMonitoring',
            component: () =>
                import ('pages/Admin/User'),
            name: 'User',
            icon: 'group_add',
            meta: {
                title: 'User',
                icon: 'arrow_right_alt',
                requiresAuth: true,
                access: ['initiate', 'save', 'update', 'view']
            },
        },
        {
            path: '/UserAccess',
            component: () =>
                import ('pages/Admin/UserAccess'),
            name: 'User Access',
            icon: 'group_add',
            meta: {
                title: 'User',
                icon: 'arrow_right_alt',
                requiresAuth: true,
                access: ['initiate', 'save', 'update', 'view']
            },
        },
    ]
}, ]

export default Admin