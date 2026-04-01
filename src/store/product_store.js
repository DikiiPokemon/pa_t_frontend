import { fetchProducts, fetchStock } from "@/http/product_controll";
import {makeAutoObservable} from "mobx";

class ProductStore {

    loaded = false;
    products = [];
    LPS = [];
    FS = [];
    sensors = [];
    other = [];
    stock = [];

    product_cards = [
    {
      name: "Датчики",
      products: [
        {
          href: "/catalog/current_prod_lps",
          name: "LPS датчики",
          description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          short_description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          img: "/assets/images/BDT/BDT.jpg",
          characteristic: [
            "Диапазоны измерений от 7 до 660 мм",
            "Встроенный кабель или разъемный соединитель",
            "Срок службы до 100 млн. движений",
            "Двусторонний гибкий или односторонний направленный выдвижной шток",
            "Линейность до ±0,1 % диапазона",
            "Температура до 125 градусов Цельсия",
            "Степень защиты IP 67",
            "Дублированный выходной аналоговый ±10 В или 4-20 мА",
            "Возможно исполнение на заказ",
          ],
        },
        {
          href: "/catalog/current_prod_fs",
          name: "FS датчики",
          description: "Lorem ipsum loremipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          short_description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          img: "",
          characteristic: [
            "Диапазон измерений частоты вращения, от 2 до 16000 Гц",
            "Встроенный кабель или разъемный соединитель",
            "Наработка на отказ, часы, не менее 100 тыс. часов",
            "Пределы допускаемой относительной погрешности измерений частоты вращения, ±0,1 %",
            "Выходной сигнал Аналоговый или PushPull",
            "Температура до 125 градусов Цельсия",
            "Степень защиты IP 67",
            "Возможно исполнение на заказ",
          ],
        }
      ]
    },
    {
      name: "Электронные блоки",
      products: [
        {
          href: "/catalog/current_prod_bdt",
          name: "Блок преобразования LVDT (BDT)",
          description: "Lorem ipsum loremipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          short_description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          img: "",
          characteristic: [],
        },
        {
          href: "/catalog/current_prod_bfs",
          name: "Блок преобразования FS (BFS)",
          description: "Lorem ipsum loremipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          short_description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          img: "",
          characteristic: [],
        }
      ]
    },
  ]

    current_product = null;

    constructor() {
      this.cart = [];
      makeAutoObservable(this)
    }

    async init() {
    if (this.loaded) return; // не перезапрашивать при каждом рендере
    const data = await fetchProducts();
    const st = await fetchStock();
    this.product = data
    this.LPS = data.LPS
    this.FS = data.FS
    this.sensors = data.sensors
    this.other = data.other
    this.loaded = true;
    this.stock = st;
  }

  setCart(products){
    this.cart = products
  }

  get Cart(){
    return this.cart
  }
}

export const productsStore = new ProductStore();