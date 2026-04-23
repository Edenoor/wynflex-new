import { useLocation } from "react-router-dom";
import BuyForm from "../components/Forms/BuyForm";

const Buy = () => {
    const location = useLocation();
    const full = new URLSearchParams(location.search).get('full');
    return (
        <div className="pt-20 container">
            <span className="inline-block my-20 w-full text-center">
                <h1 className="mb-4">Completá el formulario</h1>
                <p>
                    Para que nos contactemos automaticamente con vos
                </p>
            </span>


            <BuyForm full={full} className='mx-auto mb-20' />
        </div>
    )
}

export default Buy