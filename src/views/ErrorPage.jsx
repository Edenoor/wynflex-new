import Button from "../components/Button"

const ErrorPage = ({ error = "La pagina que estas buscando no existe." }) => {
	return (
		<div className="absolute flex w-full h-full bg-gray-dark pt-20">
			<div className="flex flex-col lg:flex-row items-center justify-between container my-auto gap-10 lg:gap-0">

				<img className="h-40 lg:h-80 mx-auto" src="/media/svg/cone-icon.svg" alt="" />
				<div className="mx-auto text-center h-full gap-8 flex flex-col justify-between items-center">
					<h1>{error}</h1>
					<Button className={'w-full max-w-xs'} type={'link'} to={'/'}>Volver al inicio</Button>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage