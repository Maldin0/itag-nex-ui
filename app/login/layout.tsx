export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="">
			<div className=" text-center  ">
				{children}
			</div>
		</section>
	);
}
