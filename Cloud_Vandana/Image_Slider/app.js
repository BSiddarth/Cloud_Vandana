document.addEventListener('DOMContentLoaded', function () {
    const images = [
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s",
        "https://st5.depositphotos.com/23188010/77062/i/450/depositphotos_770624600-stock-photo-green-field-morning-render-illustration.jpg",
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];

    const imageSlider = document.getElementById('imageSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;
    let autoSlideInterval;

    function initSlider() {
        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`; // Fixed Template Literal
            img.className = index === 0 ? 'active' : '';
            imageSlider.appendChild(img);

            const dot = document.createElement('div');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`); // Fixed Template Literal
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });

        startAutoSlide();
    }

    function goToSlide(index) {
        currentIndex = index;

        const allImages = imageSlider.querySelectorAll('img');
        allImages.forEach((img, i) => {
            img.className = i === currentIndex ? 'active' : '';
        });

        const allDots = dotsContainer.querySelectorAll('.dot');
        allDots.forEach((dot, i) => {
            dot.className = i === currentIndex ? 'dot active' : 'dot';
        });
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % images.length;
        goToSlide(nextIndex);
        resetAutoSlide();
    }

    function prevSlide() {
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(prevIndex);
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    initSlider();
});
