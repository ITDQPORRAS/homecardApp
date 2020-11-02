const admin = [

    {
        path: '/Qr',
        name: 'QR',
        icon: 'qr_code',
        open: true,
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '/generator',
                component: () =>
                    import ('pages/qr/generator'),
                name: 'Generator',
                icon: 'qr_code',
                meta: {
                    title: 'User',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate']
                },
            },
            {
                path: '/reader',
                component: () =>
                    import ('pages/qr/reader'),
                name: 'Reader',
                icon: 'camera_alt',
                meta: {
                    title: 'Reader',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate']
                },
            },
            {
                path: '/history',
                component: () =>
                    import ('pages/qr/history'),
                name: 'History',
                icon: 'history_edu',
                meta: {
                    title: 'History',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate']
                },
            },
            {
                path: '/household',
                component: () =>
                    import ('pages/qr/household'),
                name: 'Household',
                icon: 'supervisor_account',
                meta: {
                    title: 'Household',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate', 'save', 'update', 'view']
                },
            },
            {
                path: '/covidCase',
                component: () =>
                    import ('pages/qr/covid'),
                name: 'Covid Status',
                icon: 'emoji_nature',
                meta: {
                    title: 'Covid Status',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate', 'save', 'update', 'view']
                },
            },
        ]
    },
]

export default admin