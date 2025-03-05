document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando script do modal');
    
    // Seleciona elementos do modal
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    
    // Verifica se os elementos foram encontrados
    console.log('Modal encontrado:', !!contactModal);
    console.log('Botão fechar encontrado:', !!closeModal);
    console.log('Formulário encontrado:', !!contactForm);
    
    // Seleciona todos os botões que devem abrir o modal de contato
    const contactButtons = document.querySelectorAll('.cta-button, .hero-cta');
    
    // Função para abrir o modal
    function openModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede a rolagem da página
    }
    
    // Função para fechar o modal
    function closeModalFunc() {
        contactModal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura a rolagem da página
        
        // Reseta o formulário
        contactForm.reset();
        
        // Remove classes de erro
        const errorFields = contactForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Esconde mensagens de erro
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.classList.remove('active'));
    }
    
    // Adiciona o evento de clique a todos os botões de contato
    contactButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    // Fecha o modal quando o botão de fechar é clicado
    closeModal.addEventListener('click', closeModalFunc);
    
    // Fecha o modal quando o fundo é clicado
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeModalFunc();
        }
    });
    
    // Fecha o modal quando a tecla ESC é pressionada
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    // Validação e envio do formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Formulário enviado');
            e.preventDefault();
            
            // Validação básica do formulário
            let isValid = true;
        
        // Validação do nome
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            markAsError(nameInput, 'Por favor, informe seu nome.');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Validação do email
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            markAsError(emailInput, 'Por favor, informe um email válido.');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Validação do telefone
        const phoneInput = document.getElementById('phone');
        if (!phoneInput.value.trim()) {
            markAsError(phoneInput, 'Por favor, informe seu telefone.');
            isValid = false;
        } else {
            removeError(phoneInput);
        }
        
        // Validação da data do casamento
        const weddingDateInput = document.getElementById('weddingDate');
        if (!weddingDateInput.value) {
            markAsError(weddingDateInput, 'Por favor, informe a data do casamento.');
            isValid = false;
        } else {
            removeError(weddingDateInput);
        }
        
        // Validação do local
        const locationInput = document.getElementById('location');
        if (!locationInput.value.trim()) {
            markAsError(locationInput, 'Por favor, informe o local do evento.');
            isValid = false;
        } else {
            removeError(locationInput);
        }
        
        // Obter campo de mensagem (se existir)
        const messageInput = document.getElementById('message') || { value: '' };
        
        // Obter campo de número de convidados (se existir)
        const guestsInput = document.getElementById('guests') || { value: 0 };
        
        // Se todos os campos obrigatórios estiverem preenchidos corretamente
        if (isValid) {
            // Prepara os dados para a API Baserow
            const formData = {
                "Nome do cliente": nameInput.value.trim(),
                "Data do evento": weddingDateInput.value,
                "Local do evento": locationInput.value.trim(),
                "Número de convidados": parseInt(guestsInput.value) || 0,
                "Email": emailInput.value.trim(),
                "Telefone": phoneInput.value.trim(),
                "Mensagem": messageInput.value.trim()
            };
            
            console.log('Dados do formulário validados:', formData);
            
            // Enviar dados para a API do Baserow
            submitToBaserow(formData);
        } else {
            console.log('Formulário com erros de validação');
        }
    });
} else {
    console.error('ERRO: Elemento contactForm não encontrado no DOM');
}
    
    // Função para enviar dados para o Baserow
    function submitToBaserow(data) {
        console.log('Enviando dados para o Baserow:', data);
        
        // Mostrar indicador de carregamento
        showLoadingIndicator();
        
        // Configurando o token de API - substitua 'YOUR_DATABASE_TOKEN' pelo token real
        const apiToken = 'es4OIHz6dV93cJiImNVLg15rC57rjwHq';
        
        console.log('Iniciando chamada de API para o Baserow');
        
        // Fazendo a requisição para a API do Baserow
        fetch('https://api.baserow.io/api/database/rows/table/258308/?user_field_names=true', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // Se a resposta não for bem-sucedida, lança um erro
                return response.json().then(errorData => {
                    throw new Error(`Erro na API: ${JSON.stringify(errorData)}`);
                });
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Sucesso:', responseData);
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Erro:', error);
            showErrorMessage(error.message);
        });
    }
    
    // Função para mostrar indicador de carregamento
    function showLoadingIndicator() {
        console.log('Exibindo indicador de carregamento');
        
        // Verifica se o formulário existe antes de tentar manipulá-lo
        const formElements = contactForm.querySelector('form');
        
        if (formElements) {
            console.log('Formulário encontrado, ocultando elementos');
            formElements.style.display = 'none';
        } else {
            console.log('ERRO: Elemento form não encontrado dentro de contactForm');
        }
        
        // Cria e exibe o indicador de carregamento
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator active';
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
            <p>Enviando sua mensagem...</p>
        `;
        
        console.log('Adicionando indicador de carregamento ao formulário');
        contactForm.appendChild(loadingIndicator);
    }
    
    // Função para marcar um campo como erro
    function markAsError(element, message) {
        element.classList.add('error');
        
        // Verifica se já existe uma mensagem de erro
        let errorMessage = element.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            // Cria uma nova mensagem de erro
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            element.parentNode.insertBefore(errorMessage, element.nextSibling);
        }
        
        errorMessage.textContent = message;
        errorMessage.classList.add('active');
    }
    
    // Função para remover o erro de um campo
    function removeError(element) {
        element.classList.remove('error');
        
        // Procura pela mensagem de erro
        const errorMessage = element.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.classList.remove('active');
        }
    }
    
    // Função para mostrar a mensagem de sucesso
    function showSuccessMessage() {
        // Remove o indicador de carregamento, se existir
        const loadingIndicator = contactForm.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        // Cria e mostra a mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success active';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 class="success-title">Mensagem Enviada!</h3>
            <p class="success-message">Obrigado pelo seu contato. Retornaremos em breve para confirmar os detalhes do seu evento.</p>
            <button class="form-button" id="closeSuccessButton">Fechar</button>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Adiciona evento para o botão de fechar na mensagem de sucesso
        const closeSuccessButton = document.getElementById('closeSuccessButton');
        closeSuccessButton.addEventListener('click', function() {
            closeModalFunc();
            
            // Remove a mensagem de sucesso e restaura o formulário após fechar
            setTimeout(() => {
                successMessage.remove();
                const formElements = contactForm.querySelector('form');
                if (formElements) {
                    formElements.style.display = '';
                }
            }, 300);
        });
    }
    
    // Função para mostrar mensagem de erro
    function showErrorMessage(errorText) {
        // Remove o indicador de carregamento, se existir
        const loadingIndicator = contactForm.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        // Cria e mostra a mensagem de erro
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error active';
        errorMessage.innerHTML = `
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3 class="error-title">Erro ao Enviar</h3>
            <p class="error-message">Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde.</p>
            <p class="error-details">${errorText}</p>
            <button class="form-button" id="closeErrorButton">Fechar</button>
        `;
        
        contactForm.appendChild(errorMessage);
        
        // Adiciona evento para o botão de fechar na mensagem de erro
        const closeErrorButton = document.getElementById('closeErrorButton');
        closeErrorButton.addEventListener('click', function() {
            // Remove a mensagem de erro e restaura o formulário
            errorMessage.remove();
            const formElements = contactForm.querySelector('form');
            if (formElements) {
                formElements.style.display = '';
            }
        });
    }
    
    // Máscara para o telefone (opcional)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                // Formato: (XX) XXXXX-XXXX
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                }
            }
            e.target.value = value;
        });
    }
});
