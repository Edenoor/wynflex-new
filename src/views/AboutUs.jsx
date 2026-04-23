import {
	Await,
	defer,
	useLoaderData,
} from "react-router-dom";
import Member from "../components/Member"

const AboutUs = () => {
	const { data: members } = useLoaderData();
	return (
		<div className="pt-20">
			<span className="inline-block my-20 w-full text-center">
				<h1 className="mb-4">Quienes somos</h1>
				<p>
					Una experiencia segura, eficaz, simple y ágil para tu tienda virtual
				</p>
			</span>

			<div className="lg:py-40 gap-12 lg:gap-0 flex flex-col lg:flex-row items-center relative max-w-[1920px] mx-auto px-4 lg:px-0">
				<div className="lg:absolute max-w-lg lg:max-w-none  lg:w-[45%] lg:h-[90%]">
					<img className="object-cover w-full h-full" src="/media/jpg/about-us.jpg" alt="Gif demonstrativo" />
				</div>

				<div className="flex max-w-lg lg:max-w-none w-full mx-auto mb-auto">
					<div className="hidden lg:block w-[45%]"></div>

					<div className="flex flex-col lg:w-1/2 lg:max-w-lg gap-8 mx-auto">
						<p>
							Comenzamos hace diez años brindando servicios de mensajería y cadetería.
							Nuestro objetivo de cada día es lograr el 100% de entregas aseguradas.
							Ofrecemos cobertura en todo CABA y GBA, nuestra aspiración es expandirnos a otras provincias para seguir brindando nuestro servicio como su aliado en la logística.
							También ofrecemos servicios de mensajería regular para todas las plataformas de e-commerce, Instagram, MarketPlace, TiendaNube y particulares
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row justify-between items-center lg:items-start  lg:gap-32 my-16 max-w-5xl mx-auto px-4 lg:px-0">
				<div className="flex flex-col max-w-md">
					<div className="h-[195px] flex justify-center items-center">
						<img className="w-40" src="/media/svg/grow-arrow-icon.svg" alt="" />
					</div>
					<span className="inline-block text-center">
						<h1 className="mb-4 text-center">VISIÓN</h1>
						<p className="font-medium">
							Empática. Siempre tenemos presente a las personas, eso nos permite ser un buen equipo capaz de brindar una buena experiencia.
						</p>
					</span>
				</div>

				<div className="flex flex-col max-w-md ">
					<div className="h-[195px] flex justify-center items-center">
						<img className="w-40" src="/media/svg/happy-face-icon.svg" alt="" />
					</div>
					<span className="inline-block text-center">
						<h1 className="mb-4 text-center">VALORES</h1>
						<p className="font-medium">
							Cuidamos nuestra reputación cuidando la de las empresas y emprendimientos que nos elijen.
						</p>
					</span>
				</div>

			</div>

			<div className="max-w-6xl grid lg:grid-cols-3 place-items-center gap-4 gap-y-20 my-20 mx-auto">
				<Await
					resolve={members}
					errorElement={
						<p>Loading...</p>
					}
				>
					{(members) =>
						members.map((member, idx) =>
							<Member key={idx} image={member.image} name={member.name} role={member.role} description={member.description} linkedin={member.linkedin} />
						)
					}
				</Await>
			</div>
		</div>
	)
}

export default AboutUs

