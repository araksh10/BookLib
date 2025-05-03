import { useEffect, useState } from "react";
import axios from "axios";
// import "./App.css";
import BookAdder from "./components/BookAdder";
import EditBookModal from "./components/EditBookModal";
import BookCard from "./components/BookCard";

const API_URL = "https://booksapi-production-62ca.up.railway.app/books";

function App() {
	const [books, setBooks] = useState([]);
	const [editingBook, setEditingBook] = useState(null);
	const [showModal, setShowModal] = useState(false);

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
			{/* <div className="min-h-screen bg-gray-100"> */}
			<header className="bg-blue-600 text-white p-4 shadow">
				<h1 className="text-2xl font-bold mb-2">My Book Library</h1>
				<button
					onClick={() => setShowModal(true)}
					className="bg-white text-blue-600 px-4 py-2 rounded shadow"
				>
					Add Book
				</button>
			</header>
			{/* </div> */}
			<main className="bg-cyan-100 p-4">
				<section>
					<h2 className="text-xl font-semibold mb-4">Book List</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{books.map((book, index) => (
							<BookCard
								key={index}
								{...book}
								onDelete={() => handleDelete(book._id)}
								onBookEdit={() => setEditingBook(book)}
							/>
						))}
					</div>
				</section>
			</main>
			{showModal && (
				<BookAdder
					onBookAdded={handleBookAdded}
					onClose={() => setShowModal(false)}
				/>
			)}
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

{
	/* <button onClick={() => setEditingBook(book)}>Edit</button>
<button onClick={() => handleDelete(book._id)}>Delete</button> */
}

export default App;
