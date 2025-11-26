document.addEventListener('DOMContentLoaded', () => {

    // --- INITIAL DATA SETUP ---
    const initialData = {
        projects: [{
                img: 'https://tse1.mm.bing.net/th/id/OIP.-V7-7l9bNo-PCnzgBFiM1QHaEK?pid=Api&P=0&h=180',
                title: 'BsmartGlass',
                description: 'Real-time assistive system connecting blind users with remote guides via smart-glass video + AI navigation.',
                tech: ['MERN', 'WebRTC', 'WebSockets', 'Google Maps API', 'OpenAI API', 'N8N', 'Bluetooth/WiFi'],
                link: 'https://b-smart-glass-aura-vision.vercel.app/'
            },
            {
                img: 'https://tse1.mm.bing.net/th/id/OIP.-V7-7l9bNo-PCnzgBFiM1QHaEK?pid=Api&P=0&h=180',
                title: 'Alumni Connect Platform',
                description: 'Full-stack platform enabling alumni to network, share opportunities, and stay updated',
                tech: ['HTML', 'CSS', 'JS', 'Bootstrap', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Cloudinary.'],
                link: 'https://mamcet-alumni-connection.onrender.com/index.html'
            },
            {
                img: 'https://tse1.mm.bing.net/th/id/OIP.-V7-7l9bNo-PCnzgBFiM1QHaEK?pid=Api&P=0&h=180',
                title: 'AI-Powered Learning Path Generator',
                description: 'AI agent that auto-creates learning paths with YouTube playlists and Drive/Notion docs',
                tech: ['Python', 'LangGraph', 'Streamlit', 'MCP', 'Google Generative AI', 'YouTube/Drive/Notion APIs'],
                link: 'https://persional-ai-assistance-1.onrender.com/'
            },
            {
                img: 'https://img.freepik.com/premium-photo/list-icon-notebook-with-completed-todo-list-3d-render_471402-428.jpg?w=2000',
                title: 'Todos Application',
                description: 'A comprehensive todo management tool designed to enhance productivity, featuring dynamic UI updates and local storage persistence.',
                tech: ['HTML', 'CSS', 'JavaScript'],
                link: 'https://bharathtodowep.ccbp.tech'
            },
            {
                img: 'https://logosmarcas.net/wp-content/uploads/2020/09/Wikipedia-Logo.png',
                title: 'Wikipedia Search App',
                description: 'Simplifies information access with asynchronous API calls to fetch and display relevant search results dynamically.',
                tech: ['JS', 'REST API'],
                link: 'https://wikiweb332.ccbp.tech'
            },
            {
                img: 'https://tse1.mm.bing.net/th/id/OIP.-V7-7l9bNo-PCnzgBFiM1QHaEK?pid=Api&P=0&h=180',
                title: 'My Library Web App',
                description: 'A visually appealing site to explore book recommendations, built with a focus on responsive design and modern CSS.',
                tech: ['HTML', 'CSS'],
                link: 'https://librarymanege.ccbp.tech'
            },
            {
                img: 'https://tse1.mm.bing.net/th/id/OIP.-V7-7l9bNo-PCnzgBFiM1QHaEK?pid=Api&P=0&h=180',
                title: 'My Library Web App',
                description: 'A visually appealing site to explore book recommendations, built with a focus on responsive design and modern CSS.',
                tech: ['HTML', 'CSS'],
                link: 'https://librarymanege.ccbp.tech'
            }
        ],
        skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Python', 'Node.js', 'Express.js', 'SQLite', 'Git & GitHub', 'REST APIs'],
        achievements: [{
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957616/WhatsApp_Image_2025-07-30_at_12.03.58_53e453c2_fvvoaq.jpg',
                title: 'Code Debugging - 1st Runner-Up',
                description: 'Secured 1st Runner-Up at the National Level Technical Symposium CBX-2024.'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753958995/WhatsApp_Image_2025-07-30_at_12.03.59_fdba92d1_xupf2b.jpg',
                title: 'Paper Presentation - Second Place',
                description: 'Won Second Place at a National Level Technical Symposium at N.S.N College of Engineering and Technology.'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753961524/WhatsApp_Image_2025-07-30_at_12.04.00_76338912_cgzllp.jpg',
                title: 'Strong Man of Tamilnadu - 2nd Place',
                description: 'Secured 2nd place in the Open State Biceps Curl / Pushup Championship.'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962081/WhatsApp_Image_2025-07-30_at_12.03.58_822c2f8a_lyxwkd.jpg',
                title: 'Strong Man of Tamilnadu - 4th Place',
                description: 'Secured 4th place in the Pushup & Biceps Curl Championship.'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753959087/WhatsApp_Image_2025-07-30_at_12.04.01_afe5fdaa_grtd05.jpg',
                title: 'Mr. Muscle Mania - 5th Place',
                description: 'Secured 5th place in the 8th Mr. Muscle Mania 2024 championship.'
            }
        ],
        certifications: [{
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962228/IMG-20250730-WA0013_wka2s4.jpg',
                title: 'First Prize in Full Stack ',
                issuer: 'M.A.M College (Code Clan Club)',
                date: 'Feb 2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962432/IMG-20250730-WA0007_oivu1q.jpg',
                title: 'Workshop on Web Mania',
                issuer: 'Karpagam College of Engineering',
                date: 'May 2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957613/IMG-20250730-WA0006_ah20my.jpg',
                title: 'Symposium "Efflorescence 23"',
                issuer: 'Builders Engineering College',
                date: 'Jun 2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957614/IMG-20250730-WA0014_tlswa3.jpg',
                title: 'iTech Hackfest 2023 Participant',
                issuer: 'PSG College of Technology & SAP',
                date: 'Jul 2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957612/IMG-20250730-WA0005_pr6lkb.jpg',
                title: 'Symposium "Brahmastra 23"',
                issuer: 'Chettinad College of Engineering',
                date: 'Sep 2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957613/IMG-20250730-WA0008_q1mk6i.jpg',
                title: 'Essay / Debate Competition',
                issuer: 'Khadi and Village Industries Commission',
                date: 'Oct 2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957613/IMG-20250730-WA0011_djmgzy.jpg    ',
                title: 'Poster Presentation Participant',
                issuer: 'M.A.M. College (VIBRANCE 2023)',
                date: '2022-2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957614/IMG-20250730-WA0016_n1irwa.jpg',
                title: 'Quiz Competition Participant',
                issuer: 'M.A.M. College (VIBRANCE 2023)',
                date: '2022-2023'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753958837/WhatsApp_Image_2025-07-30_at_12.48.23_1ddf68f3_f8h6vs.jpg',
                title: 'Treasure Hunt - First Place',
                issuer: 'N.S.N. College of Engineering',
                date: 'Mar 2024'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753962480/WhatsApp_Image_2025-07-30_at_12.48.25_8e034d9d_hmbztu.jpg',
                title: 'HACKSPRINT \'25 Participant',
                issuer: 'K. Ramakrishnan College of Technology',
                date: 'Feb 2025'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753957616/WhatsApp_Image_2025-07-30_at_12.48.24_bb4a8da6_ssrgso.jpg',
                title: 'Internship Certificate',
                issuer: 'SVASTI TECHNOLOGY SOLUTIONS',
                date: 'Mar 2024'
            },
            {
                img: 'https://res.cloudinary.com/dnby5o1lt/image/upload/v1753963061/Screenshot_2025-07-29_191130_xetrku.png',
                title: 'Internship Certificate',
                issuer: 'Saiket Systems',
                date: 'June 2025 - July 2025'
            }
        ],
        experience: [{
                title: 'Software Engineer - Intern',
                company: ' Bluestock Fintech',
                date: 'Aug 2025 - Sep 2025',
                description: 'Built real-time internal dashboards and REST APIs for trading data systems'
            },
            {
                title: 'Front-end Development Intern',
                company: 'Saiket Systems',
                date: 'June 2025 - July 2025',
                description: 'Served as a Front-end Development Intern, displaying remarkable dedication and a strong desire to learn. Exhibited exceptional analytical thinking, data modeling skills, and effective communication abilities.'
            },
            {
                title: 'Full Stack Development Intern',
                company: 'SVASTI TECHNOLOGY SOLUTIONS',
                date: 'March 2024 - March 2024',
                description: 'Developed front-end interfaces and connected them to databases using modern frameworks and APIs.'
            }
        ]
    };

    // --- DOM REFERENCES ---
    const containers = {
        projects: document.getElementById('project-cards-container'),
        skills: document.getElementById('skills-container'),
        achievements: document.getElementById('achievement-list-container'),
        certifications: document.getElementById('certification-list-container'),
        experience: document.getElementById('experience-container')
    };

    // --- RENDER FUNCTIONS ---
    function createProjectCard(p) {
        const card = document.createElement('div');
        card.className = 'card project-card animate-on-scroll';

        let techBadgesHTML = '';
        p.tech.forEach(tech => {
            techBadgesHTML += `<span class="tech-badge">${tech}</span>`;
        });

        card.innerHTML = `
            <img src="${p.img}" alt="${p.title}" class="card-img">
            <div class="card-content">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="technologies">
                    <strong>Tech:</strong> ${techBadgesHTML}
                </div>
                <a href="${p.link}" target="_blank" class="btn btn-secondary">View Project</a>
            </div>
        `;
        return card;
    }

    function createSkillTag(skill) {
        const tag = document.createElement('span');
        tag.className = 'skill-tag animate-on-scroll';
        tag.textContent = skill;
        return tag;
    }

    function createAchievementCard(a) {
        const item = document.createElement('div');
        item.className = 'card achievement-card animate-on-scroll';
        item.innerHTML = `
            <div class="card-image-container">
                 <img src="${a.img}" alt="${a.title}" class="card-img">
            </div>
            <div class="card-content">
                <h3>${a.title}</h3>
                <p>${a.description}</p>
            </div>
        `;
        return item;
    }

    function createCertificationCard(c) {
        const item = document.createElement('div');
        item.className = 'card certification-card animate-on-scroll';
        item.innerHTML = `
             <div class="card-image-container">
                 <img src="${c.img}" alt="${c.title}" class="card-img">
             </div>
            <div class="card-content">
                <h3>${c.title}</h3>
                <p>${c.issuer}</p>
                <p class="date">Date: ${c.date}</p>
            </div>
        `;
        return item;
    }

    function createExperienceItem(exp) {
        const item = document.createElement('div');
        item.className = 'experience-item animate-on-scroll';
        item.innerHTML = `
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p class="date">${exp.date}</p>
            <p>${exp.description}</p>
        `;
        return item;
    }

    // --- LOAD INITIAL DATA ---
    initialData.projects.forEach(p => containers.projects.appendChild(createProjectCard(p)));
    initialData.skills.forEach(s => containers.skills.appendChild(createSkillTag(s)));
    initialData.achievements.forEach(a => containers.achievements.appendChild(createAchievementCard(a)));
    initialData.certifications.forEach(c => containers.certifications.appendChild(createCertificationCard(c)));
    initialData.experience.forEach(e => containers.experience.appendChild(createExperienceItem(e)));

    // --- CORE UI: Navigation, Theme, Typing, Scroll Animations ---
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    menuButton.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    const typingEffectSpan = document.querySelector('.typing-effect');
    const words = ["Full Stack Developer", "Creative Problem Solver", "Lifelong Learner"];
    let wordIndex = 0,
        charIndex = 0,
        isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const typeSpeed = isDeleting ? 75 : 150;
        typingEffectSpan.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Form submitted! (This is a demo)');
        contactForm.reset();
    });
});