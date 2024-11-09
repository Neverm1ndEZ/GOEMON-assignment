/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ethers } from "ethers";
import {
	AlertTriangle,
	ArrowDownCircle,
	RefreshCw,
	Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

// Token interface
interface Token {
	symbol: string;
	name: string;
	decimals: number;
	address: string;
	balance?: string;
}

// Mock token list
const TOKENS: Token[] = [
	{
		symbol: "ETH",
		name: "Ethereum",
		decimals: 18,
		address: "0x0000000000000000000000000000000000000000",
	},
	{
		symbol: "DAI",
		name: "Dai Stablecoin",
		decimals: 18,
		address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
	},
	{
		symbol: "USDC",
		name: "USD Coin",
		decimals: 6,
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
	},
];

const App = () => {
	// State management
	const [account, setAccount] = useState<string>("");
	const [fromToken, setFromToken] = useState<Token>(TOKENS[0]);
	const [toToken, setToToken] = useState<Token>(TOKENS[1]);
	const [fromAmount, setFromAmount] = useState<string>("");
	const [toAmount, setToAmount] = useState<string>("");
	const [exchangeRate, setExchangeRate] = useState<number>(1800); // Mock rate
	const [previousRate, setPreviousRate] = useState<number>(1800);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	// Connect wallet
	const connectWallet = async () => {
		try {
			if (
				typeof window !== "undefined" &&
				(window as any).ethereum !== undefined
			) {
				const provider = new ethers.BrowserProvider((window as any).ethereum);
				const accounts = await provider.send("eth_requestAccounts", []);
				setAccount(accounts[0]);
			} else {
				setError("Please install MetaMask!");
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			setError("Failed to connect wallet");
		}
	};

	// Mock price update
	useEffect(() => {
		const interval = setInterval(() => {
			setPreviousRate(exchangeRate);
			// Simulate price fluctuation
			setExchangeRate((prev) => prev * (0.995 + Math.random() * 0.01));
		}, 5000);

		return () => clearInterval(interval);
	}, [exchangeRate]);

	// Update to amount when from amount changes
	useEffect(() => {
		if (fromAmount) {
			const calculated = parseFloat(fromAmount) * exchangeRate;
			setToAmount(calculated.toFixed(6));
		} else {
			setToAmount("");
		}
	}, [fromAmount, exchangeRate]);

	// Swap tokens function
	const handleSwap = async () => {
		if (!account) {
			setError("Please connect your wallet first");
			return;
		}

		setIsLoading(true);
		try {
			// Simulate transaction delay
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setShowConfirmation(true);
			setIsLoading(false);
			// Reset amounts after successful swap
			setFromAmount("");
			setToAmount("");
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			setError("Transaction failed");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Swap Tokens</CardTitle>
						{account ? (
							<div className="text-sm text-gray-500">
								{`${account.slice(0, 6)}...${account.slice(-4)}`}
							</div>
						) : (
							<Button onClick={connectWallet} variant="outline" size="sm">
								<Wallet className="w-4 h-4 mr-2" />
								Connect Wallet
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent>
					{/* From Token Section */}
					<div className="space-y-4">
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="flex justify-between mb-2">
								<select
									className="bg-transparent font-medium"
									value={fromToken.symbol}
									onChange={(e) =>
										setFromToken(
											TOKENS.find((t) => t.symbol === e.target.value) ||
												TOKENS[0],
										)
									}
								>
									{TOKENS.map((token) => (
										<option key={token.symbol} value={token.symbol}>
											{token.symbol}
										</option>
									))}
								</select>
								<div className="text-sm text-gray-500">
									Balance: {fromToken.balance || "0.00"}
								</div>
							</div>
							<input
								type="number"
								value={fromAmount}
								onChange={(e) => setFromAmount(e.target.value)}
								placeholder="0.0"
								className="w-full bg-transparent text-2xl outline-none"
							/>
						</div>

						{/* Swap Arrow */}
						<div className="flex justify-center -my-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
									const temp = fromToken;
									setFromToken(toToken);
									setToToken(temp);
								}}
							>
								<ArrowDownCircle className="w-6 h-6" />
							</Button>
						</div>

						{/* To Token Section */}
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="flex justify-between mb-2">
								<select
									className="bg-transparent font-medium"
									value={toToken.symbol}
									onChange={(e) =>
										setToToken(
											TOKENS.find((t) => t.symbol === e.target.value) ||
												TOKENS[1],
										)
									}
								>
									{TOKENS.map((token) => (
										<option key={token.symbol} value={token.symbol}>
											{token.symbol}
										</option>
									))}
								</select>
								<div className="text-sm text-gray-500">
									Balance: {toToken.balance || "0.00"}
								</div>
							</div>
							<input
								type="number"
								value={toAmount}
								readOnly
								placeholder="0.0"
								className="w-full bg-transparent text-2xl outline-none"
							/>
						</div>

						{/* Exchange Rate Display */}
						<div className="flex items-center justify-between text-sm text-gray-500">
							<span>Exchange Rate</span>
							<div className="flex items-center">
								<span>{`1 ${fromToken.symbol} = ${exchangeRate.toFixed(6)} ${
									toToken.symbol
								}`}</span>
								<RefreshCw
									className={`w-4 h-4 ml-2 ${
										exchangeRate > previousRate
											? "text-green-500"
											: "text-red-500"
									}`}
								/>
							</div>
						</div>

						{/* Error Display */}
						{error && (
							<Alert variant="destructive">
								<AlertTriangle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						{/* Swap Button */}
						<Button
							className="w-full"
							disabled={!account || !fromAmount || isLoading}
							onClick={handleSwap}
						>
							{isLoading ? (
								<RefreshCw className="w-4 h-4 animate-spin" />
							) : (
								"Swap"
							)}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Confirmation Dialog */}
			<Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Swap Confirmed!</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<p>Successfully swapped:</p>
						<p>{`${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol}`}</p>
						<Button onClick={() => setShowConfirmation(false)}>Close</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default App;
