import React, { useState } from "react";
import axios from "axios";

const BookAdder = ({ onBookAdded, onClose, loading }) => {
	const [form, setForm] = useState({
		title: "",
		author: "",
		pages: "",
		published: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({
			...form,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://booksapi-production-62ca.up.railway.app/books",
				form
			);
			onBookAdded(response.data.savedBook);
			onClose();
		} catch (err) {
			console.log("Error adding books: ", err);
		}
	};

	return (
		<div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-200 p-6 rounded-4xl shadow-lg border w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">Add New Book: </h2>
				<form onSubmit={handleSubmit}>
					<input
						name="title"
						className="w-full mb-2 p-2 bg-white border rounded"
						value={form.title}
						onChange={handleChange}
						placeholder="Title"
						required
					/>
					<input
						name="author"
						className="w-full mb-2 p-2 bg-white border rounded"
						value={form.author}
						onChange={handleChange}
						placeholder="Author"
						required
					/>
					<input
						name="pages"
						className="w-full mb-2 p-2 bg-white border rounded"
						type="number"
						value={form.pages}
						onChange={handleChange}
						placeholder="Pages"
						required
					/>
					<label className="mr-2 text-gray-700">
						Published
						<input
							name="published"
							className="ml-2 w-5 h-5 text-blue-600"
							type="checkbox"
							checked={form.published}
							onChange={handleChange}
						/>
					</label>
					<button
						type="submit"
						onClick={loading}
						className="px-4 py-2 mr-2 bg-blue-600 text-white rounded hover:bg-blue-800"
					>
						Add Book
					</button>
					<button
						type="button"
						onClick={onClose}
						className="mr-2 px-4 py-2 bg-indigo-400 text-white rounded hover:bg-indigo-600"
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
};

export default BookAdder;
