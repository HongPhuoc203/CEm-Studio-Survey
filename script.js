// Google Sheets Web App URL - Thay đổi URL này sau khi deploy Google Apps Script
// Lấy URL từ bước 3 trong file HUONG_DAN_GOOGLE_SHEETS.md
const GOOGLE_SHEETS_WEB_APP_URL = 'YOUR_WEB_APP_URL_HERE'; // Ví dụ: 'https://script.google.com/macros/s/AKfycby.../exec'

// Quiz State
let quizState = {
    element: null,
    choice2: null,
    choice3: null,
    elementImage: null,
    choice2Image: null,
    choice3Image: null
};

// Step 2 questions and options based on element
const step2Questions = {
    kim: {
        question: "Khi chụp ảnh, bạn thích mình xuất hiện với phong cách nào?",
        options: [
            "Tối giản – sang trọng",
            "Công sở hiện đại",
            "Glam ánh kim",
            "Cổ điển, thanh lịch",
            "Ảnh chân dung nghệ sĩ"
        ]
    },
    moc: {
        question: "Bạn muốn chụp ảnh ở không gian nào?",
        options: [
            "Công viên, vườn cây xanh",
            "Studio với backdrop tự nhiên",
            "Quán cà phê ấm cúng",
            "Ngoài trời, ánh sáng tự nhiên",
            "Không gian vintage, retro"
        ]
    },
    thuy: {
        question: "Bạn muốn tạo cảm giác gì trong bức ảnh?",
        options: [
            "Mơ màng, lãng mạn",
            "Sâu sắc, trầm tư",
            "Mềm mại, dịu dàng",
            "Nghệ thuật, trừu tượng",
            "Tự nhiên, trong trẻo"
        ]
    },
    hoa: {
        question: "Bạn muốn thể hiện năng lượng như thế nào?",
        options: [
            "Nhiệt huyết, đầy đam mê",
            "Quyến rũ, gợi cảm",
            "Năng động, trẻ trung",
            "Cá tính, mạnh mẽ",
            "Vui vẻ, rạng rỡ"
        ]
    },
    tho: {
        question: "Bạn muốn không gian chụp ảnh như thế nào?",
        options: [
            "Ấm áp, thân thiện",
            "Ổn định, chắc chắn",
            "Tự nhiên, gần gũi",
            "Cổ điển, truyền thống",
            "Hiện đại nhưng ấm cúng"
        ]
    }
};

