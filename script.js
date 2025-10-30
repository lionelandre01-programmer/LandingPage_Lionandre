// Toggle do menu em telas pequenas
document.addEventListener('DOMContentLoaded', function(){
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('#primary-navigation');
	const yearEl = document.getElementById('year');

	if(yearEl) yearEl.textContent = new Date().getFullYear();

	if(navToggle && nav){
		navToggle.addEventListener('click', function(){
			const expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			// marcar nav como visível/invisível para CSS
			nav.setAttribute('aria-hidden', String(expanded));
		});
	}

	// Formulário — validação simples e envio via WhatsApp
	const form = document.getElementById('contact-form');
	const status = document.getElementById('form-status');
	const WHATSAPP_NUMBER = '244948972536';

	if(form){
		form.addEventListener('submit', function(e){
			e.preventDefault();
			status.textContent = '';

			const name = form.name.value.trim();
			const email = form.email.value.trim();
			const service = form.service.value || '';
			const message = form.message.value.trim();

			if(!name || !email || !message){
				status.textContent = 'Por favor preencha todos os campos obrigatórios.';
				return;
			}

			// Monta a mensagem que será enviada por WhatsApp
			const text = `Olá, meu nome é ${name}.\nServiço: ${service}\nEmail: ${email}\n\n${message}`;
			const phone = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
			const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

			// Mensagem de feedback breve e abertura do WhatsApp
			const submitBtn = form.querySelector('button[type="submit"]');
			submitBtn.disabled = true;
			submitBtn.textContent = 'Abrindo WhatsApp...';

			// Abre em nova aba/janela (no celular abre o app se disponível)
			window.open(url, '_blank');

			setTimeout(function(){
				submitBtn.disabled = false;
				submitBtn.textContent = 'Enviar';
				status.textContent = 'A WhatsApp será aberta. Caso não abra, verifique o bloqueador de pop-ups.';
				form.reset();
			}, 800);
		});
	}
});


