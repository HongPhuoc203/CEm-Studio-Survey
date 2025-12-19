// Google Sheets Web App URL - Thay đổi URL này sau khi deploy Google Apps Script
// Lấy URL từ bước 3 trong file HUONG_DAN_GOOGLE_SHEETS.md
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbycglgrmmbDf3lKUg6iJbc76AdTqUu1AaEyvNNrgwZ6P_ymvnhtE436wkY7sLkS02YAIQ/exec';

// Quiz State
let quizState = {
    element: null,
    choice2: null,
    choice3: null,
    elementImage: null,
    choice2Image: null,
    choice3Image: null,
    name: '',
    phone: '',
    birthday: ''
};

// Step 2 questions and options based on element
const step2Questions = {
    kim: {
        question: "Bạn đang bị 'mê hoặc' bởi gam màu nào nhất dưới đây?",
        options: [
            "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.",
            "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.",
            "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.",
            "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.",
            "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage."
        ]
    },
    moc: {
        question: "Bạn đang bị 'mê hoặc' bởi gam màu nào nhất dưới đây?",
        options: [
            "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.",
            "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.",
            "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.",
            "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.",
            "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage."
        ]
    },
    thuy: {
        question: "Bạn đang bị 'mê hoặc' bởi gam màu nào nhất dưới đây?",
        options: [
            "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.",
            "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.",
            "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.",
            "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.",
            "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage."
        ]
    },
    hoa: {
        question: "Bạn đang bị 'mê hoặc' bởi gam màu nào nhất dưới đây?",
        options: [
            "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.",
            "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.",
            "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.",
            "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.",
            "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage."
        ]
    },
    tho: {
        question: "Bạn đang bị 'mê hoặc' bởi gam màu nào nhất dưới đây?",
        options: [
            "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.",
            "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.",
            "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.",
            "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.",
            "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage."
        ]
    }
};

