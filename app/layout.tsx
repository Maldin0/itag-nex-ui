import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { AuthProvider } from "./context/AuthProvider";


export const metadata: Metadata = {
	title: {
		default: "ITAG",
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"bg-cover font-sans img1 antialiased",
					fontSans.variable
				)}
			><AuthProvider>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="max-w-12 pt-16 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3" style={{userSelect: 'none'}}>
							<p>ITAG Project Web-Game</p>
						</footer>
					</div>
				</Providers>
				</AuthProvider>
			</body>
		</html>
	);
}
