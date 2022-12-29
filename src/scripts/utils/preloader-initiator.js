import { createPreloaderTemplate } from '../views/templates/template-creator';

const PreloaderInitiator = {
  init({ action, parentELement }) {
    switch (action) {
      case 'create':
        parentELement.innerHTML += createPreloaderTemplate();
        break;
      case 'show':
        (!parentELement.querySelector('.preloader').classList.contains('hidden')) ? parentELement.querySelector('.preloader').classList.remove('hidden') : null;
      case 'remove':
        parentELement.querySelector('.preloader').remove();
        break;
      default:
        console.error('unknown action.');
        console.error('list of available actions create, show and hidden.');
    }
  },
};

export default PreloaderInitiator;
