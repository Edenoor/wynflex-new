import { Link } from "react-router-dom"
import ErrorPage from "./ErrorPage"

const Contact = () => {
	return (
		<div className="pt-20 absolute w-full h-screen bg-gray-dark flex items-center justify-center">

			<div className="container flex flex-col gap-6">
				<hr className="w-full border-white border-[1px] mb-8" />
				<p className="max-w-xl">
					Potenciando el comercio virtual, brindamos soluciones para tiendas online ¡Seguimos en redes!
				</p>

				<div className="flex gap-6">
					<a href="https://es-la.facebook.com/wynflexlogistica"><img className="h-10" src="/media/svg/facebook-icon.svg" alt="" /></a>
					<a href="https://www.instagram.com/wynflex/"><img className="h-10" src="/media/svg/instagram-icon.svg" alt="" /></a>
					<a href="https://www.linkedin.com/in/wynflex-log%C3%ADstica-integral-935a29274/"><img className="h-10" src="/media/svg/linkedin-icon.svg" alt="" /></a>
				</div>

				<p className="max-w-xl">
					¿Querés contratar nuestros servicios personalmente? Comunicate con nuestro equipo por what’s app
				</p>

				<a href="https://api.whatsapp.com/send?phone=5491168484537"><img className="h-10" src="/media/svg/whatsapp-icon.svg" alt="" /></a>

				<hr className="w-full border-white border-[1px] mt-8" />
			</div>


		</div>
	)
}

export default Contact