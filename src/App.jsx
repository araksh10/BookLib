import { useEffect, useState } from "react";
import axios from "axios";
import BookAdder from "./components/BookAdder";
import EditBookModal from "./components/EditBookModal";
import BookCard from "./components/BookCard";
import LogoBL from "./assets/BookLib.svg";
import Bg from "./assets/bg.jpg";

const API_URL = "https://booksapi-production-62ca.up.railway.app/books";

function App() {
	const [books, setBooks] = useState([]);
	const [editingBook, setEditingBook] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		axios
			.get(API_URL)
			.then((res) => setBooks(res.data))
			.catch((err) => console.error("Error fetching books: ", err));
	}, []);

	const handleBookAdded = (newBook) => {
		setBooks((prev) => [...prev, newBook]);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
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
			<header className="bg-emerald-800 text-white p-4 shadow w-full flex justify-around sticky top-0 ">
				<img
					src={LogoBL}
					className="w-16 mr-2 select-none"
					alt="BookLib Logo"
				/>
				<h1 className="text-4xl font-bold font-[georgia] mb-2 select-none">
					My Book Library
				</h1>
				<button
					onClick={() => setShowModal(true)}
					className="bg-white text-blue-600 px-4 py-2 rounded shadow cursor-pointer"
				>
					Add Book
				</button>
			</header>
			{/* </div> */}
			<main className="p-4 bg-[url('./assets/bg.jpg')]">
				<section>
					<h2 className="text-4xl font-bold mb-4 text-white">Book List</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
			{showToast && (
				<div className="fixed top-30 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-slide-in">
					✅ Success! Your book was added!
				</div>
			)}
		</>
	);
}

{
	/* <button onClick={() => setEditingBook(book)}>Edit</button>
<button onClick={() => handleDelete(book._id)}>Delete</button> */
}

export default App;
