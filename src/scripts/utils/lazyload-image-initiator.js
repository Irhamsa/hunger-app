const LazyLoadimageInitiator = {
  init({ root, rootMargin, threshold, isMultipleTarget, target }) {
    const options = {
      root,
      rootMargin,
      threshold,
    };
    this._observer(this._handleIntersect, options, isMultipleTarget, target);
  },

  _observer( callback, options, isMultipleTarget, target ) {
    const observer = new IntersectionObserver(callback, options);
    if (isMultipleTarget) {
      const targetElement = Array.from(target);
      targetElement.forEach((element) => {
        observer.observe(element);
      });
      return;
    }

    observer.observe(target);
  },

  _handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const imgElement = entry.target.querySelector('img');
        imgElement.setAttribute('src', imgElement.dataset.src);
      }
    });
  },
};

export default LazyLoadimageInitiator;
