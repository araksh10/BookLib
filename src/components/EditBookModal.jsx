import axios from "axios";
import React, { useEffect, useState } from "react";

const EditBookModal = ({ book, onUpdated, onClose, onLoading }) => {
	const [form, setForm] = useState(book);
	const API_URL = "https://booksapi-production-62ca.up.railway.app/books";

	useEffect(() => {
		setForm(book);
	}, [book]);

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
			const response = await axios.put(`${API_URL}/${form._id}`, form);
			onUpdated(response.data.book);
			onClose();
			onLoading();
		} catch (err) {
			console.error("Error updating book: ", err);
		}
	};

	return (
		<div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-cyan-200 p-6 rounded-4xl shadow-lg border w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">Edit Book</h2>
				<form onSubmit={handleSubmit}>
					<input
						name="title"
						className="w-full mb-2 p-2 bg-white border rounded"
						value={form.title}
						onChange={handleChange}
						required
					/>
					<input
						name="author"
						className="w-full mb-2 p-2 bg-white border rounded"
						value={form.author}
						onChange={handleChange}
						required
					/>
					<input
						name="pages"
						className="w-full mb-2 p-2 bg-white border rounded"
						type="number"
						value={form.pages}
						onChange={handleChange}
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
						className="px-4 py-2 mr-2 bg-blue-600 text-white rounded hover:bg-blue-800"
						type="submit"
						onClick={onLoading}
					>
						Update
					</button>
					<button
						className="mr-2 px-4 py-2 bg-indigo-400 text-white rounded hover:bg-indigo-600"
						type="button"
						onClick={onClose}
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditBookModal;
