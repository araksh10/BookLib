import React, { useState } from "react";
import axios from "axios";

const BookAdder = ({ onBookAdded }) => {
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
			setForm({ title: "", author: "", pages: "", published: false });
		} catch (err) {
			console.log("Error adding books: ", err);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="add-book-form">
			<input
				name="title"
				value={form.title}
				onChange={handleChange}
				placeholder="Title"
				required
			/>
			<input
				name="author"
				value={form.author}
				onChange={handleChange}
				placeholder="Author"
				required
			/>
			<input
				name="pages"
				type="number"
				value={form.pages}
				onChange={handleChange}
				placeholder="Pages"
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
			<button type="submit">Add Book</button>
		</form>
	);
};

export default BookAdder;
