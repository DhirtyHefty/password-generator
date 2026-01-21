const slider = document.getElementById('lengthSlider');
        const lengthValue = document.querySelector('.length-value');

        function updateSlider() {
            const value = slider.value;
            const min = slider.min;
            const max = slider.max;
            const percent = ((value - min) / (max - min)) * 100;
            
            // Update the displayed value
            lengthValue.textContent = value;
            
            // Update the green background
            slider.style.setProperty('--slider-percent', `${percent}%`);
        }

        // Update on slider input
        slider.addEventListener('input', updateSlider);

        // Set initial state
        updateSlider();