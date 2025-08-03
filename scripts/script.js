<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerHeight = document.querySelector('header').offsetHeight;
    const offset = 50; // Offset adicional de 50px conforme solicitado
    
    // Verifica se os elementos existem
    if (mobileMenuToggle && navLinks) {
        // Adiciona o evento de clique ao botão do menu
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Implementa a rolagem suave para todos os links de navegação
        const allNavLinks = document.querySelectorAll('a[href^="#"]');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Obtém o ID da seção alvo a partir do href
                const targetId = this.getAttribute('href');
                
                // Apenas prossegue se for um ID válido
                if (targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Calcula a posição da seção alvo, subtraindo a altura do header e adicionando o offset
                        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                        
                        // Faz a rolagem suave até a posição calculada
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Se estiver em resolução mobile, fecha o menu
                        if (window.innerWidth <= 768) {
                            navLinks.classList.remove('active');
                            mobileMenuToggle.classList.remove('active');
                        }
                    }
                }
            });
        });
        
        // Fecha o menu ao redimensionar a janela para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Adiciona rolagem suave para os botões CTA
    const ctaButtons = document.querySelectorAll('.hero-cta, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Por padrão, rolar para a seção de contato quando um botão CTA é clicado
            const contactSection = document.querySelector('#contact');
            
            if (contactSection) {
                const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Função para inicializar o lightbox de vídeos
function initVideoLightbox() {
    const videoCards = document.querySelectorAll('.video-card');
    const lightbox = document.getElementById('videoLightbox');
    const videoFrame = document.getElementById('videoFrame');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Função para abrir o lightbox com o vídeo específico
    function openLightbox(videoId) {
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede a rolagem da página
    }
    
    // Função para fechar o lightbox
    function closeLightboxFunc() {
        videoFrame.src = '';
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restaura a rolagem da página
    }
    
    // Adiciona evento de clique a cada card de vídeo
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            openLightbox(videoId);
        });
    });
    
    // Fecha o lightbox quando o botão de fechar é clicado
    closeLightbox.addEventListener('click', closeLightboxFunc);
    
    // Fecha o lightbox quando o fundo é clicado
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Fecha o lightbox quando a tecla ESC é pressionada
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxFunc();
        }
    });
}

// Adiciona o inicializador do lightbox ao carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Código existente no script.js
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerHeight = document.querySelector('header').offsetHeight;
    const offset = 50;
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        const allNavLinks = document.querySelectorAll('a[href^="#"]');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                if (targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        if (window.innerWidth <= 768) {
                            navLinks.classList.remove('active');
                            mobileMenuToggle.classList.remove('active');
                        }
                    }
                }
            });
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    const ctaButtons = document.querySelectorAll('.hero-cta, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            
            if (contactSection) {
                const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializa o lightbox de vídeos
    initVideoLightbox();
});
=======
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando script principal');
    
    // Seleciona os elementos
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerHeight = document.querySelector('header').offsetHeight;
    const offset = 50; // Offset adicional de 50px conforme solicitado
    
    // Menu Mobile - Adiciona verificação visual no console
    console.log('Mobile Menu Toggle:', mobileMenuToggle);
    console.log('Nav Links:', navLinks);
    
    // Verifica se os elementos existem
    if (mobileMenuToggle && navLinks) {
        // Adiciona o evento de clique ao botão do menu
        mobileMenuToggle.addEventListener('click', function() {
            console.log('Botão do menu mobile clicado');
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Implementa a rolagem suave para todos os links de navegação
        const allNavLinks = document.querySelectorAll('a[href^="#"]');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Obtém o ID da seção alvo a partir do href
                const targetId = this.getAttribute('href');
                
                // Apenas prossegue se for um ID válido
                if (targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Calcula a posição da seção alvo, subtraindo a altura do header e adicionando o offset
                        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                        
                        // Faz a rolagem suave até a posição calculada
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Se estiver em resolução mobile, fecha o menu
                        if (window.innerWidth <= 768) {
                            navLinks.classList.remove('active');
                            mobileMenuToggle.classList.remove('active');
                        }
                    }
                }
            });
        });
        
        // Fecha o menu ao redimensionar a janela para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    } else {
        console.error('ERRO: Elementos do menu mobile não encontrados');
    }
    
    // Adiciona rolagem suave para os botões CTA
    const ctaButtons = document.querySelectorAll('.hero-cta, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Por padrão, rolar para a seção de contato quando um botão CTA é clicado
            const contactSection = document.querySelector('#contact');
            
            if (contactSection) {
                const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializa o lightbox de vídeos
    initVideoLightbox();
});

// Função para inicializar o lightbox de vídeos
function initVideoLightbox() {
    const videoCards = document.querySelectorAll('.video-card');
    const lightbox = document.getElementById('videoLightbox');
    const videoFrame = document.getElementById('videoFrame');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Verifica se os elementos foram encontrados
    console.log('Video Cards:', videoCards.length);
    console.log('Lightbox:', lightbox);
    
    if (!videoCards.length || !lightbox || !videoFrame || !closeLightbox) {
        console.error('ERRO: Elementos do lightbox não encontrados');
        return;
    }
    
    // Função para abrir o lightbox com o vídeo específico
    function openLightbox(videoId) {
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede a rolagem da página
    }
    
    // Função para fechar o lightbox
    function closeLightboxFunc() {
        videoFrame.src = '';
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restaura a rolagem da página
    }
    
    // Adiciona evento de clique a cada card de vídeo
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            console.log('Vídeo clicado, ID:', videoId);
            openLightbox(videoId);
        });
    });
    
    // Fecha o lightbox quando o botão de fechar é clicado
    closeLightbox.addEventListener('click', closeLightboxFunc);
    
    // Fecha o lightbox quando o fundo é clicado
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Fecha o lightbox quando a tecla ESC é pressionada
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxFunc();
        }
    });
}
>>>>>>> 132437a9e8da31856e695055283abcf4a82cfee2
