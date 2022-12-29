import SubmitReviewInitiator from '../src/scripts/utils/submit-review-initiator';

describe('form input new review', () => {
  const addInputReviewFormTemplate = () => {
    document.body.innerHTML = `
    <form class="input_new_review">
    <p class="message add_review">add review can't work offline</p>
    <input tabindex="" type="text" class="input__name" id="inputName" placeholder="Your name." autocomplete="off" data-submit="false" required>
    <textArea tabindex="0" aria-label="give your review here." class="input__review" id="inputReview" rows="5" placeholder="give your review here." data-submit="false" autocomplete="off" required></textArea>
    <button tabindex="0" aria-label="button submit" type="submit" id="buttonSubmitReview">Submit</button>
    </form>
    `;
  };

  beforeEach(() => {
    addInputReviewFormTemplate();
  });

  it(`Do not show the message "add review can't work offline" when online`, async () => {
    SubmitReviewInitiator.init(1);
    expect(document.querySelector('.message.add_review').classList.contains('hidden')).toBeTruthy();
  });

  it(`Show input name, input review, and submit button when online`, async () => {
    SubmitReviewInitiator.init(1);

    expect(document.getElementById('inputName').classList.contains('hidden') && document.getElementById('inputReview').classList.contains('hidden') && document.getElementById('buttonSubmitReview').classList.contains('hidden')).toBeFalsy();
  });

  it(`Show the message "add review can't work offline" when offline`, async () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });

    SubmitReviewInitiator.init(1);

    expect(document.querySelector('.message.add_review').classList.contains('hidden')).toBeFalsy();

    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    });
  });

  it('Do not show input name, input review, and submit button when offline', async () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });

    SubmitReviewInitiator.init(1);

    expect(document.getElementById('inputName').classList.contains('hidden') && document.getElementById('inputReview').classList.contains('hidden') && document.getElementById('buttonSubmitReview').classList.contains('hidden')).toBeTruthy();

    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    });
  });

  it('Input name and input review cannot be an empty string', async () => {
    SubmitReviewInitiator.init(1);

    document.getElementById('inputName').value = '';

    document.getElementById('inputReview').value = '';

    document.getElementById('buttonSubmitReview').dispatchEvent(new Event('click'));

    expect(document.getElementById('inputName').dataset.submit && document.getElementById('inputReview').dataset.submit).toEqual('false');
  });

  it('Must proceed to the submit process when input name and input review are not empty strings', async () => {
    SubmitReviewInitiator.init(1);

    document.getElementById('inputName').value = 'a';

    document.getElementById('inputReview').value = 'b';

    document.getElementById('buttonSubmitReview').dispatchEvent(new Event('click'));

    expect(document.getElementById('inputName').dataset.submit && document.getElementById('inputReview').dataset.submit).toEqual('true');
  });
});
