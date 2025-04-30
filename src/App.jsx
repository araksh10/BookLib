import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BookAdder from "./components/BookAdder";
import EditBookModal from "./components/EditBookModal";

const API_URL = "https://booksapi-production-62ca.up.railway.app/books";

function App() {
	const [books, setBooks] = useState([]);
	const [editingBook, setEditingBook] = useState(null);

	useEffect(() => {
		axios
			.get(API_URL)
			.then((res) => setBooks(res.data))
			.catch((err) => console.error("Error fetching books: ", err));
	}, []);

	const handleBookAdded = (newBook) => {
		setBooks((prev) => [...prev, newBook]);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${API_URL}/${id}`);
			setBooks((prev) => prev.filter((book) => book._id !== id));
		} catch (err) {
			console.error("Error Deleting Book: ", err);
		}
	};

	const handleUpdate = (updatedBook) => {
		setBooks((prev) =>
			prev.map((book) => (book._id === updatedBook._id ? updatedBook : book))
		);
	};

	return (
		<>
			<div>
				<h1>Add Books Here: </h1>
				<BookAdder onBookAdded={handleBookAdded} />
			</div>
			<div className="App">
				<h1>Book Viewer</h1>
				<div className="book-list">
					{books.map((book) => (
						<div key={book._id} className="book-card">
							<h2>{book.title}</h2>
							<p>
								<strong>Author:</strong> {book.author}
							</p>
							<p>
								<strong>Pages:</strong> {book.pages}
							</p>
							<p>
								<strong>Published:</strong> {book.published ? "Yes" : "No"}
							</p>
							<button onClick={() => setEditingBook(book)}>Edit</button>
							<button onClick={() => handleDelete(book._id)}>Delete</button>
						</div>
					))}
				</div>
			</div>
			{editingBook && (
				<EditBookModal
					book={editingBook}
					onClose={() => setEditingBook(null)}
					onUpdated={handleUpdate}
				/>
			)}
		</>
	);
}

export default App;