// Step 3 questions and options based on element and choice2
// Lưu ý: Keys phải khớp chính xác với các options trong step2Questions
const step3Questions = {
    kim: {
        "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        }
    },
    moc: {
        "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        }
    },
    thuy: {
        "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        }
    },
    hoa: {
        "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        }
    },
    tho: {
        "Lấp lánh & Sang trọng: Trắng, Bạc, Vàng Gold, Metallic.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Tươi mát & Trong trẻo: Xanh lá, Xanh pastel, màu của cây cỏ.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Huyền bí & Sâu lắng: Xanh biển đậm, Đen, Tím than, màu loang của nước.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Rực rỡ & Nổi bật: Đỏ rực, Cam, Hồng, màu của lễ hội.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
            ]
        },
        "Ấm áp & Hoài niệm: Nâu đất, Be, Cam gạch, màu Vintage.": {
            question: "Trong bộ ảnh mở màn năm mới này, bạn muốn mọi người nhìn thấy một phiên bản như thế nào của chính mình?",
            options: [
                "Nữ Hoàng Quyền Lực: Thần thái sắc sảo, sang chảnh, hiện đại và tỏa sáng",
                "Nàng Thơ Mộng Mơ: Nhẹ nhàng, nữ tính, tràn đầy sức sống và sự tươi mới.",
                "Quý Cô Bí Ẩn: Nội tâm, có chiều sâu, ma mị và đầy quyến rũ.",
                "Tâm Điểm Của Bữa Tiệc: Vui vẻ, tràn đầy năng lượng, nhiệt huyết và đam mê.",
                "Người Phụ Nữ An Yên: Điềm đạm, mộc mạc, vững chãi và sâu sắc."
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

// Dữ liệu concept gợi ý theo ngũ hành, dựa trên Ten_Concept_goi_y.txt
// Mỗi concept có: title (tên concept hiển thị) và danh sách ảnh trong folder tương ứng
const conceptSuggestionsData = {
    hoa: [
        {
            title: "Nữ Hoàng Á Đông – Rực rỡ & Kiêu sa",
            images: [
                "Images/Concept_goi_y/Hoa/Concept1/hoả 1.1.jpg",
                "Images/Concept_goi_y/Hoa/Concept1/hoả 1.2.jpg",
                "Images/Concept_goi_y/Hoa/Concept1/hoả 1.3.jpg",
                "Images/Concept_goi_y/Hoa/Concept1/hoả 1.4.jpg"
            ]
        },
        {
            title: "Tâm Điểm Của Bữa Tiệc – Rực rỡ & Nổi bật",
            images: [
                "Images/Concept_goi_y/Hoa/Concept2/hoả 4.1.jpg",
                "Images/Concept_goi_y/Hoa/Concept2/hoả 4.2.jpg",
                "Images/Concept_goi_y/Hoa/Concept2/hoả 4.3.jpg",
                "Images/Concept_goi_y/Hoa/Concept2/hoả 4.4.jpg"
            ]
        },
        {
            title: "Quý Cô Bí Ẩn – Huyền bí & Sâu lắng",
            images: [
                "Images/Concept_goi_y/Hoa/Concept3/hoả 5.1.jpg",
                "Images/Concept_goi_y/Hoa/Concept3/hoả 5.2.jpg",
                "Images/Concept_goi_y/Hoa/Concept3/hoả 5.3.jpg",
                "Images/Concept_goi_y/Hoa/Concept3/hoả 5.4.jpg"
            ]
        },
        {
            title: "Người Phụ Nữ Trưởng Thành – Ấm áp & Hoài niệm",
            images: [
                "Images/Concept_goi_y/Hoa/Concept4/hoả 2.1.jpg",
                "Images/Concept_goi_y/Hoa/Concept4/hoả 2.2.jpg",
                "Images/Concept_goi_y/Hoa/Concept4/hoả 2.3.jpg",
                "Images/Concept_goi_y/Hoa/Concept4/hoả 2.4.jpg"
            ]
        },
        {
            title: "Nữ Hoàng Quyền Lực – Lấp lánh & Sang trọng",
            images: [
                "Images/Concept_goi_y/Hoa/Concept5/hoả 3.1.jpg",
                "Images/Concept_goi_y/Hoa/Concept5/hoả 3.2.jpg",
                "Images/Concept_goi_y/Hoa/Concept5/hoả 3.3.jpg",
                "Images/Concept_goi_y/Hoa/Concept5/hoả 3.4.jpg"
            ]
        }
    ],
    kim: [
        {
            title: "Nữ Thần Ánh Kim – Lấp lánh & Sang trọng",
            images: [
                "Images/Concept_goi_y/Kim/Concept1/kim 1.1.jpg",
                "Images/Concept_goi_y/Kim/Concept1/kim 1.3.jpg",
                "Images/Concept_goi_y/Kim/Concept1/kim 1.4.jpg",
                "Images/Concept_goi_y/Kim/Concept1/kim 1,2.jpg"
            ]
        },
        {
            title: "Quý Cô Bí Ẩn – Huyền bí & Sâu lắng",
            images: [
                "Images/Concept_goi_y/Kim/Concept2/kim 5.1.jpg",
                "Images/Concept_goi_y/Kim/Concept2/kim 5.2.jpg",
                "Images/Concept_goi_y/Kim/Concept2/kim 5.3.jpg",
                "Images/Concept_goi_y/Kim/Concept2/kim 5.4.jpg"
            ]
        },
        {
            title: "Người Phụ Nữ An Yên – Ấm áp & Hoài niệm",
            images: [
                "Images/Concept_goi_y/Kim/Concept3/kim 2.1.jpg",
                "Images/Concept_goi_y/Kim/Concept3/kim 2.2.jpg",
                "Images/Concept_goi_y/Kim/Concept3/kim 2.3.jpg",
                "Images/Concept_goi_y/Kim/Concept3/kim 2.4.jpg"
            ]
        },
        {
            title: "Tâm Điểm Của Bữa Tiệc – Rực rỡ & Nổi bật",
            images: [
                "Images/Concept_goi_y/Kim/Concept4/kim 3.1.jpg",
                "Images/Concept_goi_y/Kim/Concept4/kim 3.2.jpg",
                "Images/Concept_goi_y/Kim/Concept4/kim 3.3.jpg",
                "Images/Concept_goi_y/Kim/Concept4/kim 3.4.jpg"
            ]
        },
        {
            title: "Nữ Hoàng Quyền Lực – Lấp lánh & Sang trọng",
            images: [
                "Images/Concept_goi_y/Kim/Concept5/kim 4.1.jpg",
                "Images/Concept_goi_y/Kim/Concept5/kim 4.2.jpg",
                "Images/Concept_goi_y/Kim/Concept5/kim 4.3.jpg",
                "Images/Concept_goi_y/Kim/Concept5/kim 4.4.jpg"
            ]
        }
    ],
    moc: [
        {
            title: "Nàng Thơ Mộng Mơ – Tươi mát & Trong trẻo",
            images: [
                "Images/Concept_goi_y/Moc/Concept1/mộc 3.1.jpg",
                "Images/Concept_goi_y/Moc/Concept1/mộc 3.2.jpg",
                "Images/Concept_goi_y/Moc/Concept1/mộc 3.3.jpg",
                "Images/Concept_goi_y/Moc/Concept1/mộc 3.4.jpg"
            ]
        },
        {
            title: "Người Phụ Nữ An Yên – Ấm áp & Hoài niệm",
            images: [
                "Images/Concept_goi_y/Moc/Concept2/mộc 4.1.jpg",
                "Images/Concept_goi_y/Moc/Concept2/mộc 4.2.jpg",
                "Images/Concept_goi_y/Moc/Concept2/mộc 4.3.jpg",
                "Images/Concept_goi_y/Moc/Concept2/mộc 4.4.jpg"
            ]
        },
        {
            title: "Quý Cô Bí Ẩn – Huyền bí & Sâu lắng",
            images: [
                "Images/Concept_goi_y/Moc/Concept3/mộc 2.1.jpg",
                "Images/Concept_goi_y/Moc/Concept3/mộc 2.2.jpg",
                "Images/Concept_goi_y/Moc/Concept3/mộc 2.3.jpg",
                "Images/Concept_goi_y/Moc/Concept3/mộc 2.4.jpg"
            ]
        },
        {
            title: "Tâm Điểm Của Bữa Tiệc – Rực rỡ & Nổi bật",
            images: [
                "Images/Concept_goi_y/Moc/Concept4/mộc 1.1.jpg",
                "Images/Concept_goi_y/Moc/Concept4/mộc 1.2.jpg",
                "Images/Concept_goi_y/Moc/Concept4/mộc 1.3.jpg",
                "Images/Concept_goi_y/Moc/Concept4/mộc 1.4.jpg"
            ]
        },
        {
            title: "Nữ Hoàng Quyền Lực – Lấp lánh & Sang trọng",
            images: [
                "Images/Concept_goi_y/Moc/Concept5/mộc 5.1.jpg",
                "Images/Concept_goi_y/Moc/Concept5/mộc 5.2.jpg",
                "Images/Concept_goi_y/Moc/Concept5/mộc 5.3.jpg",
                "Images/Concept_goi_y/Moc/Concept5/mộc 5.4.jpg"
            ]
        }
    ],
    thuy: [
        {
            title: "Nàng Thơ Mộng Mơ – Tươi mát & Trong trẻo",
            images: [
                "Images/Concept_goi_y/Thuy/Concept1/thuỷ 2.1.jpg",
                "Images/Concept_goi_y/Thuy/Concept1/thuỷ 2.2.jpg",
                "Images/Concept_goi_y/Thuy/Concept1/thuỷ 2.3.jpg",
                "Images/Concept_goi_y/Thuy/Concept1/thuỷ 2.4.jpg",
                "Images/Concept_goi_y/Thuy/Concept1/thuỷ 4.4.jpg"
            ]
        },
        {
            title: "Quý Cô Bí Ẩn – Huyền bí & Sâu lắng",
            images: [
                "Images/Concept_goi_y/Thuy/Concept2/thuỷ 3.1.jpg",
                "Images/Concept_goi_y/Thuy/Concept2/thuỷ 3.2.jpg",
                "Images/Concept_goi_y/Thuy/Concept2/thuỷ 3.3.jpg",
                "Images/Concept_goi_y/Thuy/Concept2/thuỷ 3.5.jpg"
            ]
        },
        {
            title: "Quý Cô Á Đông – Ấm áp & Hoài niệm",
            images: [
                "Images/Concept_goi_y/Thuy/Concept3/thuỷ 4.1.jpg",
                "Images/Concept_goi_y/Thuy/Concept3/thuỷ 4.2.jpg",
                "Images/Concept_goi_y/Thuy/Concept3/thuỳ 4.3.jpg"
            ]
        },
        {
            title: "Người Con Gái Trầm Lặng – Tươi mát & Trong trẻo",
            images: [
                "Images/Concept_goi_y/Thuy/Concept4/thuỷ 1.1.jpg",
                "Images/Concept_goi_y/Thuy/Concept4/thuỷ 1.2.jpg",
                "Images/Concept_goi_y/Thuy/Concept4/thuỷ 1.3.jpg",
                "Images/Concept_goi_y/Thuy/Concept4/thuỷ 1.4.jpg"
            ]
        }
    ],
    tho: [
        {
            title: "Người Phụ Nữ An Yên – Ấm áp & Hoài niệm",
            images: [
                "Images/Concept_goi_y/Tho/Concept1/thổ 1.1.jpg",
                "Images/Concept_goi_y/Tho/Concept1/thổ 1.2.jpg",
                "Images/Concept_goi_y/Tho/Concept1/thổ 1.3.jpg",
                "Images/Concept_goi_y/Tho/Concept1/thổ 1.4.jpg",
                "Images/Concept_goi_y/Tho/Concept1/thổ 2.1.jpg"
            ]
        },
        {
            title: "Quý Cô Thanh Lịch – Tươi mát & Trong trẻo",
            images: [
                "Images/Concept_goi_y/Tho/Concept2/thổ 3.1.jpg",
                "Images/Concept_goi_y/Tho/Concept2/thổ 3.2.jpg",
                "Images/Concept_goi_y/Tho/Concept2/thổ 3.3.jpg",
                "Images/Concept_goi_y/Tho/Concept2/thổ 3.4.jpg"
            ]
        },
        {
            title: "Nữ Hoàng Trưởng Thành – Lấp lánh & Sang trọng",
            images: [
                "Images/Concept_goi_y/Tho/Concept3/thổ 5.1.jpg",
                "Images/Concept_goi_y/Tho/Concept3/thổ 5.2.jpg",
                "Images/Concept_goi_y/Tho/Concept3/thổ 5.3.jpg",
                "Images/Concept_goi_y/Tho/Concept3/thổ 5.4.jpg"
            ]
        },
        {
            title: "Quý Cô Bí Ẩn – Huyền bí & Sâu lắng",
            images: [
                "Images/Concept_goi_y/Tho/Concept4/thổ 2.2.jpg",
                "Images/Concept_goi_y/Tho/Concept4/thổ 2.3.jpg",
                "Images/Concept_goi_y/Tho/Concept4/thổ 2.4.jpg"
            ]
        },
        {
            title: "Người Phụ Nữ Dịu Dàng – Ấm áp & Hoài niệm",
            images: [
                "Images/Concept_goi_y/Tho/Concept5/thổ 4.1.jpg",
                "Images/Concept_goi_y/Tho/Concept5/thổ 4.2.jpg",
                "Images/Concept_goi_y/Tho/Concept5/thổ 4.3.jpg",
                "Images/Concept_goi_y/Tho/Concept5/thổ 4.4.jpg"
            ]
        }
    ]
};

const question2Images = [
    "Images/Question2/kim.jpg",
    "Images/Question2/moc.jpg",
    "Images/Question2/thuy.jpg",
    "Images/Question2/hoa.jpg",
    "Images/Question2/tho.jpg"
];

// Và trong thư mục Images/question3 có 5 ảnh:
// q3-1.jpg, q3-2.jpg, q3-3.jpg, q3-4.jpg, q3-5.jpg
const question3Images = [
    "Images/question3/kim.jpg",
    "Images/question3/moc.jpg",
    "Images/question3/thuy.jpg",
    "Images/question3/hoa.jpg",
    "Images/question3/tho.jpg"
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
    document.getElementById('preSurvey').classList.remove('hidden');
    // reset error message
    const err = document.getElementById('preError');
    if (err) err.classList.add('hidden');
}

function backToLanding() {
    document.getElementById('preSurvey').classList.add('hidden');
    document.getElementById('landing').classList.remove('hidden');
}

function submitPreSurvey() {
    const nameInput = document.getElementById('preName');
    const phoneInput = document.getElementById('prePhone');
    const err = document.getElementById('preError');
    
    const name = (nameInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim();
    
    if (!name || !phone) {
        if (err) err.classList.remove('hidden');
        return;
    }
    
    quizState.name = name;
    quizState.phone = phone;
    if (err) err.classList.add('hidden');
    
    // move to birthday step
    document.getElementById('preSurvey').classList.add('hidden');
    document.getElementById('birthdaySurvey').classList.remove('hidden');
}

function backToPreSurvey() {
    document.getElementById('birthdaySurvey').classList.add('hidden');
    document.getElementById('preSurvey').classList.remove('hidden');
}

function submitBirthday() {
    const birthdayInput = document.getElementById('birthday');
    const err = document.getElementById('birthdayError');
    const birthday = (birthdayInput?.value || '').trim();
    
    if (!birthday) {
        if (err) err.classList.remove('hidden');
        return;
    }
    quizState.birthday = birthday;
    if (err) err.classList.add('hidden');
    
    document.getElementById('birthdaySurvey').classList.add('hidden');
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
        
        const optionImages = question2Images;
        // Dùng index của vòng lặp để chọn ảnh tương ứng (1-1 với 5 lựa chọn)
        const imgIndex = Math.min(index, optionImages.length - 1);
        const imgSrc = optionImages[imgIndex] || optionImages[0] || quizState.elementImage || '';
        card.innerHTML = `
            <img class="choice-thumb" src="${imgSrc}" alt="Ảnh ${option}">
            <p>${option}</p>
        `;
        step2ChoicesContainer.appendChild(card);
    });
    
    // Hiển thị ảnh minh họa cho bước 2 (nếu có container)
    renderGallery('step2Gallery', question2Images, element);
    
    updateProgress(2);
}

function selectChoice2(choice) {
    quizState.choice2 = choice;
    const optionImages = question2Images;
    // Tìm index của lựa chọn trong danh sách options của mệnh hiện tại
    const optionsForElement = step2Questions[quizState.element].options;
    const choiceIndex = optionsForElement.indexOf(choice);
    const imgIndex = Math.min(Math.max(choiceIndex, 0), optionImages.length - 1);
    quizState.choice2Image = optionImages[imgIndex] || optionImages[0] || quizState.elementImage;
    
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
        
        const optionImages = question3Images;
        // Dùng index để chọn 1 trong 5 ảnh cho 5 lựa chọn
        const imgIndex = Math.min(index, optionImages.length - 1);
        const imgSrc = optionImages[imgIndex] || optionImages[0] || quizState.elementImage || '';
        card.innerHTML = `
            <img class="choice-thumb" src="${imgSrc}" alt="Ảnh ${option}">
            <p>${option}</p>
        `;
        step3ChoicesContainer.appendChild(card);
    });
    
    // Hiển thị ảnh minh họa cho bước 3 (gallery tham khảo theo mệnh)
    renderGallery('step3Gallery', elementImages[quizState.element].step3, quizState.element);
    
    updateProgress(3);
}

