export const ScrolledLink = ({ href, className, text }) => {
	return (
		<a href={href} className={`main-btn ${className}`}>
			{text}
		</a>
	);
};

// export const Paragraph = (className, text) => {
// 	return <p className={className}>{text}</p>;
// };
