const dashboard = [

    {
        path: '/Dashboard',
        name: 'Dashboard',
        icon: 'analytics',
        open: false,
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '/facilityMonitoring',
                component: () =>
                    import ('pages/qr/dashboard'),
                name: 'Facility',
                icon: 'store',
                meta: {
                    title: 'Facility',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate']
                },
            },
            {
                path: '/householdMonitoring',
                component: () =>
                    import ('pages/dashboard/household'),
                name: 'Household',
                icon: 'addchart',
                meta: {
                    title: 'Household',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate', ]
                },
            },
            {
                path: '/covidStatus',
                component: () =>
                    import ('pages/dashboard/covidStatus'),
                name: 'Covid Status',
                icon: 'bug_report',
                meta: {
                    title: 'Covid Status',
                    icon: 'arrow_right_alt',
                    requiresAuth: true,
                    access: ['initiate']
                },
            }
        ]
    },
]

export default dashboard