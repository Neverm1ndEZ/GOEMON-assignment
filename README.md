# Goemon - Token Swapping Interface (Assignment)

## Overview
Goemon is a decentralized application (dApp) that allows users to swap tokens, view real-time price updates, and connect their MetaMask wallet. The app is designed as a single-page interface that supports essential token swap functionalities and simulates transactions using a mock decentralized exchange (DEX) API or testnet (This project currently doesn't use any mock APIs. I'm just simulating the rate).

## Features
- **Wallet Connection**: Users can connect their MetaMask wallet, view their address, and see the balance of selected tokens.
- **Token Selection**: Users can select tokens to swap, e.g., ETH to DAI, using dropdowns.
- **Real-Time Price Updates**: The app displays the current exchange rate with periodic updates every 5 seconds.
- **Token Amount Input and Calculation**: Users can input the amount of the "from" token and see the calculated "to" token amount in real-time.
- **Swap Confirmation**: Simulated swap transactions with a confirmation modal showing details like amounts and estimated gas fees.
- **Error Handling**: Alerts are shown for errors such as failed wallet connection, insufficient balance, and transaction failures.

## Installation

To run this project locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/Neverm1ndEZ/goemon-assignment.git
   cd goemon-assignment
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask account.
2. **Select Tokens**: Use the dropdowns to select the tokens to swap (e.g., ETH to DAI).
3. **Enter Swap Amount**: Enter the amount in the "from" token field to calculate the equivalent amount in the "to" token field.
4. **Swap Tokens**: Click the "Swap" button. A confirmation dialog will appear to confirm the transaction.

## Project Structure

- `App.tsx`: Main component handling wallet connection, token selection, swap logic, and UI.
- `package.json`: Lists project dependencies and scripts.

## Dependencies
- **React**: Used for building the user interface.
- **ethers.js**: Library for wallet connection and Web3 interaction.
- **tailwindcss**: For styling and responsive design.
- **@radix-ui/react-dialog**: Modal component for transaction confirmations.

## Key Functionalities

- **MetaMask Wallet Integration**: Connects to MetaMask to fetch the user’s wallet address and token balances.
- **Mock Price Update**: Simulates real-time price updates every 5 seconds.
- **Swap Simulation**: Mimics a token swap with a delay and displays a confirmation dialog.

## Available Scripts

- **`npm run dev`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Previews the production build.
- **`npm run lint`**: Lints the code using ESLint.

## Acknowledgments
This project is a technical implementation based on requirements to create a token-swapping interface with real-time price updates, wallet integration, and simulated transactions.