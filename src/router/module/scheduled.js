
const scheduled = [

    {
        path: '/Schedule',
        name: 'Scheduled',
        icon: 'event_available',
        open: false,
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/appointment', component: () => import('pages/schedule/appointment'), name: 'Appointment', icon: 'alarm_on' },
        ]
    },
]
export default scheduled
