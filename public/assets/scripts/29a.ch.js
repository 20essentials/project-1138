window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
(function () {
  var language = navigator.language.replace(/-.+$/, '');
  var canonicalEl = document.querySelector('link[rel=canonical]');
  // do not report page views without canonical
  if (!canonicalEl || !canonicalEl.href) return;
  var canonicalPath = canonicalEl.href.replace(/^https?:\/\/[^/+]+/, '');
  var data = {
    scheme: location.protocol,
    host: location.host, // or hostname?
    path: canonicalPath,
    referrer: document.referrer,
    language,
    duration: 0,
    load: 0,
    // error, left out for now
  };
  window.addEventListener('pageshow', () => {
    var sent = false;
    var start = performance.now();
    var hide = () => {
      data.duration = (performance.now() - start) / 1000; // not sure if this is quite right either
      data.load = (performance.timing.loadEventEnd - performance.timing.navigationStart) / 1000;
      if (!sent) {
        navigator.sendBeacon('/hit', JSON.stringify(data));
        sent = true;
      } else {
      }
    };
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        hide();
      }
    });
    window.addEventListener('pagehide', hide);
  });
}());