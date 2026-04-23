import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className=" border-white container">
            <hr className="w-full border-white border-[1px] mb-8" />

            <div className="flex flex-col lg:flex-row justify-between gap-8 ">

                <div className="w-full flex flex-col items-center text-center lg:text-left lg:items-start gap-4 lg:gap-2">
                    <h2>WYNFlex</h2>
                    <p className="max-w-sm lg:max-w-none">
                        Potenciando el comercio virtual, brindamos soluciones para tiendas online ¡Seguimos en redes!
                    </p>
                    <div className="flex gap-6">
                        <a href="https://api.whatsapp.com/send?phone=5491168484537"><img className="h-10" src="/media/svg/whatsapp-icon.svg" alt="" /></a>
                        <a href="https://www.instagram.com/wynflex/"><img className="h-10" src="/media/svg/instagram-icon.svg" alt="" /></a>
                        <a href="https://www.linkedin.com/in/wynflex-log%C3%ADstica-integral-935a29274/"><img className="h-10" src="/media/svg/linkedin-icon.svg" alt="" /></a>
                    </div>
                    <a className="font-normal" href="mailto:contactowynflex@gmail.com">contactowynflex@gmail.com</a>
                </div>

                <div className="border-[1px] lg:w-min flex-shrink"></div>


                <div className="w-full text-center lg:px-4 lg:text-left">
                    <div>
                        <h4>Diseñado y desarrollado por </h4>
                        <a href="https://www.linkedin.com/in/micaela-montero/" className="underline font-medium">Diseño UX/UI por Micaela Wikon
                        </a>
                        <a href="https://www.linkedin.com/in/martin-bejarano-589001206/" className="underline font-medium"> Desarrollo web por Martín Bejarano
                        </a>
                    </div>
                </div>

                <div className="border-[1px] lg:w-min flex-shrink"></div>

                <div className="w-full flex justify-center lg:justify-start gap-20 pl-4 h-full text-center lg:text-left">
                    <ul className="flex flex-col justify-center lg:justify-start">
                        <li className=" mb-8"><h4 >Secciones</h4></li>
                        <li><Link to={'/'} className="font-normal">Home</Link></li>
                        <li><Link to={'/quienes-somos'} className="font-normal">Quienes somos</Link></li>
                        <li><Link to={'/servicios'} className="font-normal">Servicios</Link></li>
                        <li><Link to={'/empleos'} className="font-normal">Sumate al equipo</Link></li>
                    </ul>
                    {/* <ul className="flex flex-col">
                        <li className=" mb-8"><h4 >Contacto</h4></li>
                        <li><Link to={'/ayuda'} className="font-normal">Centro de ayuda</Link></li>
                    </ul> */}
                </div>
            </div>

            <hr className="w-full border-white border-[1px] mt-8" />
            <p className="w-full text-xs text-center my-4">® GRUPO WYN SAS - Todos los derechos reservados - Aviso de Privacidad | Términos y Condiciones Generales | Aviso de Cookies
            </p>
        </footer>
    )
}

export default Footer