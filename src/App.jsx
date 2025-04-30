import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BookAdder from "./components/BookAdder";

const API_URL = "https://booksapi-production-62ca.up.railway.app/books";

function App() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get(API_URL)
			.then((res) => setBooks(res.data))
			.catch((err) => console.error("Error fetching books: ", err));
	}, []);

	const handleBookAdded = (newBook) => {
		setBooks((prev) => [...prev, newBook]);
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
					{books.map((book, i) => (
						<div key={i} className="book-card">
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
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
