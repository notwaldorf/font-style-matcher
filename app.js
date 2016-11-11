(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(_ => {
      console.log('service worker is all cool 🐳');
    }).catch(e => {
      console.error('service worker is not so cool 🔥', e);
      throw e;
    });

    // if (navigator.serviceWorker.controller) {
    //   // Correctly prompt the user to reload during SW phase change.
    //   navigator.serviceWorker.controller.onstatechange = e => {
    //     if (e.target.state === 'redundant') {
    //       document.querySelector('#reload-prompt').style.visibility = 'visible';
    //     }
    //   }
    // }
  }
})();
