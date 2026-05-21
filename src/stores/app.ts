import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types/user";
import type { ProductLink } from "@/types/productLink";
import ProductCard from "@/components/ProductCard.vue";
import type { HistoryOrder } from "@/types/history";
import { rootUser } from "@/root";

//TODO create abstract class with id and etc.
export const useAppStore = defineStore("app", () => {
  const users = ref<User[]>([]);
  const maxId = ref<number>(0);
  const lastVisitedName = ref<string>("user-account");

  let currentUser = ref<User>();

  function setLastPage(name: string) {
    lastVisitedName.value = name;
  }

  // Я не хочу прокидывать саму переменную в export, чтобы она не сохранялась в json файл
  function getLastPage(): string {
    return lastVisitedName.value;
  }

  function loadStoreData(data: any) {
    if (data.users) users.value = data.users;
    if (data.maxId) maxId.value = data.maxId;
    //TODO throw error parser

    // I'm not sure we need to load currentUser I think it's can make some error in the future
    // if (data.currentUser) currentUser.value = data.currentUser;
  }

  function checkLoginUniq(login: string): boolean {
    return users.value.some((user) => user.Login === login); //TODO remove double check
  }

  function tryLogin(login: string, password: string) {
    if (login === rootUser.Login && password === rootUser.PasswordHash) {
      currentUser.value = rootUser;
      return true;
    }

    if (checkLoginUniq(login)) {
      //TODO remove double check
      currentUser.value = users.value.find((user) => user.Login === login); // TODO remove double check return true;
      return true;
    } else {
      return false;
    }
  }

  function tryAddProductToCard(productId: number, count: number = 1) {
    console.log(currentUser.value?.Card);

    if (!checkCurrentUser()) return false;

    if (
      currentUser.value?.Card?.some(
        (ProductLink) => ProductLink.productId === productId,
      )
    ) {
      return false;
    } else {
      if (count < 0) {
        count = 1;
      }
      const newProduct: ProductLink = {
        productId: productId,
        count: count,
      };
      //TODO
      if (currentUser.value?.Card === undefined) {
        currentUser.value!.Card = [] as ProductLink[];
      }
      currentUser.value?.Card?.push(newProduct);
      console.log("Product in card!");
      return true;
    }
  }

  //TODO use indexOF
  function tryRemoveProductFromCard(productId: number) {
    if (!checkCurrentUser()) return false;

    const productLinkIndex: number = currentUser.value?.Card?.findIndex(
      (ProductLink) => ProductLink.productId === productId,
    ) as number;
    currentUser.value?.Card?.splice(productLinkIndex, 1);
    return true;
  }

  function haveProductInCard(productId: number) {
    return currentUser.value?.Card?.some(
      (ProductLink) => ProductLink.productId === productId,
    );
  }

  function order() {
    if (!checkCurrentUser) return;

    const newHistoryOrder: HistoryOrder = {
      productLinks: currentUser.value?.Card as ProductLink[],
      orderDate: new Date(),
    };
    currentUser.value?.History?.push(newHistoryOrder);

    currentUser.value?.Card?.splice(0); //Delete all product from cart
  }

  function inFavorite(productId: number): boolean {
    return currentUser.value?.Likes?.some(
      (like) => like === productId,
    ) as boolean;
  }

  function tryAddToFavorite(productId: number) {
    if (!inFavorite(productId)) {
      if (!currentUser.value?.Likes && currentUser.value) {
        currentUser.value.Likes = [] as number[];
      }
      currentUser.value?.Likes?.push(productId);
    }
  }

  function tryRemoveFromFavorite(productId: number) {
    if (inFavorite(productId)) {
      const index: number = currentUser.value?.Likes?.findIndex(
        (likeId) => productId === likeId,
      ) as number;
      currentUser.value?.Likes?.splice(index, 1);
    }
  }

  function checkCurrentUser(): boolean {
    // return currentUser.value ? true : false
    return !!currentUser.value; //another version
  }

  function logout() {
    currentUser.value = undefined;
  }

  function generateId(): number {
    maxId.value += 1;
    return maxId.value;
  }

  function addUser(user: User) {
    const newUser = {
      ...user,
      id: generateId(),
    };
    users.value.push(newUser);
  }

  function getUserById(id: number): User | undefined {
    return users.value.find((user) => user.id === id);
  }

  function updateUser(id: number, updatedData: User) {
    console.log(updateUser);

    const index = users.value.findIndex((user) => user.id === id);
    if (index !== -1) {
      updatedData.id = id;
      users.value[index] = updatedData;
      return true;
    }
    return false;
  }

  function deleteUserById(id: number) {
    console.log("User deleted");

    const index = users.value.findIndex((user) => user.id === id);
    if (index !== -1) {
      if (
        currentUser.value === users.value[index] &&
        currentUser.value.Admin === false
      ) {
        logout();
      }

      users.value.splice(index, 1);
    }
  }

  function deleteData() {
    users.value.splice(0)
    maxId.value = 0;
  }

  return {
    users,
    currentUser,
    maxId,
    loadStoreData,
    addUser,
    deleteUserById,
    getUserById,
    updateUser,
    checkCurrentUser,
    tryLogin,
    logout,
    tryAddProductToCard,
    tryRemoveProductFromCard,
    haveProductInCard,
    order,
    tryAddToFavorite,
    tryRemoveFromFavorite,
    inFavorite,
    setLastPage,
    getLastPage,
    deleteData,
  };
  // TODO incapsulate currentUser
});
