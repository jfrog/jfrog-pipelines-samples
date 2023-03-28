import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Service from '@/components/Service'
import Bootstrap from '@/components/Bootstrap'
import User from '@/components/User'
import GetApp from '@/components/GetApp'
import Universe from '@/components/Universe'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/service',
            name: 'Service',
            component: Service
        },
        {
            path: '/bootstrap',
            name: 'Bootstrap',
            component: Bootstrap
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/app',
            name: 'App',
            component: GetApp
        },
        {
            path: '/universe',
            name: 'Universe',
            component: Universe
        }
    ]
})
