// TVET ICT Hub - contact form
(function () {
  // Paste your Google Apps Script web app URL below (see FORM-SETUP.md).
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyNMEnKo5LDPmBRXBAyKJl_3mJYOaGDwB5coMNkznjUJQGhglludZNIJi3blDPpgfw/exec';
  var WHATSAPP = 'https://wa.me/254720349953?text=';

  var form = document.getElementById('contact-form');
  var err = document.getElementById('c-error');
  var ok = document.getElementById('c-ok');
  var sendBtn = document.getElementById('c-send');

  function show(box, text) {
    err.hidden = true;
    ok.hidden = true;
    box.textContent = text;
    box.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('c-name').value.trim();
    var contact = document.getElementById('c-contact').value.trim();
    var msg = document.getElementById('c-msg').value.trim();
    var trap = document.getElementById('c-website').value;

    if (!name || !msg) {
      show(err, 'Please enter your name and a message.');
      return;
    }

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (trap) {
      show(ok, 'Thank you. Your message has been sent.');
      form.reset();
      return;
    }

    // Form not connected to Google Sheets yet: fall back to WhatsApp.
    if (!SCRIPT_URL || SCRIPT_URL.indexOf('PASTE_') === 0) {
      var text = 'Hello TVET ICT Hub, my name is ' + name + '. ' + msg;
      window.open(WHATSAPP + encodeURIComponent(text), '_blank', 'noopener');
      form.reset();
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    var body = new URLSearchParams();
    body.append('name', name);
    body.append('contact', contact);
    body.append('message', msg);
    body.append('page', window.location.href);

    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () {
        show(ok, 'Thank you. Your message has been sent.');
        form.reset();
      })
      .catch(function () {
        show(err, 'Sorry, your message could not be sent. Check your connection and try again, or message us on WhatsApp below.');
      })
      .then(function () {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
      });
  });
})();