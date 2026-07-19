document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Menu
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    mobileMenu.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
    // 2. Sticky Header & Active Navigation
    const header = document.querySelector(".main-header");
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");
    window.addEventListener("scroll", function () {
        const scrollPos = window.scrollY;
        header.style.padding = scrollPos > 50 ? "0.5rem 0" : "1rem 0";
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos <= bottom) {
                navItems.forEach(item => item.classList.remove("active"));
                const active = document.querySelector(
                    `.nav-links a[href="#${section.id}"]`
                );
                if (active) active.classList.add("active");
            }
        });
    });
    // 3. Course Filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".course-card");
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const filter = this.dataset.filter;
            cards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "block";
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
    // 4. Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial-item");
    let current = 0;
    function showSlide(index) {
        testimonials.forEach(item => item.classList.remove("active"));
        testimonials[index].classList.add("active");
    }
    document.getElementById("next-test").addEventListener("click", function () {
        current = (current + 1) % testimonials.length;
        showSlide(current);
    });
    document.getElementById("prev-test").addEventListener("click", function () {
        current = (current - 1 + testimonials.length) % testimonials.length;
        showSlide(current);
    });
    let autoSlide = setInterval(function () {
        document.getElementById("next-test").click();
    }, 7000);
    const slider = document.querySelector(".slider-wrapper");
    slider.addEventListener("mouseenter", function () {
        clearInterval(autoSlide);
    });
    slider.addEventListener("mouseleave", function () {
        autoSlide = setInterval(function () {
            document.getElementById("next-test").click();
        }, 7000);
    });
    // 5. Contact Form
    const form = document.getElementById("enrollmentForm");
    const feedback = document.getElementById("form-feedback");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const course = document.getElementById("course-select").value;
        feedback.style.color = "#10b981";
        feedback.textContent =
            `Thank you, ${name}! Your pre-enrollment request for "${course}" has been submitted successfully.`;
        form.reset();
        setTimeout(function () {
            feedback.textContent = "";
        }, 5000);
    });
});