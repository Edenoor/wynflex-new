
const LoadingScreen = () => {
	return (
		<div className="pt-20 fixed h-full w-full z-40 bg-gray-dark flex justify-center items-center ">
			<img className=" h-48 animate-bounce animate-infinite" src="/media/svg/shipping-box-icon.svg" alt="" />
		</div>
	)
}

export default LoadingScreen