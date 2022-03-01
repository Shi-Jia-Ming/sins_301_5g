import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意：子菜单仅在 route children.length >= 1 时出现
 * 详情见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden：如果设置为true，则项目不会显示在侧边栏中（默认为false）
 * alwaysShow: true 如果设置为 true，将始终显示根菜单
 * 如果不设置 alwaysShow，当 item 有多个子路由时，
 * 会变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect 如果设置 noRedirect 将不会在面包屑中重定向
 * name:'router-name' <keep-alive> 使用的名称（必须设置！！！）
 * meta：{
    roles: ['admin','editor'] 控制页面角色（可以设置多个角色）
    title: 'title' 侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 侧边栏中显示的图标
    breadcrumb: false 如果设置为 false，该项目将隐藏在面包屑中（默认为 true）
    activeMenu: '/example/list' 如果设置路径，侧边栏会高亮你设置的路径
  }
*/ 


/**
  * 常量路由
  * 没有权限要求的基本页面
  * 所有角色都可以访问
*/
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
        path: 'http://localhost:9527/#/dataVisualization',
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
