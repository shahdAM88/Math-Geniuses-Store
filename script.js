// ========================================
// إدارة الفصول
// ========================================

const addClassBtn = document.getElementById("addClassBtn");
const classModal = document.getElementById("classModal");
const closeClassModal = document.getElementById("closeClassModal");
const classNameInput = document.getElementById("classNameInput");
const saveClassBtn = document.getElementById("saveClassBtn");


// فتح نافذة إضافة فصل
if (addClassBtn) {

    addClassBtn.addEventListener("click", function () {

        classModal.classList.add("active");

        classNameInput.value = "";

        classNameInput.focus();

    });

}


// إغلاق النافذة
if (closeClassModal) {

    closeClassModal.addEventListener("click", function () {

        classModal.classList.remove("active");

    });

}


// إغلاق النافذة عند الضغط خارجها
if (classModal) {

    classModal.addEventListener("click", function (event) {

        if (event.target === classModal) {

            classModal.classList.remove("active");

        }

    });

}
// ========================================
// حفظ وعرض الفصول
// ========================================

const classesGrid = document.getElementById("classesGrid");
const emptyClasses = document.getElementById("emptyClasses");


// جلب الفصول المحفوظة
let classes = JSON.parse(localStorage.getItem("mathClasses")) || [];


// حفظ الفصول
function saveClasses() {

    localStorage.setItem(
        "mathClasses",
        JSON.stringify(classes)
    );

}


// عرض الفصول
function displayClasses() {
    
        if (!classesGrid) return;

    classesGrid.innerHTML = "";

    // إذا ما فيه فصول
    if (classes.length === 0) {

        emptyClasses.style.display = "block";

        return;

    }


    // إخفاء رسالة "لا توجد فصول"
    emptyClasses.style.display = "none";


    // إنشاء بطاقة لكل فصل
    classes.forEach(function (classItem) {

        const card = document.createElement("div");

        card.className = "class-card";
card.innerHTML = `
    <div class="class-card-actions">

        <button
            class="edit-class-btn"
            title="تعديل اسم الفصل"
        >
            ✏️
        </button>

        <button
            class="delete-class-btn"
            title="حذف الفصل"
        >
            🗑️
        </button>

    </div>

    <div class="class-card-icon">📚</div>

    <h2>${classItem.name}</h2>

    <p>
        <span class="students-count">
            ${classItem.students.length}
        </span>
        طالبة
    </p>

    <button class="enter-class-btn">
        دخول الفصل
        <span>←</span>
    </button>
`;
// زر تعديل اسم الفصل
const editBtn = card.querySelector(".edit-class-btn");

editBtn.addEventListener("click", function () {

    const newName = prompt(
        "اكتبي الاسم الجديد للفصل:",
        classItem.name
    );

    // إذا ضغطت إلغاء
    if (newName === null) return;

    const cleanName = newName.trim();

    // منع الاسم الفارغ
    if (cleanName === "") return;

    classItem.name = cleanName;

    saveClasses();
    displayClasses();

});

// دخول الفصل
const enterBtn = card.querySelector(".enter-class-btn");

enterBtn.addEventListener("click", function () {

    // نحفظ رقم الفصل الذي اختارته المعلمة
    localStorage.setItem(
        "selectedClassId",
        classItem.id
    );

    // الانتقال إلى صفحة الفصل
    window.location.href = "class.html";

});
// زر حذف الفصل
const deleteBtn = card.querySelector(".delete-class-btn");

deleteBtn.addEventListener("click", function () {

    const confirmDelete = confirm(
        `هل أنتِ متأكدة من حذف "${classItem.name}"؟\n\nسيتم حذف الطالبات والبيانات الموجودة داخله أيضًا.`
    );

    if (!confirmDelete) return;

    classes = classes.filter(function (item) {
        return item.id !== classItem.id;
    });

    saveClasses();
    displayClasses();

});
        classesGrid.appendChild(card);

    });

}


// إضافة فصل جديد
if (saveClassBtn) {

    saveClassBtn.addEventListener("click", function () {

        const className = classNameInput.value.trim();


        // منع الاسم الفارغ
        if (className === "") {

            classNameInput.focus();

            return;

        }


        // إنشاء الفصل
        const newClass = {

            id: Date.now(),

            name: className,

            students: []

        };


        // إضافته للقائمة
        classes.push(newClass);


        // حفظه
        saveClasses();


        // تحديث الصفحة
        displayClasses();


        // إغلاق النافذة
        classModal.classList.remove("active");

    });

}


// عرض الفصول عند فتح الصفحة
displayClasses();

// ========================================
// صفحة الفصل
// ========================================

const currentClassName =
    document.getElementById("currentClassName");

const currentStudentsCount =
    document.getElementById("currentStudentsCount");


// نتأكد أننا داخل صفحة الفصل
if (currentClassName) {

    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const savedClasses =
        JSON.parse(localStorage.getItem("mathClasses")) || [];


    // البحث عن الفصل الذي اختارته المعلمة
    const selectedClass =
        savedClasses.find(function (classItem) {

            return classItem.id === selectedClassId;

        });


    // إذا وجدنا الفصل
    if (selectedClass) {

        currentClassName.textContent =
            selectedClass.name;

        currentStudentsCount.textContent =
            selectedClass.students.length;

    }

}
// ========================================
// نافذة إضافة طالبة
// ========================================

const addStudentBtn =
    document.getElementById("addStudentBtn");

const studentModal =
    document.getElementById("studentModal");

const closeStudentModal =
    document.getElementById("closeStudentModal");

const studentNameInput =
    document.getElementById("studentNameInput");

const saveStudentBtn =
    document.getElementById("saveStudentBtn");


// فتح النافذة
if (addStudentBtn) {

    addStudentBtn.addEventListener("click", function () {

        studentModal.classList.add("active");

        studentNameInput.value = "";

        studentNameInput.focus();

    });

}


// إغلاق النافذة
if (closeStudentModal) {

    closeStudentModal.addEventListener("click", function () {

        studentModal.classList.remove("active");

    });

}


// إغلاقها عند الضغط على الخلفية
if (studentModal) {

    studentModal.addEventListener("click", function (event) {

        if (event.target === studentModal) {

            studentModal.classList.remove("active");

        }

    });

}
// ========================================
// إضافة وحفظ الطالبات
// ========================================

