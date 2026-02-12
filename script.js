// === ГЛОБАЛЬНЫЕ ФУНКЦИИ (должны быть ВНЕ любых обработчиков!) ===

// ДЛИННОЕ ПОЖЕЛАНИЕ
const longMessage = 
  "Ты — один из самых важных людей в моей жизни! " +
  "С тобой можно быть собой, смеяться до слёз и проходить через любые трудности. " +
  "Спасибо за твою поддержку, верность и за то, что ты всегда рядом. " +
  "Пусть твоя жизнь будет наполнена радостью, яркими моментами и настоящими друзьями. " +
  "Оставайся таким же классным, добрым и неповторимым! " +
  "С Днём Святого Валентина, мой дорогой друг! 💖";

// АНИМАЦИЯ ПЕЧАТАНИЯ
function typeText(element, text, delay = 50) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
}

// ЛОГИКА ЭКРАНОВ — ГЛОБАЛЬНАЯ!
function show(n) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById('s' + i).style.display = 'none';
  }
  document.getElementById('s' + n).style.display = 'block';

  if (n === 5) {
    const msgEl = document.getElementById('message');
    const sigEl = document.getElementById('signature');
    
    msgEl.textContent = '';
    sigEl.textContent = '';
    sigEl.style.opacity = '0';
    sigEl.style.transform = 'translateY(10px)';
    
    typeText(msgEl, longMessage, 40).then(() => {
      setTimeout(() => {
        sigEl.textContent = '— Кусь 💕';
        sigEl.style.animation = 'fadeInUp 1.2s forwards';
      }, 300);
    });
  }
}

function openLetter() { show(4); }
function askAgain() { show(3); }
function showFinal() { show(5); }

// === ГЕНЕРАЦИЯ ПАДАЮЩИХ СЕРДЕЧЕК ===
const heartsContainer = document.getElementById('hearts');
const heartSymbols = ['❤️', '💕', '💖', '💓', '🩷', '💘'];

for (let i = 0; i < 120; i++) {
  const heart = document.createElement('div');
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.position = 'fixed';
  heart.style.top = '-20px';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${8 + Math.random() * 16}px`;
  heart.style.opacity = 0.1 + Math.random() * 0.7;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '-1';
  heart.style.animation = `fall ${10 + Math.random() * 30}s linear infinite ${Math.random() * 20}s`;
  heartsContainer.appendChild(heart);
}

// === АНИМАЦИЯ ПАДЕНИЯ ===
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.2;
    }
    100% {
      transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// === ИСКРЫ ПРИ КЛИКЕ ===
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const spark = document.createElement('div');
    spark.innerHTML = '💖';
    spark.style.position = 'fixed';
    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';
    spark.style.fontSize = '20px';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '9999';
    spark.style.opacity = '1';
    spark.style.transition = 'all 0.8s';
    document.body.appendChild(spark);
    
    setTimeout(() => {
      spark.style.opacity = '0';
      spark.style.transform = 'translateY(-50px)';
    }, 10);
    
    setTimeout(() => spark.remove(), 1000);
  }
});

// === ЗАПУСК ПЕРВОГО ЭКРАНА ===
window.addEventListener('load', () => {
  show(1);
});