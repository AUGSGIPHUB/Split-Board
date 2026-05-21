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
    },
    {
      path: "/account",
      component: Account,
      children: [
        {
          path: "createUser",
          component: Registration,
          name: "registration",
          meta: { requiresUnsign: true },
        },
        {
          path: "login",
          component: Login,
          name: "login",
          meta: { requiresUnsign: true },
        },
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
      meta: { requiresAuth: true, requiresAdmin: true },
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;
  const requiresUnsign = to.meta.requiresUnsign;

  const { useAppStore } = await import("@/stores/app");
  const usersStore = useAppStore();
  const isLoggedIn = usersStore.checkCurrentUser();

  if (requiresAuth && !isLoggedIn) {
    next({ name: "login" });
    return;
  }

  if (requiresUnsign && isLoggedIn) {
    next({
      name: "user-account",
      params: { login: usersStore.currentUser?.Login },
    });
    return;
  }

  if (requiresAdmin && !usersStore.currentUser?.Admin) {
    next({ name: "home" });
    return;
  }

  next();
});

export default router;
