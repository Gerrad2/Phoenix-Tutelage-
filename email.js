// ===== EMAILJS ULTIMATE DEBUG VERSION =====
const EMAILJS_SERVICE_ID = "service_g19o26h";
const EMAILJS_NEWSLETTER_TEMPLATE = "template_ovyxddg";
const EMAILJS_CONTACT_TEMPLATE = "template_c3n29pp";

console.log('🔍 EMAILJS DEBUG INFO:');
console.log('- Service ID:', EMAILJS_SERVICE_ID);
console.log('- Newsletter Template:', EMAILJS_NEWSLETTER_TEMPLATE);
console.log('- Contact Template:', EMAILJS_CONTACT_TEMPLATE);
console.log('- EmailJS available:', typeof emailjs !== 'undefined' ? '✅ YES' : '❌ NO');

// ===== NEWSLETTER FORM HANDLER =====
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        console.log('✅ Newsletter form found');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('='.repeat(50));
            console.log('📧 NEWSLETTER FORM SUBMITTED');
            
            // Get form data
            const name = document.getElementById('newsletter-name').value;
            const email = document.getElementById('newsletter-email').value;
            const interest = document.getElementById('newsletter-interest').value;
            
            console.log('Form values:', { name, email, interest });
            
            // Validate
            if (!name || !email) {
                alert('Please fill all fields');
                return;
            }
            
            const submitBtn = document.getElementById('newsletter-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // ✅ CORRECT PARAMETERS for {{email}} and {{name}}
            const templateParams = {
                email: email,
                name: name,
                interest: interest
            };
            
            console.log('📤 Sending to EmailJS...');
            console.log('Service:', EMAILJS_SERVICE_ID);
            console.log('Template:', EMAILJS_NEWSLETTER_TEMPLATE);
            console.log('Params:', templateParams);
            
            // Check if emailjs is available
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS library not loaded!');
                document.getElementById('newsletter-status').innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i> 
                        ❌ EmailJS library not loaded. Check internet connection.
                    </div>
                `;
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // SEND EMAIL
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NEWSLETTER_TEMPLATE, templateParams)
                .then(function(response) {
                    console.log('✅ EMAIL SENT SUCCESSFULLY!', response);
                    console.log('Status:', response.status);
                    console.log('Text:', response.text);
                    
                    document.getElementById('newsletter-status').innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i> 
                            ✅ Success! Check your email.
                        </div>
                    `;
                    newsletterForm.reset();
                })
                .catch(function(error) {
                    console.error('❌ EMAILJS ERROR:', error);
                    console.error('Error status:', error.status);
                    console.error('Error text:', error.text);
                    console.error('Full error object:', JSON.stringify(error, null, 2));
                    
                    let errorMessage = 'Unknown error';
                    if (error.text) errorMessage = error.text;
                    if (error.message) errorMessage = error.message;
                    
                    // Specific error codes
                    if (error.status === 0) {
                        errorMessage = 'Network error - check your internet';
                    } else if (error.status === 401) {
                        errorMessage = 'Authentication failed - Public Key issue';
                    } else if (error.status === 404) {
                        errorMessage = 'Service or Template not found - Check IDs';
                    } else if (error.status === 400) {
                        errorMessage = 'Bad request - Template parameter mismatch';
                    }
                    
                    document.getElementById('newsletter-status').innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i> 
                            ❌ Failed: ${errorMessage}
                        </div>
                    `;
                })
                .finally(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        document.getElementById('newsletter-status').innerHTML = '';
                    }, 5000);
                });
        });
    } else {
        console.error('❌ Newsletter form NOT found! Check ID "newsletter-form"');
    }
});