if (saveStudentBtn) {

    saveStudentBtn.addEventListener("click", function () {

        const studentName =
            studentNameInput.value.trim();

        // منع الاسم الفارغ
        if (studentName === "") {

            studentNameInput.focus();
            return;

        }


        // الفصل المفتوح حاليًا
        const selectedClassId =
            Number(localStorage.getItem("selectedClassId"));


        // جلب جميع الفصول
        const savedClasses =
            JSON.parse(
                localStorage.getItem("mathClasses")
            ) || [];


        // البحث عن الفصل الحالي
        const classIndex =
            savedClasses.findIndex(function (classItem) {

                return classItem.id === selectedClassId;

            });


        // إذا لم نجد الفصل
        if (classIndex === -1) return;


        // إنشاء الطالبة
        const newStudent = {

            id: Date.now(),

            name: studentName,

            points: 0,

            rewards: []

        };


        // إضافة الطالبة داخل الفصل الحالي فقط
        savedClasses[classIndex].students.push(newStudent);


        // حفظ البيانات
        localStorage.setItem(
            "mathClasses",
            JSON.stringify(savedClasses)
        );


        // إغلاق النافذة
        studentModal.classList.remove("active");


        // تحديث الصفحة
        location.reload();

    });

}
// ========================================
// عرض طالبات الفصل
// ========================================

const studentsGrid =
    document.getElementById("studentsGrid");

const emptyStudents =
    document.getElementById("emptyStudents");


function displayStudents() {

    // نتأكد أننا داخل صفحة الفصل
    if (!studentsGrid) return;


    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const savedClasses =
        JSON.parse(
            localStorage.getItem("mathClasses")
        ) || [];


    // إيجاد الفصل الحالي
    const selectedClass =
        savedClasses.find(function (classItem) {

            return classItem.id === selectedClassId;

        });


    if (!selectedClass) return;


    // تنظيف المكان قبل العرض
    studentsGrid.innerHTML = "";


    // إذا ما فيه طالبات
    if (selectedClass.students.length === 0) {

        emptyStudents.style.display = "block";

        return;

    }


    // إخفاء رسالة الفصل الفارغ
    emptyStudents.style.display = "none";


    // إنشاء بطاقة لكل طالبة
    selectedClass.students.forEach(function (student) {

        const studentCard =
            document.createElement("div");

        studentCard.className = "student-card";


        studentCard.innerHTML = `
        <label class="student-select">
    <input
        type="checkbox"
        class="student-checkbox"
        data-student-id="${student.id}"
    >
    <span>تحديد</span>
</label>

            <div class="student-avatar">
                👩🏻‍🎓
            </div>

            <h3>
                ${student.name}
            </h3>

            <div class="student-points">

                <span>⭐</span>

                <strong>
                    ${student.points}
                </strong>

                <span>
                    نقطة
                </span>

            </div>
<div class="quick-points">
    <button class="quick-point-btn" data-points="1">+1</button>
    <button class="quick-point-btn" data-points="2">+2</button>
    <button class="quick-point-btn" data-points="5">+5</button>
</div>
            <button class="manage-student-btn">
                إدارة الطالبة
                <span>←</span>
            </button>

        `;
        const quickPointBtns =
    studentCard.querySelectorAll(".quick-point-btn");

quickPointBtns.forEach(function (btn) {

    btn.addEventListener("click", function () {

        const pointsToAdd =
            Number(btn.dataset.points);

        // نقرأ أحدث نسخة من البيانات دائمًا
        const latestClasses =
            JSON.parse(
                localStorage.getItem("mathClasses")
            ) || [];

        const selectedClassId =
            Number(
                localStorage.getItem("selectedClassId")
            );

        // نجيب الفصل من أحدث نسخة
        const latestClass =
            latestClasses.find(function (classItem) {
                return classItem.id === selectedClassId;
            });

        if (!latestClass) return;

        // نجيب الطالبة من أحدث نسخة
        const latestStudent =
            latestClass.students.find(function (item) {
                return item.id === student.id;
            });

        if (!latestStudent) return;

        // إضافة النقاط
        latestStudent.points =
            (Number(latestStudent.points) || 0) + pointsToAdd;

        // إنشاء السجل إذا لم يكن موجودًا
        if (!latestStudent.history) {
            latestStudent.history = [];
        }

        // تسجيل العملية
        latestStudent.history.push({
            id: Date.now(),
            type: "earn",
            amount: pointsToAdd,
            reason: "إضافة سريعة",
            date: new Date().toISOString()
        });

        // حفظ أحدث نسخة
        localStorage.setItem(
            "mathClasses",
            JSON.stringify(latestClasses)
        );

        // تحديث الرقم الظاهر في البطاقة
        const pointsDisplay =
            studentCard.querySelector(
                ".student-points strong"
            );

        if (pointsDisplay) {
            pointsDisplay.textContent =
                latestStudent.points;
        }

        showToast(
            `⭐ تمت إضافة ${pointsToAdd} نقاط لـ ${latestStudent.name}`
        );

    });

});
// دخول صفحة الطالبة
const manageStudentBtn =
    studentCard.querySelector(".manage-student-btn");

manageStudentBtn.addEventListener("click", function () {

    localStorage.setItem(
        "selectedStudentId",
        student.id
    );

    window.location.href = "student.html";

});
        studentsGrid.appendChild(studentCard);

    });

}


// عرض الطالبات عند فتح الصفحة
displayStudents();
const selectAllStudents = document.getElementById("selectAllStudents");
const groupPointBtns = document.querySelectorAll(".group-point-btn");

if (selectAllStudents) {
    selectAllStudents.addEventListener("change", function () {

        const checkboxes = document.querySelectorAll(".student-checkbox");

        checkboxes.forEach(function (checkbox) {
            checkbox.checked = selectAllStudents.checked;
        });

    });
}

groupPointBtns.forEach(function (btn) {

    btn.addEventListener("click", function () {

        const selectedCheckboxes =
            document.querySelectorAll(".student-checkbox:checked");

        if (selectedCheckboxes.length === 0) {
           showToast("⚠️ حددي طالبة واحدة على الأقل أولًا");
            return;
        }

        const pointsToAdd = Number(btn.dataset.points);

        const selectedClassId =
            Number(localStorage.getItem("selectedClassId"));

        const savedClasses =
            JSON.parse(localStorage.getItem("mathClasses")) || [];

        const selectedClass =
            savedClasses.find(c => c.id === selectedClassId);

        if (!selectedClass) return;
let reason = pointsReason ? pointsReason.value : "بدون سبب";

if (reason === "other") {
    reason = customReason.value.trim();

    if (reason === "") {
        showToast("⚠️ اكتبي سبب النقاط أولًا");
        customReason.focus();
        return;
    }
}
       selectedCheckboxes.forEach(function (checkbox) {

    const studentId = Number(checkbox.dataset.studentId);

    const student =
        selectedClass.students.find(s => s.id === studentId);

    if (!student) return;

    // إضافة النقاط
    student.points += pointsToAdd;

    // إنشاء السجل إذا لم يكن موجود
    if (!student.history) {
        student.history = [];
    }

    // تسجيل سبب اكتساب النقاط
    student.history.push({
        id: Date.now(),
        type: "earn",
        amount: pointsToAdd,
        reason: reason,
        date: new Date().toISOString()
    });

});
showToast(`⭐ تمت إضافة ${pointsToAdd} نقاط لـ ${selectedCheckboxes.length} طالبة`);

        localStorage.setItem(
            "mathClasses",
            JSON.stringify(savedClasses)
        );


    selectedCheckboxes.forEach(function (checkbox) {

    const studentId = Number(checkbox.dataset.studentId);

    const student =
        selectedClass.students.find(s => s.id === studentId);

    if (!student) return;

    const studentCard = checkbox.closest(".student-card");

    const pointsDisplay =
        studentCard.querySelector(".student-points strong");

    pointsDisplay.textContent = student.points;
});
    });

});
const customGroupPoints =
    document.getElementById("customGroupPoints");

