// import ConnectButton from "./ConnectButton";

import ConnectButton from "./ConnectButton";

export const Dashboard = () => {
	return (
		<div className="text-green-200 font-semibold container mx-auto bg-green-900 bg-opacity-5 rounded-lg p-5 m-5 flex ">
			<div className="flex-1 flex gap-5">
				<div className=" ">
					<img
						src="https://guildaudits.com/_next/image?url=%2Flogo.png&w=1920&q=75"
						alt="Guild Audits Logo"
						className="w-full mb-5"
						// width={00}
					/>
					<h1 className="text-5xl font-extrabold text-green-50">G-A</h1>
				</div>
				<div className="">
					<h4 className="text-green-400 bg-green-950 bg-opacity-10 w-fit px-1 rounded font-semibold text-sm">
						APR
					</h4>
					<p className="">
						Common: <span className="text-green-100">0.0% </span>
					</p>
					<p className="">
						Epic: <span className="text-green-100">0.0% </span>
					</p>
					<p className="">
						Legendary: <span className="text-green-100">0.0% </span>
					</p>
					<p className="">
						Total Stake NFT:<span className="text-green-100">1 </span>
					</p>
				</div>
			</div>
			<div className="flex-1 bg-black">
				<div className="w-fit bg-green-600 p-3 ">Pending Rewards</div>
				<div className="flex bg-green-700 bg-opacity-30  outline-2 p-3 outline-green-500">
					<div className="text-3xl flex-1 text-center">
						<h3 className="">0.3432 GA</h3>
						<button className="bg-gradient-to-r from-green-600 text-2xl to-green-700 px-2 py-1">
							Harvestbutton
						</button>
					</div>
					<div className="flex-1  items-center bg-black bg-opacity-50 rounded-lg py-2 ">
						<p className="text-center">$GA connect to add to Metamask</p>
						<div className="w-fit mx-auto"><ConnectButton /></div>
					</div>
				</div>
			</div>
		</div>
	);
};
