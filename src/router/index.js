import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

let url = location.href
url = url.substring(url.indexOf('#'), -1)

export const constantRoutes = [
  {/* 登录界面 */
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {/* 404界面 */
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {/* 根路由，登录界面 */
    path: '/',
    component: Layout,
    redirect: '/login'
  },
  // 设备管理
  {/* 设备管理主界面 */
    path: '/equipment',
    component: Layout,
    meta: { title: '设备管理', icon: 'dashboard' },
    redirect: '/equipment/mattress',
    children: [
      {/* 蓝牙手表管理界面 */
        path: 'bluetoothWatch',
        name: 'BluetoothWatch',
        component: ()=> import('@/views/equipmentManagement/bluetoothWatch/index'),
        meta: { title: '心率体温蓝牙手表' }
      },
      {/* 蓝牙手表详细内容界面 */
        path: 'bluetoothWatchDetail',
        name: 'BluetoothWatchDetail',
        component: ()=> import('@/views/equipmentManagement/bluetoothWatch/detail'),
        hidden: true,
        meta: { title: '心率体温蓝牙手表-详情' }
      },
      {/* 心率体温蓝牙手表历史统计图 */
        path: 'bluetoothWatchHistoryChart',
        name: 'BluetoothWatchHistoryChart',
        component: ()=> import('@/views/equipmentManagement/bluetoothWatch/historyChart'),
        hidden: true,
        meta: { title: '心率体温蓝牙手表历史统计图' }
      },
      // {
      //   path: 'infusionPump',
      //   name: ' InfusionPump',
      //   component: ()=> import('@/views/equipmentManagement/intelligentHydraulicFluidsPump/index'),
      //   meta: { title: '便携式智能输液泵' }
      // },
      // {
      //   path: 'infusionPumpDetail',
      //   name: 'InfusionPumpDetail',
      //   component: ()=> import('@/views/equipmentManagement/intelligentHydraulicFluidsPump/detail'),
      //   hidden: true,
      //   meta: { title: '便携式智能输液泵-详情' }
      // },
      // {
      //   path: 'infusionPumpHistoryChart',
      //   name: 'InfusionPumpHistoryChart',
      //   component: ()=> import('@/views/equipmentManagement/intelligentHydraulicFluidsPump/historyChart'),
      //   hidden: true,
      //   meta: { title: '便携式智能输液泵历史统计图' }
      // },
      {
        path: 'mattress',
        name: 'Mattress',
        component: () => import('@/views/equipmentManagement/intelligentMattress/index'),
        meta: { title: '睡眠生命体征监测垫' }
      },
      {
        path: 'mattressDetail',
        name: 'MattressDetail',
        component: ()=> import('@/views/equipmentManagement/intelligentMattress/detail'),
        hidden: true,
        meta: { title: '睡眠生命体征监测垫-详情' }
      },
      {
        path: 'mattressHistoryChart',
        name: 'MattressHistoryChart',
        component: ()=> import('@/views/equipmentManagement/intelligentMattress/historyChart'),
        hidden: true,
        meta: { title: '睡眠生命体征监测垫历史统计图' }
      },
      // {
      //   path: 'fiber',
      //   name: ' Fiber',
      //   component: ()=> import('@/views/equipmentManagement/fiberTemperatureDetection/index'),
      //   meta: { title: '便携式核心体温测量仪' }
      // },
      // {
      //   path: 'fiberDetail',
      //   name: 'FiberDetail',
      //   component: ()=> import('@/views/equipmentManagement/fiberTemperatureDetection/detail'),
      //   hidden: true,
      //   meta: { title: '便携式核心体温测量仪-详情' }
      // },
      // {
      //   path: 'fiberHistoryChart',
      //   name: 'FiberHistoryChart',
      //   component: ()=> import('@/views/equipmentManagement/fiberTemperatureDetection/historyChart'),
      //   hidden: true,
      //   meta: { title: '便携式核心体温测量仪历史统计图' }
      // },{
      //   path: 'armband',
      //   name: 'Armband',
      //   component: () => import('@/views/equipmentManagement/monitoringOfTheArmband/index'),
      //   meta: { title: '运动训练体征监测臂环' }
      // },
      // {
      //   path: 'armbandDetail',
      //   name: 'ArmbandDetail',
      //   component: ()=> import('@/views/equipmentManagement/monitoringOfTheArmband/detail'),
      //   hidden: true,
      //   meta: { title: '运动训练体征监测臂环-详情' }
      // },
      // {
      //   path: 'armbandHistoryChart',
      //   name: 'ArmbandHistoryChart',
      //   component: ()=> import('@/views/equipmentManagement/monitoringOfTheArmband/historyChart'),
      //   hidden: true,
      //   meta: { title: '运动训练体征监测臂环历史统计图' }
      // },
      // {
      //   path: 'earTemperature',
      //   name: ' EarTemperature',
      //   component: ()=> import('@/views/equipmentManagement/earTemperatureMonitoringSensor/index'),
      //   meta: { title: '运动核心体温监测耳机' }
      // },
      // {
      //   path: 'earTemperaturePumpDetail',
      //   name: 'EarTemperaturePumpDetail',
      //   component: ()=> import('@/views/equipmentManagement/earTemperatureMonitoringSensor/detail'),
      //   hidden: true,
      //   meta: { title: '运动核心体温监测耳机-详情' }
      // },
      // {
      //   path: 'earTemperatureHistoryChart',
      //   name: 'EarTemperatureHistoryChart',
      //   component: ()=> import('@/views/equipmentManagement/earTemperatureMonitoringSensor/historyChart'),
      //   hidden: true,
      //   meta: { title: '运动核心体温监测耳机历史统计图' }
      // }
    ]
  },
  // {
  //   path: '/dataVisualization',
  //   component: () => import('@/views/dataVisualization/index'),
  //   children: [
  //     {
  //       path: `${url}#/dataVisualization`,
  //       meta: { title: '数据可视化', icon: 'dashboard' }
  //     }
  //   ]
  // },
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
