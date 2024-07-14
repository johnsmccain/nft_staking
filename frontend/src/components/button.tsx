export const Button = ({ handleNFTState, nftState }: any) => {
	return (
		<button
			onClick={() => handleNFTState()}
			className="bg-green-800 text-white px-5 py-2 rounded">
			{nftState}
		</button>
	);
};
