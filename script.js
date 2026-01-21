const slider = document.getElementById('lengthSlider');
const lengthValue = document.querySelector('.length-value');

const passwordText = document.querySelector('.password-text');
const generateButton = document.querySelector('.generate-button');
const copyButton = document.querySelector('.copy-button');

const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');

//setting characters
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '?!"$&*()_+_[]{}|;:@,.';

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

function generatePassword(){
    const length = parseInt(slider.value);
    let charset = '';
    let password = '';

    //build character set based on slected options
    if (uppercaseCheck.checked) charset += uppercase;
    if (lowercaseCheck.checked) charset += lowercase;
    if (numbersCheck.checked) charset += numbers;
    if (symbolsCheck.checked) charset += symbols;

    //show message or nothing when no options is selected
    if (charset === ''){
        passwordText.textContent = 'Select at least one option';
        return;
    }

    //generate random passwords
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    passwordText.textContent = password;
    updateStrenght(length, charset);
}

function updateStrenght(length, charset){
    const strenghtText = document.querySelector('.strength-text');
    const strenghtBars = document.querySelectorAll('.strength-bar');

    //calculate strength based on length and character variety
    let strength = 0;
    if (length >= 8) strength++;
    if (length >= 12) strength++;
    if (charset.length >= 50) strength++;
    if (length >= 80) strength++;

    //update bars and text
    strenghtBars.forEach((bar, index) => {
        if (index < strength) {
            bar.classList.add('filled');
        } else {
            bar.classList.remove('filled');
        }
    });
    // update strenght text
    if (strength <= 1){
        strenghtText.textContent = 'WEAK';
    }else if (strength === 2){
        strenghtText.textContent = 'MEDIUM';
    }else if (strength === 3) {
        strenghtText.textContent = 'STRONG';
    }else {
        strenghtText.textContent = 'VERY STRONG'
    }
}

function copyToClipboard() {
        const password = passwordText.textContent;
        
        if (password && password !== 'Select at least one option') {
            navigator.clipboard.writeText(password).then(() => {
                // Optional: Show a visual feedback
                copyButton.style.opacity = '0.5';
                setTimeout(() => {
                    copyButton.style.opacity = '1';
                }, 200);
            });
        }
    }


// Update on slider input
slider.addEventListener('input', updateSlider);
generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyToClipboard)

// Set initial state
updateSlider();
//generate initial password
generatePassword();