// Ensure DOM is fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a, button, .premium-hover');

    // Only enable custom cursor if it's not a touch device
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    } else {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // 2. Scroll Reveal Animations via Scroll Event
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load to show elements already in view
    revealOnScroll();

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.5)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar on scroll down, show on scroll up (Optional for mobile)
        /*
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
    });

    // 4. 3D Tilt & Glow Effect on Glass Cards
    const cards = document.querySelectorAll('.glass-card');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                // Calculate cursor position relative to the card
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (max 7 degrees)
                const rotateX = ((y - centerY) / centerY) * -7; 
                const rotateY = ((x - centerX) / centerX) * 7;
                
                card.style.transition = 'transform 0.1s ease';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Render a dynamic glossy shine tracking the cursor
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;
                card.style.background = `rgba(255, 255, 255, 0.02) radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
                card.style.zIndex = "10";
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset card seamlessly
                card.style.transition = 'transform 0.5s ease, background 0.5s ease';
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.background = 'var(--card-bg)';
                card.style.zIndex = "1";
            });
        });
    }
    // 5. Scroll-Driven Parallax Animations (3D Elements moving based on scroll)
    const heroImage = document.querySelector('.hero-profile-img');
    const heroContent = document.querySelector('.hero-content');
    const floatingIcons = document.querySelectorAll('.tech-icon');
    const orbs = document.querySelectorAll('.glow-orb');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                // Hero Section 3D Parallax
                if (scrollY < window.innerHeight) {
                    if (heroImage) {
                        heroImage.style.transform = `perspective(1000px) translateY(${scrollY * 0.15}px) rotateX(${scrollY * 0.05}deg) rotateY(${scrollY * -0.05}deg)`;
                    }
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
                        heroContent.style.opacity = 1 - (scrollY * 0.0025);
                    }
                    
                    // Floating tech icons hyper-parallax
                    floatingIcons.forEach((icon, index) => {
                        const speed = 0.2 + (index * 0.1);
                        const rotationSpeed = index % 2 === 0 ? 0.2 : -0.2;
                        icon.style.transform = `translateY(${scrollY * -speed}px) rotate(${scrollY * rotationSpeed}deg) scale(${1 + scrollY * 0.001})`;
                    });
                }
                
                // Abstract background orbs parallax for depth
                orbs.forEach((orb, index) => {
                    const dir = index % 2 === 0 ? 1 : -0.5;
                    const speed = 0.08 * ((index % 3) + 1);
                    orb.style.transform = `translateY(${scrollY * speed * dir}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

});
