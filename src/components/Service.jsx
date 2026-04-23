import Button from "./Button"

const Service = ({ full, className, ...otherProps }) => {

    return (
        <div {...otherProps} className={` ${className ? className : ''} bg-white text-gray-dark max-w-lg px-8 py-8 flex flex-col items-center rounded-xl overflow-hidden gap-6 xl:gap-10 ${full ? 'shadow-2xl shadow-yellow' : ''} `}>
            <span className="text-center inline-block h-22 lg:h-40 max-w-sm">
                {!full ? <h1 className="[text-shadow:_0px_0px_3px_rgb(0_0_0_/_40%)]">WYNFlex</h1> : <h1 className="[text-shadow:_0px_0px_3px_rgb(0_0_0_/_40%)]">WYN<span className="text-yellow">Full</span></h1>}
                <p>{!full ? 'Buscamos y enviamos tus productos a domicilio en todo CABA y GBA.' : 'Almacenamos, empaquetamos y enviamos tus productos a domicilio en todo CABA y GBA.'}</p>
            </span>
            <ul className="flex flex-col gap-5 mr-auto">
                <li className={`${!full ? 'opacity-30' : ''}`}><img className="inline-block mr-5" src="/media/svg/car-icon.svg" alt="" />Retiro ó recepción de envíos</li>
                <li><img className="inline-block mr-5" src="/media/svg/gps-path-icon.svg" alt="" />Colecta de envíos</li>
                <li className={`${!full ? 'opacity-30' : ''}`}><img className="inline-block mr-5" src="/media/svg/storage-icon.svg" alt="" />Almacenamiento de productos</li>
                <li className={`${!full ? 'opacity-30' : ''}`}><img className="inline-block mr-5" src="/media/svg/picking-icon.svg" alt="" />Picking, Packing y etiquetado</li>
                <li className={`${!full ? 'opacity-30' : ''}`}><img className="inline-block mr-5" src="/media/svg/packaging-icon.svg" alt="" />Packaging</li>
                <li className={`${!full ? 'opacity-30' : ''}`}><img className="inline-block mr-5" src="/media/svg/stock-icon.svg" alt="" />Control de Stock</li>
                <li><img className="inline-block mr-5" src="/media/svg/speed-icon.svg" alt="" />Entregas Flex de 16 a 21 hs</li>
                <li><img className="inline-block mr-5" src="/media/svg/delivery-1-icon.svg" alt="" />Entregas No Flex al día siguiente</li>
                <li><img className="inline-block mr-5" src="/media/svg/location-icon.svg" alt="" />CABA y GBA</li>
                <li><img className="inline-block mr-5" src="/media/svg/kangaroo-icon.svg" alt="" />Pick It Point</li>
                <li><img className="inline-block mr-5" src="/media/svg/support-icon.svg" alt="" />Seguimiento online</li>
                <li><img className="inline-block mr-5" src="/media/svg/assistance-icon.svg" alt="" />Asistencia personalizada 24 hs</li>
            </ul>
            <Button type={'link'} to={`/servicios/contratar/?full=${full}`} className={'w-full mt-auto'}>Contratar</Button>
        </div>
    )
}

export default Service