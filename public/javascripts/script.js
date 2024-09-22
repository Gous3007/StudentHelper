//hero section animations
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 }, image: { src: "img/github.svg", width: 100, height: 100 } },
    opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
  },
  retina_detect: true
});
//services and resumeBuilder animation
document.addEventListener('DOMContentLoaded', (event) => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const element = entry.target;
      if (entry.isIntersecting) {
        element.style.opacity = '1';
        if (element.id === 'freeServices') {
          element.style.animation = 'slideInFromLeft 1s ease-out forwards';
        } else if (element.id === 'premiumServices') {
          element.style.animation = 'slideInFromRight 1s ease-out forwards';
        } else if (element.id === 'resumeBuilder') {
          element.style.animation = 'fadeIn 1s ease-out forwards';
        }
      } else {
        element.style.opacity = '0';
        element.style.animation = 'none';
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('#freeServices, #premiumServices, #resumeBuilder');
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
//card container script
const imageUrls = [
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--P3NhR08d--/v1720981725/images/pjmd3jvs8hp6ycoanhs5.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--LkGrvvUL--/v1720981805/images/zhuixvybuytfw2rcbdvq.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--cIzwOIsI--/v1720981865/images/muyzda277ugx5f5xdqx2.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--cj6g899G--/v1720981864/images/mdstvuqri4cduzzetxjo.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--eNXiL2Mp--/v1720981861/images/pnszalbikt2sujuaitp8.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--Leafm4jm--/v1720981859/images/aqpznphhf32pwwx71spk.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--e62AIVTh--/v1720981715/images/xodxyx4ivij8astqak3b.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--1V8Dkmig--/v1720981700/images/vhyusb2uxcatez3t3xsz.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--Xpo0bckf--/v1720981872/images/cfwsrck5myncbrt93t8v.png",
  "https://res.cloudinary.com/drppaqhmd/image/authenticated/s--_uCXPmWA--/v1720981867/images/de4os1iovr9t19dztvmq.png"
];
const getRandomImage = (excludeUrls = []) => {
  const availableUrls = imageUrls.filter(url => !excludeUrls.includes(url));
  return availableUrls[Math.floor(Math.random() * availableUrls.length)];
};

const updateCardBackground = (cardId, excludeUrls = []) => {
  const card = document.getElementById(cardId);
  const imageUrl = getRandomImage(excludeUrls);
  Object.assign(card.style, {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  });
  return imageUrl;
};
const updateCards = () => {
  const usedUrls = [];
  for (let i = 1; i <= 8; i++) {
    const imageUrl = updateCardBackground(`cardContent${i}`, usedUrls);
    usedUrls.push(imageUrl);
  }
};
['DOMContentLoaded', 'load'].forEach(event => addEventListener(event, updateCards));
