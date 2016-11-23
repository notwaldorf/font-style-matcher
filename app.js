(function() {
  'use strict';

  getAllGoogleFonts();

  simulateFout.addEventListener('change', fout);
  downloadFont.addEventListener('change', download);
  useColours.addEventListener('change', colour);
  download();

  fallback.style.fontFamily = fallbackOutput.style.fontFamily = fallbackName.value;
  webfont.style.fontFamily = webfontOutput.style.fontFamily = webfontName.value;
  fallback.style.fontSize = fallbackOutput.style.fontSize = '16px';
  webfont.style.fontSize = webfontOutput.style.fontSize = '16px';
  fallback.style.lineHeight = fallbackOutput.style.lineHeight = '28px';
  webfont.style.lineHeight = webfontOutput.style.lineHeight = '28px';

  fallbackName.addEventListener('input', updateFontFamily);
  webfontName.addEventListener('input', updateFontFamily);

  fallbackSize.addEventListener('change', updateFontSize);
  fallbackSize.addEventListener('input', updateFontSize);
  webfontSize.addEventListener('change', updateFontSize);
  webfontSize.addEventListener('input', updateFontSize);

  fallbackLineHeight.addEventListener('change', updateLineHeight);
  fallbackLineHeight.addEventListener('input', updateLineHeight);
  webfontLineHeight.addEventListener('change', updateLineHeight);
  webfontLineHeight.addEventListener('input', updateLineHeight);

  fallbackSpacing.addEventListener('change', updateFontSpacing);
  fallbackSpacing.addEventListener('input', updateFontSpacing);
  webfontSpacing.addEventListener('change', updateFontSpacing);
  webfontSpacing.addEventListener('input', updateFontSpacing);

  fallbackWordSpacing.addEventListener('change', updateFontWordSpacing);
  fallbackWordSpacing.addEventListener('input', updateFontWordSpacing);
  webfontWordSpacing.addEventListener('change', updateFontWordSpacing);
  webfontWordSpacing.addEventListener('input', updateFontWordSpacing);

  fallbackWeight.addEventListener('change', updateFontWeight);
  fallbackWeight.addEventListener('input', updateFontWeight);
  webfontWeight.addEventListener('change', updateFontWeight);
  webfontWeight.addEventListener('input', updateFontWeight);

  function updateFontSize(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('font-size', which, value);
    updateStyle('font-size', which + 'Output', value);
    document.getElementById(which + 'SizeDisplay').textContent = value;
  }

  function updateLineHeight(event) {
    var value = event.target.value + 'px';
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
          options += '<option value="'+ names[i].family +'"/>'; ;
        }
        document.getElementById('families').innerHTML = options;
      }
    };
    request.send();
  }
})();
