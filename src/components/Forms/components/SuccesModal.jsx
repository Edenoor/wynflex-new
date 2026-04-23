import Button from "../../Button"

const SuccessModal = ({ closeModal }) => {
    return (<div className="w-full h-full flex flex-col justify-center items-center text-gray-dark my-auto gap-12 max-w-3xl text-center py-14">
        <h1>¡Gracias por tu interés!</h1>
        <p>
            Nos pondremos en contacto por mail.
            Mientras tanto te invitamos a conocer más sobre nuestras soluciones en nuestras <a href='https://www.instagram.com/wynflex/' className="inline font-normal underline"> redes sociales</a>.
        </p>
        <Button className='w-full' type='link' to={'/'} onClick={() => closeModal()}>Volver</Button>
    </div>)
}

export default SuccessModal