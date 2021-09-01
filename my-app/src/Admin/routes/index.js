import React from "react";
import Home from './../components/Home/index';
import Product from './../components/Product/index';
import Add_Product from './../components/Add_Product/index';
import NotFound from './../../screens/Screen_NotFound/index';

var routes = [
{
    path:'/admin/home/dashboard',
    exact:true,
    main:()=><Home/>
},
{
    path:'/admin/home/product',
    exact:true,
    main:()=><Product/>
},
{
    path:'/admin/home/product/add',
    exact:true,
    main:({history})=><Add_Product history={history}/>
},
{
    path:'/admin/home/product/:id/edit',
    exact:true,
    main:({match,history})=><Add_Product match={match} history={history}/>
},
{
    path: '',
    exact: false,
    main:()=><NotFound/>
},
];

export default routes