// Step 3 questions and options based on element and choice2
const step3Questions = {
    kim: {
        "Tối giản – sang trọng": {
            question: "Bạn muốn ánh sáng như thế nào?",
            options: [
                "Ánh sáng tự nhiên, dịu nhẹ",
                "Studio lighting tinh tế",
                "High-key, sáng rõ",
                "Low-key, tạo bóng đổ",
                "Ánh sáng vàng ấm"
            ]
        },
        "Công sở hiện đại": {
            question: "Bạn muốn trang phục như thế nào?",
            options: [
                "Suit, blazer chỉn chu",
                "Áo sơ mi và quần tây",
                "Vest và áo dài tay",
                "Trang phục công sở hiện đại",
                "Mix & match thanh lịch"
            ]
        },
        "Glam ánh kim": {
            question: "Bạn muốn make up như thế nào?",
            options: [
                "Smoky eyes và môi đỏ",
                "Make up ánh kim nổi bật",
                "Glamour classic",
                "Bold và dramatic",
                "Sang trọng, quý phái"
            ]
        },
        "Cổ điển, thanh lịch": {
            question: "Bạn muốn cảm xúc trong ảnh như thế nào?",
            options: [
                "Trầm tư, sâu sắc",
                "Tự tin, quyền lực",
                "Dịu dàng, thanh lịch",
                "Nghệ thuật, độc đáo",
                "Cổ điển, vượt thời gian"
            ]
        },
        "Ảnh chân dung nghệ sĩ": {
            question: "Bạn muốn pose như thế nào?",
            options: [
                "Chân dung cận cảnh",
                "Pose nghệ thuật, độc đáo",
                "Tự nhiên, không gò bó",
                "Tạo hình mạnh mẽ",
                "Biểu cảm đa dạng"
            ]
        }
    },
    moc: {
        "Công viên, vườn cây xanh": {
            question: "Bạn muốn ánh sáng như thế nào?",
            options: [
                "Ánh sáng tự nhiên buổi sáng",
                "Golden hour",
                "Ánh sáng xuyên qua lá",
                "Ánh sáng dịu nhẹ",
                "Ánh sáng tự nhiên đầy đủ"
            ]
        },
        "Studio với backdrop tự nhiên": {
            question: "Bạn muốn trang phục như thế nào?",
            options: [
                "Váy flowy, tự nhiên",
                "Áo trắng đơn giản",
                "Trang phục earth tone",
                "Vải mềm mại, thoải mái",
                "Mix tự nhiên và hiện đại"
            ]
        },
        "Quán cà phê ấm cúng": {
            question: "Bạn muốn cảm xúc trong ảnh như thế nào?",
            options: [
                "Thư giãn, thoải mái",
                "Ấm áp, thân thiện",
                "Tự nhiên, không gò bó",
                "Gần gũi, chân thật",
                "Vui vẻ, tích cực"
            ]
        },
        "Ngoài trời, ánh sáng tự nhiên": {
            question: "Bạn muốn make up như thế nào?",
            options: [
                "Natural, không make up",
                "Make up nhẹ nhàng",
                "Tươi tắn, tự nhiên",
                "Glowing, healthy skin",
                "Minimal, fresh"
            ]
        },
        "Không gian vintage, retro": {
            question: "Bạn muốn pose như thế nào?",
            options: [
                "Tự nhiên, không gò bó",
                "Pose cổ điển",
                "Chuyển động nhẹ nhàng",
                "Ngồi, đứng tự nhiên",
                "Tương tác với không gian"
            ]
        }
    },
    thuy: {
        "Mơ màng, lãng mạn": {
            question: "Bạn muốn gam màu như thế nào?",
            options: [
                "Pastel nhẹ nhàng",
                "Xanh dương, xanh lá nhạt",
                "Trắng và xanh biển",
                "Tone lạnh, dịu mát",
                "Màu nước trong suốt"
            ]
        },
        "Sâu sắc, trầm tư": {
            question: "Bạn muốn ánh sáng như thế nào?",
            options: [
                "Ánh sáng dịu, low-key",
                "Ánh sáng xanh lạnh",
                "Bóng đổ sâu",
                "Ánh sáng tự nhiên mờ",
                "Studio lighting mềm mại"
            ]
        },
        "Mềm mại, dịu dàng": {
            question: "Bạn muốn trang phục như thế nào?",
            options: [
                "Váy mềm mại, flowy",
                "Áo trắng nhẹ nhàng",
                "Trang phục tone pastel",
                "Vải lụa, mềm mại",
                "Trang phục đơn giản, tinh tế"
            ]
        },
        "Nghệ thuật, trừu tượng": {
            question: "Bạn muốn make up như thế nào?",
            options: [
                "Natural, dewy skin",
                "Make up mềm mại",
                "Glossy lips",
                "Smoky eyes nhẹ",
                "Make up nghệ thuật"
            ]
        },
        "Tự nhiên, trong trẻo": {
            question: "Bạn muốn pose như thế nào?",
            options: [
                "Pose mềm mại, uyển chuyển",
                "Chuyển động nhẹ nhàng",
                "Ngồi, nằm tự nhiên",
                "Tương tác với nước",
                "Biểu cảm dịu dàng"
            ]
        }
    },
    hoa: {
        "Nhiệt huyết, đầy đam mê": {
            question: "Bạn muốn gam màu như thế nào?",
            options: [
                "Đỏ, cam rực rỡ",
                "Vàng, vàng cam",
                "Tone ấm, nóng",
                "Đỏ đậm, quyến rũ",
                "Màu sắc sống động"
            ]
        },
        "Quyến rũ, gợi cảm": {
            question: "Bạn muốn ánh sáng như thế nào?",
            options: [
                "Ánh sáng vàng ấm",
                "Studio lighting dramatic",
                "Low-key với điểm sáng",
                "Ánh sáng neon",
                "Ánh sáng tạo chiều sâu"
            ]
        },
        "Năng động, trẻ trung": {
            question: "Bạn muốn trang phục như thế nào?",
            options: [
                "Trang phục màu sắc",
                "Streetwear năng động",
                "Váy ngắn, trẻ trung",
                "Mix & match cá tính",
                "Trang phục thể thao"
            ]
        },
        "Cá tính, mạnh mẽ": {
            question: "Bạn muốn make up như thế nào?",
            options: [
                "Bold lips đỏ",
                "Smoky eyes dramatic",
                "Make up nổi bật",
                "Glamour, quyến rũ",
                "Make up cá tính"
            ]
        },
        "Vui vẻ, rạng rỡ": {
            question: "Bạn muốn pose như thế nào?",
            options: [
                "Pose năng động",
                "Nhảy, chuyển động",
                "Biểu cảm vui vẻ",
                "Tự nhiên, không gò bó",
                "Tương tác với camera"
            ]
        }
    },
    tho: {
        "Ấm áp, thân thiện": {
            question: "Bạn muốn gam màu như thế nào?",
            options: [
                "Tone ấm, beige, nâu",
                "Vàng nhạt, kem",
                "Đất nung, terracotta",
                "Tone trung tính ấm",
                "Màu tự nhiên, earth tone"
            ]
        },
        "Ổn định, chắc chắn": {
            question: "Bạn muốn ánh sáng như thế nào?",
            options: [
                "Ánh sáng vàng ấm",
                "Ánh sáng tự nhiên đầy đủ",
                "Studio lighting mềm",
                "High-key, sáng rõ",
                "Ánh sáng dịu nhẹ"
            ]
        },
        "Tự nhiên, gần gũi": {
            question: "Bạn muốn trang phục như thế nào?",
            options: [
                "Trang phục tự nhiên",
                "Áo len, ấm áp",
                "Earth tone, neutral",
                "Trang phục thoải mái",
                "Mix tự nhiên và hiện đại"
            ]
        },
        "Cổ điển, truyền thống": {
            question: "Bạn muốn make up như thế nào?",
            options: [
                "Natural, healthy glow",
                "Make up nhẹ nhàng",
                "Classic, timeless",
                "Warm tones",
                "Minimal, fresh"
            ]
        },
        "Hiện đại nhưng ấm cúng": {
            question: "Bạn muốn pose như thế nào?",
            options: [
                "Tự nhiên, thoải mái",
                "Ngồi, đứng ổn định",
                "Pose cổ điển",
                "Tương tác với không gian",
                "Biểu cảm ấm áp"
            ]
        }
    }
};

