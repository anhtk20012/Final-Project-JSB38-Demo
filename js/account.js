function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const comfirmPassword = document.getElementById("register-password-cf").value;

    if (!name || !email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    // Nếu chưa có người dùng nào thì khởi tạo mảng rỗng
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // u đại diện cho từng user trong mảng users
    const existedUser = users.find(u => u.email === email);
    if (existedUser) {
        alert("Email đã được đăng ký!");
        return;
    }

    if (password !== comfirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Chuyển sang trang đăng nhập.");
    window.location.href = "./login.html";
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ email và mật khẩu.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
        alert(`Chào mừng, ${foundUser.name}! Đăng nhập thành công.`);
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "../index.html";
    } else {
        alert("Sai email hoặc mật khẩu.");
    }
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Đăng xuất thành công.");
    window.location.href = "./index.html";
}

function checkLoginStatus(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    if (user) {
        document.getElementById("profile-login")?.classList.add("d-none");
        document.getElementById("profile-register")?.classList.add("d-none");

        document.getElementById("profile-menu")?.classList.remove("d-none");
    }
}