const addCustomGroupPoints =
    document.getElementById("addCustomGroupPoints");

if (addCustomGroupPoints) {

    addCustomGroupPoints.addEventListener("click", function () {

        const amount = Number(customGroupPoints.value);

        if (!amount || amount <= 0) {
            showToast("⚠️ اكتبي عدد نقاط صحيح أولًا");
            customGroupPoints.focus();
            return;
        }

        const selectedCheckboxes =
            document.querySelectorAll(".student-checkbox:checked");

        if (selectedCheckboxes.length === 0) {
        showToast("⚠️ حددي طالبة واحدة على الأقل أولًا");
            return;
        }

        const selectedClassId =
            Number(localStorage.getItem("selectedClassId"));

        const savedClasses =
            JSON.parse(localStorage.getItem("mathClasses")) || [];

        const selectedClass =
            savedClasses.find(c => c.id === selectedClassId);

        if (!selectedClass) return;
        let reason = pointsReason ? pointsReason.value : "بدون سبب";

if (reason === "other") {
    reason = customReason.value.trim();

    if (reason === "") {
        showToast("⚠️ اكتبي سبب النقاط أولاً");
        customReason.focus();
        return;
    }
}

        selectedCheckboxes.forEach(function (checkbox) {

            const studentId =
                Number(checkbox.dataset.studentId);

            const student =
                selectedClass.students.find(s => s.id === studentId);

            if (!student) return;

            student.points += amount;
if (!student.history) {
    student.history = [];
}

student.history.push({
    id: Date.now(),
    type: "earn",
    amount: amount,
    reason: reason,
    date: new Date().toISOString()
});
            const studentCard =
                checkbox.closest(".student-card");

            const pointsDisplay =
                studentCard.querySelector(".student-points strong");

            pointsDisplay.textContent = student.points;
        });

        localStorage.setItem(
            "mathClasses",
            JSON.stringify(savedClasses)
        );

        customGroupPoints.value = "";
        showToast(`⭐ تمت إضافة ${amount} نقطة للمحددات`);
    });
}
const pointsReason = document.getElementById("pointsReason");
const customReason = document.getElementById("customReason");

if (pointsReason && customReason) {

    pointsReason.addEventListener("change", function () {

        if (pointsReason.value === "other") {
            customReason.style.display = "block";
            customReason.focus();
        } else {
            customReason.style.display = "none";
            customReason.value = "";
        }

    });
}
document.addEventListener("click", function (event) {

    const clickedInsideStudentCard =
        event.target.closest(".student-card");

    const clickedInsideGroupBar =
        event.target.closest(".group-points-bar");

    if (!clickedInsideStudentCard && !clickedInsideGroupBar) {

        const checkboxes =
            document.querySelectorAll(".student-checkbox");

        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        if (selectAllStudents) {
            selectAllStudents.checked = false;
        }
    }
});
// ========================================
// صفحة إدارة الطالبة
// ========================================

const studentPageName =
    document.getElementById("studentPageName");

const studentPagePoints =
    document.getElementById("studentPagePoints");

const studentClassName =
    document.getElementById("studentClassName");


if (studentPageName) {

    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const selectedStudentId =
        Number(localStorage.getItem("selectedStudentId"));

    const savedClasses =
        JSON.parse(
            localStorage.getItem("mathClasses")
        ) || [];


    // البحث عن الفصل
    const selectedClass =
        savedClasses.find(function (classItem) {

            return classItem.id === selectedClassId;

        });


    if (selectedClass) {

        // البحث عن الطالبة داخل الفصل
        const selectedStudent =
            selectedClass.students.find(function (student) {

                return student.id === selectedStudentId;

            });


        if (selectedStudent) {

            studentClassName.textContent =
                selectedClass.name;

            studentPageName.textContent =
                selectedStudent.name;

            studentPagePoints.textContent =
                selectedStudent.points;

        }

    }

}
// ========================================
// إضافة وخصم نقاط الطالبة
// ========================================

const pointsAmount =
    document.getElementById("pointsAmount");

const addPointsBtn =
    document.getElementById("addPointsBtn");

const removePointsBtn =
    document.getElementById("removePointsBtn");


// تعديل رصيد الطالبة
function updateStudentPoints(type) {

    const amount =
        Number(pointsAmount.value);


    // منع الأرقام الفارغة أو غير الصحيحة
    if (!amount || amount <= 0) {

        pointsAmount.focus();
        return;

    }


    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const selectedStudentId =
        Number(localStorage.getItem("selectedStudentId"));


    const savedClasses =
        JSON.parse(
            localStorage.getItem("mathClasses")
        ) || [];


    // إيجاد الفصل
    const classIndex =
        savedClasses.findIndex(function (classItem) {

            return classItem.id === selectedClassId;

        });


    if (classIndex === -1) return;


    // إيجاد الطالبة
    const studentIndex =
        savedClasses[classIndex].students.findIndex(
            function (student) {

                return student.id === selectedStudentId;

            }
        );


    if (studentIndex === -1) return;


    const student =
        savedClasses[classIndex].students[studentIndex];

// إنشاء السجل إذا لم يكن موجودًا
if (!student.history) {
    student.history = [];
}


// إضافة النقاط
if (type === "add") {

    student.points += amount;

    student.history.push({
        id: Date.now(),
        type: "add",
        amount: amount,
        reason: "إضافة يدوية",
        date: new Date().toISOString()
    });

}


// خصم النقاط
if (type === "remove") {

    // ممنوع الرصيد يصير بالسالب
    if (amount > student.points) {

       showToast("⚠️ رصيد الطالبة غير كافٍ لخصم هذا العدد من النقاط");

        return;
    }

    student.points -= amount;

    student.history.push({
        id: Date.now(),
        type: "remove",
        amount: amount,
        reason: "خصم يدوي",
        date: new Date().toISOString()
    });

}

    // حفظ التغيير
    localStorage.setItem(
        "mathClasses",
        JSON.stringify(savedClasses)
    );


    // تحديث الرقم مباشرة
    studentPagePoints.textContent =
        student.points;


    // تنظيف الخانة
    pointsAmount.value = "";

}


