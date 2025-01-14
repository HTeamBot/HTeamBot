const loader = document.getElementById('loader');
const submitKeyButton = document.getElementById('submitKey');
const apikeyInput = document.getElementById('apikey');
const historyText = document.getElementById('historyText');
const historySection = document.getElementById('historySection');
const gameSection = document.getElementById('gameSection');
const dots = document.getElementById('dots');
const submitHistoryButton = document.getElementById('submitHistory');

let validKeys = []; 
let history = []; // Mảng lưu lịch sử nhập

submitKeyButton.onclick = async function() {
    loader.style.display = 'block'; 
    
    const dotInterval = setInterval(() => {
        const dotCount = (dots.textContent.length % 3) + 1;
        dots.textContent = '.'.repeat(dotCount);
    }, 300); 

    setTimeout(async () => {
        clearInterval(dotInterval); 
        loader.style.display = 'none'; 
        
        await loadValidKeys(); 

        if (validKeys.includes(apikeyInput.value)) {
            alert('Khóa đã được gửi: ' + apikeyInput.value);
            apikeyInput.value = '';
            inputSection.style.display = 'none'; // Ẩn khung nhập liệu khóa
            historySection.style.display = 'block'; // Hiện khung nhập lịch sử
        } else {
            alert('Khóa không hợp lệ. Vui lòng nhập lại.');
        }
    }, 2000); 
};

function addToHistory(circle) {
    if (circle === 'A') {
        history.push('A');
    } else {
        history.push('B');
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyText.textContent = history.length > 0 ? history.join(', ') : 'Chưa có lịch sử.';
}

submitHistoryButton.onclick = function() {
    if (history.length > 0) {
        alert('Bạn đã gửi lịch sử: ' + history.join(', '));
        historySection.style.display = 'none'; // Ẩn khung nhập lịch sử
        gameSection.style.display = 'block'; // Hiện giao diện chính
    } else {
        alert('Bạn chưa nhập lịch sử nào.');
    }
};

document.getElementById('rotateButton').onclick = function() {
    // Chọn ngẫu nhiên giữa A và B
    const randomCircle = Math.random() < 0.5 ? document.getElementById('circleA') : document.getElementById('circleB'); 
    let blinkCount = 10; 
    const blinkInterval = setInterval(() => {
        randomCircle.classList.toggle('hidden'); 
        blinkCount--;

        if (blinkCount <= 0) { 
            clearInterval(blinkInterval);
            randomCircle.classList.remove('hidden'); 
        }
    }, 300); 
};

async function loadValidKeys() {
    const response = await fetch('https://docs.google.com/document/d/1ourm5Q_-do9idXDfq41NWc_HKUjIzQCiUZz3BpGshsA/export?format=txt'); 
    const text = await response.text();
    validKeys = text.split(/\s+/).filter(word => word.length >= 5); 
    console.log('Valid keys:', validKeys);
}
