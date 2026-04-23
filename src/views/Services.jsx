import Service from "../components/Service"
import { SwiperHOC } from "../components/HOC/SwiperHOC"
import { SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

const Services = () => {
	return (
		<div className="pt-20">
			<div className="mt-20 container w-full text-center">
				<h1 className="mb-4">Selecciona el servicio que necesites </h1>
				<p>
					Una experiencia segura, eficaz, simple y ágil para tu tienda virtual
				</p>
			</div>

			<div className="flex gap-12 justify-center my-20">
				<SwiperHOC
					className="overflow-visible w-full max-w-lg lg:max-w-6xl px-2 lg:px-10"
					wrapperClass=''
					modules={[Pagination]}

					desktopStyles={{
						views: 2
					}}
					mobileStyles={{
						views: 1
					}}
					spaceBetween={20}
				>
					<SwiperSlide>
						{({ isActive }) => (
							<Service full={false} className={`transition duration-[400ms] ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-75'} lg:opacity-100 lg:scale-100 lg:transition-none`} />
						)}
					</SwiperSlide>
					<SwiperSlide>
						{({ isActive }) => (
							<Service full={true} className={`transition duration-[400ms] ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-75'} lg:opacity-100 lg:scale-100 lg:transition-none`} />
						)}

					</SwiperSlide>
				</SwiperHOC>
			</div>

			<div className="flex flex-col items-center lg:flex-row justify-between my-28 gap-8 container">
				<div className="flex flex-col max-w-sm xl:max-w-md text-center">
					<div className="h-[180px] flex justify-center items-center">
						<img className="w-36" src="/media/svg/grow-arrow-icon.svg" alt="" />
					</div>
					<span className="inline-block">
						<h3 className="mb-4">El crecimiento que buscas</h3>
						<p className="">
							Es mas rápido, con tu operación logística en buenas manos
						</p>
					</span>
				</div>
				<div className="flex flex-col max-w-sm xl:max-w-md text-center">
					<div className="h-[180px] flex justify-center items-center">
						<img className="w-36" src="/media/png/time-icon.png" alt="" />
					</div>
					<span className="inline-block">
						<h3 className="mb-4">Ahorra tiempo y dinero</h3>
						<p className="">
							Centralizando tus envíos en una logística de atención personalizada
						</p>
					</span>
				</div>
				<div className="flex flex-col max-w-sm xl:max-w-md text-center">
					<div className="h-[180px] flex justify-center items-center">
						<img className="w-36" src="/media/svg/happy-face-icon.svg" alt="" />
					</div>
					<span className="inline-block">
						<h3 className="mb-4">Te recomendarán</h3>
						<p className="">
							Gracias a una buena experiencia en los envíos de tus ventas
						</p>
					</span>
				</div>

			</div>
		</div>
	)
}

export default Services