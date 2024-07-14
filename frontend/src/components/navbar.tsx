import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="container mx-auto ">
			<div className="flex items-center justify-between">

			<div className="">
				<span className="text-3xl font-bold">Nft stacking Pool</span>
			</div>
			<div className="flex gap-5">

			<div className="">
				<Link to="/">Home</Link>
				<Link to="/create">Create NFT</Link>
			</div>
			<button>Connect Wallet</button>
			</div>
			</div>
		</div>
	);
};