// زر إضافة النقاط
if (addPointsBtn) { 

    addPointsBtn.addEventListener("click", function () {

        updateStudentPoints("add");

    });

}


// زر خصم النقاط
if (removePointsBtn) {

    removePointsBtn.addEventListener("click", function () {

        updateStudentPoints("remove");

    });

}
// ==============================
// تعديل اسم الطالبة
// ==============================

const editStudentNameBtn =
    document.getElementById("editStudentNameBtn");

if (editStudentNameBtn) {

    editStudentNameBtn.addEventListener("click", function () {

        const selectedClassId =
            Number(localStorage.getItem("selectedClassId"));

        const selectedStudentId =
            Number(localStorage.getItem("selectedStudentId"));

        const savedClasses =
            JSON.parse(localStorage.getItem("mathClasses")) || [];

        const selectedClass =
            savedClasses.find(function (classItem) {
                return classItem.id === selectedClassId;
            });

        if (!selectedClass) return;

        const selectedStudent =
            selectedClass.students.find(function (student) {
                return student.id === selectedStudentId;
            });

        if (!selectedStudent) return;

        const newName = prompt(
            "اكتبي اسم الطالبة الجديد:",
            selectedStudent.name
        );

        if (newName === null) return;

        const cleanName = newName.trim();

        if (cleanName === "") {
            showToast("⚠️ اكتبي اسم الطالبة");
            return;
        }

        selectedStudent.name = cleanName;

        localStorage.setItem(
            "mathClasses",
            JSON.stringify(savedClasses)
        );

        studentPageName.textContent = cleanName;
    });

}
// ==============================
// حذف الطالبة
// ==============================

const deleteStudentBtn =
    document.getElementById("deleteStudentBtn");

if (deleteStudentBtn) {

    deleteStudentBtn.addEventListener("click", function () {

        const selectedClassId =
            Number(localStorage.getItem("selectedClassId"));

        const selectedStudentId =
            Number(localStorage.getItem("selectedStudentId"));

        const savedClasses =
            JSON.parse(localStorage.getItem("mathClasses")) || [];

        const selectedClass =
            savedClasses.find(function (classItem) {
                return classItem.id === selectedClassId;
            });

        if (!selectedClass) return;

        const selectedStudent =
            selectedClass.students.find(function (student) {
                return student.id === selectedStudentId;
            });

        if (!selectedStudent) return;

        const confirmDelete = confirm(
            `هل أنتِ متأكدة من حذف الطالبة "${selectedStudent.name}"؟`
        );

        if (!confirmDelete) return;

        selectedClass.students =
            selectedClass.students.filter(function (student) {
                return student.id !== selectedStudentId;
            });

        localStorage.setItem(
            "mathClasses",
            JSON.stringify(savedClasses)
        );

        localStorage.removeItem("selectedStudentId");

        window.location.href = "class.html";
    });

}
// ==============================
// صفحة متجر المكافآت
// ==============================
const rewardsManageMode =
 new URLSearchParams(window.location.search).get("mode") === "manage";
const rewardStudentInfo =
    document.querySelector(".reward-student-info");

if (rewardsManageMode && rewardStudentInfo) {
    rewardStudentInfo.style.display = "none";
}
   
const rewardStudentName =
    document.getElementById("rewardStudentName");

const rewardStudentPoints =
    document.getElementById("rewardStudentPoints");

if (rewardStudentName && rewardStudentPoints && !rewardsManageMode) {

    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const selectedStudentId =
        Number(localStorage.getItem("selectedStudentId"));

    const savedClasses =
        JSON.parse(localStorage.getItem("mathClasses")) || [];

    const selectedClass =
        savedClasses.find(function (classItem) {
            return classItem.id === selectedClassId;
        });

    if (selectedClass) {

        const selectedStudent =
            selectedClass.students.find(function (student) {
                return student.id === selectedStudentId;
            });

        if (selectedStudent) {

            rewardStudentName.textContent =
                selectedStudent.name;

            rewardStudentPoints.textContent =
                selectedStudent.points;
        }
    }
}
// ==============================
// بيانات المكافآت
// ==============================

let rewards =
    JSON.parse(localStorage.getItem("mathRewards")) || [];

// مكافآت افتراضية لأول تشغيل فقط
if (localStorage.getItem("mathRewards") === null) {

    rewards = [
        {
            id: 1,
            name: "إعفاء من واجب",
            points: 20,
            icon: "📝"
        },
        {
            id: 2,
            name: "اختيار المقعد",
            points: 30,
            icon: "💺"
        },
        {
            id: 3,
            name: "وقت حر",
            points: 40,
            icon: "🎨"
        }
    ];

    localStorage.setItem(
        "mathRewards",
        JSON.stringify(rewards)
    );
}
// ==============================
// عرض المكافآت في المتجر
// ==============================

const rewardsGrid =
    document.getElementById("rewardsGrid");

function displayRewards() {

    if (!rewardsGrid) return;

    rewardsGrid.innerHTML = "";

        // إذا ما فيه مكافآت
if (rewards.length === 0) {

    rewardsGrid.innerHTML = `
        <div class="empty-rewards">
            <div class="empty-rewards-icon">🎁</div>

            <h3>لا توجد مكافآت حتى الآن</h3>

            <p>أضيفي أول مكافأة ليبدأ متجر الطالبات</p>
        </div>
    `;

    return;
}
 rewards.forEach(function (reward) {
        const rewardCard =
            document.createElement("div");

        rewardCard.className = "reward-card";

        rewardCard.innerHTML = `
            <div class="reward-icon">
                ${reward.icon}
            </div>

            <h3>${reward.name}</h3>

            <div class="reward-price">
                ⭐ ${reward.points} نقطة
            </div>
<div class="reward-actions">

    <button
        type="button"
        class="redeem-reward-btn"
        data-reward-id="${reward.id}"
    >
        استبدال
    </button>

    <button
        type="button"
        class="edit-reward-btn"
        data-reward-id="${reward.id}"
    >
        ✏️ تعديل
    </button>
<button
    type="button"
    class="delete-reward-btn"
    data-reward-id="${reward.id}"
>
    🗑️ حذف
</button>
</div>
        `;

        rewardsGrid.appendChild(rewardCard);
    });
}

displayRewards();
// ==============================
// استبدال المكافآت
// ==============================

