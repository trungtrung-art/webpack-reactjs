import APP from '../pages/index.js'

export default [
    {
        key: "Home",
        name: "Home",
        exact: true,
        path: "/",
        component: APP.Home,
        private: false,
    },
    {
        key: "Product",
        name: "Product",
        exact: true,
        path: "/product",
        component: APP.Product,
        private: false,
    },
    { key: "ErrorPage", component: APP.Error },
]