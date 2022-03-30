import MainLayout from '@/layout/index.vue'

const frameIn = {
  path: '/',
  redirect: '/upload',
  component: MainLayout,
  children: [
    {
      path: '/upload',
      name: 'UploadImage',
      component: () => import('@/views/index.vue'),
    }
  ]
}


export default [frameIn]