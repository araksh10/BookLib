import React from "react";

const BookCard = ({
	title,
	author,
	pages,
	published,
	onDelete,
	onBookEdit,
}) => {
	return (
		<div className="bg-white shadow rounded-xl hover:shadow-lg p-4 transition duration-300">
			<h3 className="text-xl font-bold mb-2 capitalize">{title}</h3>
			<p className="text-gray-700 mb-1">Author: {author}</p>
			<p className="text-gray-700 mb-1">Pages: {pages}</p>
			<p className="inline-block px-2 py-1 rounded text-xs font-semibold text-gray-700">
				Status:{" "}
				<span className={published ? "text-green-600" : "text-red-600"}>
					{published ? "Published" : "Unpublished"}
				</span>
			</p>
			<div className="mt-2 select-none flex justify-between">
				<button
					className="px-4 py-2 mr-2 bg-cyan-700 border-cyan-500 border-2 rounded text-white font-semibold"
					onClick={onBookEdit}
				>
					Edit
				</button>
				<button
					className="px-4 py-2 mr-2 border-red-500 border-2 rounded font-semibold"
					onClick={() => onDelete()}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default BookCard;
