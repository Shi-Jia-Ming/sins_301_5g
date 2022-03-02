import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

let url = location.href
url = url.substring(url.indexOf('#'), -1)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/dataVisualization',
    component: () => import('@/views/dataVisualization/index'),
    children: [
      {
        path: `${url}#/dataVisualization`,
        meta: { title: '数据可视化', icon: 'dashboard' }
      }
    ]
  },
  // 设备管理
  {
    path: '/equipment',
    component: Layout,
    meta: { title: '设备管理', icon: 'dashboard' },
    redirect: '/equipment/mattress',
    children: [
      {
        path: 'mattress',
        name: 'Mattress',
        component: () => import('@/views/equipmentManagement/intelligentMattress/index'),
        meta: { title: '智能床垫' }
      },
      {
        path: 'mattressDetail',
        name: 'MattressDetail',
        component: ()=> import('@/views/equipmentManagement/intelligentMattress/detail'),
        hidden: true,
        meta: { title: '智能床垫-详情' }
      },
      {
        path: 'mattressHistoryChart',
        name: 'MattressHistoryChart',
        component: ()=> import('@/views/equipmentManagement/intelligentMattress/historyChart'),
        hidden: true,
        meta: { title: '智能床垫历史统计图' }
      },
      {
        path: 'armband',
        name: 'Armband',
        component: () => import('@/views/equipmentManagement/monitoringOfTheArmband/index'),
        meta: { title: '监测臂环' }
      },
      {
        path: 'armbandDetail',
        name: 'ArmbandDetail',
        component: ()=> import('@/views/equipmentManagement/monitoringOfTheArmband/detail'),
        hidden: true,
        meta: { title: '监测臂环-详情' }
      },
      {
        path: 'armbandHistoryChart',
        name: 'ArmbandHistoryChart',
        component: ()=> import('@/views/equipmentManagement/monitoringOfTheArmband/historyChart'),
        hidden: true,
        meta: { title: '监测臂环历史统计图' }
      },
      {
        path: 'fiber',
        name: ' Fiber',
        component: ()=> import('@/views/equipmentManagement/fiberTemperatureDetection/index'),
        meta: { title: '光纤测温' }
      },
      {
        path: 'fiberDetail',
        name: 'FiberDetail',
        component: ()=> import('@/views/equipmentManagement/fiberTemperatureDetection/detail'),
        hidden: true,
        meta: { title: '光纤测温-详情' }
      },
      {
        path: 'fiberHistoryChart',
        name: 'FiberHistoryChart',
        component: ()=> import('@/views/equipmentManagement/fiberTemperatureDetection/historyChart'),
        hidden: true,
        meta: { title: '光纤测温历史统计图' }
      },
      {
        path: 'infusionPump',
        name: ' InfusionPump',
        component: ()=> import('@/views/equipmentManagement/intelligentHydraulicFluidsPump/index'),
        meta: { title: '智能控程输液泵' }
      },
      {
        path: 'infusionPumpDetail',
        name: 'InfusionPumpDetail',
        component: ()=> import('@/views/equipmentManagement/intelligentHydraulicFluidsPump/detail'),
        hidden: true,
        meta: { title: '智能控程输液泵-详情' }
      },
      {
        path: 'infusionPumpHistoryChart',
        name: 'InfusionPumpHistoryChart',
        component: ()=> import('@/views/equipmentManagement/intelligentHydraulicFluidsPump/historyChart'),
        hidden: true,
        meta: { title: '智能控程输液泵历史统计图' }
      },
      {
        path: 'earTemperature',
        name: ' EarTemperature',
        component: ()=> import('@/views/equipmentManagement/earTemperatureMonitoringSensor/index'),
        meta: { title: '耳温监测传感器' }
      },
      {
        path: 'earTemperaturePumpDetail',
        name: 'EarTemperaturePumpDetail',
        component: ()=> import('@/views/equipmentManagement/earTemperatureMonitoringSensor/detail'),
        hidden: true,
        meta: { title: '耳温监测传感器-详情' }
      },
      {
        path: 'earTemperatureHistoryChart',
        name: 'EarTemperatureHistoryChart',
        component: ()=> import('@/views/equipmentManagement/earTemperatureMonitoringSensor/historyChart'),
        hidden: true,
        meta: { title: '耳温监测传感器历史统计图' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
