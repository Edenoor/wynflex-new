import { Link } from "react-router-dom"

const Button = ({ children, type, className, to, ...otherProps }) => {

    if (type !== 'link') {
        return (
            <button className={` text-3xl text-center max-w-[215px] bg-yellow text-gray-dark rounded-full px-6 py-1 font-bold disabled:bg-gray ${className ? className : ''}`.trim()} type={type} {...otherProps} >
                {children}
            </button>
        )
    }


    return (
        <Link className={` text-3xl text-center max-w-[215px] bg-yellow text-gray-dark rounded-full px-6 py-1 font-bold disabled:bg-gray ${className ? className : ''}`.trim()} to={to} {...otherProps} >
            {children}
        </Link>
    )
}

export default Button