function selectChoice3(choice) {
    quizState.choice3 = choice;
    const optionImages = question3Images;
    // Tìm index của lựa chọn trong danh sách options của câu hỏi bước 3 tương ứng
    const optionsForStep3 = step3Questions[quizState.element][quizState.choice2].options;
    const choiceIndex = optionsForStep3.indexOf(choice);
    const imgIndex = Math.min(Math.max(choiceIndex, 0), optionImages.length - 1);
    quizState.choice3Image = optionImages[imgIndex] || optionImages[0] || quizState.elementImage;
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
    if (!GOOGLE_SHEETS_WEB_APP_URL.startsWith('https://script.google.com')) {
      console.log('❌ Web App URL không hợp lệ');
      return;
    }
  
    const elementName = elementNames[quizState.element] || '';
    const conceptTitle = `Concept: ${elementName} - ${quizState.choice2 || ''}`;
  
    const data = new URLSearchParams();
    data.append('name', quizState.name);
    data.append('phone', quizState.phone);
    data.append('birthday', quizState.birthday);
    data.append('element', elementName);
    data.append('choice2', quizState.choice2);
    data.append('choice3', quizState.choice3);
    data.append('conceptTitle', conceptTitle);
    
  
    fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString()
    })
    .then(() => {
      console.log('✅ Đã gửi dữ liệu sang Google Sheets');
    })
    .catch(err => {
      console.error('❌ Lỗi gửi Google Sheets:', err);
    });
  }
  