if (rewardsGrid) {

    rewardsGrid.addEventListener("click", function (event) {

        const redeemBtn =
            event.target.closest(".redeem-reward-btn");

        if (!redeemBtn) return;

        const rewardId =
            Number(redeemBtn.dataset.rewardId);

        const reward =
            rewards.find(function (item) {
                return item.id === rewardId;
            });

        if (!reward) return;


        // جلب الفصل والطالبة
        const selectedClassId =
            Number(localStorage.getItem("selectedClassId"));

        const selectedStudentId =
            Number(localStorage.getItem("selectedStudentId"));

        const savedClasses =
            JSON.parse(localStorage.getItem("mathClasses")) || [];

        const selectedClass =
            savedClasses.find(function (classItem) {
                return classItem.id === selectedClassId;
            });

        if (!selectedClass) return;

        const selectedStudent =
            selectedClass.students.find(function (student) {
                return student.id === selectedStudentId;
            });

        if (!selectedStudent) return;


        // التأكد من الرصيد
        if (selectedStudent.points < reward.points) {

           showToast(
    `⚠️ الرصيد غير كافٍ — لديها ${selectedStudent.points} نقطة والمكافأة تحتاج ${reward.points}`
);

            return;
        }


        // تأكيد الاستبدال
        const confirmRedeem = confirm(
            `استبدال "${reward.name}" مقابل ${reward.points} نقطة؟`
        );

        if (!confirmRedeem) return;


        // خصم النقاط
        selectedStudent.points -= reward.points;


        // إنشاء سجل المكافآت إذا لم يكن موجودًا
        if (!selectedStudent.rewards) {
            selectedStudent.rewards = [];
        }

        // حفظ عملية الاستبدال
        selectedStudent.rewards.push({
            id: Date.now(),
            rewardId: reward.id,
            name: reward.name,
            points: reward.points,
            date: new Date().toISOString()
        });


        // إضافة العملية إلى السجل العام للطالبة
        if (!selectedStudent.history) {
            selectedStudent.history = [];
        }

        selectedStudent.history.push({
            id: Date.now() + 1,
            type: "redeem",
            amount: reward.points,
            reason: reward.name,
            date: new Date().toISOString()
        });


        // حفظ البيانات
        localStorage.setItem(
            "mathClasses",
            JSON.stringify(savedClasses)
        );


        // تحديث الرصيد في الشاشة
        rewardStudentPoints.textContent =
            selectedStudent.points;

showToast(`🎉 تم استبدال "${reward.name}" بنجاح`);

    });

}
// =========================
// نافذة إضافة مكافأة
// =========================

const addRewardBtn = document.getElementById("addRewardBtn");
const rewardModal = document.getElementById("rewardModal");
const closeRewardModal = document.getElementById("closeRewardModal");

if (addRewardBtn && rewardModal) {
    addRewardBtn.addEventListener("click", function () {
        rewardModal.classList.add("active");
    });
}

if (closeRewardModal && rewardModal) {
    closeRewardModal.addEventListener("click", function () {
        rewardModal.classList.remove("active");
    });
}
// =========================
// حفظ مكافأة جديدة
// =========================

const saveRewardBtn = document.getElementById("saveRewardBtn");
const rewardNameInput = document.getElementById("rewardName");
const rewardPointsInput = document.getElementById("rewardPoints");

if (saveRewardBtn) {

    saveRewardBtn.addEventListener("click", function () {

        const name = rewardNameInput.value.trim();
        const points = Number(rewardPointsInput.value);

        if (name === "") {
            showToast("⚠️ اكتبي اسم المكافأة");
            rewardNameInput.focus();
            return;
        }

        if (!points || points <= 0) {
            showToast("⚠️ اكتبي سعر صحيح المكافأة");
            rewardPointsInput.focus();
            return;
        }
if (editingRewardId !== null) {

    const reward =
        rewards.find(function (item) {
            return item.id === editingRewardId;
        });

    if (!reward) return;

    reward.name = name;
    reward.points = points;

    editingRewardId = null;

} else {

    const newReward = {
        id: Date.now(),
        name: name,
        points: points,
        icon: "🎁"
    };

    rewards.push(newReward);
}

        localStorage.setItem(
            "mathRewards",
            JSON.stringify(rewards)
        );

        displayRewards();

        rewardNameInput.value = "";
        rewardPointsInput.value = "";

        rewardModal.classList.remove("active");
    });

}
// =========================
// تعديل المكافأة
// =========================

const rewardModalTitle =
    document.getElementById("rewardModalTitle");

let editingRewardId = null;

if (rewardsGrid) {

    rewardsGrid.addEventListener("click", function (event) {

        const editBtn =
            event.target.closest(".edit-reward-btn");

        if (!editBtn) return;

        const rewardId =
            Number(editBtn.dataset.rewardId);

        const reward =
            rewards.find(function (item) {
                return item.id === rewardId;
            });

        if (!reward) return;

        editingRewardId = rewardId;

        rewardNameInput.value = reward.name;
        rewardPointsInput.value = reward.points;

        rewardModalTitle.textContent =
            "✏️ تعديل المكافأة";

        saveRewardBtn.textContent =
            "حفظ التعديلات";

        rewardModal.classList.add("active");
    });

}
// =========================
// حذف المكافأة
// =========================

if (rewardsGrid) {

    rewardsGrid.addEventListener("click", function (event) {

        const deleteBtn =
            event.target.closest(".delete-reward-btn");

        if (!deleteBtn) return;

        const rewardId =
            Number(deleteBtn.dataset.rewardId);

        const reward =
            rewards.find(function (item) {
                return item.id === rewardId;
            });

        if (!reward) return;

        const confirmed = confirm(
            `هل أنتِ متأكدة من حذف مكافأة "${reward.name}"؟`
        );

        if (!confirmed) return;

        rewards = rewards.filter(function (item) {
            return item.id !== rewardId;
        });

        localStorage.setItem(
            "mathRewards",
            JSON.stringify(rewards)
        );

        displayRewards();
    });

}

// ================================
// عرض سجل الطالبة
// ================================

const studentHistoryList =
    document.getElementById("studentHistoryList");

const emptyStudentHistory =
    document.getElementById("emptyStudentHistory");