// Result templates (placeholder - user will fill in later)
const resultTemplates = {
    // This will be populated with 125 combinations
    // For now, using a simple template
    default: {
        title: "Concept: {element} - {style}",
        description: "Concept này được tạo dựa trên sự lựa chọn của bạn. Đây là một concept tuyệt vời phù hợp với tính cách và phong cách của bạn.",
        colors: "Gam màu sẽ được đề xuất dựa trên element và các lựa chọn của bạn.",
        lighting: "Kiểu ánh sáng sẽ được đề xuất dựa trên element và các lựa chọn của bạn.",
        outfit: "Trang phục sẽ được đề xuất dựa trên element và các lựa chọn của bạn.",
        makeup: "Make up và tóc sẽ được đề xuất dựa trên element và các lựa chọn của bạn.",
        pose: "Pose và cảm xúc sẽ được đề xuất dựa trên element và các lựa chọn của bạn."
    }
};

// Element names in Vietnamese
const elementNames = {
    kim: "Kim",
    moc: "Mộc",
    thuy: "Thủy",
    hoa: "Hỏa",
    tho: "Thổ"
};

// Các nhóm phong cách và mood theo file results.txt
const personas = [
    "Nữ Hoàng Quyền Lực",
    "Nàng Thơ Mộng Mơ",
    "Quý Cô Bí Ẩn",
    "Tâm Điểm Của Bữa Tiệc",
    "Người Phụ Nữ An Yên"
];

const moods = [
    "Lấp lánh & Sang trọng",
    "Tươi mát & Trong trẻo",
    "Huyền bí & Sâu lắng",
    "Rực rỡ & Nổi bật",
    "Ấm áp & Hoài niệm"
];

