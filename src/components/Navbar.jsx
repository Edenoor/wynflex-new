import { NavLink } from "react-router-dom"
import routes from "../routes"
import Menu from "./Menu"
import { motion } from "framer-motion"

const linkVariants = {
	opened: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: -25,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	}
}

const menuVariants = {
	closed: {
		opacity: 0,
		pointerEvents: "none",
		transition: { staggerChildren: 0.05, staggerDirection: -1 }
	},

	opened: {
		opacity: 1,
		pointerEvents: "auto",
		transition: { staggerChildren: 0.07, delayChildren: 0.2 }
	}
}

const Navbar = () => {
	return (
		<nav className="bg-gray-dark fixed w-full z-50">
			<div className="w-full container h-20">
				<ul className="flex gap-10 text-2xl items-center h-full">
					<li className="mr-auto">
						<NavLink to={'/'} className={({ isActive }) =>
							` text-4xl
							${isActive ? "text-yellow" : "text-white"}
							`
						}>
							wynFlex
						</NavLink>
					</li>
					{routes[0].children.map((item, idx) => item.name ?
						<li key={idx} className="hidden lg:block">
							<NavLink className={({ isActive }) =>
								isActive ? "text-yellow" : "text-white"
							} to={item.path}>{item.name}</NavLink>
						</li>
						: null)}
					<Menu className="lg:hidden">
						<Menu.Trigger className='' />

						<Menu.Content
							className="absolute w-screen h-screen top-0 left-0 flex flex-col gap-8 justify-center items-center text-lg font-bold bg-gray-dark z-[-1]"
							variants={menuVariants}
						>
							<motion.span
								variants={linkVariants}
								onClick={e => {
									e.target.parentElement.click();
								}}
							>
								<NavLink
									to={'/'}
									className={({ isActive }) =>
										isActive ? "text-yellow" : "text-white"
									}
								>
									Inicio
								</NavLink>
							</motion.span>
							{routes[0].children.map((item, idx) => item.name ?
								<motion.span
									key={idx}
									variants={linkVariants}
									onClick={e => {
										e.target.parentElement.click();
									}}
								>
									<NavLink
										className={({ isActive }) =>
											isActive ? "text-yellow" : "text-white"
										}
										to={item.path}
									>
										{item.name}
									</NavLink>
								</motion.span>
								: null)}
						</Menu.Content>
					</Menu>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar