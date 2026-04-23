import { Link } from "react-router-dom"
import EmploymentForm from "../components/Forms/EmploymentForm"

const Jobs = () => {

	return (
		<div className="pt-20 px-2">
			<span className="inline-block my-20 w-full text-center">
				<h1 className="mb-4">Sumate al equipo</h1>
				<p>
					Completá este formulario si estás de acuerdo con nuestra <br />
					<Link className="font-normal underline" to='/quienes-somos'> visión y valores</Link>
				</p>
			</span>

			<EmploymentForm className='mx-auto mb-20 ' />
		</div>
	)
}

export default Jobs