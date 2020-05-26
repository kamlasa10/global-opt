window.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.burger-menu-btn');
  const content = document.querySelector('.navigation__list');
  const links = document.querySelectorAll('.navigation__link');

  const toggleDispaly = (trigger, content) => {
    trigger.classList.toggle('burger-menu-btn--active');
    content.classList.toggle('navigation__list--active');
  };

  trigger.addEventListener('click', (e) => {
    toggleDispaly(trigger, content)
  });

  links.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      toggleDispaly(trigger, content)
    })
  });

  const scrolling = () => {
    debugger
    const links = document.querySelectorAll('[href^="#"]');

    links.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const hash = this.hash;
        const toBlock = document.querySelector(hash).getBoundingClientRect().top;
        let start = null;
        let speed = 0.5;
        requestAnimationFrame(step);

        function step(time) {
          if (start === null) {
            start = time;
          }

          let progress = time - start;
          let r = toBlock < 0 ? Math.max(progress / speed, toBlock) : Math.min(progress / speed, toBlock);

          document.documentElement.scrollTo(0, r);

          if (r !== toBlock) {
            requestAnimationFrame(step);
          } else {
            location.history = hash;
          }
        }
      });

    })
  };
  scrolling();
  const slider = () => {

    function bindSlider(slidesSelector, prevSelector, nextSelector) {
      const slides = Array.prototype.slice.call(document.querySelectorAll(slidesSelector));
      const prev = document.querySelector(prevSelector);
      const next = document.querySelector(nextSelector);
      let slideIndx = 1;
      let pause = null;

      function currency(n) {
        showSlide(n)
      }

      function showSlide(n) {

        if (slideIndx > slides.length) {
          n = 1;
          slideIndx = 1;
        } else if (slideIndx < 1) {
          slideIndx = slides.length;
          n = slides.length;
        }

        try {
          dots.forEach((item) => {
            item.classList.remove(activeDot);
          });
        } catch (e) {
        }

        slides.forEach((item) => {
          item.style.display = 'none';
          item.classList.add('slideInRight');
        });
        slides[n - 1].style.display = 'block';
        slides[n - 1].classList.add('slideInRight');
        try {
          dots[n - 1].classList.add(activeDot);
        } catch (e) {
        }
      }

      try {
        next.addEventListener('click', () => {
          showSlide(slideIndx += 1);
        });

        prev.addEventListener('click', () => {
          showSlide(slideIndx -= 1);
        });
      } catch (e) {
      }

      try {
        dots.forEach((item, i) => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(i + 1);
          })
        })
      } catch (e) {
      }

      const autoPlay = () => {
        pause = setInterval(() => {
          showSlide(slideIndx += 1);
        }, 5000)
      };

      slides[0].parentElement.addEventListener('mouseover', () => {
        clearInterval(pause);
      });
      slides[0].parentElement.addEventListener('mouseout', () => {
        autoPlay();
      });

      autoPlay();
      showSlide(slideIndx)
    }

    bindSlider('.slider__item', '.slider__control-left', '.slider__control-right');
  };
  slider();
})