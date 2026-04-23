import {
	Await,
	useLoaderData,
} from "react-router-dom";
import Button from "../components/Button"
import { SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
	const { data: clients } = useLoaderData();

	return (
		<>
			<div className="h-screen bg-no-repeat bg-cover max-h-[968px] min-h-[368px] pt-20 relative">
				<LazyLoadImage
					src='/media/gif/hero-gif.gif'
					wrapperClassName='absolute w-full h-full top-0 !bg-cover'
					placeholderSrc='/media/jpg/hero-placeholder.jpg'
					className="absolute z-0 w-full h-full object-cover top-0"
				/>
				<div className="absolute w-full h-[60%] bg-gradient-to-t from-5% from-yellow/40 bottom-0 left-0 z-10"></div>
				<div className="relative h-full flex flex-col justify-center items-center text-center lg:text-left lg:items-end container z-20">
					<div className="max-w-sm xl:max-w-lg">
						<h1 className="leading-snug [text-shadow:_0px_4px_5px_rgb(0_0_0_/_40%)] mb-16">
							La solución logística para tu e-commerce
						</h1>
						<p className="text-3xl leading-snug">
							Una experiencia segura, eficaz, simple y ágil.
						</p>
					</div>
				</div>
			</div>
			<div className="py-20 px-4 lg:px-0 lg:py-40 flex flex-col lg:flex-row items-center relative max-w-[1920px] mx-auto gap-10 lg:gap-0">

				<div className="relative max-w-lg lg:absolute lg:max-w-none  lg:w-[45%] lg:h-[90%]">
					<LazyLoadImage
						src='/media/gif/home-gif-0.gif'
						wrapperClassName='w-full h-full !bg-cover'
						placeholderSrc='/media/jpg/home-gif-0-placeholder.jpg'
						className="object-cover w-full h-full"
					/>
				</div>

				<div className="flex w-full mx-auto max-w-lg lg:max-w-none ">
					<div className="hidden lg:block w-[45%]"></div>

					<div className="flex flex-col lg:w-1/2 lg:max-w-md xl:max-w-lg gap-8 mx-auto">
						<h1>Quienes somos</h1>
						<p>
							Somos personas comprometidas con  brindar un servicio ágil.
							Queremos sacarte un gran peso de encima brindando la tranquilidad y seguridad de que sus envíos van a llegar a tiempo.
							Nos ocupamos por que sea simple gracias a nuestra asistencia virtual de atención personalizada disponible en toda instancia.
						</p>
						<Button type={'link'} to={'/quienes-somos'} className={'mx-auto lg:mx-0'}>Saber más</Button>
					</div>
				</div>
			</div>

			<div className="text-center my-16">
				<h1 className="mb-12">Clientes que confían en WYNFlex</h1>
				<Await
					resolve={clients}
				>
					{(clients) =>

					(
						<SwiperHOC
							loop={true}
							autoplay={{
								delay: 1,
								disableOnInteraction: false,
							}}
							desktopStyles={{
								views: 4
							}}
							mobileStyles={{
								views: 2
							}}

							speed={4000}
							allowTouchMove={false}
							modules={[Autoplay]}
							spaceBetween={0}
							className=" linear-swiper max-w-7xl relative"
							allowSlideNext={true}
							allowSlidePrev={true}
						>
							<div className="absolute w-[12%] h-full bg-gradient-to-r from-5% from-gray-dark top-0 left-0 z-20"></div>
							<div className="absolute w-[12%] h-full bg-gradient-to-l from-5% from-gray-dark top-0 right-0 z-20"></div>
							{
								clients.map((client, idx) =>
									<SwiperSlide key={idx}><img className="h-40" src={client.image} alt="" /></SwiperSlide>
								)
							}
						</SwiperHOC>
					)
					}

				</Await>
			</div>

			<div className="py-20 px-4 lg:px-0 lg:py-40 flex flex-col lg:flex-row items-center relative max-w-[1920px] mx-auto gap-10 lg:gap-0 lg:mb-32 ">
				<div className="relative max-w-lg lg:absolute lg:max-w-none right-0 lg:w-[45%] lg:h-[90%]">
					<LazyLoadImage
						src='/media/gif/home-gif-1.gif'
						wrapperClassName='w-full h-full !bg-cover'
						placeholderSrc='/media/jpg/home-gif-1-placeholder.jpg'
						className="object-cover w-full h-full"
					/>
				</div>

				<div className="flex w-full mx-auto max-w-lg lg:max-w-none ">

					<div className="flex flex-col lg:w-[1/2] lg:max-w-md gap-8 mx-auto xl:max-w-lg">
						<h1>Servicios</h1>
						<p>
							Ahorra tiempo y dinero centralizando tus envíos.
							Ofrecemos una solución integral para todas las plataformas de e-commerce, MercadoLibre, Instagram, Marketplace, TiendaNube y particulares en todo CABA y GBA.

						</p>
						<Button type={'link'} to={'/servicios'} className={'mx-auto lg:mx-0'}>Saber más</Button>
					</div>

					<div className="hidden lg:block w-[45%]"></div>
				</div>
			</div>
		</>
	)
}

export default Home