function displayConceptSuggestions() {
    const container = document.getElementById('conceptSuggestions');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Lấy danh sách concept theo ngũ hành đã chọn
    const conceptsForElement = conceptSuggestionsData[quizState.element];
    
    if (!conceptsForElement || conceptsForElement.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--neutral-gray); padding: 2rem;">Không có concept gợi ý cho mệnh này.</p>';
        return;
    }
    
    conceptsForElement.forEach((concept, index) => {
        const conceptCard = document.createElement('div');
        conceptCard.className = 'concept-card';
        
        const numberDiv = document.createElement('div');
        numberDiv.className = 'concept-number';
        numberDiv.textContent = index + 1;
        
        const titleH3 = document.createElement('h3');
        titleH3.textContent = concept.title;
        
        const imagesContainer = document.createElement('div');
        imagesContainer.className = 'concept-images-grid';
        
        (concept.images || []).forEach((src, imgIndex) => {
            const img = document.createElement('img');
            img.className = 'concept-image';
            img.alt = `Concept ${concept.title} - Ảnh ${imgIndex + 1}`;
            img.src = src;
            img.loading = 'lazy';
            img.style.cssText = 'width: 100%; height: 150px; object-fit: cover; border-radius: 6px; background: #f9f9f9;';
            
            // Ẩn ảnh nếu load lỗi
            img.onerror = function() {
                this.style.display = 'none';
            };
            
            imagesContainer.appendChild(img);
        });
        
        conceptCard.appendChild(numberDiv);
        conceptCard.appendChild(titleH3);
        conceptCard.appendChild(imagesContainer);
        
        container.appendChild(conceptCard);
    });
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    
    // Generate result based on quiz state
    const elementName = elementNames[quizState.element];
    const resultKey = `${quizState.element}_${quizState.choice2}_${quizState.choice3}`;
    
    // For now, use default template (user will replace with 125 actual results)
    const result = resultTemplates[resultKey] || resultTemplates.default;
    
    // Update result page (ngắn gọn, chỉ lấy phần tên trước dấu ':')
    // persona: lựa chọn bước 3 (ví dụ: "Nữ Hoàng Quyền Lực: ...")
    // mood   : lựa chọn bước 2 (ví dụ: "Tươi mát & Trong trẻo: ...")
    const rawPersona = (quizState.choice3 || "").trim();
    const rawMood    = (quizState.choice2 || "").trim();

    const personaLabel = rawPersona.split(':')[0].trim();
    const moodLabel    = rawMood.split(':')[0].trim();

    const introMessage = `Xin chào nàng thơ mệnh ${elementName}, đây là concept gợi ý cho bạn theo phong cách ${personaLabel}${moodLabel ? `: ${moodLabel}` : ""}`;

    document.getElementById('resultTitle').textContent = "";
    document.getElementById('resultDescription').textContent = introMessage;
    
    // Hiển thị các concept gợi ý khác
    displayConceptSuggestions();

    // Hiển thị 3 ảnh tương ứng với 3 lựa chọn
    const selectedImages = [
        quizState.elementImage,
        quizState.choice2Image,
        quizState.choice3Image
    ].filter(Boolean);
    renderGallery('resultGallery', selectedImages, quizState.element);
    
    // Tự động lưu kết quả vào Google Sheets
    saveToGoogleSheets();
    
    // Hiển thị modal voucher sau khi hiển thị kết quả
    setTimeout(() => {
        showVoucherModal();
    }, 500);
}