function displayStudentHistory() {

    // إذا مو صفحة الطالبة، ما نسوي شيء
    if (!studentHistoryList) return;


    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const selectedStudentId =
        Number(localStorage.getItem("selectedStudentId"));

    const savedClasses =
        JSON.parse(localStorage.getItem("mathClasses")) || [];


    const selectedClass =
        savedClasses.find(function (classItem) {
            return classItem.id === selectedClassId;
        });


    if (!selectedClass) return;


    const selectedStudent =
        selectedClass.students.find(function (student) {
            return student.id === selectedStudentId;
        });


    if (!selectedStudent) return;


    const history = selectedStudent.history || [];

    studentHistoryList.innerHTML = "";


    // إذا ما فيه سجل
    if (history.length === 0) {

        emptyStudentHistory.style.display = "block";

        return;
    }


    emptyStudentHistory.style.display = "none";


    // الأحدث يظهر أول
    [...history].reverse().forEach(function (item) {

        const historyItem =
            document.createElement("div");

        historyItem.className =
            "student-history-item";


        let operationName = "عملية نقاط";
        let sign = "";


        if (item.type === "add" || item.type === "earn") {
            operationName = "إضافة نقاط";
            sign = "+";
        }


        if (item.type === "remove") {
            operationName = "خصم نقاط";
            sign = "-";
        }


        if (item.type === "redeem") {
            operationName = "استبدال مكافأة";
            sign = "-";
        }


        const operationDate =
            new Date(item.date).toLocaleString(
                "ar-SA-u-ca-gregory",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );


        historyItem.innerHTML = `
            <div class="history-info">

                <strong>${operationName}</strong>

                <span>
                    ${item.reason || "بدون سبب"}
                </span>

                <small>
                    ${operationDate}
                </small>

            </div>

            <div class="history-points">
                ${sign}${item.amount} نقطة
            </div>
        `;


        studentHistoryList.appendChild(historyItem);

    });

}


displayStudentHistory();
// ================================
// عرض سجل الفصل العام
// ================================

const classHistoryList =
    document.getElementById("classHistoryList");

const emptyClassHistory =
    document.getElementById("emptyClassHistory");


function displayClassHistory() {

    // إذا مو صفحة الفصل، ما نسوي شيء
    if (!classHistoryList) return;


    const selectedClassId =
        Number(localStorage.getItem("selectedClassId"));

    const savedClasses =
        JSON.parse(localStorage.getItem("mathClasses")) || [];


    const selectedClass =
        savedClasses.find(function (classItem) {
            return classItem.id === selectedClassId;
        });


    if (!selectedClass) return;


    // نجمع سجلات جميع طالبات الفصل
    let allHistory = [];


    selectedClass.students.forEach(function (student) {

        const studentHistory = student.history || [];

        studentHistory.forEach(function (item) {

            allHistory.push({
                ...item,
                studentName: student.name
            });

        });

    });


    // ترتيب العمليات من الأحدث إلى الأقدم
    allHistory.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });


    classHistoryList.innerHTML = "";


    // إذا ما فيه عمليات
    if (allHistory.length === 0) {

        emptyClassHistory.style.display = "block";

        return;
    }


    emptyClassHistory.style.display = "none";


    allHistory.forEach(function (item) {

        const historyItem =
            document.createElement("div");

        historyItem.className =
            "class-history-item";


        let operationName = "عملية نقاط";
        let sign = "";


        if (item.type === "add" || item.type === "earn") {
            operationName = "إضافة نقاط";
            sign = "+";
        }


        if (item.type === "remove") {
            operationName = "خصم نقاط";
            sign = "-";
        }


        if (item.type === "redeem") {
            operationName = "استبدال مكافأة";
            sign = "-";
        }


        const operationDate =
            new Date(item.date).toLocaleString(
                "ar-SA-u-ca-gregory",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );


        historyItem.innerHTML = `
            <div class="class-history-info">

                <strong>${item.studentName}</strong>

                <span>
                    ${operationName} • ${item.reason || "بدون سبب"}
                </span>

                <small>
                    ${operationDate}
                </small>

            </div>

            <div class="class-history-points">
                ${sign}${item.amount} نقطة
            </div>
        `;


        classHistoryList.appendChild(historyItem);

    });

}


displayClassHistory();

// ================================
// تصدير نسخة احتياطية
// ================================

const exportBackupBtn =
    document.getElementById("exportBackupBtn");

if (exportBackupBtn) {

    exportBackupBtn.addEventListener("click", function () {

        // جمع بيانات الموقع
        const backupData = {

            classes:
                JSON.parse(
                    localStorage.getItem("mathClasses")
                ) || [],

            rewards:
                JSON.parse(
                    localStorage.getItem("mathRewards")
                ) || [],

            backupDate:
                new Date().toISOString()
        };


        // تحويل البيانات إلى ملف JSON
        const backupFile = new Blob(
            [JSON.stringify(backupData, null, 2)],
            { type: "application/json" }
        );


        // إنشاء رابط تحميل مؤقت
        const downloadUrl =
            URL.createObjectURL(backupFile);

        const downloadLink =
            document.createElement("a");

        downloadLink.href = downloadUrl;

        downloadLink.download =
            "math-lab-backup.json";


        // تنزيل الملف
        document.body.appendChild(downloadLink);

        downloadLink.click();

        downloadLink.remove();

        URL.revokeObjectURL(downloadUrl);


      showToast("✅ تم تصدير النسخة الاحتياطية بنجاح");

    });

}
// ================================
// اختيار ملف النسخة الاحتياطية
// ================================

const importBackupBtn =
    document.getElementById("importBackupBtn");

const backupFileInput =
    document.getElementById("backupFileInput");


if (importBackupBtn && backupFileInput) {

    importBackupBtn.addEventListener("click", function () {

        backupFileInput.click();

    });

}
// ================================
// قراءة واستعادة النسخة الاحتياطية
// ================================

if (backupFileInput) {

    backupFileInput.addEventListener("change", function (event) {

        const selectedFile = event.target.files[0];

        if (!selectedFile) return;


        const reader = new FileReader();


        reader.onload = function (event) {

            try {

                const backupData =
                    JSON.parse(event.target.result);


                // التأكد أن الملف يحتوي على البيانات المطلوبة
                if (
                    !Array.isArray(backupData.classes) ||
                    !Array.isArray(backupData.rewards)
                ) {

                    showToast("❌ هذا الملف ليس نسخة احتياطية صحيحة");

                    backupFileInput.value = "";

                    return;
                }


                // تأكيد قبل استبدال البيانات الحالية
                const confirmRestore = confirm(
                    "سيتم استبدال البيانات الحالية بالنسخة الاحتياطية.\n\nهل أنتِ متأكدة؟"
                );


                if (!confirmRestore) {

                    backupFileInput.value = "";

                    return;
                }


                // استعادة الفصول والطالبات والنقاط والسجلات
                localStorage.setItem(
                    "mathClasses",
                    JSON.stringify(backupData.classes)
                );


                // استعادة المكافآت
                localStorage.setItem(
                    "mathRewards",
                    JSON.stringify(backupData.rewards)
                );


                showToast("✅ تمت استعادة النسخة الاحتياطية بنجاح");


                // تحديث الصفحة لإظهار البيانات المستعادة
                location.reload();

            }

            catch (error) {

                showToast("❌ تعذر قراءة ملف النسخة الاحتياطية");

            }


            // تنظيف اختيار الملف
            backupFileInput.value = "";

        };


        reader.readAsText(selectedFile);

    });

}
// =========================
// رسائل الموقع Toast
// =========================

