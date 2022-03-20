import { Link } from 'react-router-dom';

const Banner = () => {
	return (
		<>
			<div className="bg-black flex justify-center py-2 px-4">
				<img
					src={'assets/images/heading-2.png'}
					alt="heading"
					className="w-full max-w-5xl contrast-100 saturate-200 brightness-125"
				/>
			</div>
			<div className="max-w-4xl mx-auto py-2 bg-neutral-900 flex justify-around lg:justify-between items-center">
				<Link to="/">
					<img
						src={'/assets/images/upt-logo-2.svg'}
						alt="heading"
						className="h-8 md:h-12"
					/>
				</Link>
				<p className="text-xs md:text-base font-extralight">
					Universidad Politécnica Territorial
					<span className="font-bold">{` "José Félix Ribas"`}</span>
				</p>
			</div>
		</>
	);
};

export default Banner;
