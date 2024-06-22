// Lade die Bücher aus der JSON-Datei
fetch('bibliothek.json')
    .then(response => response.json())
    .then(books => {
        const bookList = document.getElementById('bookList');

        // Funktion zum Anzeigen der Bücher
        function displayBooks(books) {
            bookList.innerHTML = '';
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');
                bookElement.innerHTML = `
                    <img src="${book.cover_image || 'placeholder.jpg'}" alt="${book.title} Cover">
                    <h3>${book.title}</h3>
                    <p>von ${book.author}</p>
                    <p>Reihe: ${book.series || 'Nicht angegeben'}</p>
                    <p>Verlag: ${book.publisher || 'Nicht angegeben'}</p>
                    <p>Sprache: ${book.language || 'Nicht angegeben'}</p>
                    <p>Tags: ${book.tags.join(', ')}</p>
                `;
                bookList.appendChild(bookElement);
            });
        }

        displayBooks(books);

        // Filterung bei Eingabe im Suchfeld
        document.getElementById('searchInput').addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchText)
            );
            displayBooks(filteredBooks);
        });
    });
