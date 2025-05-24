document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    const apodTabBtn = document.getElementById('apod-tab');
    const marsTabBtn = document.getElementById('mars-tab');
    const apodSection = document.getElementById('apod-section');
    const marsSection = document.getElementById('mars-section');

    const apodDatePicker = document.getElementById('apod-date-picker');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const apodContent = document.getElementById('apod-content');

    const marsDatePicker = document.getElementById('mars-date-picker');
    const searchMarsPhotosBtn = document.getElementById('search-mars-photos');
    const marsPhotosGallery = document.getElementById('mars-photos-gallery');

    const body = document.body;
    let currentApodDate = new Date(); // Inicia com a data atual

    // --- Modal para Imagens Grandes ---
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="img-modal-content">
        <iframe class="modal-content video-frame" id="video-modal-content" frameborder="0" allowfullscreen></iframe>
        <div class="modal-caption" id="modal-caption"></div>
    `;
    body.appendChild(modal);

    const closeModalBtn = modal.querySelector('.close-modal');
    const imgModalContent = modal.querySelector('#img-modal-content');
    const videoModalContent = modal.querySelector('#video-modal-content');
    const modalCaption = modal.querySelector('#modal-caption');

    closeModalBtn.onclick = () => {
        modal.style.display = 'none';
        imgModalContent.style.display = 'none';
        videoModalContent.style.display = 'none';
        videoModalContent.src = ''; // Limpa o src do vídeo ao fechar
    };

    modal.onclick = (e) => {
        if (e.target === modal) { // Fecha apenas se clicar fora da imagem/vídeo
            modal.style.display = 'none';
            imgModalContent.style.display = 'none';
            videoModalContent.style.display = 'none';
            videoModalContent.src = '';
        }
    };


    // --- Funções Auxiliares de Data ---
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function parseDate(dateString) {
        // Retorna um objeto Date a partir de uma string YYYY-MM-DD
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // Mês é 0-indexado
    }

    // --- Lógica Principal (Requisições e Renderização) ---

    // Função para atualizar o background do corpo com a imagem da APOD
    function updateBodyBackground(imageUrl) {
        const bgContainer = document.querySelector('.background-image-container');
        if (!bgContainer) { // Se o container não existe, cria (deveria existir do HTML)
            const newBgContainer = document.createElement('div');
            newBgContainer.classList.add('background-image-container');
            body.prepend(newBgContainer); // Adiciona como primeiro filho do body
        }
        document.querySelector('.background-image-container').style.backgroundImage = `url('${imageUrl}')`;
    }

    async function fetchAPOD(date) {
        const formattedDate = formatDate(date);
        apodDatePicker.value = formattedDate; // Atualiza o picker de data
        currentApodDate = date; // Atualiza a data atual do APOD

        apodContent.innerHTML = '<p>Carregando APOD...</p>'; // Mensagem de carregamento

        try {
            const response = await fetch(`/api/apod?date=${formattedDate}`);
            const data = await response.json();

            if (response.ok) {
                renderAPOD(data);
                // Atualiza o background com a imagem do APOD (se for imagem)
                if (data.media_type === 'image') {
                    updateBodyBackground(data.url);
                } else if (data.media_type === 'video' && data.thumbnail_url) {
                    updateBodyBackground(data.thumbnail_url); // Usa thumbnail do vídeo
                } else {
                    updateBodyBackground(''); // Limpa background se não for imagem/vídeo
                }

            } else {
                apodContent.innerHTML = `<p class="error">${data.error || 'Erro ao carregar APOD.'}</p>`;
                updateBodyBackground('');
            }
        } catch (error) {
            console.error('Erro ao buscar APOD:', error);
            apodContent.innerHTML = '<p class="error">Não foi possível conectar ao servidor para buscar a APOD.</p>';
            updateBodyBackground('');
        }
    }

    function renderAPOD(data) {
        let mediaHtml = '';
        if (data.media_type === 'image') {
            mediaHtml = `<img src="${data.url}" alt="${data.title || 'APOD Image'}" loading="lazy">`;
        } else if (data.media_type === 'video') {
            // Embed do YouTube, Vimeo ou outros
            mediaHtml = `
                <iframe 
                    src="${data.url}" 
                    title="${data.title || 'APOD Video'}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="no-referrer"
                    allowfullscreen>
                </iframe>`;
        } else {
            mediaHtml = `<p>Conteúdo não disponível ou tipo de mídia desconhecido.</p>`;
        }

        apodContent.innerHTML = `
            ${mediaHtml}
            <div class="apod-info">
                <h3>${data.title || 'Título Indisponível'}</h3>
                <p><strong>Data:</strong> ${data.date || 'Data Indisponível'}</p>
                <p>${data.explanation || 'Explicação Indisponível'}</p>
                ${data.copyright ? `<p><strong>Créditos:</strong> ${data.copyright}</p>` : ''}
                <p><a href="${data.url}" target="_blank" rel="noopener noreferrer">Ver em alta resolução / Fonte Original</a></p>
            </div>
        `;

        // Adiciona o evento de clique para abrir o modal de imagem/vídeo
        const currentMediaElement = apodContent.querySelector('img') || apodContent.querySelector('iframe');
        if (currentMediaElement) {
             currentMediaElement.onclick = () => {
                modal.style.display = 'flex';
                if (data.media_type === 'image') {
                    imgModalContent.src = data.url;
                    imgModalContent.alt = data.title;
                    imgModalContent.style.display = 'block';
                    videoModalContent.style.display = 'none';
                } else if (data.media_type === 'video') {
                    videoModalContent.src = data.url;
                    videoModalContent.title = data.title;
                    videoModalContent.style.display = 'block';
                    imgModalContent.style.display = 'none';
                }
                modalCaption.innerHTML = data.title || '';
            };
        }
    }


    async function fetchMarsRoverPhotos(date) {
        const formattedDate = formatDate(date);
        marsPhotosGallery.innerHTML = '<p>Carregando fotos de Marte...</p>'; // Mensagem de carregamento

        try {
            const response = await fetch(`/api/mars-rover?date=${formattedDate}`);
            const photos = await response.json();

            if (response.ok) {
                renderMarsRoverPhotos(photos, formattedDate);
            } else {
                marsPhotosGallery.innerHTML = `<p class="error">${photos.error || 'Erro ao carregar fotos de Marte.'}</p>`;
            }
        } catch (error) {
            console.error('Erro ao buscar fotos de Marte:', error);
            marsPhotosGallery.innerHTML = '<p class="error">Não foi possível conectar ao servidor para buscar as fotos de Marte.</p>';
        }
    }

    function renderMarsRoverPhotos(photos, date) {
        if (photos.length === 0) {
            marsPhotosGallery.innerHTML = `<p>Nenhuma foto do Curiosity encontrada para ${date}. Tente uma data próxima!</p>`;
            return;
        }

        marsPhotosGallery.innerHTML = ''; // Limpa a galeria
        photos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.classList.add('mars-photo-item');
            photoItem.innerHTML = `
                <img src="${photo.img_src}" alt="Foto do Curiosity - ${photo.camera.full_name}" loading="lazy">
                <p>${photo.camera.full_name} (${photo.earth_date})</p>
            `;
            marsPhotosGallery.appendChild(photoItem);

            photoItem.onclick = () => {
                modal.style.display = 'flex';
                imgModalContent.src = photo.img_src;
                imgModalContent.alt = `Foto do Curiosity - ${photo.camera.full_name} (${photo.earth_date})`;
                imgModalContent.style.display = 'block';
                videoModalContent.style.display = 'none';
                modalCaption.innerHTML = `Câmera: ${photo.camera.full_name} | Data: ${photo.earth_date}`;
            };
        });
    }

    // --- Event Listeners ---

    // Navegação entre APOD e Mars Rover
    apodTabBtn.addEventListener('click', () => {
        apodSection.classList.remove('hidden');
        marsSection.classList.add('hidden');
        apodTabBtn.classList.add('active');
        marsTabBtn.classList.remove('active');
        fetchAPOD(currentApodDate); // Recarrega APOD ao voltar para a aba
    });

    marsTabBtn.addEventListener('click', () => {
        marsSection.classList.remove('hidden');
        apodSection.classList.add('hidden');
        marsTabBtn.classList.add('active');
        apodTabBtn.classList.remove('active');
        marsPhotosGallery.innerHTML = '<p>Selecione uma data e clique em "Buscar Fotos".</p>'; // Limpa ao mudar de aba
        // O background principal não muda ao ir para Marte, mas a APOD da data atual fica no background
    });

    // APOD Navigation
    apodDatePicker.addEventListener('change', (event) => {
        const selectedDate = parseDate(event.target.value);
        fetchAPOD(selectedDate);
    });

    prevDayBtn.addEventListener('click', () => {
        const prevDay = new Date(currentApodDate);
        prevDay.setDate(prevDay.getDate() - 1);
        fetchAPOD(prevDay);
    });

    nextDayBtn.addEventListener('click', () => {
        const nextDay = new Date(currentApodDate);
        nextDay.setDate(nextDay.getDate() + 1);
        // Evita ir para o futuro
        if (nextDay <= new Date()) { // Verificação da data atual para não ir para o futuro
            fetchAPOD(nextDay);
        } else {
            alert("Não é possível ver o futuro astronômico!");
        }
    });

    // Mars Rover Photos
    searchMarsPhotosBtn.addEventListener('click', () => {
        const selectedMarsDate = parseDate(marsDatePicker.value);
        if (selectedMarsDate) {
            fetchMarsRoverPhotos(selectedMarsDate);
        } else {
            alert('Por favor, selecione uma data para as fotos de Marte.');
        }
    });

    // --- Inicialização ---
    // Define a data máxima no picker de data para a data atual (hoje)
    const today = new Date();
    apodDatePicker.setAttribute('max', formatDate(today));
    marsDatePicker.setAttribute('max', formatDate(today));

    // Carrega a APOD do dia ao iniciar
    fetchAPOD(today);
    apodTabBtn.classList.add('active'); // Ativa a aba APOD por padrão
});