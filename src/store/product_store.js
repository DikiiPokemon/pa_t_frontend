import { fetchLPSPrices, fetchProducts, fetchSensorsPrices, fetchStock } from "@/http/product_controll";
import {makeAutoObservable} from "mobx";

class ProductStore {

    loaded = false;
    products = [];
    LPS = [];
    FS = [];
    sensors = [];
    other = [];
    stock = [];
    lps_prices = [];
    sensors_prices = [];

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
          img: "/assets/images/BDT/BDT.jpg",
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
          img: "/assets/images/BDT/BDT.jpg",
          characteristic: [],
        },
        {
          href: "/catalog/current_prod_bfs",
          name: "Блок преобразования FS (BFS)",
          description: "Lorem ipsum loremipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          short_description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
          img: "/assets/images/BDT/BDT.jpg",
          characteristic: [],
        }
      ]
    },
  ]

  reviews = [
      {
        name: "ПАО \"Юнипро\"",
        url: "/assets/reviews/Uni_pro.jpg",
      }, 
      {
        name: "ООО \"Турбосистема\"",
        url: "/assets/reviews/turbo_system.jpg",
      },
       {
        name: "ООО \"ТСА-Сервис\"",
        url: "/assets/reviews/TSA_service.jpg",
      },
       {
        name: "АО \"Жамбыльская ГРЭС\"",
        url: "/assets/reviews/GRES_Jambilskaia.jpg",
      },
       {
        name: "ООО НПФ \"Цифровые Системы Регулирования\"",
        url: "/assets/reviews/Digit_system..jpg",
      },
       {
        name: "АО \"АЛМАТИНСКИЕ ЭЛЕКТРИЧЕСКИЕ СТАНЦИИ\"",
        url: "/assets/reviews/Almata.jpg",
      },
    ]

    merquee = [
      {
        url: "/assets/images/customers/Gasprom.png",
      },
      {
        url: "/assets/images/customers/Jam.png",
      },
      {
        url: "/assets/images/customers/RusGidro.png",
      },
      {
        url: "/assets/images/customers/TSA.svg",
      },
      {
        url: "/assets/images/customers/Turbosystem.svg",
      },
      {
        url: "/assets/images/customers/Unipro.svg",
      },
      {
        url: "/assets/images/customers/Jam.png",
      },
      {
        url: "/assets/images/customers/Jam.png",
      },
      {
        url: "/assets/images/customers/Jam.png",
      },
      {
        url: "/assets/images/customers/Jam.png",
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
    const l_price = await fetchLPSPrices();
    const s_price = await fetchSensorsPrices();
    this.product = data
    this.LPS = data.LPS
    this.FS = data.FS
    this.sensors = data.sensors
    this.other = data.other
    this.loaded = true;
    this.stock = st;
    this.lps_prices = l_price;
    this.sensors_prices = s_price;
  }

  setCart(products){
    this.cart = products
  }

  get Cart(){
    return this.cart
  }
}

export const productsStore = new ProductStore();