function saveResult() {
    const resultText = `
Cem Studio - Kết quả khảo sát

Concept: ${document.getElementById('resultTitle').textContent}

${document.getElementById('resultDescription').textContent}

Thông tin khảo sát:
- Element: ${elementNames[quizState.element]}
- Gam màu yêu thích: ${quizState.choice2}
- Phiên bản mong muốn: ${quizState.choice3}

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
        choice3: null,
        elementImage: null,
        choice2Image: null,
        choice3Image: null,
        name: quizState.name,
        phone: quizState.phone,
        birthday: quizState.birthday
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

// Voucher Modal Functions
const VOUCHER_LINK = 'YOUR_VOUCHER_LINK_HERE'; // Thay đổi link này sau

function showVoucherModal() {
    document.getElementById('voucherModal').classList.remove('hidden');
}

function closeVoucherModal() {
    document.getElementById('voucherModal').classList.add('hidden');
}

function claimVoucher() {
    // Điều hướng đến trang voucher (sẽ cập nhật link sau)
    if (VOUCHER_LINK && VOUCHER_LINK !== 'YOUR_VOUCHER_LINK_HERE') {
        window.open(VOUCHER_LINK, '_blank');
    } else {
        // Nếu chưa có link, chỉ đóng modal
        alert('Voucher đã được gửi đến bạn! Studio sẽ liên hệ sớm nhất có thể.');
    }
    closeVoucherModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeModal();
    }
    
    const voucherModal = document.getElementById('voucherModal');
    if (event.target === voucherModal) {
        closeVoucherModal();
    }
}