// Ảnh minh họa cho từng ngũ hành theo từng bước (lấy từ thư mục Images)
const elementImages = {
    kim: {
        step1: "Images/Kim/kim 1.1.jpg",
        step2: [
            "Images/Kim/kim 2.1.jpg",
            "Images/Kim/kim 2.2.jpg",
            "Images/Kim/kim 2.3.jpg",
            "Images/Kim/kim 2.4.jpg"
        ],
        step3: [
            "Images/Kim/kim 3.1.jpg",
            "Images/Kim/kim 3.2.jpg",
            "Images/Kim/kim 3.3.jpg",
            "Images/Kim/kim 3.4.jpg"
        ]
    },
    moc: {
        step1: "Images/Mộc/mộc 1.1.jpg",
        step2: [
            "Images/Mộc/mộc 2.1.jpg",
            "Images/Mộc/mộc 2.2.jpg",
            "Images/Mộc/mộc 2.3.jpg",
            "Images/Mộc/mộc 2.4.jpg"
        ],
        step3: [
            "Images/Mộc/mộc 3.1.jpg",
            "Images/Mộc/mộc 3.2.jpg",
            "Images/Mộc/mộc 3.3.jpg",
            "Images/Mộc/mộc 3.4.jpg"
        ]
    },
    thuy: {
        step1: "Images/Thuỷ/thuỷ 1.1.jpg",
        step2: [
            "Images/Thuỷ/thuỷ 2.1.jpg",
            "Images/Thuỷ/thuỷ 2.2.jpg",
            "Images/Thuỷ/thuỷ 2.3.jpg",
            "Images/Thuỷ/thuỷ 2.4.jpg"
        ],
        step3: [
            "Images/Thuỷ/thuỷ 3.1.jpg",
            "Images/Thuỷ/thuỷ 3.2.jpg",
            "Images/Thuỷ/thuỷ 3.3.jpg",
            "Images/Thuỷ/thuỷ 3.5.jpg"
        ]
    },
    hoa: {
        step1: "Images/Hoả/hoả 1.1.jpg",
        step2: [
            "Images/Hoả/hoả 2.1.jpg",
            "Images/Hoả/hoả 2.2.jpg",
            "Images/Hoả/hoả 2.3.jpg",
            "Images/Hoả/hoả 2.4.jpg"
        ],
        step3: [
            "Images/Hoả/hoả 3.1.jpg",
            "Images/Hoả/hoả 3.2.jpg",
            "Images/Hoả/hoả 3.3.jpg",
            "Images/Hoả/hoả 3.4.jpg"
        ]
    },
    tho: {
        step1: "Images/Thổ/thổ 1.1.jpg",
        step2: [
            "Images/Thổ/thổ 2.1.jpg",
            "Images/Thổ/thổ 2.2.jpg",
            "Images/Thổ/thổ 2.3.jpg",
            "Images/Thổ/thổ 2.4.jpg"
        ],
        step3: [
            "Images/Thổ/thổ 3.1.jpg",
            "Images/Thổ/thổ 3.2.jpg",
            "Images/Thổ/thổ 3.3.jpg",
            "Images/Thổ/thổ 3.4.jpg"
        ]
    }
};

