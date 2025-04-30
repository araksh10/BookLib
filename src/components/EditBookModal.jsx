import axios from "axios";
import React, { useEffect, useState } from "react";

const EditBookModal = ({ book, onUpdated, onClose }) => {
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
		} catch (err) {
			console.error("Error updating book: ", err);
		}
	};

	return (
		<div>
			<div className="modal-content">
				<h2>Edit Book</h2>
				<form onSubmit={handleSubmit}>
					<input
						name="title"
						value={form.title}
						onChange={handleChange}
						required
					/>
					<input
						name="author"
						value={form.author}
						onChange={handleChange}
						required
					/>
					<input
						name="pages"
						type="number"
						value={form.pages}
						onChange={handleChange}
						required
					/>
					<label>
						Published
						<input
							name="published"
							type="checkbox"
							checked={form.published}
							onChange={handleChange}
						/>
					</label>
					<button type="submit">Update</button>
					<button type="button" onClick={onClose}>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditBookModal;
