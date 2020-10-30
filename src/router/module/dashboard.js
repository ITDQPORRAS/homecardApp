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
                icon: 'store'
            },
            {
                path: '/householdMonitoring',
                component: () =>
                    import ('pages/dashboard/household'),
                name: 'Household',
                icon: 'addchart'
            },
            {
                path: '/covidStatus',
                component: () =>
                    import ('pages/dashboard/covidStatus'),
                name: 'Case Status',
                icon: 'bug_report'
            }
        ]
    },
]

export default dashboard