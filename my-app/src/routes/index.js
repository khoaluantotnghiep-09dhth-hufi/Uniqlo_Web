import React from "react";
import Home from "./../screens/Screen_Home/index";
import Login from "./../screens/Screen_Login/index";
import Cart from "./../screens/Screen_Cart/index";
import CheckOut from "./../screens/Screen_CheckOut/index";
import Category from "./../screens/Screen_Category/index";
import Detail_Product from "./../screens/Screen_DetailProduct/index";
import Search from "./../screens/Screen_Search/index";
import Account from "./../screens/Screen_Account/index";
import NotFound from "./../screens/Screen_NotFound/index";
import Contact from "./../screens/Screen_Contact/index"
import Return_Policy from "./../screens/Screen_ReturnPolicy/index"
import Guide from "./../screens/Screen_Guide/index"
import Accessibility from "./../screens/Screen_Accessibility/index"
import Privacy_Policy from "./../screens/Screen_PrivacyPolicy/index"

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
    path: "/checkout",
    exact: true,
    main: () => <CheckOut />,
  },
  {
    path: "/contact",
    exact: true,
    main: () => <Contact />,
  },
  {
    path: "/return_policy",
    exact: true,
    main: () => <Return_Policy />,
  },
  {
    path: "/guide",
    exact: true,
    main: () => <Guide />,
  },
  {
    path: "/accessibility",
    exact: true,
    main: () => <Accessibility />,
  },
  {
    path: "/privacy_policy",
    exact: true,
    main: () => <Privacy_Policy />,
  },
  {
    path: "/product/:name_object/:name_sectors/:name_category",
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
    path: "/search/:input_Search",
    exact: true,
    main: ({ match }) => <Search match={match} />,
  },

  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
