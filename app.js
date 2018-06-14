(function() {
  'use strict';

  var clipboard = new Clipboard('.clipboardButton');

  getAllGoogleFonts();

  simulateFout.addEventListener('change', fout);
  downloadFont.addEventListener('change', download);
  useColours.addEventListener('change', colour);
  uploadFont.addEventListener('change', upload);
  uploadFontBtn.addEventListener('click', uploadBtn);
  document.addEventListener('dragover', function(event) { event.preventDefault(); });
  document.addEventListener('dragenter', dragEnter);
  document.addEventListener('dragleave', dragLeave);
  document.addEventListener('drop', drop);
  download();

  fallback.style.fontFamily = fallbackOutput.style.fontFamily = fallbackName.value;
  webfont.style.fontFamily = webfontOutput.style.fontFamily = webfontName.value;
  fallback.style.fontSize = fallbackOutput.style.fontSize = '16px';
  webfont.style.fontSize = webfontOutput.style.fontSize = '16px';
  fallback.style.lineHeight = fallbackOutput.style.lineHeight = '1.6';
  webfont.style.lineHeight = webfontOutput.style.lineHeight = '1.6';
  updateClipboardButtons();

  fallbackName.addEventListener('input', updateFontFamily);
  webfontName.addEventListener('input', updateFontFamily);

  fallbackSize.addEventListener('input', updateFontSize);
  webfontSize.addEventListener('input', updateFontSize);

  fallbackLineHeight.addEventListener('input', updateLineHeight);
  webfontLineHeight.addEventListener('input', updateLineHeight);

  fallbackSpacing.addEventListener('input', updateFontSpacing);
  webfontSpacing.addEventListener('input', updateFontSpacing);

  fallbackWordSpacing.addEventListener('input', updateFontWordSpacing);
  webfontWordSpacing.addEventListener('input', updateFontWordSpacing);

  fallbackWeight.addEventListener('input', updateFontWeight);
  webfontWeight.addEventListener('input', updateFontWeight);

  webfontOutput.addEventListener('blur', changeText);
  webfontOutput.addEventListener('focus', clearText);


  clipboard.on('success', function(e) {
    var span = e.trigger.querySelector('span')
    span.textContent = 'Copied!';
    setTimeout(function() {
      span.textContent = 'Copy CSS to clipboard';
    }, 1000);
  });

  clipboard.on('error', function(e) {
    var span = e.trigger.querySelector('span')
    span.textContent = 'Error copying :(';
    setTimeout(function() {
      span.textContent = 'Copy CSS to clipboard';
    }, 1000);
  });

  function clearText() {
    fallbackOutput.style.height = this.offsetHeight + 'px';
    fallbackOutput.innerHTML = "";
  }

  function changeText() {
    fallbackOutput.style.height = 'auto';
    fallbackOutput.innerHTML = this.innerHTML;
  }

  function updateFontSize(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('font-size', which, value);
    updateStyle('font-size', which + 'Output', value);
    document.getElementById(which + 'SizeDisplay').textContent = value;
  }

  function updateLineHeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('line-height', which, value);
    updateStyle('line-height', which + 'Output', value);
    document.getElementById(which + 'LineHeightDisplay').textContent = value;
  }

  function updateFontSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('letter-spacing', which, value);
    updateStyle('letter-spacing', which + 'Output', value);
    document.getElementById(which + 'SpacingDisplay').textContent = value;
  }

  function updateFontWordSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('word-spacing', which, value);
    updateStyle('word-spacing', which + 'Output', value);
    document.getElementById(which + 'WordSpacingDisplay').textContent = value;
  }

  function updateFontFamily(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-family', which, value);
    updateStyle('font-family', which + 'Output', value);

    if (which === 'webfont') {
      download();
    }
  }

  function updateFontWeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-weight', which, value);
    updateStyle('font-weight', which + 'Output', value);
    document.getElementById(which + 'WeightDisplay').textContent = value;
  }

  function updateStyle(name, element, value) {
    document.getElementById(element).style[name] = value;
    updateClipboardButtons();
  }

  function updateClipboardButtons() {
    var fallbackCss = fallbackOutput.style.cssText.split('; ').join('\n');
    var webfontCss = webfontOutput.style.cssText.split('; ').join('\n');
    document
        .getElementById('fallbackClipboardButton')
        .setAttribute('data-clipboard-text', fallbackCss);
    document
        .getElementById('webfontClipboardButton')
        .setAttribute('data-clipboard-text', webfontCss);
  }

  function fout(event) {
    if (!event.target.checked) {
      clearTimeout(window.__timeout1);
      clearTimeout(window.__timeout2);
      clearTimeout(window.__timeout3);
      fallbackOutput.style.visibility = 'visible';
      webfontOutput.style.visibility = 'visible';
    } else {
      startFout();
    }
  }

  function startFout() {
    fallbackOutput.style.visibility = 'hidden';
    webfontOutput.style.visibility = 'hidden';

    window.__timeout1 = setTimeout(function() {
      fallbackOutput.style.visibility = 'visible';

      window.__timeout2 = setTimeout(function() {
        fallbackOutput.style.visibility = 'hidden';
        webfontOutput.style.visibility = 'visible';
        window.__timeout3 = setTimeout(startFout, 1000);
      }, 500);
    }, 100)
  }

  function download() {
    var shouldDownload = downloadFont.checked;

    if (!shouldDownload)
      return;

    var url = 'https://fonts.googleapis.com/css?family=' + webfontName.value.trim() +
        ':300,300i,400,400i,700,700i,900,900i';

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  function colour() {
    var shouldColour = useColours.checked;
    fallbackOutput.style.color = shouldColour ? 'red' : 'black';
  }

  function getAllGoogleFonts() {
    var request = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAkX01E9DhABr4cn4tKD26JuHQstaT5-Ss';
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        var names = data.items;
        var options = '';
        for (var i = 0; i < names.length; i++) {
          options += '<option value="'+ names[i].family +'"/>';
        }
        document.getElementById('families').innerHTML = options;
      }
    };
    request.send();
  }

  var currentObjectURL = '';

  function upload() {
    var file = uploadFont.files[0];
    if (!file) return;
    processFile(file);
  }

  function processFile(file) {
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
    }

    var cssName = JSON.stringify(file.name);
    var style = document.createElement('style');

    webfontName.value = file.name;
    currentObjectURL = URL.createObjectURL(file);
    style.textContent = `
      @font-face {
        font-family: ${cssName};
        src: url(${JSON.stringify(currentObjectURL)});
      }
    `;

    document.head.appendChild(style);
    updateStyle('font-family', 'webfont', cssName);
    updateStyle('font-family', 'webfont' + 'Output', cssName);
  }

  function uploadBtn(event) {
    event.preventDefault();
    uploadFont.click();
  }

  var supportedExtensions = uploadFont.accept.split(',');
  // lol drag & drop is still horrible
  var enterCount = 0;

  function dragEnter() {
    enterCount++;
    dropAlert.style.opacity = 1;
  }

  function dragLeave() {
    enterCount--;

    if (!enterCount) {
      dropAlert.style.opacity = 0;
    }
  }

  function drop(event) {
    event.preventDefault();
    enterCount = 0;
    dropAlert.style.opacity = 0;

    var file = event.dataTransfer.files[0];
    if (!file) return;

    var fileSupported = supportedExtensions.some(function(ext) {
      return file.name.endsWith(ext);
    });

    if (!fileSupported) return;
    processFile(file);
  }
})();
