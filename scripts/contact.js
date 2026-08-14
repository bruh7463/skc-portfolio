/* ============================================================
   scripts/contact.js
   EmailJS contact form + custom toast notifications
   ------------------------------------------------------------
   SETUP — replace the three placeholders below with your own
   EmailJS credentials (create a free account at emailjs.com):

   - YOUR_SERVICE_ID  → Email Services -> your service ID
   - YOUR_TEMPLATE_ID → Email Templates -> your template ID
   - YOUR_PUBLIC_KEY  → Account -> General -> Public Key

   Also make sure your EmailJS template has variables that
   match the names used here:  from_name, from_email,
   subject, message. See README for full instructions.
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = {
    serviceId: 'service_6xd6xwu',
    templateId: 'template_it28x8s',
    publicKey: '5XxIT5NkPl7uSufyG'
  };

  var CONFIG_READY =
    CONFIG.serviceId.indexOf('YOUR_') === -1 &&
    CONFIG.templateId.indexOf('YOUR_') === -1 &&
    CONFIG.publicKey.indexOf('YOUR_') === -1;

  /* ---------- Toast helper ---------- */
  function showToast(message, type) {
    type = type || 'info';
    var region = document.querySelector('.toast-region');
    if (!region) return;

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.setAttribute('role', 'status');

    var icon = document.createElement('i');
    icon.className =
      type === 'success'
        ? 'fa-solid fa-circle-check'
        : type === 'error'
        ? 'fa-solid fa-circle-xmark'
        : 'fa-solid fa-circle-info';
    var text = document.createElement('span');
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    region.appendChild(toast);

    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 320);
    }, 4000);
  }

  /* ---------- Form handling ---------- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var sendBtn = form.querySelector('#send-btn');
  var btnText = form.querySelector('.btn-text');
  var btnLoading = form.querySelector('.btn-loading');

  function setFieldError(name, message) {
    var field = document.getElementById(name);
    var wrapper = field ? field.closest('.form-field') : null;
    var existing = wrapper ? wrapper.querySelector('.form-error') : null;
    if (message) {
      if (!existing) {
        existing = document.createElement('span');
        existing.className = 'form-error';
        wrapper.appendChild(existing);
      }
      existing.textContent = message;
      if (wrapper) wrapper.classList.add('has-error');
    } else if (existing) {
      existing.remove();
      if (wrapper) wrapper.classList.remove('has-error');
    }
  }

  function setLoading(isLoading) {
    if (isLoading) {
      btnText.hidden = true;
      btnLoading.hidden = false;
      sendBtn.disabled = true;
    } else {
      btnText.hidden = false;
      btnLoading.hidden = true;
      sendBtn.disabled = false;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var subject = form.subject.value.trim();
    var message = form.message.value.trim();
    var valid = true;

    if (!name) {
      setFieldError('name', 'Please enter your name.');
      valid = false;
    } else {
      setFieldError('name', '');
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      setFieldError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setFieldError('email', '');
    }

    if (!subject) {
      setFieldError('subject', 'Please add a subject.');
      valid = false;
    } else {
      setFieldError('subject', '');
    }

    if (!message) {
      setFieldError('message', 'Please write a message.');
      valid = false;
    } else {
      setFieldError('message', '');
    }

    if (!valid) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    if (!CONFIG_READY) {
      showToast(
        'EmailJS not configured yet — see scripts/contact.js to add your keys.',
        'error'
      );
      return;
    }

    if (typeof emailjs === 'undefined') {
      showToast('EmailJS SDK failed to load. Check your internet connection.', 'error');
      return;
    }

    setLoading(true);

    // Format the current date so the template's {{time}} placeholder can resolve.
    var now = new Date();
    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }
    var time =
      now.getFullYear() +
      '-' + pad(now.getMonth() + 1) +
      '-' + pad(now.getDate()) +
      ' ' + pad(now.getHours()) +
      ':' + pad(now.getMinutes());

    // Send the params under BOTH naming conventions so that no matter which
    var templateParams = {
      from_name: name,
      name: name,
      from_email: email,
      email: email,
      subject: subject,
      title: subject,
      message: message,
      time: time,
      // EmailJS special param: makes "Reply" go to the visitor even though the
      // From address will always be your own connected email account.
      reply_to: email
    };

    emailjs
      .send(CONFIG.serviceId, CONFIG.templateId, templateParams, {
        publicKey: CONFIG.publicKey
      })
      .then(
        function () {
          setLoading(false);
          form.reset();
          showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        },
        function () {
          setLoading(false);
          showToast('Failed to send the message. Please try again.', 'error');
        }
      );
  });

  // Clear an inline error as the user types
  ['name', 'email', 'subject', 'message'].forEach(function (name) {
    var input = document.getElementById(name);
    if (input) {
      input.addEventListener('input', function () {
        setFieldError(name, '');
      });
    }
  });
})();
