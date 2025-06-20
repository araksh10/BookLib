import { useEffect, useState } from "react";
import axios from "axios";
import BookAdder from "./components/BookAdder";
import EditBookModal from "./components/EditBookModal";
import BookCard from "./components/BookCard";
import LogoBL from "./assets/BookLib.svg";
// import Bg from "./assets/bg.jpg";
import Loader from "./components/Loader";

const API_URL = "https://booksapi-production-62ca.up.railway.app/books";

function App() {
	const [books, setBooks] = useState([]);
	const [editingBook, setEditingBook] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [showLoader, setShowLoader] = useState(false);

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
			setShowLoader(false);
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
			<header className="bg-cyan-700 text-white p-4 shadow w-full flex justify-around sticky top-0 ">
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
					className="bg-white text-cyan-700 font-bold text-xl px-4 py-2 rounded-full shadow cursor-pointer"
				>
					Add Book
				</button>
			</header>
			<main className="p-4 bg-cyan-900">
				<section className="rounde">
					<h2 className="text-4xl font-bold mb-4 text-white">Book List</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{books.map((book, index) => (
							<BookCard
								key={index}
								{...book}
								onDelete={() => {
									handleDelete(book._id);
									setShowLoader(true);
								}}
								onBookEdit={() => {
									setEditingBook(book);
								}}
							/>
						))}
					</div>
				</section>
			</main>
			{showModal && (
				<BookAdder
					onBookAdded={handleBookAdded}
					onClose={() => setShowModal(false)}
					onLoading={() => setShowLoader(!showLoader)}
				/>
			)}
			{editingBook && (
				<EditBookModal
					book={editingBook}
					onClose={() => setEditingBook(null)}
					onUpdated={handleUpdate}
					onLoading={() => setShowLoader(!showLoader)}
				/>
			)}
			{showToast && (
				<div className="fixed bottom-30 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-slide-in">
					✅ Success! Your book was added!
				</div>
			)}
			{showLoader && (
				<div className="">
					<Loader />
				</div>
			)}
		</>
	);
}

export default App;
