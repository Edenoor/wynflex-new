
const Member = ({ image, name, role, description, linkedin, className, ...otherProps }) => {
    return (
        <div {...otherProps} className={`relative w-[15rem] h-[15rem] rounded-xl flex px-2 overflow-hidden group ${className ? className : ''}`}>
            <img className="absolute w-full h-full object-cover top-0 left-0 -z-20" src={image} alt="" />
            <div className="absolute w-full h-[20%] bg-gradient-to-t from-5% from-yellow  bottom-0 left-0 -z-10"></div>


            <span className="inline-block mt-auto [text-shadow:_0px_0px_5px_rgb(0_0_0_/_80%)]">
                <h4>{name}</h4>
                <p>{role}</p>
            </span>
            <div className="absolute bg-yellow w-full h-full z-10 left-0 top-0 translate-y-full transition-transform group-hover:translate-y-0 p-2 flex flex-col">
                <h3>{name}</h3>
                <h4>{role}</h4>
                <p className="xl:text-lg">{description}</p>
                <a href={linkedin} className="mt-auto">LinkedIN</a>
            </div>
        </div>
    )
}

export default Member