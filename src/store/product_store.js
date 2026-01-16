import { fetchProducts } from "@/http/product_controll";
import {makeAutoObservable} from "mobx";

class ProductStore {

    loaded = false;
    products = [];
    LPS = [];
    FS = [];
    sensors = [];
    other = [];
   

    current_product = null;

    constructor() {
      this.cart = [];
      makeAutoObservable(this)
    }

    async init() {
    if (this.loaded) return; // не перезапрашивать при каждом рендере
    const data = await fetchProducts();
    this.product = data
    this.LPS = data.LPS
    this.FS = data.FS
    this.sensors = data.sensors
    this.other = data.other
    this.loaded = true;
  }

  setCart(products){
    this.cart = products
  }

  get Cart(){
    return this.cart
  }
}

export const productsStore = new ProductStore();