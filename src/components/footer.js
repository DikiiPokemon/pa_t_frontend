"use client";
import styles from "@/components/Footer.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/assets/LogoPAT_footer.svg"
import Logo_descr from "@/components/assets/Logo_descr_footer.svg"
import YouTube from "@/components/assets/youtube.svg"
import Link from "next/link";


const Footer = () => {
    const pathname = usePathname()


    return(
        <div className={styles.footer_wrapper}>
            <div className={styles.footer_container}>
                <div className={styles.footer_block}>
                    <div className={styles.footer_logo}>
                        <Image src={Logo} alt=""/>
                        <Image src={Logo_descr} alt={""}/>
                    </div>
                    <Link href="/privacy_policy">Политика конфиденциальности</Link>
                    <Link href="/info_politics">Политика обработки персональных данных</Link>
                    {/* <div className={styles.footer_link_youtube}>
                        <Link className={styles.link_youtube} href={"https://www.youtube.com/@PA-T/videos"} target="_blank">
                            <p>УНАЙТЕ БОЛЬШЕ О НАС:</p>
                            <Image src={YouTube} alt=""/>
                        </Link>
                    </div> */}
                    <div className={styles.footer_copyright}>2014-2026 © ПромАвтоматика-Т</div>

                </div>
                <div className={styles.footer_block}>
                    <div className={styles.footer_block_name}>РЕКВИЗИТЫ</div>
                    <div className={styles.footer_block_content}>
                        <p><span>ООО «ПромАвтоматика-Т»</span></p>
                        <p><span>ОГРН</span> 1089847292941</p>
                        <p><span>ИНН</span> 7802 441 796</p>
                        <p><span>КПП</span> 7802 01 001</p>
                        <p><span>Р/с</span> 4070 2810 2130 0000 4803 в Филиал ОПЕРУ ОАО Банк ВТБ г. Санкт-Петербург</p>
                        <p><span>К/с</span> 3010 1810 2000 0000 0704</p>
                        <p><span>БИК</span> 044030704</p>
                    </div>
                </div>
                <div className={styles.footer_block}>
                    <div className={styles.footer_block_name}>КОНТАКТЫ</div>
                    <div className={styles.footer_block_content_sub}>
                        <div className={styles.footer_block_subcontent}><span>Адрес нашего офиса:</span>
                            <a href="https://yandex.ru/maps/-/CLwaJB0F" target="_blank">194044, Санкт-Петербург, Пироговская наб., д.17 корп.5 лит.А</a>
                        </div>
                        <div className={styles.footer_block_subcontent}>
                            <p>Время приема заказов по телефону — с 9.00 до 18.00 (время московское)</p>
                        </div>
                        <div className={styles.footer_block_subcontent}>
                            <p><span>Телефоны:</span><a href="tel: +78126032310"> +7 (812) 603-23-10,</a><a href="tel: +78122235078"> +7 (812) 223-50-78</a></p>
                            <p><span>Факс:</span> +7 (812) 603-23-16</p>
                            <p><span>Email:</span><a href="mailto:tech@pa.ru"> tech@pa.ru</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer