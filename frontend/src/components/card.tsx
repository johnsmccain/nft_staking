import { useState } from "react";
import { Button } from "./button";

export const Card = () => {
	const [nftState, setNFTSate] = useState<string>("Approve");
	const handleNFTState = () => {
		nftState === "Approve"
			? setNFTSate("Stake")
			: nftState === "Stake"
			? setNFTSate("Unstake")
			: setNFTSate("Approve");
	};
	return (
		<div className="bg-green-700 hover:bg-opacity-70 bg-opacity-10 rounded-lg  m-5 transform hover:scale-105 transition-all ease-in-out duration-300 border-2 border-opacity-30 hover:border-opacity-10 border-green-400 font-semibold max-w-56 relative overflow-hidden hover:skew-y-0 -skew-y-3 -skew-x-3 hover:skew-x-0">
			<p className="text-center p-2 absolute text-green-300 bg-black bg-opacity-50 rounded-br-3xl">
				Legendary
			</p>

			<div className="b ">
				<img
					// src="httpsou don't have any badges yet :(://source.unsplash.com/random/300x300"
					src="https://imgs.search.brave.com/9gIHB-juIvF1fZxAopBqrqtnEGiFPpsiDbEZTeNPwXU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubmlnaHRjYWZl/LnN0dWRpby8vYXNz/ZXRzL3ZpYnJhbnQt/dXBzY2FsZWQuanBn/P3RyPXctMTYwMCxj/LWF0X21heA"
					alt=""
					className="w-full hover:scale-105 transition-all ease-in-out duration-300 object-cover"
				/>
			</div>

			<div className="text-md p-2">
				<p className="text-green-200">Ends in Block</p>
				<p className="">{nftState === "Unstake" ? "23244454" : "__"}</p>
			</div>
			<div className=" flex justify-center pb-2">
				<Button handleNFTState={handleNFTState} nftState={nftState} />
			</div>
		</div>
	);
};
