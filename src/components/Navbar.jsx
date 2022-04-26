import useSession from '../hooks/useSession.js';
import { FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs'
import { useState } from 'react'

const Navbar = ({ children }) => {
	const { user, handleLogout } = useSession();

	const { role } = JSON.parse(user)

	const [showDropdown, setShowDropdown] = useState(false)

	const toggleDropdown = () => setShowDropdown(!showDropdown)

	const showClass = showDropdown ? '' : 'hidden';

	return (
		<div className="relative bg-black p-4 flex justify-between items-center lg:justify-end">
			{children}
			<div>
				<button className="flex items-center pr-2" onClick={toggleDropdown}>
					<FaAngleDown className="ml-2 w-6 h-6"/>
				</button>
			</div>
				<div id="dropdownDivider" class={`absolute top-full right-0 z-20 divide-y rounded-b-lg shadow w-full md:w-80 bg-neutral-900 divide-gray-600 ${showClass}`}>
				    <ul class="py-1 text-sm text-gray-200" aria-labelledby="dropdownDividerButton">
				      <li>
				        <a href={role === 'admin' ? `/admin/usuario/` : `/dashboard/usuario/`} class="block px-6 py-4 hover:bg-red-600 hover:text-white">Mi perfil</a>
				      </li>
				    </ul>
				    <button onClick={handleLogout} class="w-full text-left px-6 py-4 text-sm text-gray-200 hover:bg-red-600 hover:text-white">Cerrar sesión</button>
				</div>
		</div>
	);
};

export default Navbar;
