// ======== تفعيل الوضع الداكن =========
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "../login.html";
} else {
    // عرض اسم ودور
    document.getElementById("user-name").textContent = loggedInUser.username;
    document.getElementById("user-role").textContent = loggedInUser.role;

    // عرض الصورة لو موجودة
    if (loggedInUser.avatar) {
        const avatarImg = document.querySelector(".profile img.avatar");
        if (avatarImg) {
            avatarImg.src = loggedInUser.avatar;
            avatarImg.alt = loggedInUser.username;
        }
    }

    // ⚡ إضافة صورة تلقائية بناءً على الإيميل (Gravatar) لو مفيش avatar
    if (!loggedInUser.avatar && loggedInUser.email) {
        const emailHash = md5(loggedInUser.email.trim().toLowerCase());
        const avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=80`;
        const avatarImg = document.querySelector(".profile img.avatar");
        if (avatarImg) {
            avatarImg.src = avatarUrl;
            avatarImg.alt = loggedInUser.username;
        }
    }

    // رسالة الترحيب
    const welcomeElem = document.getElementById("welcomeMessage");
    if (welcomeElem) {
        welcomeElem.textContent = `مرحباً ${loggedInUser.username} - دورك: ${loggedInUser.role}`;
    }
}

const darkToggle = document.getElementById("darkToggle");
const dashboard = document.querySelector(".dashboard");

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    dashboard.classList.toggle("dash-dark");
    if (dashboard.classList.contains("dash-dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// استرجاع الوضع عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    dashboard.classList.add("dash-dark");
  }
});

// ======== تحديد الرابط النشط =========
const navLinks = document.querySelectorAll(".side-nav a");
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// ======== مثال إشعارات =========
function showNotification(message, type = "info") {
  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 3000);
}

// جلب بيانات المستخدم
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "../login.html"; // رجوع لو مش مسجل
} else {
    const welcomeElem = document.getElementById("welcomeMessage");
    if (welcomeElem) {
        welcomeElem.textContent = `مرحباً ${user.username} - دورك: ${user.role}`;
    }
}
