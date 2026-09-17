document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Phrase-by-Phrase Smooth Sequential Transition & Reflection ---
  const scrambleElem = document.getElementById('hologramScramble');
  if (scrambleElem) {
    const phrases = [
      "Global Innovation",
      "Digital Transformation",
      "Cloud Architecture",
      "Cyber Intelligence",
      "Enterprise Scale"
    ];
    let currentIndex = 0;
    let autoTimer = null;
    let isTransitioning = false;

    function updatePills(activeIdx) {
      const pills = document.querySelectorAll('.tech-pill');
      pills.forEach((p, idx) => {
        if (idx === activeIdx) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }

    function changePhrase(targetIndex) {
      if (isTransitioning || targetIndex === currentIndex) return;
      isTransitioning = true;

      // 1. Fade & slide out current phrase
      scrambleElem.classList.add('text-fade-out');

      setTimeout(() => {
        currentIndex = targetIndex;
        scrambleElem.textContent = phrases[currentIndex];
        updatePills(currentIndex);

        // 2. Prepare position from below
        scrambleElem.classList.remove('text-fade-out');
        scrambleElem.classList.add('text-fade-in-prep');

        // Force browser reflow
        void scrambleElem.offsetWidth;

        // 3. Smoothly animate in to normal position
        scrambleElem.classList.remove('text-fade-in-prep');

        setTimeout(() => {
          isTransitioning = false;
        }, 400);
      }, 350);
    }

    function nextPhrase() {
      const nextIdx = (currentIndex + 1) % phrases.length;
      changePhrase(nextIdx);
    }

    function startAutoCycle() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        nextPhrase();
      }, 3500);
    }

    // Tech pills click/hover handlers
    const techPills = document.querySelectorAll('.tech-pill');
    techPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        changePhrase(idx);
        startAutoCycle();
      });
      pill.addEventListener('mouseenter', () => {
        changePhrase(idx);
        startAutoCycle();
      });
    });

    // Initial setup
    scrambleElem.textContent = phrases[0];
    updatePills(0);
    startAutoCycle();
  }

  // --- 2. Ultra-Modern Enterprise Cyber Wave & Radiant Grid Background ---
  const canvas = document.getElementById('globalParticlesCanvas') || document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Smooth Cursor Physics with Easing / Lerp
    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      active: false
    };

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Theme-Aware Color Tokens
    let primaryAccent = '0, 210, 255'; // Electric Cyan #00d2ff
    let secondaryAccent = '112, 226, 255'; // Light Cyan #70e2ff
    let deepAccent = '0, 112, 243'; // Royal Cobalt #0070f3

    if (document.body.classList.contains('theme-page-cream-crimson')) {
      primaryAccent = '225, 29, 72';
      secondaryAccent = '244, 63, 94';
      deepAccent = '159, 18, 57';
    } else if (document.body.classList.contains('theme-page-dark-orange')) {
      primaryAccent = '249, 115, 22';
      secondaryAccent = '251, 146, 60';
      deepAccent = '194, 65, 12';
    }

    // Dynamic Light Pulses travelling along axes
    class CyberPulse {
      constructor() {
        this.reset();
      }
      reset() {
        this.axis = Math.random() > 0.5 ? 'h' : 'v';
        this.progress = 0;
        this.speed = Math.random() * 0.003 + 0.0015;
        this.length = Math.random() * 140 + 80;
        this.opacity = Math.random() * 0.35 + 0.25;
        this.coord = Math.floor(Math.random() * (this.axis === 'h' ? (height / 60) : (width / 60))) * 60;
      }
      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        if (this.axis === 'h') {
          const currentX = this.progress * (width + this.length * 2) - this.length;
          const grad = ctx.createLinearGradient(currentX, this.coord, currentX + this.length, this.coord);
          grad.addColorStop(0, `rgba(${primaryAccent}, 0)`);
          grad.addColorStop(0.7, `rgba(${secondaryAccent}, ${this.opacity})`);
          grad.addColorStop(1, `rgba(${primaryAccent}, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(currentX, this.coord);
          ctx.lineTo(currentX + this.length, this.coord);
          ctx.stroke();

          // Glowing tip
          ctx.fillStyle = `rgba(${secondaryAccent}, ${this.opacity * 1.5})`;
          ctx.shadowColor = `rgba(${primaryAccent}, 0.8)`;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(currentX + this.length, this.coord, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const currentY = this.progress * (height + this.length * 2) - this.length;
          const grad = ctx.createLinearGradient(this.coord, currentY, this.coord, currentY + this.length);
          grad.addColorStop(0, `rgba(${primaryAccent}, 0)`);
          grad.addColorStop(0.7, `rgba(${secondaryAccent}, ${this.opacity})`);
          grad.addColorStop(1, `rgba(${primaryAccent}, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(this.coord, currentY);
          ctx.lineTo(this.coord, currentY + this.length);
          ctx.stroke();

          // Glowing tip
          ctx.fillStyle = `rgba(${secondaryAccent}, ${this.opacity * 1.5})`;
          ctx.shadowColor = `rgba(${primaryAccent}, 0.8)`;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(this.coord, currentY + this.length, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const pulses = Array.from({ length: 9 }, () => new CyberPulse());

    // Harmonic Flowing Waves (Sine Wave Ribbons)
    let time = 0;
    const waves = [
      { amplitude: 36, frequency: 0.0018, speed: 0.012, yOffset: 0.65, color: `rgba(${primaryAccent}, 0.16)`, strokeWidth: 1.5 },
      { amplitude: 46, frequency: 0.0014, speed: -0.009, yOffset: 0.72, color: `rgba(${secondaryAccent}, 0.12)`, strokeWidth: 1.2 },
      { amplitude: 28, frequency: 0.0022, speed: 0.015, yOffset: 0.80, color: `rgba(${deepAccent}, 0.14)`, strokeWidth: 1.0 },
      { amplitude: 52, frequency: 0.0010, speed: 0.007, yOffset: 0.58, color: `rgba(${primaryAccent}, 0.08)`, strokeWidth: 1.8 }
    ];

    function drawWave(wave) {
      ctx.save();
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = wave.strokeWidth;
      ctx.beginPath();

      const baseY = height * wave.yOffset;
      const step = 16;

      for (let x = 0; x <= width + step; x += step) {
        // Base harmonic wave
        let y = baseY + Math.sin(x * wave.frequency + time * wave.speed * 60) * wave.amplitude
                      + Math.cos(x * wave.frequency * 0.5 + time * 0.008 * 60) * (wave.amplitude * 0.4);

        // Smooth interactive mouse ripple / elevation
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 240) {
            const force = Math.cos((dist / 240) * (Math.PI / 2));
            y += force * 26 * (mouse.y > y ? -1 : 1);
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Subtle gradient fill beneath bottom wave for atmospheric depth
      if (wave.yOffset >= 0.75) {
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const fillGrad = ctx.createLinearGradient(0, baseY, 0, height);
        fillGrad.addColorStop(0, `rgba(${primaryAccent}, 0.035)`);
        fillGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = fillGrad;
        ctx.fill();
      }

      ctx.restore();
    }

    // Floating Micro Tech Sparkles (Gentle, Slow & Non-Distracting)
    class TechSparkle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.8;
        this.vy = -(Math.random() * 0.3 + 0.1);
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.45 + 0.25;
        this.fadeState = 1; // 1 = fading in, -1 = fading out
        this.fadeSpeed = Math.random() * 0.008 + 0.004;
      }
      update() {
        this.y += this.vy;
        this.alpha += this.fadeState * this.fadeSpeed;
        if (this.alpha >= this.maxAlpha) {
          this.fadeState = -1;
        } else if (this.alpha <= 0 && this.fadeState === -1) {
          this.reset();
        }
        if (this.y < -10) this.reset();
      }
      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.fillStyle = `rgba(${secondaryAccent}, ${this.alpha})`;
        ctx.shadowColor = `rgba(${primaryAccent}, 0.9)`;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        // Tiny Diamond Shape
        const s = this.size;
        ctx.moveTo(this.x, this.y - s);
        ctx.lineTo(this.x + s, this.y);
        ctx.lineTo(this.x, this.y + s);
        ctx.lineTo(this.x - s, this.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const sparkles = Array.from({ length: 26 }, () => new TechSparkle());

    // Main 60FPS Animation Loop
    function render() {
      ctx.clearRect(0, 0, width, height);

      // Smooth Cursor Lerp Physics
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // 1. Radiant Ambient Spotlight around Cursor
      if (mouse.active) {
        ctx.save();
        const radGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        radGrad.addColorStop(0, `rgba(${primaryAccent}, 0.12)`);
        radGrad.addColorStop(0.5, `rgba(${secondaryAccent}, 0.04)`);
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Travelling Cyber Pulses
      pulses.forEach(pulse => {
        pulse.update();
        pulse.draw();
      });

      // 3. Flowing Luminous Harmonic Wave Ribbons
      time += 0.016;
      waves.forEach(wave => drawWave(wave));

      // 4. Subtle Ambient Floating Micro-Diamonds
      sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // --- 3. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');
  
  function checkRevealInViewport() {
    revealElements.forEach(elem => {
      const rect = elem.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        elem.classList.add('revealed');
      }
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });

  revealElements.forEach(elem => revealObserver.observe(elem));
  
  // Immediately check and reveal all visible elements on DOM load and window load
  checkRevealInViewport();
  setTimeout(checkRevealInViewport, 50);
  window.addEventListener('load', checkRevealInViewport);

  // --- 3B. Supercharging Progress - Scroll-Driven Full-Width to Right-Column Image Transformation ---
  const superchargeSection = document.getElementById('about');
  const superchargeStage = document.querySelector('.supercharge-stage');
  const superchargeTextCol = document.querySelector('.supercharge-text-col');
  const superchargeImageCol = document.querySelector('.supercharge-image-col');

  if (superchargeSection && superchargeStage && superchargeImageCol && superchargeTextCol) {
    let superchargeTicking = false;

    function updateSuperchargeScroll() {
      if (window.innerWidth <= 992) {
        superchargeImageCol.style.left = '0';
        superchargeImageCol.style.width = '100%';
        superchargeTextCol.style.opacity = '1';
        superchargeTextCol.style.transform = 'none';
        superchargeTextCol.style.pointerEvents = 'auto';
        superchargeTicking = false;
        return;
      }

      const rect = superchargeSection.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const navOffset = 75;
      const totalScrollable = rect.height - (windowHeight - navOffset);

      if (totalScrollable <= 0) {
        superchargeImageCol.style.left = '52%';
        superchargeImageCol.style.width = '48%';
        superchargeTextCol.style.opacity = '1';
        superchargeTextCol.style.transform = 'translateX(0)';
        superchargeTextCol.style.pointerEvents = 'auto';
        superchargeTicking = false;
        return;
      }

      // Exact scroll progress based on sticky position
      const scrolled = navOffset - rect.top;
      const rawProgress = scrolled / (totalScrollable * 0.75); // Smooth morphing completes over 75% of compact track
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Ease progress for ultra-smooth acceleration/deceleration
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Image morph: left 0% -> 52%, width 100% -> 48%
      const leftPercent = easeProgress * 52;
      const widthPercent = 100 - (easeProgress * 52);

      superchargeImageCol.style.left = leftPercent + '%';
      superchargeImageCol.style.width = widthPercent + '%';

      // Text column: always 100% visible, fully readable and unclipped
      superchargeTextCol.style.opacity = '1';
      superchargeTextCol.style.transform = 'translateX(0)';
      superchargeTextCol.style.pointerEvents = 'auto';

      superchargeTicking = false;
    }

    function onSuperchargeScroll() {
      if (!superchargeTicking) {
        requestAnimationFrame(updateSuperchargeScroll);
        superchargeTicking = true;
      }
    }

    window.addEventListener('scroll', onSuperchargeScroll, { passive: true });
    window.addEventListener('resize', onSuperchargeScroll, { passive: true });
    requestAnimationFrame(updateSuperchargeScroll);
  }

  // --- 3C. Domain Expertise Cinematic Horizontal Expanding Panels ---
  const cinematicPanels = document.querySelectorAll('.cinematic-panel, .domain-accordion-card');
  const cinematicStage = document.querySelector('.cinematic-stage, .domain-accordion-track');
  const domainModal = document.getElementById('domainSolutionsModal');
  
  if (cinematicPanels.length > 0 && cinematicStage) {
    cinematicPanels.forEach(panel => {
      // Hover event smoothly transfers active state
      panel.addEventListener('mouseenter', () => {
        cinematicPanels.forEach(p => p.classList.remove('is-active'));
        panel.classList.add('is-active');
      });

      // Mobile / touch tap handling
      panel.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.domain-arrow-badge')) return;
        cinematicPanels.forEach(p => p.classList.remove('is-active'));
        panel.classList.add('is-active');
      });
    });
  }

  // --- Domain Solutions Popup Modal Data & Interaction ---
  const domainData = {
    finance: {
      tag: "Banking & FinTech",
      icon: "fas fa-landmark",
      title: "Financial Services & Banking Solutions",
      image: "assets/images/real-industry-finance.jpg",
      overview: "Empowering banking, wealth management, and fintech institutions with secure, cloud-native architectures, real-time transaction processing, automated regulatory compliance, and AI-powered risk mitigation.",
      pillars: [
        {
          icon: "fas fa-mobile-screen-button",
          title: "Next-Gen Digital Banking",
          desc: "Frictionless mobile and web banking portals delivering omni-channel personalized customer journeys."
        },
        {
          icon: "fas fa-shield-halved",
          title: "AI Risk & Fraud Intelligence",
          desc: "Real-time anomaly detection, AML compliance checks, and automated fraud prevention engines."
        },
        {
          icon: "fas fa-cloud-arrow-up",
          title: "Core Banking Modernization",
          desc: "Microservices architecture migration, open API gateways, and scalable ledger integration."
        },
        {
          icon: "fas fa-credit-card",
          title: "Secure Payments & Settlements",
          desc: "Instant payment rails, tokenized transaction security, and cross-border settlement solutions."
        }
      ],
      metrics: [
        { value: "99.99%", label: "System Availability & High-Availability SLA" },
        { value: "45%", label: "Faster Transaction Processing Velocity" },
        { value: "60%", label: "Reduction in Operational Fraud Risk" }
      ],
      ctaText: "Consult With Financial Tech Specialists"
    },
    healthcare: {
      tag: "Digital Health",
      icon: "fas fa-heart-pulse",
      title: "Healthcare & Life Sciences Solutions",
      image: "assets/images/real-industry-healthcare.jpg",
      overview: "Transforming patient care delivery, clinical workflows, and medical data interoperability through HIPAA-compliant cloud architectures, intelligent diagnostics, and connected health ecosystems.",
      pillars: [
        {
          icon: "fas fa-user-doctor",
          title: "Connected Patient Portals",
          desc: "Secure telemedicine interfaces, remote patient monitoring (RPM), and unified electronic health records."
        },
        {
          icon: "fas fa-brain",
          title: "AI Diagnostic Support",
          desc: "Medical imaging analytics, clinical decision support systems, and predictive patient health algorithms."
        },
        {
          icon: "fas fa-database",
          title: "Health Informatics & Interoperability",
          desc: "Seamless HL7/FHIR compliant data pipelines across hospitals, labs, and third-party systems."
        },
        {
          icon: "fas fa-lock",
          title: "HIPAA & HITRUST Security",
          desc: "Zero-trust access control, biometric verification, and end-to-end patient data encryption."
        }
      ],
      metrics: [
        { value: "50%", label: "Faster Clinical Workflow Turnaround" },
        { value: "100%", label: "HIPAA & Regulatory Compliance" },
        { value: "35%", label: "Improvement in Patient Engagement" }
      ],
      ctaText: "Consult With Healthcare Tech Specialists"
    },
    manufacturing: {
      tag: "Industry 4.0",
      icon: "fas fa-industry",
      title: "Smart Factory & Industrial Manufacturing Solutions",
      image: "assets/images/real-industry-manufacturing.jpg",
      overview: "Driving Industry 4.0 transformation with edge Industrial IoT (IIoT), automated supply chain intelligence, predictive equipment maintenance, and digital twin manufacturing workflows.",
      pillars: [
        {
          icon: "fas fa-microchip",
          title: "Smart Factory & IIoT",
          desc: "Connected sensor telemetry, edge computing, and real-time shop floor production tracking."
        },
        {
          icon: "fas fa-gears",
          title: "Predictive Asset Maintenance",
          desc: "AI vibration and heat telemetry algorithms that predict and prevent critical machine failures."
        },
        {
          icon: "fas fa-truck-ramp-box",
          title: "Supply Chain Intelligence",
          desc: "Real-time logistics visibility, automated inventory balancing, and supplier network integration."
        },
        {
          icon: "fas fa-cubes",
          title: "Digital Twin Simulations",
          desc: "Virtual plant modeling and operational stress-testing to maximize factory throughput."
        }
      ],
      metrics: [
        { value: "30%", label: "Reduction in Unplanned Factory Downtime" },
        { value: "25%", label: "Increase in Overall Equipment Effectiveness (OEE)" },
        { value: "40%", label: "Improvement in Supply Chain Agility" }
      ],
      ctaText: "Consult With Manufacturing Tech Specialists"
    },
    retail: {
      tag: "Commerce & CPG",
      icon: "fas fa-bag-shopping",
      title: "Omnichannel Retail & Consumer Goods Solutions",
      image: "assets/images/real-industry-retail.jpg",
      overview: "Revolutionizing customer loyalty, omnichannel commerce architectures, and intelligent fulfillment for global consumer brands and high-volume digital retailers.",
      pillars: [
        {
          icon: "fas fa-store",
          title: "Unified Omnichannel Commerce",
          desc: "Headless storefronts, composable commerce backends, and frictionless POS integrations."
        },
        {
          icon: "fas fa-wand-magic-sparkles",
          title: "AI Personalization & Recommendations",
          desc: "Dynamic real-time catalog recommendations, search personalization, and price optimization."
        },
        {
          icon: "fas fa-boxes-packing",
          title: "Smart Fulfillment & DOM",
          desc: "Distributed order management, automated warehouse routing, and demand forecasting."
        },
        {
          icon: "fas fa-users-viewfinder",
          title: "Customer Data Platforms (CDP)",
          desc: "360-degree customer identity graphs, loyalty engines, and lifetime value analytics."
        }
      ],
      metrics: [
        { value: "35%", label: "Growth in Online Conversion Rates" },
        { value: "2.5x", label: "Higher Customer Lifetime Value (LTV)" },
        { value: "20%", label: "Optimization in Fulfillment & Shipping Costs" }
      ],
      ctaText: "Consult With Retail Tech Specialists"
    }
  };

  if (domainModal) {
    const modalBanner = document.getElementById('domainModalBanner');
    const modalPillIcon = document.getElementById('domainModalPillIcon');
    const modalPillText = document.getElementById('domainModalPillText');
    const modalTitle = document.getElementById('domainModalTitle');
    const modalOverview = document.getElementById('domainModalOverview');
    const modalPillars = document.getElementById('domainModalPillars');
    const modalMetrics = document.getElementById('domainModalMetrics');
    const modalCta = document.getElementById('domainModalCta');
    const closeBtn = domainModal.querySelector('.domain-modal-close-btn');
    const backBtn = domainModal.querySelector('.domain-modal-back-btn');

    let currentActiveDomainKey = 'finance';

    function openDomainModal(key) {
      currentActiveDomainKey = key;
      const data = domainData[key] || domainData.finance;
      
      if (modalBanner) modalBanner.style.backgroundImage = `url('${data.image}')`;
      if (modalPillIcon) modalPillIcon.className = data.icon;
      if (modalPillText) modalPillText.textContent = data.tag;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalOverview) modalOverview.textContent = data.overview;
      
      if (modalPillars) {
        modalPillars.innerHTML = data.pillars.map(p => `
          <div class="domain-modal-card">
            <div class="domain-modal-card-top">
              <div class="domain-modal-card-icon"><i class="${p.icon}"></i></div>
              <h4 class="domain-modal-card-title">${p.title}</h4>
            </div>
            <p class="domain-modal-card-desc">${p.desc}</p>
          </div>
        `).join('');
      }

      if (modalMetrics) {
        modalMetrics.innerHTML = data.metrics.map(m => `
          <div class="domain-modal-metric-card">
            <div class="domain-modal-metric-val">${m.value}</div>
            <p class="domain-modal-metric-label">${m.label}</p>
          </div>
        `).join('');
      }

      if (modalCta) {
        modalCta.querySelector('span').textContent = data.ctaText || "Request Industry Consultation";
      }

      domainModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDomainModal() {
      domainModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Attach trigger listeners
    document.querySelectorAll('[data-domain-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const key = trigger.getAttribute('data-domain-trigger');
        openDomainModal(key);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDomainModal);
    if (backBtn) backBtn.addEventListener('click', closeDomainModal);
    
    domainModal.addEventListener('click', (e) => {
      if (e.target === domainModal) closeDomainModal();
    });

    if (modalCta) {
      modalCta.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = domainData[currentActiveDomainKey] || domainData.finance;
        const industryTopic = data.tag || data.title;
        closeDomainModal();
        if (typeof openConsultationModal === 'function') {
          openConsultationModal(industryTopic);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && domainModal.classList.contains('active')) {
        closeDomainModal();
      }
    });
  }

  // --- 4. Counter Animation (Smooth Count-Up on Viewport Entrance) ---
  const countElements = document.querySelectorAll('.counter, [data-target]');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target') || parseInt(counter.innerText.replace(/[^0-9]/g, ''), 10);
        if (isNaN(target) || target <= 0) return;

        const duration = 2000;
        const startTime = performance.now();
        counter.innerText = '0';

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Smooth cubic ease-out curve
          const easeOutProgress = 1 - Math.pow(1 - progress, 3.5);
          const currentVal = Math.floor(easeOutProgress * target);
          counter.innerText = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        }
        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.15 });

  countElements.forEach(elem => countObserver.observe(elem));

  // Also support container-level observer for #about, #stats, etc.
  const statContainers = document.querySelectorAll('#about, .about-grid, #stats, .stats, .pre-footer-stats, .hero-metrics-bar');
  if (statContainers.length > 0) {
    const containerObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const innerCounters = entry.target.querySelectorAll('.counter, [data-target]');
          innerCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText.replace(/[^0-9]/g, ''), 10);
            if (isNaN(target) || target <= 0) return;
            const duration = 2000;
            const startTime = performance.now();
            counter.innerText = '0';

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutProgress = 1 - Math.pow(1 - progress, 3.5);
              const currentVal = Math.floor(easeOutProgress * target);
              counter.innerText = currentVal;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target;
              }
            }
            requestAnimationFrame(updateCounter);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statContainers.forEach(container => containerObserver.observe(container));
  }

  // --- 5. Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.getElementById('menuOverlay');
  const drawerClose = document.querySelector('.drawer-close');

  function openMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  document.querySelectorAll('.drawer-close').forEach(btn => btn.addEventListener('click', closeMenu));
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  document.addEventListener('click', (e) => {
    if (e.target.closest('.drawer-close')) {
      closeMenu();
    }
  });

  // Handle drawer navigation links & dropdown accordion
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  dropdownItems.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 991 || (navLinks && navLinks.classList.contains('active'))) {
          e.preventDefault();
          dropdown.classList.toggle('mobile-open');
        }
      });
    }
  });

  document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  // --- 6. Futuristic Enterprise Floating Capsule Scroll To Top Component ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    // Inject capsule markup with traveling light beam, glass backdrop, and expandable label
    if (!backToTop.querySelector('.capsule-inner-content')) {
      backToTop.innerHTML = `
        <div class="capsule-border-beam" aria-hidden="true"></div>
        <div class="capsule-glass-bg"></div>
        <div class="capsule-shimmer" aria-hidden="true"></div>
        <div class="capsule-inner-content">
          <div class="capsule-arrow-box">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="capsule-label-box">
            <span class="label-short">TOP</span>
            <span class="label-expanded">BACK TO TOP</span>
          </div>
        </div>
      `;
    }

    function updateCapsuleScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;

      // Reveal smoothly when scrolled past ~200px
      if (scrollY > 200) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }

      // Dynamic light intensity and near-bottom prominence
      if (docHeight > 0) {
        const scrollPercent = Math.min(Math.max(scrollY / docHeight, 0), 1);
        const glowLevel = (0.2 + (scrollPercent * 0.5)).toFixed(2);
        const borderLevel = (0.3 + (scrollPercent * 0.5)).toFixed(2);
        
        backToTop.style.setProperty('--scroll-glow', glowLevel);
        backToTop.style.setProperty('--border-intensity', borderLevel);

        if (scrollPercent > 0.78) {
          backToTop.classList.add('near-bottom');
        } else {
          backToTop.classList.remove('near-bottom');
        }
      }
    }

    window.addEventListener('scroll', updateCapsuleScroll, { passive: true });
    window.addEventListener('resize', updateCapsuleScroll, { passive: true });
    updateCapsuleScroll();

    // Smooth scroll to top on click
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      backToTop.classList.add('clicked');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        backToTop.classList.remove('clicked');
      }, 450);
    });

    // Keyboard Accessibility (Enter / Space)
    backToTop.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        backToTop.click();
      }
    });
  }

  // --- 7. Capabilities Individual Details Modal Functionality ---
  function openCapabilityModal(targetKey) {
    let key = (targetKey || 'digital-transformation').toLowerCase().trim();
    // Normalize aliases
    if (key === 'enterprise-software') key = 'ai-intelligent-solutions';
    if (key === 'infrastructure-mgmt') key = 'cybersecurity';

    // Close any currently active capability modal
    closeAllCapabilityModals();

    const targetModal = document.getElementById(`modal-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCapabilityModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllCapabilityModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, #consultationModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeAllCapabilityModals() {
    document.querySelectorAll('.capability-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('#consultationModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach card click handlers to open matching capability
  document.querySelectorAll('.service-card[data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on a direct link
      if (e.target.closest('a') && !e.target.closest('.card-learn')) return;
      const key = card.getAttribute('data-modal');
      openCapabilityModal(key);
    });
  });

  // Attach all "Explore Capabilities" & "Explore Service" triggers
  document.querySelectorAll('.card-learn, .btn-service-explore, [data-service-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      let key = btn.getAttribute('data-service-trigger') || btn.getAttribute('data-modal');
      if (!key) {
        const parentCard = btn.closest('[data-modal]');
        if (parentCard) key = parentCard.getAttribute('data-modal');
      }
      openCapabilityModal(key || 'digital-transformation');
    });
  });

  // --- 7b. Domain Expertise & Dedicated Industry Page Modal Functionality ---
  function openIndustryDetailModal(targetKey) {
    let key = (targetKey || 'fintech').toLowerCase().trim();
    if (key === 'financial-services' || key === 'banking') key = 'fintech';
    if (key === 'health') key = 'healthcare';
    if (key === 'cpg' || key === 'commerce') key = 'retail';
    if (key === 'finance') key = 'fintech';

    // Close any other open modals
    closeAllCapabilityModals();
    closeAllIndustryModals();

    const targetModal = document.getElementById(`modal-industry-${key}`) || document.getElementById(`modal-domain-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllIndustryModals() {
    document.querySelectorAll('.industry-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeIndustryModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllIndustryModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach all "Explore Industry" triggers on dedicated Industries page
  document.addEventListener('click', (e) => {
    const indBtn = e.target.closest('[data-open-industry-modal], [data-industry-modal], .btn-explore-industry');
    if (indBtn) {
      e.preventDefault();
      e.stopPropagation();
      let key = indBtn.getAttribute('data-open-industry-modal') || indBtn.getAttribute('data-industry-modal');
      if (!key) {
        const parentSec = indBtn.closest('[id]');
        if (parentSec) {
          const id = parentSec.id;
          if (id.includes('fintech') || id.includes('banking')) key = 'fintech';
          else if (id.includes('healthcare')) key = 'healthcare';
          else if (id.includes('manufacturing')) key = 'manufacturing';
          else if (id.includes('retail')) key = 'retail';
        }
      }
      openIndustryDetailModal(key || 'fintech');
    }
  });

  // Attach all legacy "Explore Solutions" triggers in Domain Expertise section
  document.querySelectorAll('.btn-industry-explore').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      let key = btn.getAttribute('data-domain-trigger');
      if (!key) {
        const parentCard = btn.closest('.industry-card[data-industry]');
        if (parentCard) key = parentCard.getAttribute('data-industry');
      }
      openIndustryDetailModal(key || 'fintech');
    });
  });

  // Close buttons and backdrop click for each industry modal
  document.querySelectorAll('.industry-detail-modal').forEach(modal => {
    modal.querySelectorAll('.industry-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeIndustryModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeIndustryModal(modal);
      }
    });
  });

  // Close buttons and backdrop click for each capability / domain modal
  document.querySelectorAll('.capability-detail-modal').forEach(modal => {
    modal.querySelectorAll('.capability-modal-close, .domain-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCapabilityModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCapabilityModal(modal);
      }
    });
  });

  // Global Escape key for industry, insight, and capability modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeCapModal = document.querySelector('.capability-detail-modal.active');
      if (activeCapModal) {
        closeCapabilityModal(activeCapModal);
      }
      const activeIndModal = document.querySelector('.industry-detail-modal.active');
      if (activeIndModal) {
        closeIndustryModal(activeIndModal);
      }
      const activeInsModal = document.querySelector('.insight-detail-modal.active');
      if (activeInsModal) {
        closeInsightModal(activeInsModal);
      }
      const activeJobModal = document.querySelector('.job-detail-modal.active');
      if (activeJobModal) {
        closeJobModal(activeJobModal);
      }
      const activeApplyModal = document.querySelector('.job-apply-modal.active');
      if (activeApplyModal) {
        closeJobApplyModal();
      }
    }
  });

  // --- 7c. Insights Page Modal & Category Filter Functionality ---
  function openInsightDetailModal(targetKey) {
    let key = (targetKey || 'ai').toLowerCase().trim();
    if (key === 'artificial-intelligence' || key === 'machine-learning') key = 'ai';
    if (key === 'cloud-computing') key = 'cloud';
    if (key === 'security' || key === 'sec') key = 'cybersecurity';
    if (key === 'digital-transformation' || key === 'transformation') key = 'modernization';
    if (key === 'industry-40' || key === 'manufacturing') key = 'industry40';
    if (key === 'emerging-tech' || key === 'emerging-technology') key = 'emerging';

    // Close any other open modals
    closeAllCapabilityModals();
    closeAllIndustryModals();
    closeAllInsightModals();

    const targetModal = document.getElementById(`modal-insight-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllInsightModals() {
    document.querySelectorAll('.insight-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeInsightModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllInsightModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach all "Read Insight" / Spotlight triggers
  document.addEventListener('click', (e) => {
    const insBtn = e.target.closest('[data-open-insight-modal], [data-insight-modal], .spotlight-teaser-card');
    if (insBtn) {
      e.preventDefault();
      e.stopPropagation();
      let key = insBtn.getAttribute('data-open-insight-modal') || insBtn.getAttribute('data-insight-modal');
      if (!key) {
        const parentCard = insBtn.closest('[data-category]');
        if (parentCard) key = parentCard.getAttribute('data-category');
      }
      openInsightDetailModal(key || 'ai');
    }
  });

  // Close buttons and backdrop click for each insight modal
  document.querySelectorAll('.insight-detail-modal').forEach(modal => {
    modal.querySelectorAll('.insight-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeInsightModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeInsightModal(modal);
      }
    });
  });

  // Category Filtering on Insights Page
  const filterBar = document.getElementById('insightsFilterBar');
  if (filterBar) {
    const filterPills = filterBar.querySelectorAll('.filter-pill');
    const articles = document.querySelectorAll('.featured-insight-card, .insight-article-card');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-filter');

        articles.forEach(article => {
          const category = article.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            article.style.display = '';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
          } else {
            article.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 7d. Careers Page Position Modals, Apply Form & Department Filtering ---
  function openJobDetailModal(targetKey) {
    let key = (targetKey || 'se').toLowerCase().trim();
    if (key === 'software-engineer' || key === 'engineering') key = 'se';
    if (key === 'ai' || key === 'ml' || key === 'ai-ml' || key === 'ai-data') key = 'aiml';
    if (key === 'cloud-engineer') key = 'cloud';
    if (key === 'cybersecurity' || key === 'security') key = 'cyber';
    if (key === 'ui-ux' || key === 'ux') key = 'design';
    if (key === 'business-analyst' || key === 'business' || key === 'consulting') key = 'ba';

    // Close any other open modals
    closeAllCapabilityModals();
    closeAllIndustryModals();
    closeAllInsightModals();
    closeAllJobModals();
    closeJobApplyModal();

    const targetModal = document.getElementById(`modal-job-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllJobModals() {
    document.querySelectorAll('.job-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, .job-apply-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeJobModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllJobModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, .job-detail-modal.active, .job-apply-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Application Form Modal Handlers
  function openJobApplyModal(jobTitle, deptName) {
    closeAllJobModals();
    const applyModal = document.getElementById('modal-career-apply');
    if (applyModal) {
      const titleSpan = document.getElementById('applyJobTitleDisplay');
      const deptSpan = document.getElementById('applyDeptDisplay');
      const hiddenInput = document.getElementById('appliedJobRole');
      const formContainer = document.getElementById('applyFormContainer');
      const successContainer = document.getElementById('applySuccessContainer');
      const form = document.getElementById('careerApplicationForm');

      if (titleSpan) titleSpan.textContent = jobTitle || 'Software Engineer';
      if (deptSpan) deptSpan.textContent = deptName || 'Engineering';
      if (hiddenInput) hiddenInput.value = jobTitle || 'Software Engineer';

      if (formContainer) formContainer.style.display = 'block';
      if (successContainer) successContainer.style.display = 'none';
      if (form) {
        form.reset();
        form.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
      }

      applyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeJobApplyModal() {
    const applyModal = document.getElementById('modal-career-apply');
    if (applyModal) {
      applyModal.classList.remove('active');
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, .job-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach all "View Position" triggers
  document.addEventListener('click', (e) => {
    const jobBtn = e.target.closest('[data-open-job-modal], [data-job-modal], .btn-view-job');
    if (jobBtn) {
      e.preventDefault();
      e.stopPropagation();
      let key = jobBtn.getAttribute('data-open-job-modal') || jobBtn.getAttribute('data-job-modal');
      if (!key) {
        const parentCard = jobBtn.closest('[data-job-category]');
        if (parentCard) key = parentCard.getAttribute('data-job-category');
      }
      openJobDetailModal(key || 'se');
    }

    // "Apply Now" trigger inside job modals
    const applyBtn = e.target.closest('.btn-apply-trigger');
    if (applyBtn) {
      e.preventDefault();
      e.stopPropagation();
      const title = applyBtn.getAttribute('data-apply-title') || 'Software Engineer';
      const dept = applyBtn.getAttribute('data-apply-dept') || 'Engineering';
      openJobApplyModal(title, dept);
    }
  });

  // Close buttons and backdrop click for each job modal
  document.querySelectorAll('.job-detail-modal').forEach(modal => {
    modal.querySelectorAll('.job-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeJobModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeJobModal(modal);
      }
    });
  });

  // Close buttons and backdrop click for application modal
  const applyModalEl = document.getElementById('modal-career-apply');
  if (applyModalEl) {
    applyModalEl.querySelectorAll('.apply-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeJobApplyModal();
      });
    });

    applyModalEl.addEventListener('click', (e) => {
      if (e.target === applyModalEl) {
        closeJobApplyModal();
      }
    });
  }

  // Application Form Submit Handler
  const careerForm = document.getElementById('careerApplicationForm');
  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fullNameInput = careerForm.querySelector('#applyFullName');
      const emailInput = careerForm.querySelector('#applyEmail');
      const phoneInput = careerForm.querySelector('#applyPhone');
      const resumeInput = careerForm.querySelector('#applyResume');

      // Validate Full Name
      if (!fullNameInput || !fullNameInput.value.trim()) {
        fullNameInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        fullNameInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        emailInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate Phone
      if (!phoneInput || !phoneInput.value.trim()) {
        phoneInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate Resume
      if (!resumeInput || !resumeInput.files || resumeInput.files.length === 0) {
        resumeInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        resumeInput.closest('.form-group')?.classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = careerForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Processing Application...</span> <i class="fas fa-spinner fa-spin"></i>';
        }

        setTimeout(() => {
          const formContainer = document.getElementById('applyFormContainer');
          const successContainer = document.getElementById('applySuccessContainer');
          if (formContainer) formContainer.style.display = 'none';
          if (successContainer) successContainer.style.display = 'block';

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Application</span> <i class="fas fa-paper-plane"></i>';
          }
        }, 600);
      }
    });

    // Clear error on input
    careerForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group')?.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        input.closest('.form-group')?.classList.remove('has-error');
      });
    });
  }

  // Department Category Filter on Careers Page
  const careerFilterBar = document.getElementById('careersFilterBar');
  if (careerFilterBar) {
    const filterPills = careerFilterBar.querySelectorAll('.career-pill');
    const jobItems = document.querySelectorAll('.job-card-item');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-job-filter');

        jobItems.forEach(job => {
          const category = job.getAttribute('data-job-category');
          if (filterValue === 'all' || category === filterValue) {
            job.classList.remove('is-hidden');
            job.style.display = 'flex';
            job.style.opacity = '1';
            job.style.transform = 'translateY(0)';
          } else {
            job.classList.add('is-hidden');
            job.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Sticky QuickBar Scrollspy & Smooth Scrolling ---
  const quickbar = document.getElementById('industryQuickbar');
  if (quickbar) {
    const quickLinks = quickbar.querySelectorAll('.quickbar-link');
    const sections = document.querySelectorAll('.industry-section-item');

    // Smooth scroll on click
    quickLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 75;
            const quickbarHeight = quickbar.offsetHeight || 55;
            const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + quickbarHeight + 15);
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }
      });
    });

    // ScrollSpy Observer
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          quickLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}` || link.getAttribute('data-target') === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: "-100px 0px -40% 0px" });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // --- Free Consultation Popup Modal Handler ---
  function getOrCreateConsultationModal() {
    let consultModal = document.getElementById('consultationModal');
    if (!consultModal) {
      consultModal = document.createElement('div');
      consultModal.id = 'consultationModal';
      consultModal.setAttribute('role', 'dialog');
      consultModal.setAttribute('aria-modal', 'true');
      consultModal.innerHTML = `
        <div class="modal-box consultation-modal-box">
          <button class="modal-close consultation-modal-close" aria-label="Close modal"><i class="fas fa-times"></i></button>
          <div class="consultation-header">
            <div class="modal-badge"><i class="fas fa-calendar-check"></i> Free Consultation</div>
            <h2>Request Your Free Consultation</h2>
            <p class="modal-subtitle">Connect with our enterprise technology experts for a personalized strategy session.</p>
          </div>
          
          <form id="consultationForm" class="consultation-form">
            <div class="form-row">
              <div class="form-group">
                <label for="consultName">Full Name *</label>
                <input type="text" id="consultName" placeholder="Arshith Infotech" required />
              </div>
              <div class="form-group">
                <label for="consultEmail">Work Email *</label>
                <input type="email" id="consultEmail" placeholder="info@arshithinfotech.com" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="consultPhone">Phone Number</label>
                <input type="tel" id="consultPhone" placeholder="+91 8618471424" />
              </div>
              <div class="form-group">
                <label for="consultService">Service of Interest</label>
                <select id="consultService">
                  <option value="Digital Transformation">Digital Transformation</option>
                  <option value="Cloud Computing & Migration">Cloud Computing & Migration</option>
                  <option value="Engineering & R&D">Engineering & R&D</option>
                  <option value="Enterprise Software Solutions">Enterprise Software Solutions</option>
                  <option value="Infrastructure Management & SecOps">Infrastructure Management & SecOps</option>
                  <option value="Other Technology Inquiry">Other Technology Inquiry</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="consultMessage">Project Details / Goals</label>
              <textarea id="consultMessage" rows="3" placeholder="Tell us about your technical goals or challenge..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary consultation-submit-btn">
              Submit Consultation Request <i class="fas fa-paper-plane"></i>
            </button>
            <p class="form-note"><i class="fas fa-shield-alt"></i> 100% Confidential. Zero obligation.</p>
          </form>
          
          <div id="consultationSuccess" class="consultation-success" style="display: none;">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Consultation Request Received!</h3>
            <p>Thank you for reaching out. One of our lead solution architects will contact you within 24 business hours.</p>
            <button type="button" class="btn btn-primary consultation-done-btn">Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(consultModal);
    }
    return consultModal;
  }

  function openConsultationModal(serviceTitle = '') {
    closeAllCapabilityModals();

    const consultModal = getOrCreateConsultationModal();
    const consultForm = consultModal.querySelector('#consultationForm');
    const consultSuccess = consultModal.querySelector('#consultationSuccess');
    const serviceSelect = consultModal.querySelector('#consultService');

    if (consultForm) consultForm.style.display = 'flex';
    if (consultSuccess) consultSuccess.style.display = 'none';

    if (serviceSelect && serviceTitle) {
      let matchFound = false;
      Array.from(serviceSelect.options).forEach(opt => {
        if (opt.value.toLowerCase().includes(serviceTitle.toLowerCase()) || serviceTitle.toLowerCase().includes(opt.value.toLowerCase())) {
          opt.selected = true;
          matchFound = true;
        }
      });
      if (!matchFound) {
        const newOpt = new Option(serviceTitle, serviceTitle, true, true);
        serviceSelect.add(newOpt, 0);
      }
    }

    consultModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeConsultationModal() {
    const consultModal = document.getElementById('consultationModal');
    if (consultModal) {
      consultModal.classList.remove('active');
      const anyModalOpen = document.querySelector('.capability-detail-modal.active');
      if (!anyModalOpen) {
        document.body.style.overflow = '';
      }
    }
  }

  // Intercept all "Get a Free Consultation" modal-cta clicks
  document.addEventListener('click', (e) => {
    const ctaBtn = e.target.closest('.modal-cta, .cap-modal-cta-btn');
    if (ctaBtn) {
      e.preventDefault();
      e.stopPropagation();
      let activeServiceTitle = '';
      const parentModal = ctaBtn.closest('.capability-detail-modal');
      if (parentModal) {
        const titleEl = parentModal.querySelector('.capability-detail-title, h2, h3');
        if (titleEl) activeServiceTitle = titleEl.textContent.trim();
      }
      openConsultationModal(activeServiceTitle);
    }
  });

  // Bind close and submit handlers for consultation modal
  document.addEventListener('click', (e) => {
    if (e.target.closest('.consultation-modal-close') || e.target.closest('.consultation-done-btn')) {
      closeConsultationModal();
    }
    const consultModal = document.getElementById('consultationModal');
    if (consultModal && e.target === consultModal) {
      closeConsultationModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const consultModal = document.getElementById('consultationModal');
      if (consultModal && consultModal.classList.contains('active')) {
        closeConsultationModal();
      }
    }
  });

  // --- 7c. Global Navbar "Contact Us" Popup Modal Functionality ---
  let isContactModalTransitioning = false;

  function getOrCreateContactUsModal() {
    let modalBackdrop = document.getElementById('contactUsModal');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'contactUsModal';
      modalBackdrop.className = 'contact-us-modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');
      modalBackdrop.setAttribute('aria-labelledby', 'contactModalHeading');
      modalBackdrop.innerHTML = `
        <div class="contact-modal-container">
          <button type="button" class="contact-modal-close-btn" id="contactModalClose" aria-label="Close Contact Us Popup">
            <i class="fas fa-times"></i>
          </button>

          <div class="contact-modal-header">
            <div class="contact-modal-badge">
              <i class="fas fa-paper-plane"></i> Connect With Our Team
            </div>
            <h2 id="contactModalHeading" class="contact-modal-heading">Let's Build Something Great Together</h2>
            <p class="contact-modal-subtitle">Have a project, idea, or business challenge in mind? Tell us what you need and our team will get back to you.</p>
          </div>

          <div class="contact-modal-body-grid">
            <!-- LEFT SIDE — CONTACT INFORMATION -->
            <div class="contact-info-col">
              <h3 class="contact-info-title"><i class="fas fa-headset"></i> Connect With Us</h3>
              <p class="contact-info-desc">Reach out directly through any of our channels or send us a message with your requirements.</p>

              <div class="contact-info-list">
                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-info-content">
                    <span class="contact-info-label">Email</span>
                    <a href="mailto:info@arshithinfotech.com" class="contact-info-value">info@arshithinfotech.com</a>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div class="contact-info-content">
                    <span class="contact-info-label">Phone</span>
                    <a href="tel:+91XXXXXXXXXX" class="contact-info-value">+91 XXXXX XXXXX</a>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="contact-info-content">
                    <span class="contact-info-label">Location</span>
                    <span class="contact-info-value">India</span>
                  </div>
                </div>
              </div>

              <div class="contact-trust-box">
                <i class="fas fa-shield-alt"></i>
                <span>Enterprise confidentiality guaranteed. We strictly safeguard your business discussions and information.</span>
              </div>
            </div>

            <!-- RIGHT SIDE — CONTACT FORM -->
            <div class="contact-form-col">
              <h3 class="contact-form-title">Send Us a Message</h3>

              <form id="contactUsNavbarForm" class="contact-modal-form" novalidate>
                <div class="contact-form-group" id="groupFullName">
                  <label for="contactFullName">Full Name <span class="req">*</span></label>
                  <div class="contact-input-wrap">
                    <input type="text" id="contactFullName" name="fullName" placeholder="Enter your name" required autocomplete="name" />
                    <i class="fas fa-user input-icon"></i>
                  </div>
                  <span class="field-error-text" id="nameError">Please enter your full name.</span>
                </div>

                <div class="contact-form-group" id="groupEmail">
                  <label for="contactEmail">Email Address <span class="req">*</span></label>
                  <div class="contact-input-wrap">
                    <input type="email" id="contactEmail" name="email" placeholder="Enter your email" required autocomplete="email" />
                    <i class="fas fa-envelope input-icon"></i>
                  </div>
                  <span class="field-error-text" id="emailError">Please enter a valid email address.</span>
                </div>

                <div class="contact-form-row">
                  <div class="contact-form-group" id="groupPhone">
                    <label for="contactPhone">Phone Number</label>
                    <div class="contact-input-wrap">
                      <input type="tel" id="contactPhone" name="phone" placeholder="Enter your phone number" autocomplete="tel" />
                      <i class="fas fa-phone-alt input-icon"></i>
                    </div>
                  </div>

                  <div class="contact-form-group" id="groupCompany">
                    <label for="contactCompany">Company</label>
                    <div class="contact-input-wrap">
                      <input type="text" id="contactCompany" name="company" placeholder="Enter your company name" autocomplete="organization" />
                      <i class="fas fa-building input-icon"></i>
                    </div>
                  </div>
                </div>

                <div class="contact-form-group" id="groupMessage">
                  <label for="contactMessage">Message <span class="req">*</span></label>
                  <textarea id="contactMessage" name="message" class="contact-textarea" rows="4" placeholder="Tell us about your project or requirement..." required></textarea>
                  <span class="field-error-text" id="messageError">Please enter your message.</span>
                </div>

                <button type="submit" class="btn btn-primary contact-submit-btn" id="contactSubmitBtn">
                  <span>Send Message</span>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>

              <!-- SUCCESS STATE -->
              <div id="contactSuccessState" class="contact-success-state">
                <div class="contact-success-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h4 class="contact-success-title">Message Sent Successfully!</h4>
                <p class="contact-success-desc">Thank you for reaching out. Our team will review your message and get back to you shortly.</p>
                <button type="button" class="btn btn-primary contact-success-close-btn" id="contactSuccessCloseBtn">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
      bindContactModalEvents(modalBackdrop);
    }
    return modalBackdrop;
  }

  function openContactUsModal() {
    if (isContactModalTransitioning) return;

    // Close any other open capability / consultation modals
    closeAllCapabilityModals();
    if (typeof closeConsultationModal === 'function') {
      closeConsultationModal();
    }

    const modal = getOrCreateContactUsModal();
    const form = modal.querySelector('#contactUsNavbarForm');
    const success = modal.querySelector('#contactSuccessState');

    // Reset form to active view and clear errors
    if (form) {
      form.style.display = 'flex';
      modal.querySelectorAll('.contact-form-group').forEach(grp => grp.classList.remove('has-error'));
    }
    if (success) {
      success.style.display = 'none';
    }

    modal.classList.remove('closing');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const nameInput = modal.querySelector('#contactFullName');
      if (nameInput) nameInput.focus();
    }, 150);
  }

  function closeContactUsModal() {
    const modal = document.getElementById('contactUsModal');
    if (!modal || !modal.classList.contains('active') || isContactModalTransitioning) return;

    isContactModalTransitioning = true;
    modal.classList.add('closing');

    setTimeout(() => {
      modal.classList.remove('active');
      modal.classList.remove('closing');
      isContactModalTransitioning = false;

      // Restore scrolling if no other modals are open
      const anyOtherActive = document.querySelector('.capability-detail-modal.active, #consultationModal.active');
      if (!anyOtherActive) {
        document.body.style.overflow = '';
      }
    }, 300);
  }

  function bindContactModalEvents(modal) {
    const form = modal.querySelector('#contactUsNavbarForm');
    const success = modal.querySelector('#contactSuccessState');
    const closeBtn = modal.querySelector('#contactModalClose');
    const successCloseBtn = modal.querySelector('#contactSuccessCloseBtn');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeContactUsModal();
      });
    }

    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeContactUsModal();
      });
    }

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeContactUsModal();
      }
    });

    // Real-time error dismissal on input
    const nameInput = modal.querySelector('#contactFullName');
    const emailInput = modal.querySelector('#contactEmail');
    const messageInput = modal.querySelector('#contactMessage');

    [nameInput, emailInput, messageInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          const group = inp.closest('.contact-form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });

    // Form Submission & Validation
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        let firstInvalid = null;

        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const messageVal = messageInput ? messageInput.value.trim() : '';

        // Validate Full Name
        const nameGroup = modal.querySelector('#groupFullName');
        if (!nameVal) {
          isValid = false;
          if (nameGroup) nameGroup.classList.add('has-error');
          if (!firstInvalid) firstInvalid = nameInput;
        } else {
          if (nameGroup) nameGroup.classList.remove('has-error');
        }

        // Validate Email (Format & Required)
        const emailGroup = modal.querySelector('#groupEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          isValid = false;
          if (emailGroup) emailGroup.classList.add('has-error');
          if (!firstInvalid) firstInvalid = emailInput;
        } else {
          if (emailGroup) emailGroup.classList.remove('has-error');
        }

        // Validate Message
        const messageGroup = modal.querySelector('#groupMessage');
        if (!messageVal) {
          isValid = false;
          if (messageGroup) messageGroup.classList.add('has-error');
          if (!firstInvalid) firstInvalid = messageInput;
        } else {
          if (messageGroup) messageGroup.classList.remove('has-error');
        }

        if (!isValid) {
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // Success State
        form.reset();
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
        }
      });
    }
  }

  // Global Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const contactModal = document.getElementById('contactUsModal');
      if (contactModal && contactModal.classList.contains('active')) {
        closeContactUsModal();
      }
    }
  });

  // Intercept Navbar "Contact Us" clicks on EVERY page
  document.addEventListener('click', (e) => {
    const contactTrigger = e.target.closest('.nav-cta, .drawer-cta-btn, [data-open-contact-modal], .navbar a[href*="#contact"], .nav-links a[href*="#contact"]');
    if (contactTrigger) {
      e.preventDefault();
      e.stopPropagation();

      // Close mobile navigation drawer if open
      if (typeof closeMenu === 'function') {
        closeMenu();
      }

      openContactUsModal();
    }
  });

  // Pre-initialize Contact Modal DOM
  getOrCreateContactUsModal();

  // --- 8. Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
      }
    });
  }

  // --- 9. Newsletter Form Handling ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#10b981';
      }
      if (input) {
        input.value = '';
        input.placeholder = 'Thank you for subscribing!';
        input.disabled = true;
      }
    });
  });

  // --- 10. Cookie Consent Banner ---
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (cookieBanner) {
    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1200);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }
  }

  // --- 11. Interactive Industry Cards (Hover Matter & Click Specular Reflection) ---
  const industryCards = document.querySelectorAll('.industry-card');
  industryCards.forEach(card => {
    // Inject light sweep reflection element if not present
    if (!card.querySelector('.card-reflection-sweep')) {
      const sweep = document.createElement('div');
      sweep.className = 'card-reflection-sweep';
      card.appendChild(sweep);
    }

    card.addEventListener('click', (e) => {
      // If clicking the explore button/link, allow smooth navigation
      if (e.target.closest('.btn-industry-explore')) {
        return;
      }

      const isAlreadyActive = card.classList.contains('active-reflect');

      // Create interactive click ripple pulse
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'click-reflection-ripple';
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);

      // Trigger specular diagonal reflection sweep
      const sweep = card.querySelector('.card-reflection-sweep');
      if (sweep) {
        sweep.classList.remove('sweep-animate');
        void sweep.offsetWidth; // Trigger reflow to restart animation
        sweep.classList.add('sweep-animate');
      }

      // Remove active-reflect from all other cards
      industryCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active-reflect');
        }
      });

      // Toggle active reflection on clicked card
      if (isAlreadyActive) {
        card.classList.remove('active-reflect');
      } else {
        card.classList.add('active-reflect');
      }
    });
  });

  // --- 12. Interactive Service Cards on Mobile Touch ---
  const serviceCardsList = document.querySelectorAll('.service-card');
  serviceCardsList.forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicking card learn/button, let modal handle it
      if (e.target.closest('.card-learn') || e.target.closest('.service-slide-cue')) {
        return;
      }
      if (window.innerWidth <= 768) {
        const isTouchActive = card.classList.contains('active-touch');
        serviceCardsList.forEach(c => c.classList.remove('active-touch'));
        if (!isTouchActive) {
          card.classList.add('active-touch');
        }
      }
    });
  });

  // --- 13. Internship & Careers Interactive FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 14. Internship Domain Track Filter Handler ---
  const internFilterBar = document.getElementById('internshipsFilterBar');
  if (internFilterBar) {
    const filterPills = internFilterBar.querySelectorAll('.career-pill');
    const internCards = document.querySelectorAll('.internship-card-item');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-intern-filter');

        internCards.forEach(card => {
          const category = card.getAttribute('data-intern-category');
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('is-hidden');
            card.style.setProperty('display', 'flex', 'important');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.classList.add('is-hidden');
            card.style.setProperty('display', 'none', 'important');
          }
        });
      });
    });
  }
});


