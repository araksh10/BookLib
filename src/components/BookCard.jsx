import React from "react";

const BookCard = ({ title, author, pages, published }) => {
	return (
		<div className="bg-white shadow rounded-xl hover:shadow-lg p-4 transition duration-300">
			<h3 className="text-xl font-bold mb-2">{title}</h3>
			<p className="text-gray-700 mb-1">Author: {author}</p>
			<p className="text-gray-700 mb-1">Pages: {pages}</p>
			<p className="inline-block px-2 py-1 rounded text-xs font-semibold text-gray-700">
				Status:{" "}
				<span className={published ? "text-green-600" : "text-red-600"}>
					{published ? "Published" : "Unpublished"}
				</span>
			</p>
		</div>
	);
};

export default BookCard;