function showToast(message) {

    let toast = document.querySelector(".toast-message");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast-message";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast.hideTimer);

    toast.hideTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}
// ==================================
// منع الضغط المتكرر على أزرار العمليات
// ==================================

document.addEventListener("click", function (event) {

    const button = event.target.closest(
        ".quick-point-btn, .group-point-btn, #addCustomGroupPoints"
    );

    if (!button) return;

    if (button.dataset.clickLocked === "true") {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
    }

    button.dataset.clickLocked = "true";

    setTimeout(function () {
        button.dataset.clickLocked = "false";
    }, 700);

}, true);
// ==========================================
// تشغيل الإجراء الأساسي بزر Enter
// ==========================================

document.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") return;

    const activeElement = document.activeElement;

    // لا نشغّل Enter إذا المستخدم واقف على زر
    // حتى لا ينفذ الزر مرتين
    if (activeElement && activeElement.tagName === "BUTTON") {
        return;
    }

    // -------------------------
    // نافذة إضافة طالبة
    // -------------------------
    const studentModal = document.getElementById("studentModal");

    if (
        studentModal &&
        studentModal.classList.contains("active") &&
        document.getElementById("studentNameInput") === activeElement
    ) {
        event.preventDefault();

        const btn = document.getElementById("saveStudentBtn");

        if (btn) {
            btn.click();
        }

        return;
    }


    // -------------------------
    // العدد المخصص - وضع الحصة
    // -------------------------
    const customGroupPoints =
        document.getElementById("customGroupPoints");

    if (
        customGroupPoints &&
        activeElement === customGroupPoints
    ) {
        event.preventDefault();

        const btn =
            document.getElementById("addCustomGroupPoints");

        if (btn) {
            btn.click();
        }

        return;
    }


    // -------------------------
    // السبب المخصص - وضع الحصة
    // -------------------------
    const customReason =
        document.getElementById("customReason");

    if (
        customReason &&
        activeElement === customReason
    ) {
        event.preventDefault();

        // ينقل المؤشر لخانة عدد النقاط
        if (customGroupPoints) {
            customGroupPoints.focus();
        }

        return;
    }


    // -------------------------
    // نافذة إضافة مكافأة
    // -------------------------
    const rewardModal =
        document.getElementById("rewardModal");

    if (
        rewardModal &&
        rewardModal.classList.contains("active")
    ) {

        const rewardName =
            document.getElementById("rewardNameInput");

        const rewardPoints =
            document.getElementById("rewardPointsInput");

        const saveReward =
            document.getElementById("saveRewardBtn");

        if (activeElement === rewardName) {
            event.preventDefault();

            if (rewardPoints) {
                rewardPoints.focus();
            }

            return;
        }

        if (activeElement === rewardPoints) {
            event.preventDefault();

            if (saveReward) {
                saveReward.click();
            }

            return;
        }
    }


    // -------------------------
    // نافذة إضافة فصل
    // -------------------------
    const classModal =
        document.getElementById("classModal");

    if (
        classModal &&
        classModal.classList.contains("active")
    ) {

        const classNameInput =
            document.getElementById("classNameInput");

        const saveClassBtn =
            document.getElementById("saveClassBtn");

        if (activeElement === classNameInput) {
            event.preventDefault();

            if (saveClassBtn) {
                saveClassBtn.click();
            }

            return;
        }
    }

});
// ========================================
// نجمة الشهر - حساب أعلى رصيد
// ========================================

const monthStarBtn =
    document.getElementById("monthStarBtn");

