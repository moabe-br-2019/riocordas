document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando script do modal');
    
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    const contactButtons = document.querySelectorAll('.cta-button, .hero-cta');
    
    // Função para abrir o modal
    function openModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal aberto');
        }
    }
    
    // Função para fechar o modal
    function closeModalFunc() {
        if (contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
            if (contactForm) contactForm.reset();
            console.log('Modal fechado');
        }
    }
    
    // Event Listeners para os botões CTA
    console.log('Encontrados', contactButtons.length, 'botões CTA');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Impede comportamento padrão
            e.stopPropagation(); // Para a propagação do evento
            console.log('Botão CTA clicado, abrindo modal');
            openModal();
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Fechar no click fora ou ESC
    window.addEventListener('click', function(e) {
        if (e.target === contactModal) closeModalFunc();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    // Validação e envio do formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = validateForm();
            
            if (isValid) {
                const formData = collectFormData();
                submitToBaserow(formData);
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        
        // Validações dos campos
        const fields = [
            { id: 'name', pattern: /\S+/, message: 'Por favor, informe seu nome.' },
            { id: 'email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Por favor, informe um email válido.' },
            { id: 'phone', pattern: /\S+/, message: 'Por favor, informe seu telefone.' },
            { id: 'weddingDate', pattern: /\S+/, message: 'Por favor, informe a data do casamento.' },
            { id: 'location', pattern: /\S+/, message: 'Por favor, informe o local do evento.' }
        ];
        
        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input && !field.pattern.test(input.value)) {
                markAsError(input, field.message);
                isValid = false;
            } else if (input) {
                removeError(input);
            }
        });
        
        return isValid;
    }
    
    function collectFormData() {
        return {
            "Nome do cliente": document.getElementById('name').value.trim(),
            "Data do evento": document.getElementById('weddingDate').value,
            "Local do evento": document.getElementById('location').value.trim(),
            "Número de convidados": parseInt(document.getElementById('guests')?.value) || 0,
            "Email": document.getElementById('email').value.trim(),
            "Telefone": document.getElementById('phone').value.trim(),
            "Mensagem": document.getElementById('message')?.value.trim() || ''
        };
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
        
        // Verifica se o próprio contactForm é um formulário
        if (contactForm && contactForm.tagName === 'FORM') {
            // Se o contactForm for o próprio form, oculta seus elementos filhos
            console.log('contactForm é o próprio form, ocultando elementos filhos');
            const formInputs = contactForm.querySelectorAll('input, textarea, select, button, label');
            formInputs.forEach(element => {
                element.style.display = 'none';
            });
        } else if (contactForm) {
            // Caso contrário, tenta encontrar o form dentro do contactForm
            const formElement = contactForm.querySelector('form');
            if (formElement) {
                console.log('Formulário encontrado dentro de contactForm, ocultando-o');
                formElement.style.display = 'none';
            } else {
                console.log('AVISO: Não foi possível encontrar o formulário para ocultar');
            }
        }
        
        // Cria e exibe o indicador de carregamento
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator active';
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
            <p>Enviando sua mensagem...</p>
        `;
        
        console.log('Adicionando indicador de carregamento ao formulário');
        if (contactForm) {
            contactForm.appendChild(loadingIndicator);
        }
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
        console.log('Exibindo mensagem de sucesso');
        
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
                
                // Restaura a visibilidade dos elementos do formulário
                if (contactForm.tagName === 'FORM') {
                    // Se o contactForm for o próprio form, restaura seus elementos filhos
                    console.log('Restaurando elementos do formulário');
                    const formInputs = contactForm.querySelectorAll('input, textarea, select, button, label');
                    formInputs.forEach(element => {
                        element.style.display = '';
                    });
                } else {
                    // Caso contrário, tenta encontrar o form dentro do contactForm
                    const formElements = contactForm.querySelector('form');
                    if (formElements) {
                        formElements.style.display = '';
                    }
                }
            }, 300);
        });
    }
    
    // Função para mostrar mensagem de erro
    function showErrorMessage(errorText) {
        console.log('Exibindo mensagem de erro');
        
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
            
            // Restaura a visibilidade dos elementos do formulário
            if (contactForm.tagName === 'FORM') {
                // Se o contactForm for o próprio form, restaura seus elementos filhos
                console.log('Restaurando elementos do formulário após erro');
                const formInputs = contactForm.querySelectorAll('input, textarea, select, button, label');
                formInputs.forEach(element => {
                    element.style.display = '';
                });
            } else {
                // Caso contrário, tenta encontrar o form dentro do contactForm
                const formElements = contactForm.querySelector('form');
                if (formElements) {
                    formElements.style.display = '';
                }
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