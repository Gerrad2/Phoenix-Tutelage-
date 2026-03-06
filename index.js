// ===== MOBILE MENU TOGGLE =====
const menubtn = document.getElementById('menubtn');
const navlinks = document.querySelector('.nav-links');

menubtn.addEventListener('click', () => {
    navlinks.classList.toggle('active');
    menubtn.innerHTML = navlinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navlinks.classList.remove('active');
        menubtn.innerHTML = '☰';
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== COUNT-UP ANIMATION FOR SCORES =====
function animateNumbers() {
    const scoreNumbers = document.querySelectorAll('#score div span:first-child');
    
    scoreNumbers.forEach(span => {
        const target = parseInt(span.textContent);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = Math.ceil(target / 50);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                span.textContent = target;
                clearInterval(timer);
            } else {
                span.textContent = current;
            }
        }, 20);
    });
}

// Trigger animation when Hall of Fame section is visible
const fameSection = document.getElementById('fame');
let animated = false;

window.addEventListener('scroll', () => {
    if (!fameSection) return;
    
    const sectionPos = fameSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos && !animated) {
        animateNumbers();
        animated = true;
    }
});

// ===== HIGHLIGHT ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== CLOSE MOBILE MENU ON RESIZE =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
        navlinks.classList.remove('active');
        menubtn.innerHTML = '☰';
    }
});

// ===== 1. COUNTDOWN TIMER FOR JAMB 2026 =====
function createCountdown() {
    if (!document.getElementById('countdown')) {
        const homeSection = document.getElementById('home');
        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'countdown';
        countdownDiv.innerHTML = `
            <h3><i class="fas fa-hourglass-half"></i> JAMB 2026 Countdown</h3>
            <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
                <div><span id="days">00</span><br>Days</div>
                <div><span id="hours">00</span><br>Hours</div>
                <div><span id="minutes">00</span><br>Mins</div>
                <div><span id="seconds">00</span><br>Secs</div>
            </div>
        `;
        homeSection.appendChild(countdownDiv);
    }

    const jambDate = new Date('2026-04-15T08:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = jambDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h3>🎉 JAMB Exam Started!</h3>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

createCountdown();

// ===== 2. TESTIMONIAL SLIDER =====
function createTestimonialSlider() {
    const testimonials = [
        { name: "Ademola Rufus", score: 357, text: "Phoenix Tutelage changed my life! I never thought I could score this high." },
        { name: "Familusi Opeyemi", score: 357, text: "The intensive classes and mock exams really prepared me for JAMB." },
        { name: "Alayode Timileyin", score: 354, text: "Best decision I ever made. The teachers are exceptional!" }
    ];

    const fameSection = document.getElementById('fame');
    const sliderDiv = document.createElement('div');
    sliderDiv.id = 'testimonial-slider';
    sliderDiv.style.cssText = `
        margin: 40px 0;
        padding: 30px;
        background: linear-gradient(135deg, #1565c0, #1a237e);
        color: white;
        border-radius: 10px;
        text-align: center;
    `;

    let currentIndex = 0;

    function updateTestimonial() {
        const t = testimonials[currentIndex];
        sliderDiv.innerHTML = `
            <h3><i class="fas fa-quote-left"></i> Student Testimonials <i class="fas fa-quote-right"></i></h3>
            <div style="margin: 20px 0;">
                <p style="font-size: 18px; font-style: italic;">"${t.text}"</p>
                <p><strong>${t.name}</strong> - ${t.score} in UTME</p>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                    <button id="prev-testimonial" class="btn" style="background: #ffcc00; color: #333;">❮ Previous</button>
                    <button id="next-testimonial" class="btn" style="background: #ffcc00; color: #333;">Next ❯</button>
                </div>
            </div>
        `;
    }

    updateTestimonial();
    fameSection.appendChild(sliderDiv);

    setTimeout(() => {
        document.getElementById('prev-testimonial')?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });

        document.getElementById('next-testimonial')?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial();
        });
    }, 100);
}

