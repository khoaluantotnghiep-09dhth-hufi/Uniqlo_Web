import React from "react";


const Home = React.lazy(() => import('../components/Home/index'));

const routes = [
    { path: '/admin/home', exact: true, name: 'Home', component: Home },
]
// var routes = [
// {
//     path:'/admin/home/dashboard',
//     exact:true,
//     main:()=><Home/>
// },
// {
//     path:'/admin/home/product',
//     exact:true,
//     main:()=><Product/>
// },
// {
//     path:'/admin/home/product/add',
//     exact:true,
//     main:({history})=><Add_Product history={history}/>
// },
// {
//     path:'/admin/home/product/:id/edit',
//     exact:true,
//     main:({match,history})=><Add_Product match={match} history={history}/>
// },
// {
//     path: '',
//     exact: false,
//     main:()=><NotFound/>
// },
// ];

export default routes