if (monthStarBtn) {

    monthStarBtn.addEventListener("click", function () {

        const monthStarClassId =
            Number(localStorage.getItem("selectedClassId"));

        const monthStarClasses =
            JSON.parse(localStorage.getItem("mathClasses")) || [];

        const monthStarClass =
            monthStarClasses.find(function (classItem) {
                return classItem.id === monthStarClassId;
            });

        // التأكد من وجود الفصل
        if (!monthStarClass) return;

        // إذا الفصل ما فيه طالبات
        if (monthStarClass.students.length === 0) {

            showToast("⭐ لا توجد طالبات في الفصل بعد");

            return;
        }

        // معرفة أعلى رصيد
        const highestPoints =
                Math.max(
                ...monthStarClass.students.map(function (student) {
                    return Number(student.points) || 0;
                })
            );

        // إذا كل الأرصدة صفر
        if (highestPoints === 0) {

            showToast(
                "⭐ لا توجد نجمة للشهر بعد، أضيفي نقاطًا للطالبات أولًا"
            );

            return;
        }

        console.log("أعلى رصيد:", highestPoints);
        // معرفة كل الطالبات المتعادلات في أعلى رصيد
const monthStarWinners =
    monthStarClass.students.filter(function (student) {

        return (Number(student.points) || 0) === highestPoints;

    });

console.log("نجمة/نجمات الشهر:", monthStarWinners);
// ========================================
// تشغيل لعبة نجمة الشهر
// ========================================

const monthStarGame =
    document.getElementById("monthStarGame");

const starCountdown =
    document.getElementById("starCountdown");

const starWinnerResult =
    document.getElementById("starWinnerResult");

const starGameBox =
    document.querySelector(".month-star-game-box");

if (
    monthStarGame &&
    starCountdown &&
    starWinnerResult &&
    starGameBox
) {

    // فتح شاشة اللعبة
    monthStarGame.classList.add("active");

    // إعادة الشاشة لحالة البداية
    starGameBox.classList.remove("result-mode");

    starWinnerResult.classList.remove("active");
    starWinnerResult.innerHTML = "";

    starCountdown.style.display = "flex";
// ==============================
// سحب أسماء الطالبات
// ==============================

const studentNames = monthStarClass.students.map(function (student) {
    return student.name;
});

let shuffleStep = 0;
const totalShuffleSteps = 28;

// =====================================
// صوت نجمة الشهر
// AudioContext واحد لجميع الأصوات
// =====================================

const StarAudioContext =
    window.AudioContext || window.webkitAudioContext;

const starAudioContext =
    new StarAudioContext();


// =====================================
// صوت تقليب أسماء الطالبات
// =====================================

function playShuffleTick() {

    if (starAudioContext.state === "suspended") {
        starAudioContext.resume();
    }

    const oscillator =
        starAudioContext.createOscillator();

    const gain =
        starAudioContext.createGain();

    oscillator.connect(gain);
    gain.connect(starAudioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = 700;

    const now = starAudioContext.currentTime;

    gain.gain.setValueAtTime(
        0.05,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.05
    );

    oscillator.start(now);
    oscillator.stop(now + 0.05);
}


// =====================================
// جرس إعلان نجمة الشهر
// =====================================

function playWinnerBell() {

    if (starAudioContext.state === "suspended") {
        starAudioContext.resume();
    }

    const notes = [
        { frequency: 659, delay: 0 },
        { frequency: 784, delay: 0.16 },
        { frequency: 1047, delay: 0.32 }
    ];

    notes.forEach(function (note) {

        const oscillator =
            starAudioContext.createOscillator();

        const gain =
            starAudioContext.createGain();

        oscillator.connect(gain);
        gain.connect(starAudioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value =
            note.frequency;

        const startTime =
            starAudioContext.currentTime +
            note.delay;

        gain.gain.setValueAtTime(
            0.001,
            startTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.12,
            startTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + 0.7
        );

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.7);
    });
}

function shuffleStudentNames() {

    const randomIndex =
        Math.floor(Math.random() * studentNames.length);

    starCountdown.textContent =
        studentNames[randomIndex];
playShuffleTick();
    shuffleStep++;

    // انتهى السحب
    if (shuffleStep >= totalShuffleSteps) {

        starCountdown.style.display = "none";

        showMonthStarWinner();

        return;
    }

    // يبدأ سريع ثم يبطؤ تدريجيًا
    let delay;

    if (shuffleStep < 16) {
        delay = 65;
    } else if (shuffleStep < 22) {
        delay = 120;
    } else if (shuffleStep < 26) {
        delay = 220;
    } else {
        delay = 380;
    }

    setTimeout(shuffleStudentNames, delay);
}

shuffleStudentNames();


// ==============================
// احتفال نجمة الشهر
// ==============================

function launchStarConfetti() {

    const colors = [
        "#d9ad5b",
        "#e9c77b",
        "#d99aaa",
        "#f4dce2",
        "#fff1b8"
    ];

    for (let i = 0; i < 55; i++) {

        const piece =
            document.createElement("span");

        piece.classList.add("star-confetti");

        // بعض القطع تكون نجوم ⭐
        const isStar =
            Math.random() < 0.25;

        if (isStar) {
            piece.classList.add("star-shape");
            piece.textContent = "★";
        } else {
            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ];
        }

        // مكان عشوائي على عرض الشاشة
        piece.style.left =
            Math.random() * 100 + "vw";

        // تأخير بسيط حتى ما تنزل كلها مع بعض
        piece.style.animationDelay =
            Math.random() * 0.7 + "s";

        // اختلاف بسيط في السرعة
        piece.style.animationDuration =
            2.2 + Math.random() * 1.5 + "s";

        document.body.appendChild(piece);

        // تنظيف العنصر بعد انتهاء الاحتفال
        setTimeout(function () {
            piece.remove();
        }, 4500);
    }
}
function showMonthStarWinner() {
   playWinnerBell();
   launchStarConfetti();
        const winnersNames =
    monthStarWinners
        .map(function (student) {

            return `
                <div class="star-winner-name">

                    ${student.name}

                    <button
                        type="button"
                        class="view-certificate-btn"
                        data-student-id="${student.id}"
                    >
                        🏆 عرض الشهادة
                    </button>

                </div>
            `;

        })
        .join("");

        const winnerTitle =
            monthStarWinners.length > 1
                ? "نجمات الشهر"
                : "نجمة الشهر";

        starWinnerResult.innerHTML = `
            <div class="star-winner-title">
                ${winnerTitle}
            </div>

            ${winnersNames}

            <div class="star-winner-points">
                ⭐ ${highestPoints} نقطة
            </div>
        `;

        starGameBox.classList.add(
            "result-mode"
        );

        starWinnerResult.classList.add(
            "active"
        );
    }
}
});
}
// إغلاق شاشة لعبة نجمة الشهر
const closeMonthStarGame =
    document.getElementById("closeMonthStarGame");

if (closeMonthStarGame) {

    closeMonthStarGame.addEventListener("click", function () {

        const monthStarGame =
            document.getElementById("monthStarGame");

        if (monthStarGame) {
            monthStarGame.classList.remove("active");
        }

    });

}
// ========================================
// شهادة نجمة الشهر
// ========================================

const starCertificateModal =
    document.getElementById(
        "starCertificateModal"
    );

const closeStarCertificate =
    document.getElementById(
        "closeStarCertificate"
    );

const printStarCertificate =
    document.getElementById(
        "printStarCertificate"
    );

const certificateStudentName =
    document.getElementById(
        "certificateStudentName"
    );

const certificateClassName =
    document.getElementById(
        "certificateClassName"
    );

const certificatePoints =
    document.getElementById(
        "certificatePoints"
    );


// ========================================
// فتح شهادة الفائزة
// ========================================

document.addEventListener(
    "click",
    function (event) {

        const certificateButton =
            event.target.closest(
                ".view-certificate-btn"
            );

        if (!certificateButton) return;


        const studentId =
            Number(
                certificateButton.dataset.studentId
            );


        const classId =
            Number(
                localStorage.getItem(
                    "selectedClassId"
                )
            );


        const classes =
            JSON.parse(
                localStorage.getItem(
                    "mathClasses"
                )
            ) || [];


        const selectedClass =
            classes.find(
                function (classItem) {

                    return (
                        classItem.id === classId
                    );

                }
            );


        if (!selectedClass) {
            showToast(
                "تعذر العثور على الفصل"
            );

            return;
        }


        const selectedStudent =
            selectedClass.students.find(
                function (student) {

                    return (
                        student.id === studentId
                    );

                }
            );


        if (!selectedStudent) {
            showToast(
                "تعذر العثور على الطالبة"
            );

            return;
        }


        // تعبئة بيانات الشهادة

        certificateStudentName.textContent =
            selectedStudent.name;

        certificateClassName.textContent =
            selectedClass.name;

        certificatePoints.textContent =
            `${Number(selectedStudent.points) || 0} نقطة`;


        // فتح الشهادة

        if (starCertificateModal) {

            starCertificateModal.classList.add(
                "active"
            );

        }

    }
);


// ========================================
// إغلاق الشهادة
// ========================================

if (closeStarCertificate) {

    closeStarCertificate.addEventListener(
        "click",
        function () {

            if (starCertificateModal) {

                starCertificateModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ========================================
// طباعة / حفظ PDF
// ========================================

if (printStarCertificate) {

    printStarCertificate.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}
const backToStudentBtn = document.getElementById("backToStudentBtn");

if (backToStudentBtn) {
    const params = new URLSearchParams(window.location.search);

    if (params.get("mode") === "manage") {
        backToStudentBtn.style.display = "none";
    }
}