createTestimonialSlider();

// ===== 3. LIVE SEARCH FOR HALL OF FAME =====
function addSearchToHallOfFame() {
    const fameSection = document.getElementById('fame');
    const scoreDiv = document.getElementById('score');

    const searchDiv = document.createElement('div');
    searchDiv.style.margin = '20px 0';
    searchDiv.innerHTML = `
        <input type="text" id="studentSearch" placeholder="🔍 Search for a student..." style="
            padding: 12px 20px;
            width: 80%;
            max-width: 400px;
            border: 2px solid #1565c0;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
        ">
    `;

    fameSection.insertBefore(searchDiv, scoreDiv);

    document.getElementById('studentSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const students = document.querySelectorAll('#score div');

        students.forEach(student => {
            const name = student.querySelector('span:last-child')?.textContent.toLowerCase() || '';
            student.style.display = name.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

addSearchToHallOfFame();

// ===== 4. PRICE CALCULATOR =====
function addPriceCalculator() {
    const pricingSection = document.getElementById('pricing');
    
    const calculatorDiv = document.createElement('div');
    calculatorDiv.style.cssText = `
        margin: 30px 0;
        padding: 30px;
        background: #f0f4f8;
        border-radius: 10px;
        text-align: center;
    `;

    calculatorDiv.innerHTML = `
        <h3><i class="fas fa-calculator"></i> Calculate Your Investment</h3>
        <select id="plan-select" style="padding: 10px; margin: 10px; border-radius: 5px;">
            <option value="12000">Bronze Plan - ₦12,000</option>
            <option value="20000">Silver Plan - ₦20,000</option>
            <option value="30000">Gold Plan - ₦30,000</option>
        </select>
        <select id="duration-select" style="padding: 10px; margin: 10px; border-radius: 5px;">
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months (10% discount)</option>
            <option value="12">12 Months (15% discount)</option>
        </select>
        <div style="margin-top: 20px;">
            <p style="font-size: 24px; font-weight: bold;">
                Total: ₦<span id="total-price">12000</span>
            </p>
            <p id="discount-info" style="color: green;"></p>
        </div>
    `;

    pricingSection.appendChild(calculatorDiv);

    function calculatePrice() {
        const basePrice = parseInt(document.getElementById('plan-select').value);
        const duration = parseInt(document.getElementById('duration-select').value);
        let total = basePrice * duration;
        let discount = 0;

        if (duration === 6) {
            discount = 0.1;
            document.getElementById('discount-info').textContent = '✨ 10% discount applied!';
        } else if (duration === 12) {
            discount = 0.15;
            document.getElementById('discount-info').textContent = '✨ 15% discount applied!';
        } else {
            document.getElementById('discount-info').textContent = '';
        }

        total = total * (1 - discount);
        document.getElementById('total-price').textContent = total.toLocaleString();
    }

    document.getElementById('plan-select').addEventListener('change', calculatePrice);
    document.getElementById('duration-select').addEventListener('change', calculatePrice);
}

addPriceCalculator();

// ===== 5. BACK TO TOP BUTTON =====
function addBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1565c0;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        z-index: 999;
    `;

    btn.addEventListener('mouseenter', () => {
        btn.style.background = '#1a237e';
        btn.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.background = '#1565c0';
        btn.style.transform = 'scale(1)';
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

addBackToTop();

// ===== 6. READING PROGRESS BAR =====
function addProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #ffcc00, #ff9800);
        width: 0%;
        z-index: 1001;
        transition: width 0.2s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

addProgressBar();

// ===== 7. MODAL POPUP FOR ENROLLMENT =====
function addEnrollmentModal() {
    const modal = document.createElement('div');
    modal.id = 'enroll-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 2000;
        justify-content: center;
        align-items: center;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideIn 0.5s ease;
        ">
            <button id="close-modal" style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            ">&times;</button>
            
            <h2><i class="fas fa-graduation-cap"></i> Quick Enrollment</h2>
            <p>Fill this form and we'll contact you immediately!</p>
            
            <form id="enroll-form" onsubmit="return false;">
                <input type="text" placeholder="Full Name" required style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                "><br>
                
                <input type="tel" placeholder="Phone Number" required style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                "><br>
                
                <select required style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                ">
                    <option value="">Select Plan</option>
                    <option value="bronze">Bronze Plan - ₦12,000</option>
                    <option value="silver">Silver Plan - ₦20,000</option>
                    <option value="gold">Gold Plan - ₦30,000</option>
                </select><br>
                
                <button type="submit" style="
                    width: 100%;
                    padding: 12px;
                    background: #1565c0;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Submit</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const enrollBtn = document.querySelector('a[href="#enroll-Now"]');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('enroll-form').addEventListener('submit', () => {
        alert('✅ Thank you! We\'ll contact you within 24 hours.');
        modal.style.display = 'none';
    });
}

addEnrollmentModal();

// ===== 8. ANIMATED COUNTER FOR STATISTICS =====
function addStatsCounter() {
    const statsDiv = document.createElement('div');
    statsDiv.id = 'stats-counter';
    statsDiv.style.cssText = `
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: 40px 0;
        padding: 30px;
        background: linear-gradient(135deg, #0a2540, #1565c0);
        color: white;
        border-radius: 10px;
    `;

    statsDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 40px; font-weight: bold;" id="student-count">0</div>
            <div>Students</div>
        </div>
        <div style="text-align: center;">
            <div style="font-size: 40px; font-weight: bold;" id="success-count">0</div>
            <div>300+ Scorers</div>
        </div>
        <div style="text-align: center;">
            <div style="font-size: 40px; font-weight: bold;" id="years-count">0</div>
            <div>Years Experience</div>
        </div>
    `;

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.insertAdjacentElement('afterend', statsDiv);
    }

    let animated = false;
    window.addEventListener('scroll', () => {
        if (animated) return;
        
        const rect = statsDiv.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animated = true;
            
            const students = document.getElementById('student-count');
            const success = document.getElementById('success-count');
            const years = document.getElementById('years-count');
            
            let studentsCount = 0;
            let successCount = 0;
            let yearsCount = 0;
            
            const timer = setInterval(() => {
                if (studentsCount < 500) studentsCount += 10;
                if (successCount < 50) successCount += 1;
                if (yearsCount < 5) yearsCount += 0.1;
                
                students.textContent = Math.floor(studentsCount);
                success.textContent = Math.floor(successCount);
                years.textContent = Math.floor(yearsCount);
                
                if (studentsCount >= 500 && successCount >= 50 && yearsCount >= 5) {
                    clearInterval(timer);
                }
            }, 20);
        }
    });
}

addStatsCounter();

// ===== 9. WHATSAPP FLOATING BUTTON =====
function addWhatsAppButton() {
    if (document.getElementById('whatsapp-float')) return;
    
    const waBtn = document.createElement('a');
    waBtn.id = 'whatsapp-float';
    waBtn.href = 'https://wa.link/vjj8m6';
    waBtn.target = '_blank';
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    waBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #25D366;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        transition: all 0.3s ease;
        z-index: 998;
        text-decoration: none;
        animation: pulse 2s infinite;
    `;

    waBtn.addEventListener('mouseenter', () => {
        waBtn.style.transform = 'scale(1.1)';
    });

    waBtn.addEventListener('mouseleave', () => {
        waBtn.style.transform = 'scale(1)';
    });

    document.body.appendChild(waBtn);
}

addWhatsAppButton();

// ===== 10. DARK MODE TOGGLE =====
function addDarkModeToggle() {
    if (document.getElementById('dark-mode-toggle')) return;
    
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #333;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        z-index: 997;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        toggle.style.background = document.body.classList.contains('dark-mode') ? '#ffcc00' : '#333';
    });
}

addDarkModeToggle();

