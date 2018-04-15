(function() {
  let first = 0;
  let last = 0;
  let curr = 0;
  let numOfSlides;
  let domElements = {};
  function initializeDomElements() {
    domElements = {
      slides: document.getElementsByClassName("slide"),
      indicator: document.getElementsByClassName("mark"),
      next: document.getElementsByClassName("arrow next")[0],
      prev: document.getElementsByClassName("arrow prev")[0]
    };
  }
  function makeCircular() {
    numOfSlides = domElements.slides.length;
    domElements.slides[numOfSlides - 1].style.transform = "translateX(-400%)";
  }

  function indicate(curr) {
    let old_indicator = document.getElementsByClassName("mark active")[0];
    old_indicator.classList.remove("active");
    domElements.indicator[curr].classList.add("active");
  }

  function onNext() {
    first = numOfSlides - 1;
    let showNext = function() {
      for (let i = 0; i < numOfSlides; i++) {
        let prevTranslate = 0;
        let currTranslate;
        if (domElements.slides[i].style.transform) {
          prevTranslate = +domElements.slides[i].style.transform
            .split("(")[1]
            .split("%")[0];
        }
        if (i === first) {
          currTranslate = prevTranslate + (numOfSlides - 1) * 100;
          domElements.slides[first].classList.remove("trans");
          domElements.slides[
            first
          ].style.transform = `translateX(${currTranslate}%)`;
        } else {
          currTranslate = prevTranslate - 100;
          domElements.slides[i].classList.add("trans");
          domElements.slides[
            i
          ].style.transform = `translateX(${currTranslate}%)`;
        }
      }
      if (first === numOfSlides - 1) {
        (first = 0), (last = numOfSlides - 1), (curr = 1);
      } else if (first === 0) {
        (first = 1), (last = 0), (curr = 2);
      } else if (curr === numOfSlides - 1) {
        (curr = 0), (last = 2), (first = numOfSlides - 1);
      } else {
        (first += 1), (last += 1), (curr += 1);
      }

      indicate(curr);
    };
    domElements.next.addEventListener("click", showNext);
    return {
      showNext: showNext
    };
  }

  function onPrev() {
    last = numOfSlides - 2;
    let showPrev = function() {
      for (let i = 0; i < numOfSlides; i++) {
        let prevTranslate = 0;
        let currTranslate;
        if (domElements.slides[i].style.transform) {
          prevTranslate = +domElements.slides[i].style.transform
            .split("(")[1]
            .split("%")[0];
        }
        if (i === last) {
          currTranslate = prevTranslate - (numOfSlides - 1) * 100;
          domElements.slides[last].classList.remove("trans");
          domElements.slides[
            last
          ].style.transform = `translateX(${currTranslate}%)`;
        } else {
          currTranslate = prevTranslate + 100;
          domElements.slides[i].classList.add("trans");
          domElements.slides[
            i
          ].style.transform = `translateX(${currTranslate}%)`;
        }
      }
      if (last === 0) {
        (last = numOfSlides - 1), (first = 0), (curr = 1);
      } else if (last === numOfSlides - 1) {
        (first = numOfSlides - 1), (last -= 1), (curr = 0);
      } else if (curr === 0) {
        (curr = numOfSlides - 1), (last = 1), (first = 2);
      } else {
        (last -= 1), (first -= 1), (curr -= 1);
      }
      indicate(curr);
    };
    domElements.prev.addEventListener("click", showPrev);
  }
  initializeDomElements();
  makeCircular();
  const obj = onNext();
  onPrev();
  let timer = setInterval(obj.showNext, 3000);
})();
