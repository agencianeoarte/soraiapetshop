(()=>{
  'use strict';
  const config = window.SORAIA_CONFIG || {whatsapp:'5545999866577'};
  const phone = String(config.whatsapp||'').replace(/\D/g,'');
  const waUrl = (msg) => `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  const $ = (selector,root=document)=>root.querySelector(selector);
  const $$ = (selector,root=document)=>Array.from(root.querySelectorAll(selector));
  $$('.whatsapp-link').forEach(link=>{
    const message=link.dataset.message||'Olá! Gostaria de obter informações.';
    link.href=waUrl(message);
  });
  const menu=$('#menu'); const toggle=$('.menu-toggle');
  const closeMenu=()=>{menu?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menu')};
  toggle?.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  $$('.nav-link').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(menu?.classList.contains('open')&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu()});
  const links=$$('.main-nav a');
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}
    }),{rootMargin:'-20% 0px -65% 0px',threshold:0});
    $$('main section[id]').forEach(section=>observer.observe(section));
  }
  const form=$('#contact-form'); const error=$('#form-error');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=String(form.elements.nome.value||'').trim();
    const pet=String(form.elements.pet.value||'').trim();
    const service=String(form.elements.servico.value||'').trim();
    const details=String(form.elements.detalhes.value||'').trim();
    if(!name||!service){error.hidden=false;error.textContent='Preencha seu nome e selecione o serviço para continuar.';return;}
    error.hidden=true;
    const message=[`Olá, Soraia Pet Store! Sou ${name}.`,'Gostaria de informações sobre um atendimento.',pet?`Nome do pet: ${pet}`:null,`Serviço: ${service}`,details?`Observações: ${details}`:null,'Poderiam me orientar sobre valores e disponibilidade?'].filter(Boolean).join('\n');
    const url=waUrl(message);
    const link=document.createElement('a');
    link.href=url; link.target='_blank'; link.rel='noopener noreferrer';
    document.body.appendChild(link); link.click(); link.remove();
  });
  const year=$('#year'); if(year)year.textContent=String(new Date().getFullYear());
})();
