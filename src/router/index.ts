import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// export const mainRoutes: RouteRecordRaw[] = [
//    {
//       path: '/catalog',
//       name: 'catalog',
//       component: () => import('@/pages/Main/Catalog.vue'),
//       meta: {
//          existInMenu: true,
//          title: 'Каталог',
//       },
//    },
//    {
//       path: '/profile',
//       name: 'profile',
//       component: () => import('@/pages/Main/Profile.vue'),
//       meta: {
//          existInMenu: false,
//          title: 'Личный кабинет',
//          requiresAuth: true,
//       },
//    },
//    {
//       path: '/products',
//       name: 'products',
//       component: () => import('@/pages/Main/ProductList.vue'),
//       meta: {
//          existInMenu: true,
//          title: 'Все товары',
//       },
//    },
//    {
//       path: '/product',
//       name: 'product',
//       component: () => import('@/pages/Main/Product.vue'),
//       meta: {
//          existInMenu: true,
//          title: 'Товар (ИЗМЕНИТЬ)',
//       },
//    },
//    {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/pages/Main/Login.vue'),
//       meta: {
//          existInMenu: false,
//          title: 'Вход',
//       },
//    },
// ]
export const adminRoutes: RouteRecordRaw[] = [
   {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('@/pages/Admin/Product/ProductList.vue'),
      meta: {
         existInMenu: true,
         title: 'Товары',
         icon: 'fa-light fa-boxes',
      },
   },
   {
      path: '/admin/add-product',
      name: 'admin-add-product',
      component: () => import('@/pages/Admin/Product/AddProduct.vue'),
      meta: {
         existInMenu: false,
         title: 'Добавление товара',
      },
   },
   {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('@/pages/Admin/Category/CategoryList.vue'),
      meta: {
         existInMenu: true,
         title: 'Категории',
         icon: 'fa-light fa-tags',
      },
   },
   {
      path: '/admin/add-category',
      name: 'admin-add-category',
      component: () => import('@/pages/Admin/Category/AddCategory.vue'),
      meta: {
         existInMenu: false,
         title: 'Добавить категорию',
      },
   },
   {
      path: '/admin/receipts',
      name: 'admin-receipts',
      component: () => import('@/pages/Admin/Receipt/ReceiptList.vue'),
      meta: {
         existInMenu: true,
         title: 'Поступления',
         icon: 'fa-light fa-people-carry-box',
      },
   },
   {
      path: '/admin/new-receipts',
      name: 'admin-new-receipts',
      component: () => import('@/pages/Admin/Receipt/NewReceipt.vue'),
      meta: {
         existInMenu: false,
         title: 'Добавить поступление',
         icon: 'fa-light fa-person-carry-box',
      },
   },
   {
      path: '/admin/add-person',
      name: 'admin-add-person',
      component: () => import('@/pages/Admin/Person/AddPerson.vue'),
      meta: {
         existInMenu: false,
         title: 'Добавление персоны',
      },
   },
   {
      path: '/admin/counterparties',
      name: 'admin-counterparties',
      component: () =>
         import('@/pages/Admin/Counterparty/CounterpartyList.vue'),
      meta: {
         existInMenu: true,
         title: 'Поставщики',
         icon: 'fa-light fa-truck-field',
      },
   },
   {
      path: '/admin/add-counterparty',
      name: 'admin-add-counterparty',
      component: () => import('@/pages/Admin/Counterparty/AddCounterparty.vue'),
      meta: {
         existInMenu: false,
         title: 'Добавление контрагента',
      },
   },
   {
      path: '/admin/development',
      name: 'admin-development',
      component: () => import('@/pages/Admin/Development.vue'),
      meta: {
         existInMenu: false,
         title: 'В разработке',
      },
   },
]

const routes: RouteRecordRaw[] = [
   {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/Admin/Index.vue'),
      children: adminRoutes,
      redirect: {
         name: 'admin-products',
      },
   },
   {
      path: '/',
      name: 'main',
      // component: () => import('@/pages/Main/Index.vue'),
      // children: mainRoutes,
      // redirect: { name: 'catalog' },
      redirect: { name: 'admin' },
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routes,
})

// В хуке:
router.beforeEach((to) => {
   const title = to.meta.title
   document.title = title ? String(title) : 'Магазин'

   if (to.meta.requiresAuth) {
      const userStore = useUserStore()
      if (!userStore.isAuth) {
         return { name: 'login', query: { redirect: to.fullPath } }
      }
   }
})

export default router
