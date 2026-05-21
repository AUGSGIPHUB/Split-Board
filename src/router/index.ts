import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/index.vue";
import Catalog from "@/pages/Catalog.vue";
import About from "@/pages/About.vue";
import Account from "@/pages/Account.vue";
import Adminka from "@/pages/Adminka.vue";
import AddProduct from "@/components/AddProduct.vue";
import EditProducts from "@/components/EditProducts.vue";
import Users from "@/components/Users.vue";
import Registration from "@/components/Registration.vue";
import Login from "@/components/Login.vue";
import LargeProductCard from "@/components/LargeProductCard.vue";
import UserAccount from "@/components/UserAccount.vue";
import UserShopCard from "@/components/UserShopCard.vue";
import JsonProject from "@/components/JsonProject.vue";
import { useAppStore } from "@/stores/app";
import UserFavorite from "@/components/UserFavorite.vue";
import Error404 from "@/pages/error404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Index,
      name: "home",
    },
    {
      path: "/about",
      component: About,
      name: "about",
    },
    {
      path: "/catalog",
      component: Catalog,
      name: "catalog",
    },
    {
      path: "/product/:id",
      component: LargeProductCard,
      name: "product-detail",
      // beforeEnter: (to) => {
      //   const id = Number(to.params.id);
      //   if (isNaN(id)) {
      //     return { name: 'catalog' }; //TODO 404
      //   }
      // }
    },
    {
      path: "/account",
      component: Account,
      beforeEnter: (to, from, next) => {
        const useUsers = useAppStore();
        const isLoggedIn = useUsers.checkCurrentUser();

        // Other -> login without account (YES)
        // Other -> login with User (NO)

        if (to.name === "login" && !isLoggedIn) {
          next();
        } else if (to.name === "login" && isLoggedIn) {
          // const lastPage: string = useUsers.getLastPage();

          // if (lastPage) {

          // }
          next({
            name: "user-cart",
            params: { login: useUsers.currentUser?.Login },
          });
        } else {
          console.warn(
            "TO: " + to.name?.toString() + "\nFrom: " + from.name?.toString(),
          );
          next();
        }
      },
      children: [
        { path: "createUser", component: Registration, name: "registration" },
        { path: "login", component: Login, name: "login" },
        {
          path: "/user/:login",
          component: UserAccount,
          name: "user-account",
          meta: { requiresAuth: true },
        },
        {
          path: "/user/:login/cart",
          component: UserShopCard,
          name: "user-cart",
          meta: { requiresAuth: true },
        },
        {
          path: "/user/:login/favorite",
          component: UserFavorite,
          name: "user-favorite",
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/adminka",
      component: Adminka,
      name: "adminka",
      children: [
        { path: "addProduct", component: AddProduct, name: "addProduct" },
        { path: "editProducts", component: EditProducts, name: "editProducts" },
        { path: "users", component: Users, name: "users" },
        { path: "json", component: JsonProject, name: "json" },
        { path: "editProduct/:id", component: AddProduct, name: "editProduct" },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: Error404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requeresAuth = to.meta.requeresAuth;
  console.log(from.name);
  console.log(to.name);
  if (requeresAuth && noUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
