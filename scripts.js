// Hier wird angenommen, dass die JSON-Daten in einer Datei `bibliothek.json` gespeichert sind
const jsonFile = 'bibliothek.json';

fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        const coverList = document.querySelector('.cover-list');
        const sidebar = document.querySelector('.book-details');

        // Durchlaufe alle Bücher in der JSON-Datei
        data.forEach(book => {
            // Erstelle ein Cover-Element für jedes Buch
            const cover = document.createElement('img');
            cover.src = `data:image/jpeg;base64,${book.cover_image}`;
            cover.alt = book.title;
            cover.classList.add('cover');

            // Füge einen Event Listener hinzu, um Details beim Klicken anzuzeigen
            cover.addEventListener('click', () => {
                // Setze die Buchdetails in die Sidebar
                sidebar.innerHTML = `
                    <h2>${book.title}</h2>
                    <p><strong>Autor:</strong> ${book.author}</p>
                    <p><strong>Tags:</strong> ${book.tags.join(', ')}</p>
                    <p><strong>Reihe:</strong> ${book.series || '-'}</p>
                    <p><strong>Verlag:</strong> ${book.publisher || '-'}</p>
                    <p><strong>Sprache:</strong> ${book.language || '-'}</p>
                `;
            });

            // Füge das Cover zur Liste hinzu
            coverList.appendChild(cover);
        });
    })
    .catch(error => {
        console.error('Fehler beim Laden der JSON-Daten:', error);
    });
