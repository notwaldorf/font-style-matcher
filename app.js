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
  fallback.style.lineHeight = fallbackOutput.style.lineHeight = '1.8'
  webfont.style.lineHeight = webfontOutput.style.lineHeight = '1.8';

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

  useUnitless.addEventListener('change', unitlessLineHeight);

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
    var unitlessLH = useUnitless.checked;
    var value = unitlessLH ? event.target.value : event.target.value + 'px';
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

  function unitlessLineHeight() {
    var unitlessLH = useUnitless.checked;

    // reset to defaults
    document.getElementById('unitlessText').style.display = '';

    webfontLineHeight.setAttribute('min', '0.5');
    webfontLineHeight.setAttribute('max', '3.5');
    webfontLineHeight.setAttribute('step', '0.05');
    webfontLineHeight.value = '1.8';

    fallbackLineHeight.setAttribute('min', '0.5');
    fallbackLineHeight.setAttribute('max', '3.5');
    fallbackLineHeight.setAttribute('step', '0.05');
    fallbackLineHeight.value = '1.8';

    // if px set new values to input range
    if (!unitlessLH) {
      document.getElementById('unitlessText').style.display = 'none';

      webfontLineHeight.setAttribute('min', '5');
      webfontLineHeight.setAttribute('max', '100');
      webfontLineHeight.setAttribute('step', '1');
      webfontLineHeight.value = '28';

      fallbackLineHeight.setAttribute('min', '5');
      fallbackLineHeight.setAttribute('max', '100');
      fallbackLineHeight.setAttribute('step', '1');
      fallbackLineHeight.value = '28';

    }

    // trigger event
    var event = document.createEvent('HTMLEvents');
    event.initEvent('input', true, false);

    fallbackLineHeight.dispatchEvent(event);
    webfontLineHeight.dispatchEvent(event);
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
