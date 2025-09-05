// بيانات المستخدمين المصرح لهم
const users = [
    { username: "samir", password: "28/9/2004", role: "leader", avatar: "images/Me.jpg" },
    { username: "yasmine", password: "29/11/2009", role: "co-leader", avatar: "images/Yasmine.jpg" },
    { username: "zeyad", password: "zeyad2000", role: "co-leader", avatar: "images/Zezo.jpg" },
    { username: "Nada", password: "nada1010", role: "co-leader", avatar: "images/avatars/nada.png" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error");

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // حفظ بيانات المستخدم في التخزين المحلي
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html"; // الانتقال للوحة التحكم
    } else {
        errorMsg.textContent = "❌ اسم المستخدم أو كلمة المرور غير صحيحة";
    }
});

// إظهار/إخفاء كلمة المرور
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});
