// Basmat Amal — interactions & UI
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Language toggle (uses data-en / data-ar)
  const langToggle = document.getElementById('langToggle');
  const body = document.body;
  langToggle.addEventListener('click', () => {
    const isAr = document.documentElement.lang === 'ar' || body.classList.contains('theme-rtl');
    if(isAr) switchTo('en'); else switchTo('ar');
  });

  function switchTo(lang){
    if(lang === 'en'){
      body.classList.remove('theme-rtl'); body.classList.add('theme-ltr');
      document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr';
      langToggle.textContent = 'ع';
      document.querySelectorAll('[data-en]').forEach(el => el.textContent = el.getAttribute('data-en'));
      const enNav = ['Home','About','Activities','Get Involved','Contact'];
      document.querySelectorAll('nav.main-nav a').forEach((a,i)=> a.textContent = enNav[i]);
    } else {
      body.classList.remove('theme-ltr'); body.classList.add('theme-rtl');
      document.documentElement.lang = 'ar'; document.documentElement.dir = 'rtl';
      langToggle.textContent = 'EN';
      document.querySelectorAll('[data-ar]').forEach(el => el.textContent = el.getAttribute('data-ar'));
      const arNav = ['الرئيسية','عن الفريق','أنشطتنا','انضم إلينا','تواصل'];
      document.querySelectorAll('nav.main-nav a').forEach((a,i)=> a.textContent = arNav[i]);
    }
  }

  // default
  if(!document.documentElement.lang){ document.documentElement.lang='ar'; document.documentElement.dir='rtl'; }

  // fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // simple parallax effect for hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if(!hero) return;
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center ${Math.max(0, scrolled * 0.12)}px`;
  });

  // mobile hamburger toggle
  document.getElementById('hamburger')?.addEventListener('click', () => {
    const nav = document.querySelector('nav.main-nav');
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // CTA handlers
  document.getElementById('heroDonate')?.addEventListener('click', ()=> openDonate(20));
  document.getElementById('donateBtn')?.addEventListener('click', ()=> openDonate(20));
  document.getElementById('cardDonate')?.addEventListener('click', ()=> openDonate(20));
  document.getElementById('heroVolunteer')?.addEventListener('click', ()=> document.getElementById('getinvolved').scrollIntoView({behavior:'smooth'}));
  document.getElementById('volunteerBtn')?.addEventListener('click', ()=> document.getElementById('getinvolved').scrollIntoView({behavior:'smooth'}));
  document.getElementById('cardLearn')?.addEventListener('click', ()=> alert('التقرير سيُضاف لاحقًا.'));

// فورم التطوع
const form = document.getElementById("volunteerForm");
const formMsg = document.getElementById("formMsg"); // مكان الرسالة في الـ HTML

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  // ✅ فاليديشن لكل الحقول
  [...form.elements].forEach(el => {
    if (['INPUT','TEXTAREA','SELECT'].includes(el.tagName)) {
      const input = el;
      const errorSpan = el.parentElement.querySelector('.error') || el.closest('fieldset')?.querySelector('.error');
      if (input.willValidate && !input.checkValidity()) {
        valid = false;
        if (errorSpan) errorSpan.textContent = input.validationMessage;
      } else {
        if (errorSpan) errorSpan.textContent = '';
      }
    }
  });

  // ✅ لو كله تمام نرسل البيانات للسكريبت
  if (valid) {
    fetch("https://script.google.com/macros/s/AKfycbx6OEgiqnidaLvMxlmVHlg9TDIt968I15njGy2y6G2yQyI9t_BrNvT0ARz9o8CGsjVV/exec", {
      method: "POST",
      body: new FormData(form)
    })
    .then(res => res.text())
    .then(text => {
      if (text === "success") {
        formMsg.textContent = "شكراً لتواصلك معنا ! تم استلام طلبك. هنرجع نكلمك قريب❤️.";
        formMsg.style.color = "green";
        form.reset();
      } else {
        formMsg.textContent = "حصلت مشكلة في إرسال الطلب. حاول تاني.";
        formMsg.style.color = "red";
      }

      // 🕑 الرسالة تختفي بعد ثانيتين
      setTimeout(() => {
        formMsg.textContent = "";
      }, 1500);
    })
    .catch(() => {
      formMsg.textContent = "في مشكلة بالاتصال. حاول تاني بعد شوية.";
      formMsg.style.color = "red";

      // 🕑 الرسالة تختفي بعد ثانيتين
      setTimeout(() => {
        formMsg.textContent = "";
      }, 1500);
    });
  }
});

// Donate modal functions
  window.openDonate = function(amount=20){
    document.querySelector('.donate-modal').style.display = 'flex';
    document.getElementById('customAmount').value = amount;
  }
  window.closeDonate = function(){
    document.querySelector('.donate-modal').style.display = 'none';
  }
  window.processDonate = function(amount){
    document.getElementById('customAmount').value = amount;
  }
  window.confirmDonate = function(){
    const val = parseFloat(document.getElementById('customAmount').value) || 0;
    if(val <= 0){ alert('من فضلك اختر مبلغ صالح'); return; }
    // TODO: integrate payment gateway here (Stripe/PayPal/Fawry)
    alert(`شكراً! تم تسجيل تبرع بقيمة ${val} جنيه — هنعمل كل حاجة لإيصالها للمحتاجين.`);
    closeDonate();
  }

});
