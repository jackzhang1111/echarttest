import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
import test2 from '@/components/test2'
import test3 from '@/components/test3'
import maptest from '@/components/maptest'
import relimap from '@/components/relimap'
import bdmaptest from '@/components/bdmaptest'
import echartbdmap from '@/components/echartbdmap'
import echartlists from '@/components/echartlists'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/test3',
      name: 'test3',
      component: test3
    },
    {
      path: '/maptest',
      name: 'maptest',
      component: maptest
    },
    {
      path: '/relimap',
      name: 'relimap',
      component: relimap
    },
    {
      path: '/bdmaptest',
      name: 'bdmaptest',
      component: bdmaptest
    },
    {
      path: '/echartbdmap',
      name: 'echartbdmap',
      component: echartbdmap
    },
    {
      path: '/echartlists',
      name: 'echartlists',
      component: echartlists
    }
  ]
})
