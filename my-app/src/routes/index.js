import React from "react";
import Home from "./../screens/Screen_Home/index";
import Login from "./../screens/Screen_Login/index";
import Cart from "./../screens/Screen_Cart/index";
import Category from "./../screens/Screen_Category/index";
import Detail_Product from "./../screens/Screen_DetailProduct/index";
import Search from "./../screens/Screen_Search/index";
import Account from "./../screens/Screen_Account/index";
import NotFound from "./../screens/Screen_NotFound/index";

var routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/login",
    exact: true,
    main: ({ location }) => <Login location={location} />,
  },
  {
    path: "/account",
    exact: true,
    main: ({ location }) => <Account location={location} />,
  },
  {
    path: "/cart",
    exact: true,
    main: () => <Cart />,
  },
  {
    path: "/category",
    exact: true,
    main: ({ match, location }) => (
      <Category match={match} location={location} />
    ),
  },

  {
    path: "/category/:name",
    exact: true,
    main: ({ match }) => <Detail_Product match={match} />,
  },
  {
    path: "/search",
    exact: true,
    main: () => <Search />,
  },

  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
