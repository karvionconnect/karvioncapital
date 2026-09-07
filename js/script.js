/**
 * Karvion Capital - Production Front-End Logic
 * Zero external libraries, clean configuration, accessible DOM interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     1. MASTER CONFIGURATION
     Replace placeholders below with your genuine credentials / endpoints.
     ======================================================================== */
  
  // Connect to Google Forms, Formspree, Web3Forms, or Cloudflare Worker endpoint
  // e.g., "https://formspree.io/f/xyzaovbd"
  const FORM_ENDPOINT = "";

  // Contact numbers
  // Format: International format without spaces or symbols for WhatsApp, e.g., "919876543210"
  const WHATSAPP_NUMBER = ""; 
  
  // Format for direct calling, e.g., "+919876543210"
  const PHONE_NUMBER = ""; 


  /* ========================================================================
     2. WHATSAPP & PHONE DYNAMIC BINDING
     ======================================================================== */
  const contactWhatsAppCard = document.getElementById('contactWhatsAppCard');
  const floatingWhatsApp = document.getElementById('floatingWhatsApp');
  const contactPhoneCard = document.getElementById('contactPhoneCard');

  if (WHATSAPP_NUMBER && WHATSAPP_NUMBER.trim() !== "") {
    const waClean = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${waClean}?text=${encodeURIComponent("Hello Karvion Capital, I would like to make an enquiry regarding a loan.")}`;
    
    if (contactWhatsAppCard) {
      contactWhatsAppCard.href = waUrl;
      contactWhatsAppCard.removeAttribute('hidden');
    }
    if (floatingWhatsApp) {
      floatingWhatsApp.href = waUrl;
      floatingWhatsApp.removeAttribute('hidden');
    }
  } else {
    // Graceful fallback if WhatsApp number is not yet supplied
    if (contactWhatsAppCard) {
      contactWhatsAppCard.addEventListener('click', (e) => {
        e.preventDefault();
        alert("WhatsApp communication is currently being configured. Please use our contact email or enquiry form.");
      });
    }
    if (floatingWhatsApp) {
      floatingWhatsApp.setAttribute('hidden', 'true');
    }
  }

  if (PHONE_NUMBER && PHONE_NUMBER.trim() !== "") {
    if (contactPhoneCard) {
      contactPhoneCard.href = `tel:${PHONE_NUMBER}`;
      const phoneTextSpan = contactPhoneCard.querySelector('.contact-val');
      if (phoneTextSpan) phoneTextSpan.textContent = PHONE_NUMBER;
    }
  }


  /* ========================================================================
     3. MOBILE NAVIGATION TOGGLE
     ======================================================================== */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-wrapper a');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('is-open', !isExpanded);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      });
    });
  }


  /* ========================================================================
     4. SOLUTION "ENQUIRE NOW" FAST-SELECT HOOK
     ======================================================================== */
  const solutionLinks = document.querySelectorAll('.solution-link');
  const loanTypeSelect = document.getElementById('loanType');

  solutionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const selectedLoan = link.getAttribute('data-loan');
      if (selectedLoan && loanTypeSelect) {
        loanTypeSelect.value = selectedLoan;
      }
    });
  });


  /* ========================================================================
     5. FORM VALIDATION & SUBMISSION ARCHITECTURE
     ======================================================================== */
  const form = document.getElementById('loanEnquiryForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = submitBtn ? submitBtn.querySelector('.spinner') : null;

  // Validation regular expressions
  // Matches: 10 digit Indian number starting with 6, 7, 8, or 9; or prefixed with +91 / 0
  const indianMobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFieldError = (fieldId, message) => {
    const errorElem = document.getElementById(`${fieldId}Error`);
    const inputElem = document.getElementById(fieldId);
    if (errorElem) errorElem.textContent = message;
    if (inputElem) inputElem.classList.add('is-invalid');
  };

  const clearFieldError = (fieldId) => {
    const errorElem = document.getElementById(`${fieldId}Error`);
    const inputElem = document.getElementById(fieldId);
    if (errorElem) errorElem.textContent = '';
    if (inputElem) inputElem.classList.remove('is-invalid');
  };

  const resetAllErrors = () => {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
    if (formStatus) {
      formStatus.hidden = true;
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      resetAllErrors();

      let isValid = true;

      // 1. Full Name
      const fullName = form.fullName.value.trim();
      if (!fullName) {
        setFieldError('fullName', 'Please enter your full name.');
        isValid = false;
      } else if (fullName.length < 3) {
        setFieldError('fullName', 'Name must be at least 3 characters.');
        isValid = false;
      }

      // 2. Mobile Number
      const mobileNumber = form.mobileNumber.value.trim().replace(/\s+/g, '');
      if (!mobileNumber) {
        setFieldError('mobileNumber', 'Please enter your mobile number.');
        isValid = false;
      } else if (!indianMobileRegex.test(mobileNumber)) {
        setFieldError('mobileNumber', 'Please enter a valid 10-digit Indian mobile number.');
        isValid = false;
      }

      // 3. Email Address (Optional)
      const emailAddress = form.emailAddress.value.trim();
      if (emailAddress && !emailRegex.test(emailAddress)) {
        setFieldError('emailAddress', 'Please enter a valid email address.');
        isValid = false;
      }

      // 4. City
      const city = form.city.value.trim();
      if (!city) {
        setFieldError('city', 'Please state your city.');
        isValid = false;
      }

      // 5. Employment Type
      if (!form.employmentType.value) {
        setFieldError('employmentType', 'Please select your employment type.');
        isValid = false;
      }

      // 6. Monthly Income
      if (!form.monthlyIncome.value) {
        setFieldError('monthlyIncome', 'Please select your monthly income range.');
        isValid = false;
      }

      // 7. Loan Type
      if (!form.loanType.value) {
        setFieldError('loanType', 'Please select a loan type.');
        isValid = false;
      }

      // 8. Loan Amount
      if (!form.loanAmount.value) {
        setFieldError('loanAmount', 'Please select the required loan amount.');
        isValid = false;
      }

      // 9. Existing Loan (Radio)
      const existingLoanSelected = form.querySelector('input[name="existingLoan"]:checked');
      if (!existingLoanSelected) {
        const err = document.getElementById('existingLoanError');
        if (err) err.textContent = 'Please indicate whether you have an existing loan.';
        isValid = false;
      }

      // 10. Consent Checkbox
      if (!form.consentCheck.checked) {
        const err = document.getElementById('consentCheckError');
        if (err) err.textContent = 'You must authorize contact to proceed.';
        isValid = false;
      }

      if (!isValid) {
        const firstError = document.querySelector('.field-error:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Compile payload
      const formData = {
        fullName: fullName,
        mobileNumber: mobileNumber,
        emailAddress: emailAddress || "N/A",
        city: city,
        employmentType: form.employmentType.value,
        monthlyIncome: form.monthlyIncome.value,
        loanType: form.loanType.value,
        loanAmount: form.loanAmount.value,
        existingLoan: existingLoanSelected.value,
        preferredTime: form.contactTime.value || "Anytime",
        additionalInfo: form.additionalInfo.value.trim() || "None",
        submittedAt: new Date().toISOString()
      };

      /* ----------------------------------------------------------------------
         SUBMISSION HANDLER:
         If FORM_ENDPOINT is empty, display clear verification feedback without 
         falsely claiming the transmission has occurred.
         ---------------------------------------------------------------------- */
      if (!FORM_ENDPOINT || FORM_ENDPOINT.trim() === "") {
        console.warn("Karvion Capital Form Notice: FORM_ENDPOINT is not yet configured. Form payload captured:", formData);
        formStatus.className = 'form-status notice';
        formStatus.hidden = false;
        formStatus.innerHTML = `
          <strong>Validation Successful (Development Mode):</strong><br>
          Your test inputs are valid. To route submissions directly to your email, Google Sheets, or CRM, specify your endpoint URL inside <code>js/script.js</code> under <code>FORM_ENDPOINT</code>.
        `;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // If FORM_ENDPOINT is supplied, send POST request
      try {
        submitBtn.disabled = true;
        if (spinner) spinner.hidden = false;

        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          form.reset();
          formStatus.className = 'form-status success';
          formStatus.hidden = false;
          formStatus.innerHTML = `
            <strong>Thank You!</strong> Your enquiry has been received. Our advisory team will review your requirement and reach out shortly during business hours.
          `;
        } else {
          throw new Error('Network response was not OK');
        }
      } catch (err) {
        console.error("Submission failed:", err);
        formStatus.className = 'form-status error';
        formStatus.hidden = false;
        formStatus.innerHTML = `
          <strong>Unable to submit:</strong> We encountered a network connection issue. Please contact us directly at <a href="mailto:info@karvioncapital.com">info@karvioncapital.com</a>.
        `;
      } finally {
        submitBtn.disabled = false;
        if (spinner) spinner.hidden = true;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }


  /* ========================================================================
     6. ACCESSIBLE MODALS (PRIVACY & TERMS)
     ======================================================================== */
  const setupModal = (triggerId, modalId, closeId) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);

    if (!trigger || !modal || !closeBtn) return;

    const openModal = () => {
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeModal = () => {
      modal.setAttribute('hidden', 'true');
      document.body.style.overflow = '';
      trigger.focus();
    };

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  };

  setupModal('btnOpenPrivacy', 'privacyModal', 'btnClosePrivacy');
  setupModal('btnOpenTerms', 'termsModal', 'btnCloseTerms');

});

