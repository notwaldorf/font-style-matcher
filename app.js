(function() {
  'use strict';

  var clipboard = new Clipboard('.clipboardButton');

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
  updateClipboardButtons();

  fallbackName.addEventListener('input', function(e) {
    writeStateToHistory();
    updateFontFamily(e);
  });
  webfontName.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontFamily(e);
  });

  fallbackSize.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontSize(e);
  });
  webfontSize.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontSize(e);
  });

  fallbackLineHeight.addEventListener('input', function (e) {
    writeStateToHistory();
    updateLineHeight(e);
  });
  webfontLineHeight.addEventListener('input', function (e) {
    writeStateToHistory();
    updateLineHeight(e);
  });

  fallbackSpacing.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontSpacing(e);
  });
  webfontSpacing.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontSpacing(e);
  });

  fallbackWordSpacing.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontWordSpacing(e);
  });
  webfontWordSpacing.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontWordSpacing(e);
  });

  fallbackWeight.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontWeight(e);
  });
  webfontWeight.addEventListener('input', function (e) {
    writeStateToHistory();
    updateFontWeight(e);
  });

  webfontOutput.addEventListener('blur', function (e) {
    writeStateToHistory();
    changeText(e);
  });
  webfontOutput.addEventListener('focus', function (e) {
    writeStateToHistory();
    clearText(e);
  });


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
          options += '<option value="'+ names[i].family +'"/>'; ;
        }
        document.getElementById('families').innerHTML = options;
      }
    };
    request.send();
  }


  // Stores data from inputs to state object
  function storeToState() {
    var fallback = {
      name: fallbackName.value,
      size: fallbackSize.value,
      lineHeight: fallbackLineHeight.value,
      spacing: fallbackSpacing.value,
      wordSpacing: fallbackWordSpacing.value,
      weight: fallbackWeight.value
    }

    var webfont = {
      name: webfontName.value,
      size: webfontSize.value,
      lineHeight: webfontLineHeight.value,
      spacing: webfontSpacing.value,
      wordSpacing: webfontWordSpacing.value,
      weight: webfontWeight.value
    }

    return {
      fallback: fallback,
      webfont: webfont
    }
  }


  // Restores inputs values from state object and triggers 'input' event for each input
  function restoreFromState(state) {
    fallbackName.value = state.fallback.name;
    fallbackSize.value = state.fallback.size;
    fallbackLineHeight.value = state.fallback.lineHeight;
    fallbackSpacing.value = state.fallback.spacing;
    fallbackWordSpacing.value = state.fallback.wordSpacing;
    fallbackWeight.value = state.fallback.weight;

    webfontName.value = state.webfont.name;
    webfontSize.value = state.webfont.size;
    webfontLineHeight.value = state.webfont.lineHeight;
    webfontSpacing.value = state.webfont.spacing;
    webfontWordSpacing.value = state.webfont.wordSpacing;
    webfontWeight.value = state.webfont.weight;

    var inputs = [
      fallbackName,
      fallbackSize,
      fallbackLineHeight,
      fallbackSpacing,
      fallbackWordSpacing,
      fallbackWeight,
      webfontName,
      webfontSize,
      webfontLineHeight,
      webfontSpacing,
      webfontWordSpacing,
      webfontWeight
    ];

    // Need to updates texts
    inputs.forEach(function(input) {
      input.dispatchEvent(new Event('input'))
    });
  }


  function writeStateToHistory() {
    var state = storeToState();
    var queryString = '?'
    var params = []
    for(var key in state.fallback) {
      params.push('fallback[' + key + ']=' + state.fallback[key]);
    }

    for(var key in state.webfont) {
      params.push('webfont[' + key + ']=' + state.webfont[key]);
    }

    queryString += params.join('&');

    history.replaceState(state, '', queryString);
  }

  window.addEventListener('popstate', function(e){
    restoreFromState(e.state);
  }, false);

  window.addEventListener('load', function() {
    var state = history.state;
    if (state) {
      restoreFromState(state);
      return;
    }

    if (window.location.search) {
      var state = window.location.search
        // removes leading ?
        .slice(1)
        // split queryparams
        .split('&')
        // keyvalye example: fallback[weight]=600
        .reduce(function(state, keyvalue) {
          keyvalue = keyvalue.split('=');
          var key = keyvalue[0];
          var value = keyvalue[1];
          var font = key.split('[')[0];
          var prop = key.split('[')[1].slice(0, -1);
          state[font][prop] = value;
          return state;
        }, {
          fallback: {},
          webfont: {}
        });

      restoreFromState(state);
    }
  });
})();
