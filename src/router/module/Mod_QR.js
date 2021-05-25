/** When your routing table is too long, you can split it into small modules**/
import Layout from 'layouts/MainLayout.vue';

const Mod_QR = {
    path: '/HomeCard',
    component: Layout,
    name: '/HomeCard',
    meta: {
        title: 'Home Card',
        icon: 'museum',
        open: true
    },
    children: [{
            path: '/HomeCard/Qr',
            component: () =>
                import ('@/pages/'),
            name: '/HomeCard/Qr',
            meta: { title: 'QR', icon: 'build', open: true },
            children: [{
                    path: '/HomeCard/Qr/Generator',
                    component: () =>
                        import ('pages/qr/generator'),
                    name: 'Generator',
                    meta: { title: 'Generator', icon: 'qr_code', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/HomeCard/Qr/Reader',
                    component: () =>
                        import ('pages/qr/reader'),
                    name: 'QrReader',
                    meta: { title: 'Reader', icon: 'camera_alt', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/HomeCard/Qr/History',
                    component: () =>
                        import ('pages/qr/history'),
                    name: 'LogHistory',
                    meta: { title: 'History', icon: 'history_edu', requiresAuth: true, access: ['initiate'] },
                },
            ],
        },
        {
            path: '/Household',
            component: () =>
                import ('@/pages/'),
            name: '/Household',
            meta: { title: 'Household', icon: 'event_available' },
            children: [{
                    path: '/HomeCard/Household',
                    component: () =>
                        import ('pages/qr/household'),
                    name: '/HomeCard/Household',
                    meta: { title: 'Household', icon: 'supervisor_account', requiresAuth: true, access: ['initiate', 'save', 'update', 'view'] },
                },
                {
                    path: '/HomeCard/Covid',
                    component: () =>
                        import ('pages/qr/covid'),
                    name: '/HomeCard/Covid',
                    meta: { title: 'Covid Status', icon: 'emoji_nature', requiresAuth: true, access: ['initiate', 'save', 'update', 'view'] },
                },
                {
                    path: '/vaccineSurvey',
                    component: () =>
                        import ('pages/qr/vaccine'),
                    name: 'Vaccine Survey',
                    icon: 'emoji_nature',
                    meta: {
                        title: 'Vaccine Survey',
                        icon: 'arrow_right_alt',
                        requiresAuth: true,
                        access: ['initiate', 'save', 'update', 'view']
                    },
                },

            ],
        },
        {
            path: '/Dashboard',
            component: () =>
                import ('@/pages/'),
            name: '/Dashboard',
            meta: { title: 'Dashboard', icon: 'store' },
            children: [{
                    path: '/facilityMonitoring',
                    component: () =>
                        import ('pages/qr/dashboard'),
                    name: 'Facility',
                    meta: { title: 'Facility', icon: 'store', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/householdMonitoring',
                    component: () =>
                        import ('pages/dashboard/household'),
                    name: '/householdMonitoring',
                    meta: { title: 'Population', icon: 'addchart', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/householdBarangay',
                    component: () =>
                        import ('pages/dashboard/householdBarangay'),
                    name: 'Barangay Population',
                    meta: { title: 'Barangay Population', icon: 'addchart', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/covidStatus',
                    component: () =>
                        import ('pages/dashboard/covidStatus'),
                    name: '/covidStatus',
                    meta: { title: 'Covid Status', icon: 'bug_report', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/vaccineDash',
                    component: () =>
                        import ('pages/dashboard/vaccineDash'),
                    name: 'Vaccine',
                    meta: { title: 'Vaccine', icon: 'bug_report', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/Tracker',
                    component: () =>
                        import ('pages/dashboard/covidTracker'),
                    name: '/Tracker',
                    meta: { title: 'Contact Tracing', icon: 'scatter_plot', requiresAuth: true, access: ['initiate'] },
                },

            ],
        },
        {
            path: '/Admin',
            component: () =>
                import ('@/pages/'),
            name: '/Admin',
            meta: { title: 'Admin', icon: 'group' },
            children: [{
                    path: '/barangay',
                    component: () =>
                        import ('pages/Admin/Barangay'),
                    name: 'Barangay',
                    meta: { title: 'Barangay', icon: 'explore', requiresAuth: true, access: ['initiate', 'save', 'update', 'view'] },
                },
                {
                    path: '/facility',
                    component: () =>
                        import ('pages/Admin/Facility'),
                    name: 'Barangay',
                    meta: { title: 'Facility', icon: 'business', requiresAuth: true, access: ['initiate', 'save', 'update', 'view'] },
                },
                {
                    path: '/OnlineApprovalRegister',
                    component: () =>
                        import ('pages/Admin/OnlineApprovalRegister'),
                    name: 'OnlineApprovalRegister',
                    meta: { title: 'Register Approval', icon: 'group_add', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/OnlineApprovalMember',
                    component: () =>
                        import ('pages/Admin/OnlineApprovalMember'),
                    name: 'OnlineApprovalMember',
                    meta: { title: 'Member Approval', icon: 'group_add', requiresAuth: true, access: ['initiate'] },
                },
                {
                    path: '/UserMonitoring',
                    component: () =>
                        import ('pages/Admin/User'),
                    name: 'UserMonitoring',
                    meta: { title: 'User', icon: 'group_add', requiresAuth: true, access: ['initiate', 'save', 'update', 'view'] },
                },
                {
                    path: '/UserAccess',
                    component: () =>
                        import ('pages/Admin/UserAccess'),
                    name: '/UserAccess',
                    meta: { title: 'User Access', icon: 'lock', requiresAuth: true, access: ['initiate'] },
                },


            ],
        },

        // {
        //     path: '/Dashboard',
        //     name: 'Dashboard',
        //     icon: 'analytics',
        //     component: () =>
        //         import ('@/pages/'),
        //     children: [{
        //             path: '/facilityMonitoring',
        //             component: () =>
        //                 import ('pages/qr/dashboard'),
        //             name: 'Facility',
        //             icon: 'store',
        //             meta: {
        //                 title: 'User',
        //                 icon: 'arrow_right_alt',
        //                 requiresAuth: true,
        //                 access: ['initiate']
        //             },
        //         },
        //         {
        //             path: '/householdMonitoring',
        //             component: () =>
        //                 import ('pages/dashboard/household'),
        //             name: 'Household',
        //             icon: 'addchart',
        //             meta: {
        //                 title: 'User',
        //                 icon: 'arrow_right_alt',
        //                 requiresAuth: true,
        //                 access: ['initiate', ]
        //             },
        //         },
        //         {
        //             path: '/covidStatus',
        //             component: () =>
        //                 import ('pages/dashboard/covidStatus'),
        //             name: 'Case Status',
        //             icon: 'bug_report',
        //             meta: {
        //                 title: 'User',
        //                 icon: 'arrow_right_alt',
        //                 requiresAuth: true,
        //                 access: ['initiate']
        //             },
        //         }
        //     ]
        // },

    ],
}
export default Mod_QR;