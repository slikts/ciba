import { setupTextarea } from './editor';

const url = new URL(window.location);

const onClose = (textarea: HTMLTextAreaElement) => {
  textarea.closest('form').querySelector('input[name="prop_opt_preformatted"]').checked = true;
};

if (url.searchParams.get('mode') === 'reply') {
  setupTextarea(document.querySelector('#commenttext'), { onClose });
}
