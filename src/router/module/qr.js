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
                icon: 'qr_code'
            },
            {
                path: '/reader',
                component: () =>
                    import ('pages/qr/reader'),
                name: 'Reader',
                icon: 'camera_alt'
            },
            {
                path: '/history',
                component: () =>
                    import ('pages/qr/history'),
                name: 'History',
                icon: 'history_edu'
            },
            {
                path: '/household',
                component: () =>
                    import ('pages/qr/household'),
                name: 'Household',
                icon: 'supervisor_account'
            },
            {
                path: '/covidCase',
                component: () =>
                    import ('pages/qr/covid'),
                name: 'Covid Status',
                icon: 'emoji_nature'
            },
        ]
    },
]

export default admin