// Render ảnh minh họa cho bước 2/3
function renderGallery(containerId, images, elementKey) {
    const container = document.getElementById(containerId);
    if (!container || !images) return;
    
    container.innerHTML = '';
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Ảnh tham khảo ${elementNames[elementKey]} ${containerId} - ${index + 1}`;
        container.appendChild(img);
    });
}

// Navigation Functions
function startQuiz() {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    updateProgress(1);
}

function selectElement(element) {
    quizState.element = element;
    quizState.elementImage = elementImages[element]?.step1 || null;
    quizState.choice2Image = null;
    quizState.choice3Image = null;
    
    // Show step 2
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    
    // Update step 2 content
    const step2Data = step2Questions[element];
    document.getElementById('step2Title').textContent = step2Data.question;
    
    const step2ChoicesContainer = document.getElementById('step2Choices');
    step2ChoicesContainer.innerHTML = '';
    
    step2Data.options.forEach((option, index) => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.onclick = () => selectChoice2(option);
        
        const optionImages = elementImages[element]?.step2 || [];
        const imgSrc = optionImages[index] || optionImages[optionImages.length - 1] || elementImages[element]?.step1 || '';
        card.innerHTML = `
            <img class="choice-thumb" src="${imgSrc}" alt="Ảnh ${option}">
            <p>${option}</p>
        `;
        step2ChoicesContainer.appendChild(card);
    });
    
    // Hiển thị ảnh minh họa cho bước 2
    renderGallery('step2Gallery', elementImages[element].step2, element);
    
    updateProgress(2);
}

function selectChoice2(choice) {
    quizState.choice2 = choice;
    const optionImages = elementImages[quizState.element]?.step2 || [];
    const choiceIndex = step2Questions[quizState.element].options.indexOf(choice);
    quizState.choice2Image = optionImages[choiceIndex] || optionImages[optionImages.length - 1] || quizState.elementImage;
    
    // Show step 3
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
    
    // Update step 3 content
    const step3Data = step3Questions[quizState.element][choice];
    document.getElementById('step3Title').textContent = step3Data.question;
    
    const step3ChoicesContainer = document.getElementById('step3Choices');
    step3ChoicesContainer.innerHTML = '';
    
    step3Data.options.forEach((option, index) => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.onclick = () => selectChoice3(option);
        
        const optionImages = elementImages[quizState.element]?.step3 || [];
        const imgSrc = optionImages[index] || optionImages[optionImages.length - 1] || quizState.elementImage;
        card.innerHTML = `
            <img class="choice-thumb" src="${imgSrc}" alt="Ảnh ${option}">
            <p>${option}</p>
        `;
        step3ChoicesContainer.appendChild(card);
    });
    
    // Hiển thị ảnh minh họa cho bước 3
    renderGallery('step3Gallery', elementImages[quizState.element].step3, quizState.element);
    
    updateProgress(3);
}

function selectChoice3(choice) {
    quizState.choice3 = choice;
    const optionImages = elementImages[quizState.element]?.step3 || [];
    const choiceIndex = step3Questions[quizState.element][quizState.choice2].options.indexOf(choice);
    quizState.choice3Image = optionImages[choiceIndex] || optionImages[optionImages.length - 1] || quizState.elementImage;
    showResult();
}

function goBack(step) {
    if (step === 1) {
        // Go back to step 1
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step1').classList.remove('hidden');
        quizState.choice2 = null;
        updateProgress(1);
    } else if (step === 2) {
        // Go back to step 2
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        quizState.choice3 = null;
        updateProgress(2);
    }
}

function updateProgress(step) {
    const progressFill = document.getElementById('progressFill');
    const currentStepSpan = document.getElementById('currentStep');
    
    currentStepSpan.textContent = step;
    progressFill.style.width = `${(step / 3) * 100}%`;
}

// Hàm gửi dữ liệu đến Google Sheets
function saveToGoogleSheets() {
    // Kiểm tra xem đã cấu hình URL chưa
    if (!GOOGLE_SHEETS_WEB_APP_URL || GOOGLE_SHEETS_WEB_APP_URL === 'YOUR_WEB_APP_URL_HERE') {
        console.log('Google Sheets URL chưa được cấu hình. Vui lòng xem file HUONG_DAN_GOOGLE_SHEETS.md');
        return;
    }
    
    const elementName = elementNames[quizState.element];
    const conceptTitle = `Concept: Nàng ${elementName} - ${quizState.choice2}`;
    
    // Chuẩn bị dữ liệu để gửi
    const data = {
        element: elementName,
        choice2: quizState.choice2,
        choice3: quizState.choice3,
        conceptTitle: conceptTitle
    };
    
    // Sử dụng XMLHttpRequest để gửi dữ liệu (tương thích tốt hơn với Google Apps Script)
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', GOOGLE_SHEETS_WEB_APP_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    console.log('Dữ liệu đã được lưu vào Google Sheets thành công');
                } else {
                    console.error('Lỗi khi lưu dữ liệu:', xhr.status);
                }
            }
        };
        
        xhr.send(JSON.stringify(data));
        
    } catch (error) {
        console.error('Lỗi khi gửi dữ liệu đến Google Sheets:', error);
        // Không hiển thị lỗi cho người dùng để không làm gián đoạn trải nghiệm
    }
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    
    // Generate result based on quiz state
    const elementName = elementNames[quizState.element];
    const resultKey = `${quizState.element}_${quizState.choice2}_${quizState.choice3}`;
    
    // For now, use default template (user will replace with 125 actual results)
    const result = resultTemplates[resultKey] || resultTemplates.default;
    
    // Update result page
    const personaText = quizState.choice2 || "Phong cách bạn chọn";
    const moodText = quizState.choice3 || "Tông cảm xúc bạn chọn";
    const introMessage = `Xin chào nàng thơ mệnh ${elementName}, đây là concept gợi ý cho bạn theo phong cách ${personaText}: ${moodText}`;
    
    const conceptTitle = `Concept: ${personaText}`;
    document.getElementById('resultTitle').textContent = conceptTitle;
    document.getElementById('resultDescription').textContent = introMessage;
    
    // Generate dynamic content based on element
    const elementColors = {
        kim: "Trắng, bạc, xám, đen - tone lạnh và sang trọng",
        moc: "Xanh lá, nâu, beige, vàng nhạt - tone tự nhiên",
        thuy: "Xanh dương, xanh biển, trắng, pastel - tone mát mẻ",
        hoa: "Đỏ, cam, vàng, hồng - tone ấm và năng động",
        tho: "Nâu, beige, vàng đất, terracotta - tone ấm và tự nhiên"
    };
    
    const elementLighting = {
        kim: "Ánh sáng studio tinh tế, high-key hoặc low-key tạo chiều sâu",
        moc: "Ánh sáng tự nhiên, golden hour, ánh sáng dịu nhẹ",
        thuy: "Ánh sáng mềm mại, low-key, ánh sáng tự nhiên mờ",
        hoa: "Ánh sáng vàng ấm, dramatic lighting, ánh sáng tạo điểm nhấn",
        tho: "Ánh sáng vàng ấm, ánh sáng tự nhiên đầy đủ, high-key"
    };
    
    document.getElementById('resultStyle').textContent = personaText;
    document.getElementById('resultMood').textContent = moodText;
    document.getElementById('resultColors').textContent = elementColors[quizState.element];
    document.getElementById('resultLighting').textContent = elementLighting[quizState.element];
    document.getElementById('resultOutfit').textContent = `Dựa trên "${quizState.choice2}" và "${quizState.choice3}", studio sẽ tư vấn trang phục phù hợp nhất.`;
    document.getElementById('resultMakeup').textContent = `Dựa trên "${quizState.choice2}" và "${quizState.choice3}", studio sẽ tư vấn make up và tóc phù hợp nhất.`;
    document.getElementById('resultPose').textContent = `Dựa trên "${quizState.choice2}" và "${quizState.choice3}", studio sẽ hướng dẫn pose và cảm xúc phù hợp nhất.`;

    // Hiển thị 3 ảnh tương ứng với 3 lựa chọn
    const selectedImages = [
        quizState.elementImage,
        quizState.choice2Image,
        quizState.choice3Image
    ].filter(Boolean);
    renderGallery('resultGallery', selectedImages, quizState.element);
    
    // Tự động lưu kết quả vào Google Sheets
    saveToGoogleSheets();
}

function saveResult() {
    const resultText = `
Aura Portrait Studio - Kết quả khảo sát

Concept: ${document.getElementById('resultTitle').textContent}

${document.getElementById('resultDescription').textContent}

Định hướng hình ảnh:
- Gam màu: ${document.getElementById('resultColors').textContent}
- Ánh sáng: ${document.getElementById('resultLighting').textContent}
- Trang phục: ${document.getElementById('resultOutfit').textContent}
- Make up & tóc: ${document.getElementById('resultMakeup').textContent}
- Pose & cảm xúc: ${document.getElementById('resultPose').textContent}

Bạn có thể chụp màn hình để lưu lại kết quả này.
    `;
    
    // Create a blob and download
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ket-qua-khao-sat.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Kết quả đã được lưu! Bạn cũng có thể chụp màn hình để lưu lại.');
}

function bookSession() {
    document.getElementById('contactModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('contactModal').classList.add('hidden');
}

function submitForm(event) {
    event.preventDefault();
    alert('Cảm ơn bạn đã gửi yêu cầu! Studio sẽ liên hệ với bạn sớm nhất có thể.');
    document.getElementById('contactForm').reset();
    closeModal();
}

function restartQuiz() {
    quizState = {
        element: null,
        choice2: null,
        choice3: null
    };
    
    document.getElementById('result').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
    
    updateProgress(1);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeModal();
    }
}

