// Student Life Dashboard SPA Logic
(() => {
  const STORAGE_KEYS = {
    theme: "sld_theme",
    language: "sld_language",
    profile: "sld_profile",
    tasks: "sld_tasks",
    goals: "sld_goals",
    notes: "sld_notes",
    sessions: "sld_sessions",
    wellbeing: "sld_wellbeing",
    exam: "sld_exam",
    pomodoro: "sld_pomodoro"
  };

  const POMODORO_DURATION_SECONDS = 25 * 60;

  const DAYS = [
    { value: "Monday", i18nKey: "dayMonday" },
    { value: "Tuesday", i18nKey: "dayTuesday" },
    { value: "Wednesday", i18nKey: "dayWednesday" },
    { value: "Thursday", i18nKey: "dayThursday" },
    { value: "Friday", i18nKey: "dayFriday" },
    { value: "Saturday", i18nKey: "daySaturday" },
    { value: "Sunday", i18nKey: "daySunday" }
  ];

  const TIME_SLOTS = ["07:00", "10:00", "13:00", "16:00", "19:00"];

  const SUBJECT_PROGRESS = [
    { key: "subjectMathematics", progress: 88 },
    { key: "subjectProgramming", progress: 81 },
    { key: "subjectPhysics", progress: 73 },
    { key: "subjectEnglish", progress: 92 }
  ];

  const I18N = {
    en: {
      studentRole: "Student",
      editName: "Edit Name",
      changePhoto: "Change Photo",
      menuDashboard: "Dashboard",
      menuTasks: "Tasks",
      menuSchedule: "Schedule",
      menuGoals: "Goals",
      menuNotes: "Notes",
      menuWellbeing: "Wellbeing",
      language: "Language",
      darkMode: "Dark Mode",
      productivityHub: "Productivity Hub",
      todayDoneTasks: "Today's Done Tasks",
      deadlinesIn2Days: "Deadlines in 2 Days",
      academicOverview: "Academic Overview",
      currentGpa: "Current GPA",
      semesterGoal: "Semester Goal",
      upcomingExam: "Upcoming Exam",
      subjectProgress: "Subject Progress",
      attendance: "Attendance",
      attendanceTip: "Keep attendance above 90% for scholarship safety.",
      taskManager: "Task Manager",
      addTask: "Add Task",
      statusTodo: "To Do",
      statusInProgress: "In Progress",
      statusDone: "Done",
      schedulePlanner: "Schedule / Study Planner",
      addStudySession: "Add Study Session",
      weeklyTimetable: "Weekly Timetable",
      pomodoroTimer: "Pomodoro Timer",
      pomodoroDesc: "Focus for 25 minutes. Take a short break after each cycle.",
      start: "Start",
      pause: "Pause",
      reset: "Reset",
      goalsTracker: "Goals Tracker",
      addGoal: "Add Goal",
      shortTermGoals: "Short-term Goals",
      longTermGoals: "Long-term Goals",
      notesResources: "Notes & Resources",
      quickNote: "Quick Note",
      saveNote: "Save Note",
      savedNotes: "Saved Notes",
      wellbeingTracker: "Wellbeing Tracker",
      mood: "Mood",
      hydration: "Hydration",
      waterToday: "Glasses of water today",
      sleepHours: "Sleep Hours",
      saveSleep: "Save Sleep",
      dailySummary: "Daily Summary",
      quickNotePlaceholder: "Write a quick note about lecture, link, or revision point...",
      sleepPlaceholder: "Enter hours slept",
      modalAddTask: "Add New Task",
      taskTitlePlaceholder: "Task title",
      taskSubjectPlaceholder: "Subject name",
      saveTask: "Save Task",
      modalAddGoal: "Add New Goal",
      goalTitlePlaceholder: "Goal title",
      shortTermOption: "Short-term",
      longTermOption: "Long-term",
      goalProgressPlaceholder: "Progress (%)",
      saveGoal: "Save Goal",
      modalAddSession: "Add Study Session",
      sessionTopicPlaceholder: "Topic / Subject",
      sessionDurationPlaceholder: "Duration (min)",
      saveSession: "Save Session",
      welcomeBack: "Welcome back, {name}",
      promptEnterName: "Enter student name",
      examUnavailable: "Exam date unavailable",
      examStartsToday: "{exam} starts today",
      examIn: "{exam} in {days}d {hours}h",
      urgentDeadline: "2-day deadline",
      minutesUnit: "{value} min",
      noShortGoals: "No short-term goals yet.",
      noLongGoals: "No long-term goals yet.",
      noNotesYet: "No notes yet. Save your first quick idea.",
      moodNotSelected: "not selected",
      sleepNotLogged: "not logged",
      wellbeingSummary:
        "Mood: {mood}. Water: {water} glasses. Sleep: {sleep}. Keep the balance to sustain better focus.",
      pomodoroDoneAlert: "Pomodoro complete. Take a short break.",
      noDate: "No date",
      timeLabel: "Time",
      emptySlot: "-",
      dayMonday: "Monday",
      dayTuesday: "Tuesday",
      dayWednesday: "Wednesday",
      dayThursday: "Thursday",
      dayFriday: "Friday",
      daySaturday: "Saturday",
      daySunday: "Sunday",
      subjectMathematics: "Mathematics",
      subjectProgramming: "Programming",
      subjectPhysics: "Physics",
      subjectEnglish: "English",
      avatarTooLarge: "Image is too large. Please select a file under 2MB.",
      quotes: [
        "Small daily progress creates extraordinary semester results.",
        "Consistency beats intensity when exams are near.",
        "Your focus today builds your freedom tomorrow.",
        "One well-planned study block can change your week.",
        "Discipline is the shortcut to confidence.",
        "Show up for your goals, even on low-energy days.",
        "Finish what matters first, then optimize.",
        "Productivity is about priorities, not pressure."
      ]
    },
    ru: {
      studentRole: "Студент",
      editName: "Изменить имя",
      changePhoto: "Сменить фото",
      menuDashboard: "Панель",
      menuTasks: "Задачи",
      menuSchedule: "Расписание",
      menuGoals: "Цели",
      menuNotes: "Заметки",
      menuWellbeing: "Самочувствие",
      language: "Язык",
      darkMode: "Темная тема",
      productivityHub: "Центр продуктивности",
      todayDoneTasks: "Выполнено сегодня",
      deadlinesIn2Days: "Дедлайны за 2 дня",
      academicOverview: "Учебный обзор",
      currentGpa: "Текущий GPA",
      semesterGoal: "Цель семестра",
      upcomingExam: "Ближайший экзамен",
      subjectProgress: "Прогресс по предметам",
      attendance: "Посещаемость",
      attendanceTip: "Держите посещаемость выше 90% для сохранения стипендии.",
      taskManager: "Менеджер задач",
      addTask: "Добавить задачу",
      statusTodo: "Сделать",
      statusInProgress: "В процессе",
      statusDone: "Готово",
      schedulePlanner: "Расписание / План учебы",
      addStudySession: "Добавить сессию",
      weeklyTimetable: "Недельный график",
      pomodoroTimer: "Таймер Помодоро",
      pomodoroDesc: "Сфокусируйтесь на 25 минут. После цикла сделайте короткий перерыв.",
      start: "Старт",
      pause: "Пауза",
      reset: "Сброс",
      goalsTracker: "Трекер целей",
      addGoal: "Добавить цель",
      shortTermGoals: "Краткосрочные цели",
      longTermGoals: "Долгосрочные цели",
      notesResources: "Заметки и ресурсы",
      quickNote: "Быстрая заметка",
      saveNote: "Сохранить",
      savedNotes: "Сохраненные заметки",
      wellbeingTracker: "Трекер самочувствия",
      mood: "Настроение",
      hydration: "Вода",
      waterToday: "Стаканов воды сегодня",
      sleepHours: "Часы сна",
      saveSleep: "Сохранить сон",
      dailySummary: "Сводка за день",
      quickNotePlaceholder: "Быстро запишите мысль, ссылку или пункт для повторения...",
      sleepPlaceholder: "Введите часы сна",
      modalAddTask: "Добавить новую задачу",
      taskTitlePlaceholder: "Название задачи",
      taskSubjectPlaceholder: "Предмет",
      saveTask: "Сохранить задачу",
      modalAddGoal: "Добавить новую цель",
      goalTitlePlaceholder: "Название цели",
      shortTermOption: "Краткосрочная",
      longTermOption: "Долгосрочная",
      goalProgressPlaceholder: "Прогресс (%)",
      saveGoal: "Сохранить цель",
      modalAddSession: "Добавить учебную сессию",
      sessionTopicPlaceholder: "Тема / Предмет",
      sessionDurationPlaceholder: "Длительность (мин)",
      saveSession: "Сохранить сессию",
      welcomeBack: "С возвращением, {name}",
      promptEnterName: "Введите имя студента",
      examUnavailable: "Дата экзамена недоступна",
      examStartsToday: "{exam} начинается сегодня",
      examIn: "{exam} через {days}д {hours}ч",
      urgentDeadline: "дедлайн 2 дня",
      minutesUnit: "{value} мин",
      noShortGoals: "Пока нет краткосрочных целей.",
      noLongGoals: "Пока нет долгосрочных целей.",
      noNotesYet: "Заметок пока нет. Сохраните первую идею.",
      moodNotSelected: "не выбрано",
      sleepNotLogged: "не указано",
      wellbeingSummary:
        "Настроение: {mood}. Вода: {water} стаканов. Сон: {sleep}. Баланс помогает держать фокус.",
      pomodoroDoneAlert: "Помодоро завершено. Сделайте короткий перерыв.",
      noDate: "Без даты",
      timeLabel: "Время",
      emptySlot: "-",
      dayMonday: "Понедельник",
      dayTuesday: "Вторник",
      dayWednesday: "Среда",
      dayThursday: "Четверг",
      dayFriday: "Пятница",
      daySaturday: "Суббота",
      daySunday: "Воскресенье",
      subjectMathematics: "Математика",
      subjectProgramming: "Программирование",
      subjectPhysics: "Физика",
      subjectEnglish: "Английский",
      avatarTooLarge: "Файл слишком большой. Выберите изображение меньше 2MB.",
      quotes: [
        "Маленький прогресс каждый день дает большой результат в семестре.",
        "Стабильность важнее всплесков активности перед экзаменом.",
        "Ваш фокус сегодня строит свободу завтра.",
        "Один хорошо спланированный блок учебы меняет всю неделю.",
        "Дисциплина - короткий путь к уверенности.",
        "Поддерживайте цели даже в дни с низкой энергией.",
        "Сначала закрывайте важное, потом оптимизируйте.",
        "Продуктивность - это про приоритеты, а не давление."
      ]
    },
    uz: {
      studentRole: "Talaba",
      editName: "Ismni o'zgartirish",
      changePhoto: "Rasmni almashtirish",
      menuDashboard: "Dashboard",
      menuTasks: "Vazifalar",
      menuSchedule: "Jadval",
      menuGoals: "Maqsadlar",
      menuNotes: "Eslatmalar",
      menuWellbeing: "Holat",
      language: "Til",
      darkMode: "Tungi rejim",
      productivityHub: "Produktivlik markazi",
      todayDoneTasks: "Bugun bajarilganlar",
      deadlinesIn2Days: "2 kunlik deadline",
      academicOverview: "Akademik ko'rinish",
      currentGpa: "Joriy GPA",
      semesterGoal: "Semestr maqsadi",
      upcomingExam: "Yaqin imtihon",
      subjectProgress: "Fanlar progressi",
      attendance: "Davomat",
      attendanceTip: "Stipendiya xavfsizligi uchun davomatni 90% dan yuqori ushlang.",
      taskManager: "Vazifalar boshqaruvi",
      addTask: "Vazifa qo'shish",
      statusTodo: "Qilish kerak",
      statusInProgress: "Jarayonda",
      statusDone: "Bajarildi",
      schedulePlanner: "Jadval / O'qish reja",
      addStudySession: "Study session qo'shish",
      weeklyTimetable: "Haftalik jadval",
      pomodoroTimer: "Pomodoro taymer",
      pomodoroDesc: "25 daqiqa fokus qiling. Har sikldan keyin qisqa tanaffus qiling.",
      start: "Boshlash",
      pause: "Pauza",
      reset: "Qayta",
      goalsTracker: "Maqsadlar trekeri",
      addGoal: "Maqsad qo'shish",
      shortTermGoals: "Qisqa muddatli maqsadlar",
      longTermGoals: "Uzoq muddatli maqsadlar",
      notesResources: "Eslatmalar va resurslar",
      quickNote: "Tezkor eslatma",
      saveNote: "Saqlash",
      savedNotes: "Saqlangan eslatmalar",
      wellbeingTracker: "Holat trekeri",
      mood: "Kayfiyat",
      hydration: "Suv balansi",
      waterToday: "Bugungi suv stakanlari",
      sleepHours: "Uyqu soatlari",
      saveSleep: "Uyquni saqlash",
      dailySummary: "Kunlik xulosa",
      quickNotePlaceholder: "Ma'ruza, link yoki takrorlash nuqtasini yozing...",
      sleepPlaceholder: "Necha soat uxlaganingizni kiriting",
      modalAddTask: "Yangi vazifa qo'shish",
      taskTitlePlaceholder: "Vazifa nomi",
      taskSubjectPlaceholder: "Fan nomi",
      saveTask: "Vazifani saqlash",
      modalAddGoal: "Yangi maqsad qo'shish",
      goalTitlePlaceholder: "Maqsad nomi",
      shortTermOption: "Qisqa muddatli",
      longTermOption: "Uzoq muddatli",
      goalProgressPlaceholder: "Progress (%)",
      saveGoal: "Maqsadni saqlash",
      modalAddSession: "Study session qo'shish",
      sessionTopicPlaceholder: "Mavzu / Fan",
      sessionDurationPlaceholder: "Davomiyligi (daq)",
      saveSession: "Session saqlash",
      welcomeBack: "Xush kelibsiz, {name}",
      promptEnterName: "Talaba ismini kiriting",
      examUnavailable: "Imtihon sanasi topilmadi",
      examStartsToday: "{exam} bugun boshlanadi",
      examIn: "{exam} ga {days} kun {hours} soat qoldi",
      urgentDeadline: "2 kunlik deadline",
      minutesUnit: "{value} daq",
      noShortGoals: "Hozircha qisqa muddatli maqsad yo'q.",
      noLongGoals: "Hozircha uzoq muddatli maqsad yo'q.",
      noNotesYet: "Hali eslatma yo'q. Birinchi fikringizni saqlang.",
      moodNotSelected: "tanlanmagan",
      sleepNotLogged: "kiritilmagan",
      wellbeingSummary:
        "Kayfiyat: {mood}. Suv: {water} stakan. Uyqu: {sleep}. Balans fokusni ushlashga yordam beradi.",
      pomodoroDoneAlert: "Pomodoro tugadi. Qisqa tanaffus qiling.",
      noDate: "Sana yo'q",
      timeLabel: "Vaqt",
      emptySlot: "-",
      dayMonday: "Dushanba",
      dayTuesday: "Seshanba",
      dayWednesday: "Chorshanba",
      dayThursday: "Payshanba",
      dayFriday: "Juma",
      daySaturday: "Shanba",
      daySunday: "Yakshanba",
      subjectMathematics: "Matematika",
      subjectProgramming: "Dasturlash",
      subjectPhysics: "Fizika",
      subjectEnglish: "Ingliz tili",
      avatarTooLarge: "Rasm hajmi katta. 2MB dan kichik fayl tanlang.",
      quotes: [
        "Har kuni ozgina progress semestr oxirida katta natija beradi.",
        "Imtihon oldi shoshilishdan ko'ra muntazamlik kuchliroq.",
        "Bugungi fokusingiz ertangi erkinligingizni yaratadi.",
        "Yaxshi rejalangan bitta study block haftani o'zgartiradi.",
        "Intizom - ishonchga eng qisqa yo'l.",
        "Energiya past bo'lgan kunlarda ham maqsadga yaqinlashing.",
        "Avval muhim ishni tugating, keyin optimallashtiring.",
        "Produktivlik bosim emas, ustuvorlik masalasi."
      ]
    }
  };

  const LOCALE_MAP = {
    en: "en-US",
    ru: "ru-RU",
    uz: "uz-UZ"
  };

  const DEFAULT_PROFILE = {
    name: "username",
    avatar:
      "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_user_personalization&w=740&q=80"
  };

  const DEFAULT_POMODORO = {
    seconds: POMODORO_DURATION_SECONDS,
    isRunning: false,
    endsAt: null
  };

  const DEFAULT_WELLBEING = {
    date: getTodayKey(),
    mood: "",
    water: 0,
    sleep: 0
  };

  const DEFAULT_EXAM = {
    name: "Calculus Midterm",
    date: getDateAfterDays(9)
  };

  const state = {
    theme: localStorage.getItem(STORAGE_KEYS.theme) || "light",
    language: normalizeLanguage(localStorage.getItem(STORAGE_KEYS.language) || "en"),
    profile: migrateProfile(loadJSON(STORAGE_KEYS.profile, DEFAULT_PROFILE)),
    tasks: migrateTasks(loadJSON(STORAGE_KEYS.tasks, [])),
    goals: migrateGoals(loadJSON(STORAGE_KEYS.goals, [])),
    notes: migrateNotes(loadJSON(STORAGE_KEYS.notes, [])),
    sessions: migrateSessions(loadJSON(STORAGE_KEYS.sessions, [])),
    wellbeing: migrateWellbeing(loadJSON(STORAGE_KEYS.wellbeing, DEFAULT_WELLBEING)),
    exam: migrateExam(loadJSON(STORAGE_KEYS.exam, DEFAULT_EXAM)),
    pomodoro: {
      ...migratePomodoro(loadJSON(STORAGE_KEYS.pomodoro, DEFAULT_POMODORO)),
      timerId: null
    }
  };

  const ui = {
    body: document.body,
    html: document.documentElement,
    themeToggle: document.getElementById("themeToggle"),
    languageSelect: document.getElementById("languageSelect"),
    studentAvatar: document.getElementById("studentAvatar"),
    avatarInput: document.getElementById("avatarInput"),
    changeAvatarBtn: document.getElementById("changeAvatarBtn"),
    studentNameDisplay: document.getElementById("studentNameDisplay"),
    welcomeMessage: document.getElementById("welcomeMessage"),
    quoteText: document.getElementById("quoteText"),
    editNameBtn: document.getElementById("editNameBtn"),
    homeOpenTaskBtn: document.getElementById("homeOpenTaskBtn"),
    homeOpenSessionBtn: document.getElementById("homeOpenSessionBtn"),
    homeOpenNoteBtn: document.getElementById("homeOpenNoteBtn"),
    menuLinks: document.querySelectorAll(".menu-link"),
    sections: {
      dashboard: document.getElementById("dashboardSection"),
      tasks: document.getElementById("tasksSection"),
      schedule: document.getElementById("scheduleSection"),
      goals: document.getElementById("goalsSection"),
      notes: document.getElementById("notesSection"),
      wellbeing: document.getElementById("wellbeingSection")
    },
    subjectProgressList: document.getElementById("subjectProgressList"),
    attendanceCircle: document.getElementById("attendanceCircle"),
    attendancePercent: document.getElementById("attendancePercent"),
    examCountdown: document.getElementById("examCountdown"),
    todayDoneCount: document.getElementById("todayDoneCount"),
    urgentTaskCount: document.getElementById("urgentTaskCount"),
    taskDeadlineBadge: document.getElementById("taskDeadlineBadge"),
    taskLists: {
      todo: document.getElementById("todoList"),
      inprogress: document.getElementById("inprogressList"),
      done: document.getElementById("doneList")
    },
    countLabels: {
      todo: document.getElementById("todoCount"),
      inprogress: document.getElementById("inprogressCount"),
      done: document.getElementById("doneCount")
    },
    openTaskModalBtn: document.getElementById("openTaskModalBtn"),
    taskForm: document.getElementById("taskForm"),
    taskTitleInput: document.getElementById("taskTitleInput"),
    taskSubjectInput: document.getElementById("taskSubjectInput"),
    taskDeadlineInput: document.getElementById("taskDeadlineInput"),
    openSessionModalBtn: document.getElementById("openSessionModalBtn"),
    sessionForm: document.getElementById("sessionForm"),
    sessionTopicInput: document.getElementById("sessionTopicInput"),
    sessionDayInput: document.getElementById("sessionDayInput"),
    sessionTimeInput: document.getElementById("sessionTimeInput"),
    sessionDurationInput: document.getElementById("sessionDurationInput"),
    timetableGrid: document.getElementById("timetableGrid"),
    pomodoroDisplay: document.getElementById("pomodoroDisplay"),
    startPomodoroBtn: document.getElementById("startPomodoroBtn"),
    pausePomodoroBtn: document.getElementById("pausePomodoroBtn"),
    resetPomodoroBtn: document.getElementById("resetPomodoroBtn"),
    openGoalModalBtn: document.getElementById("openGoalModalBtn"),
    goalForm: document.getElementById("goalForm"),
    goalTitleInput: document.getElementById("goalTitleInput"),
    goalTypeInput: document.getElementById("goalTypeInput"),
    goalProgressInput: document.getElementById("goalProgressInput"),
    shortGoalList: document.getElementById("shortGoalList"),
    longGoalList: document.getElementById("longGoalList"),
    noteInput: document.getElementById("noteInput"),
    addNoteBtn: document.getElementById("addNoteBtn"),
    notesList: document.getElementById("notesList"),
    moodButtons: document.querySelectorAll(".mood-btn"),
    increaseWaterBtn: document.getElementById("increaseWaterBtn"),
    decreaseWaterBtn: document.getElementById("decreaseWaterBtn"),
    waterCount: document.getElementById("waterCount"),
    sleepInput: document.getElementById("sleepInput"),
    saveSleepBtn: document.getElementById("saveSleepBtn"),
    dailySummary: document.getElementById("dailySummary"),
    modals: document.querySelectorAll(".modal"),
    closeModalButtons: document.querySelectorAll("[data-close-modal]")
  };

  // App bootstrap: load persisted state, wire events, and render initial UI.
  function init() {
    syncWellbeingForToday();
    syncPomodoroState();
    persistNormalizedState();
    applyTheme();
    bindEvents();
    renderPomodoro();
    applyLanguage();
    if (state.pomodoro.isRunning) {
      startPomodoroTicker();
    }

    // Keeps the exam countdown live without reloading.
    setInterval(renderExamCountdown, 60 * 1000);
  }

  // Centralized listeners for navigation, forms, drag-drop, and trackers.
  function bindEvents() {
    ui.themeToggle.addEventListener("change", onThemeToggle);
    ui.languageSelect.addEventListener("change", onLanguageChange);
    ui.editNameBtn.addEventListener("click", onEditName);
    ui.changeAvatarBtn.addEventListener("click", onAvatarChangeClick);
    ui.avatarInput.addEventListener("change", onAvatarFileChange);

    if (ui.homeOpenTaskBtn) {
      ui.homeOpenTaskBtn.addEventListener("click", () => {
        switchSection("tasks");
        openModal("taskModal");
      });
    }

    if (ui.homeOpenSessionBtn) {
      ui.homeOpenSessionBtn.addEventListener("click", () => {
        switchSection("schedule");
        openModal("sessionModal");
      });
    }

    if (ui.homeOpenNoteBtn) {
      ui.homeOpenNoteBtn.addEventListener("click", () => {
        switchSection("notes");
        ui.noteInput?.focus();
      });
    }

    ui.menuLinks.forEach((button) => {
      button.addEventListener("click", () => switchSection(button.dataset.target));
    });

    ui.openTaskModalBtn.addEventListener("click", () => openModal("taskModal"));
    ui.openGoalModalBtn.addEventListener("click", () => openModal("goalModal"));
    ui.openSessionModalBtn.addEventListener("click", () => openModal("sessionModal"));

    ui.closeModalButtons.forEach((button) => {
      button.addEventListener("click", () => closeModal(button.dataset.closeModal));
    });

    ui.modals.forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal.id);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        ui.modals.forEach((modal) => closeModal(modal.id));
      }
    });

    ui.taskForm.addEventListener("submit", onTaskSubmit);
    ui.goalForm.addEventListener("submit", onGoalSubmit);
    ui.sessionForm.addEventListener("submit", onSessionSubmit);

    Object.values(ui.taskLists).forEach((list) => {
      list.addEventListener("dragover", onTaskDragOver);
      list.addEventListener("dragleave", onTaskDragLeave);
      list.addEventListener("drop", onTaskDrop);
      list.addEventListener("change", onTaskStatusChange);
      list.addEventListener("click", onTaskDeleteClick);
    });

    ui.timetableGrid.addEventListener("click", onSessionDeleteClick);

    ui.startPomodoroBtn.addEventListener("click", startPomodoro);
    ui.pausePomodoroBtn.addEventListener("click", pausePomodoro);
    ui.resetPomodoroBtn.addEventListener("click", resetPomodoro);

    ui.shortGoalList.addEventListener("input", onGoalProgressChange);
    ui.longGoalList.addEventListener("input", onGoalProgressChange);
    ui.shortGoalList.addEventListener("click", onGoalDeleteClick);
    ui.longGoalList.addEventListener("click", onGoalDeleteClick);

    ui.addNoteBtn.addEventListener("click", onAddNote);
    ui.notesList.addEventListener("click", onDeleteNote);

    ui.moodButtons.forEach((button) => {
      button.addEventListener("click", () => setMood(button.dataset.mood));
    });

    ui.increaseWaterBtn.addEventListener("click", () => updateWater(1));
    ui.decreaseWaterBtn.addEventListener("click", () => updateWater(-1));
    ui.saveSleepBtn.addEventListener("click", saveSleepHours);
  }

  function switchSection(target) {
    ui.menuLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.target === target);
    });

    Object.entries(ui.sections).forEach(([key, section]) => {
      section.classList.toggle("active", key === target);
    });
  }

  function onThemeToggle() {
    state.theme = ui.themeToggle.checked ? "dark" : "light";
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
    applyTheme();
  }

  function applyTheme() {
    const isDark = state.theme === "dark";
    ui.themeToggle.checked = isDark;
    ui.body.classList.toggle("dark", isDark);
  }

  function onLanguageChange() {
    state.language = normalizeLanguage(ui.languageSelect.value);
    localStorage.setItem(STORAGE_KEYS.language, state.language);
    applyLanguage();
  }

  function applyLanguage() {
    ui.languageSelect.value = state.language;
    ui.html.lang = state.language;
    applyStaticTranslations();
    populateSessionSelectors();
    renderProfile();
    renderQuote();
    renderAcademicOverview();
    renderTasks();
    renderTimetable();
    renderGoals();
    renderNotes();
    renderWellbeing();
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });
  }

  function onEditName() {
    const nextName = window.prompt(t("promptEnterName"), state.profile.name) || "";
    const cleanName = nextName.trim();

    if (!cleanName) {
      return;
    }

    state.profile.name = cleanName;
    persist(STORAGE_KEYS.profile, state.profile);
    renderProfile();
  }

  function onAvatarChangeClick() {
    ui.avatarInput.click();
  }

  function onAvatarFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      state.profile.avatar = String(reader.result);
      persist(STORAGE_KEYS.profile, state.profile);
      renderProfile();
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  }

  function renderProfile() {
    ui.studentAvatar.src = state.profile.avatar;
    ui.studentNameDisplay.textContent = state.profile.name;
    ui.welcomeMessage.textContent = t("welcomeBack", { name: state.profile.name });
  }

  function renderQuote() {
    const quoteList = getMessages().quotes || I18N.en.quotes;
    const quoteIndex = getDayOfYear(new Date()) % quoteList.length;
    ui.quoteText.textContent = `"${quoteList[quoteIndex]}"`;
  }

  function renderAcademicOverview() {
    renderSubjectProgress();
    renderAttendance(91);
    renderExamCountdown();
  }

  function renderSubjectProgress() {
    if (!ui.subjectProgressList) {
      return;
    }

    ui.subjectProgressList.innerHTML = "";

    SUBJECT_PROGRESS.forEach((subject) => {
      const item = document.createElement("div");
      item.className = "subject-item";
      item.innerHTML = `
        <div class="subject-row">
          <span>${t(subject.key)}</span>
          <span>${subject.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${subject.progress}%"></div>
        </div>
      `;
      ui.subjectProgressList.appendChild(item);
    });
  }

  function renderAttendance(value) {
    if (!ui.attendanceCircle || !ui.attendancePercent) {
      return;
    }

    const clamped = clamp(value, 0, 100);
    const degree = (clamped / 100) * 360;
    ui.attendanceCircle.style.background = `conic-gradient(var(--accent) ${degree}deg, var(--surface-2) ${degree}deg 360deg)`;
    ui.attendancePercent.textContent = `${clamped}%`;
  }

  function renderExamCountdown() {
    if (!ui.examCountdown) {
      return;
    }

    const examDate = parseDateLocal(state.exam.date);
    const now = new Date();
    const diffMs = examDate - now;

    if (Number.isNaN(examDate.getTime())) {
      ui.examCountdown.textContent = t("examUnavailable");
      return;
    }

    if (diffMs <= 0) {
      ui.examCountdown.textContent = t("examStartsToday", { exam: state.exam.name });
      return;
    }

    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    ui.examCountdown.textContent = t("examIn", { exam: state.exam.name, days, hours });
  }

  // Tasks are rendered as a lightweight Kanban board with drag/drop status updates.
  function onTaskSubmit(event) {
    event.preventDefault();

    const title = ui.taskTitleInput.value.trim();
    const subject = ui.taskSubjectInput.value.trim();
    const deadline = ui.taskDeadlineInput.value;

    if (!title || !subject || !deadline) {
      return;
    }

    state.tasks.push({
      id: cryptoRandomId(),
      title,
      subject,
      deadline,
      status: "todo",
      createdAt: new Date().toISOString(),
      completedDate: ""
    });

    persist(STORAGE_KEYS.tasks, state.tasks);
    renderTasks();
    ui.taskForm.reset();
    closeModal("taskModal");
  }

  function renderTasks() {
    const sortedTasks = [...state.tasks].sort((a, b) => a.deadline.localeCompare(b.deadline));

    Object.values(ui.taskLists).forEach((list) => {
      list.innerHTML = "";
    });

    sortedTasks.forEach((task) => {
      const element = createTaskCard(task);
      ui.taskLists[task.status].appendChild(element);
    });

    renderTaskCounters();
    renderUrgentTaskBadge();
  }

  function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task-card";
    card.draggable = true;
    card.dataset.taskId = task.id;

    const diffDays = getDaysUntil(task.deadline);
    const isUrgent = diffDays >= 0 && diffDays <= 2 && task.status !== "done";

    card.innerHTML = `
      <div class="task-top">
        <h4>${escapeHtml(task.title)}</h4>
        <button class="ghost-btn compact" data-delete-task="${task.id}">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
      <div class="task-meta">
        <span>${escapeHtml(task.subject)}</span>
        <span class="deadline-chip">${formatDate(task.deadline)}</span>
        ${isUrgent ? `<span class="urgent-chip">${t("urgentDeadline")}</span>` : ""}
      </div>
      <div class="task-actions">
        <select data-status-select="${task.id}">
          <option value="todo" ${task.status === "todo" ? "selected" : ""}>${t("statusTodo")}</option>
          <option value="inprogress" ${task.status === "inprogress" ? "selected" : ""}>${t("statusInProgress")}</option>
          <option value="done" ${task.status === "done" ? "selected" : ""}>${t("statusDone")}</option>
        </select>
      </div>
    `;

    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", task.id);
      event.dataTransfer.effectAllowed = "move";
    });

    return card;
  }

  function onTaskDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  }

  function onTaskDragLeave(event) {
    event.currentTarget.classList.remove("drag-over");
  }

  function onTaskDrop(event) {
    event.preventDefault();
    const target = event.currentTarget;
    target.classList.remove("drag-over");
    const taskId = event.dataTransfer.getData("text/plain");
    const nextStatus = target.dataset.status;
    updateTaskStatus(taskId, nextStatus);
  }

  function onTaskStatusChange(event) {
    const select = event.target.closest("[data-status-select]");
    if (!select) {
      return;
    }

    updateTaskStatus(select.dataset.statusSelect, select.value);
  }

  function onTaskDeleteClick(event) {
    const button = event.target.closest("[data-delete-task]");
    if (!button) {
      return;
    }

    state.tasks = state.tasks.filter((task) => task.id !== button.dataset.deleteTask);
    persist(STORAGE_KEYS.tasks, state.tasks);
    renderTasks();
  }

  function updateTaskStatus(taskId, nextStatus) {
    state.tasks = state.tasks.map((task) => {
      if (task.id !== taskId || task.status === nextStatus) {
        return task;
      }

      const updated = { ...task, status: nextStatus };

      if (nextStatus === "done") {
        updated.completedDate = getTodayKey();
      }

      if (task.status === "done" && nextStatus !== "done") {
        updated.completedDate = "";
      }

      return updated;
    });

    persist(STORAGE_KEYS.tasks, state.tasks);
    renderTasks();
  }

  function renderTaskCounters() {
    const counts = {
      todo: 0,
      inprogress: 0,
      done: 0
    };

    state.tasks.forEach((task) => {
      counts[task.status] += 1;
    });

    ui.countLabels.todo.textContent = counts.todo;
    ui.countLabels.inprogress.textContent = counts.inprogress;
    ui.countLabels.done.textContent = counts.done;

    const doneToday = state.tasks.filter(
      (task) => task.status === "done" && task.completedDate === getTodayKey()
    ).length;
    ui.todayDoneCount.textContent = String(doneToday);
  }

  function renderUrgentTaskBadge() {
    const urgentCount = state.tasks.filter((task) => {
      if (task.status === "done") {
        return false;
      }

      const diffDays = getDaysUntil(task.deadline);
      return diffDays >= 0 && diffDays <= 2;
    }).length;

    ui.urgentTaskCount.textContent = String(urgentCount);
    ui.taskDeadlineBadge.textContent = String(urgentCount);
    ui.taskDeadlineBadge.style.display = urgentCount > 0 ? "inline-block" : "none";
  }

  // Weekly planner slots are generated dynamically to keep markup maintainable.
  function populateSessionSelectors() {
    const selectedDay = ui.sessionDayInput.value || DAYS[0].value;
    const selectedTime = ui.sessionTimeInput.value || TIME_SLOTS[0];

    ui.sessionDayInput.innerHTML = DAYS.map((day) => {
      const selected = day.value === selectedDay ? "selected" : "";
      return `<option value="${day.value}" ${selected}>${t(day.i18nKey)}</option>`;
    }).join("");

    ui.sessionTimeInput.innerHTML = TIME_SLOTS.map((time) => {
      const selected = time === selectedTime ? "selected" : "";
      return `<option value="${time}" ${selected}>${time}</option>`;
    }).join("");
  }

  function onSessionSubmit(event) {
    event.preventDefault();

    const topic = ui.sessionTopicInput.value.trim();
    const day = ui.sessionDayInput.value;
    const time = ui.sessionTimeInput.value;
    const duration = Number(ui.sessionDurationInput.value);

    if (!topic || !day || !time || !duration) {
      return;
    }

    state.sessions.push({
      id: cryptoRandomId(),
      topic,
      day,
      time,
      duration
    });

    persist(STORAGE_KEYS.sessions, state.sessions);
    renderTimetable();
    ui.sessionForm.reset();
    closeModal("sessionModal");
    populateSessionSelectors();
  }

  function renderTimetable() {
    ui.timetableGrid.innerHTML = "";

    const corner = document.createElement("div");
    corner.className = "day-cell";
    corner.textContent = t("timeLabel");
    ui.timetableGrid.appendChild(corner);

    DAYS.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "day-cell";
      dayHeader.textContent = t(day.i18nKey);
      ui.timetableGrid.appendChild(dayHeader);
    });

    TIME_SLOTS.forEach((time) => {
      const timeCell = document.createElement("div");
      timeCell.className = "time-cell";
      timeCell.textContent = time;
      ui.timetableGrid.appendChild(timeCell);

      DAYS.forEach((day) => {
        const slot = document.createElement("div");
        slot.className = "slot-cell";

        const slotSessions = state.sessions.filter(
          (session) => session.day === day.value && session.time === time
        );

        if (!slotSessions.length) {
          slot.innerHTML = `<span class='muted'>${t("emptySlot")}</span>`;
        } else {
          slotSessions.forEach((session) => {
            const item = document.createElement("div");
            item.className = "session-pill";
            item.innerHTML = `
              <strong>${escapeHtml(session.topic)}</strong><br>
              ${t("minutesUnit", { value: session.duration })}
              <button class="ghost-btn compact" data-delete-session="${session.id}">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            `;
            slot.appendChild(item);
          });
        }

        ui.timetableGrid.appendChild(slot);
      });
    });
  }

  function onSessionDeleteClick(event) {
    const button = event.target.closest("[data-delete-session]");
    if (!button) {
      return;
    }

    state.sessions = state.sessions.filter((session) => session.id !== button.dataset.deleteSession);
    persist(STORAGE_KEYS.sessions, state.sessions);
    renderTimetable();
  }

  // Goals support quick progress updates via range input and persist automatically.
  function onGoalSubmit(event) {
    event.preventDefault();

    const title = ui.goalTitleInput.value.trim();
    const type = ui.goalTypeInput.value;
    const progress = clamp(Number(ui.goalProgressInput.value), 0, 100);

    if (!title || !type) {
      return;
    }

    state.goals.push({
      id: cryptoRandomId(),
      title,
      type,
      progress
    });

    persist(STORAGE_KEYS.goals, state.goals);
    renderGoals();
    ui.goalForm.reset();
    closeModal("goalModal");
  }

  function renderGoals() {
    ui.shortGoalList.innerHTML = "";
    ui.longGoalList.innerHTML = "";

    const shortGoals = state.goals.filter((goal) => goal.type === "short");
    const longGoals = state.goals.filter((goal) => goal.type === "long");

    renderGoalGroup(shortGoals, ui.shortGoalList, t("noShortGoals"));
    renderGoalGroup(longGoals, ui.longGoalList, t("noLongGoals"));
  }

  function renderGoalGroup(goals, container, emptyText) {
    if (!goals.length) {
      container.innerHTML = `<p class="muted">${emptyText}</p>`;
      return;
    }

    goals.forEach((goal) => {
      const item = document.createElement("article");
      item.className = "goal-item";
      item.innerHTML = `
        <div class="goal-head">
          <strong>${escapeHtml(goal.title)}</strong>
          <span>${goal.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${goal.progress}%"></div>
        </div>
        <div class="goal-tools">
          <input data-goal-range="${goal.id}" type="range" min="0" max="100" value="${goal.progress}" />
          <button class="ghost-btn compact" data-delete-goal="${goal.id}">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
      container.appendChild(item);
    });
  }

  function onGoalProgressChange(event) {
    const range = event.target.closest("[data-goal-range]");
    if (!range) {
      return;
    }

    const goalId = range.dataset.goalRange;
    const nextProgress = clamp(Number(range.value), 0, 100);

    state.goals = state.goals.map((goal) => {
      if (goal.id !== goalId) {
        return goal;
      }
      return { ...goal, progress: nextProgress };
    });

    persist(STORAGE_KEYS.goals, state.goals);
    renderGoals();
  }

  function onGoalDeleteClick(event) {
    const button = event.target.closest("[data-delete-goal]");
    if (!button) {
      return;
    }

    state.goals = state.goals.filter((goal) => goal.id !== button.dataset.deleteGoal);
    persist(STORAGE_KEYS.goals, state.goals);
    renderGoals();
  }

  function onAddNote() {
    const text = ui.noteInput.value.trim();
    if (!text) {
      return;
    }

    state.notes.unshift({
      id: cryptoRandomId(),
      text,
      createdAt: new Date().toISOString()
    });

    persist(STORAGE_KEYS.notes, state.notes);
    ui.noteInput.value = "";
    renderNotes();
  }

  function renderNotes() {
    ui.notesList.innerHTML = "";

    if (!state.notes.length) {
      ui.notesList.innerHTML = `<p class="muted">${t("noNotesYet")}</p>`;
      return;
    }

    state.notes.forEach((note) => {
      const item = document.createElement("article");
      item.className = "note-item";
      item.innerHTML = `
        <p>${escapeHtml(note.text)}</p>
        <div class="note-meta">
          <span>${formatDateTime(note.createdAt)}</span>
          <button class="ghost-btn compact" data-delete-note="${note.id}">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
      ui.notesList.appendChild(item);
    });
  }

  function onDeleteNote(event) {
    const button = event.target.closest("[data-delete-note]");
    if (!button) {
      return;
    }

    state.notes = state.notes.filter((note) => note.id !== button.dataset.deleteNote);
    persist(STORAGE_KEYS.notes, state.notes);
    renderNotes();
  }

  // Wellbeing resets each new day so summary always reflects today's habits.
  function syncWellbeingForToday() {
    const today = getTodayKey();
    if (state.wellbeing.date !== today) {
      state.wellbeing = {
        ...DEFAULT_WELLBEING,
        date: today
      };
      persist(STORAGE_KEYS.wellbeing, state.wellbeing);
    }
  }

  function setMood(mood) {
    state.wellbeing.mood = mood;
    persist(STORAGE_KEYS.wellbeing, state.wellbeing);
    renderWellbeing();
  }

  function updateWater(delta) {
    state.wellbeing.water = Math.max(0, state.wellbeing.water + delta);
    persist(STORAGE_KEYS.wellbeing, state.wellbeing);
    renderWellbeing();
  }

  function saveSleepHours() {
    const sleep = Number(ui.sleepInput.value);
    if (Number.isNaN(sleep) || sleep < 0 || sleep > 14) {
      return;
    }

    state.wellbeing.sleep = sleep;
    persist(STORAGE_KEYS.wellbeing, state.wellbeing);
    renderWellbeing();
  }

  function renderWellbeing() {
    ui.moodButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.mood === state.wellbeing.mood);
    });

    ui.waterCount.textContent = String(state.wellbeing.water);
    ui.sleepInput.value = state.wellbeing.sleep || "";

    const moodText = state.wellbeing.mood || t("moodNotSelected");
    const sleepText = state.wellbeing.sleep ? `${state.wellbeing.sleep}h` : t("sleepNotLogged");
    ui.dailySummary.textContent = t("wellbeingSummary", {
      mood: moodText,
      water: state.wellbeing.water,
      sleep: sleepText
    });
  }

  function startPomodoro() {
    if (state.pomodoro.isRunning) {
      return;
    }

    const currentSeconds = getPomodoroSecondsLeft();
    const secondsToRun = currentSeconds > 0 ? currentSeconds : POMODORO_DURATION_SECONDS;

    state.pomodoro.seconds = secondsToRun;
    state.pomodoro.endsAt = Date.now() + secondsToRun * 1000;
    state.pomodoro.isRunning = true;
    persistPomodoro();
    renderPomodoro();
    startPomodoroTicker();
  }

  function pausePomodoro() {
    if (!state.pomodoro.isRunning && !state.pomodoro.timerId) {
      return;
    }

    state.pomodoro.seconds = getPomodoroSecondsLeft();
    state.pomodoro.isRunning = false;
    state.pomodoro.endsAt = null;
    stopPomodoroTicker();
    persistPomodoro();
    renderPomodoro();
  }

  function resetPomodoro() {
    stopPomodoroTicker();
    state.pomodoro.seconds = POMODORO_DURATION_SECONDS;
    state.pomodoro.isRunning = false;
    state.pomodoro.endsAt = null;
    persistPomodoro();
    renderPomodoro();
  }

  function startPomodoroTicker() {
    stopPomodoroTicker();

    state.pomodoro.timerId = window.setInterval(() => {
      const remaining = getPomodoroSecondsLeft();
      state.pomodoro.seconds = remaining;
      renderPomodoro();

      if (remaining > 0) {
        persistPomodoro();
        return;
      }

      stopPomodoroTicker();
      state.pomodoro.isRunning = false;
      state.pomodoro.endsAt = null;
      persistPomodoro();
      window.alert(t("pomodoroDoneAlert"));
    }, 1000);
  }

  function stopPomodoroTicker() {
    if (!state.pomodoro.timerId) {
      return;
    }

    window.clearInterval(state.pomodoro.timerId);
    state.pomodoro.timerId = null;
  }

  function syncPomodoroState() {
    state.pomodoro.seconds = getPomodoroSecondsLeft();

    if (state.pomodoro.seconds <= 0) {
      state.pomodoro.seconds = 0;
      state.pomodoro.isRunning = false;
      state.pomodoro.endsAt = null;
    }
  }

  function getPomodoroSecondsLeft() {
    if (!state.pomodoro.isRunning || typeof state.pomodoro.endsAt !== "number") {
      return Math.max(0, Number(state.pomodoro.seconds) || 0);
    }

    return Math.max(0, Math.ceil((state.pomodoro.endsAt - Date.now()) / 1000));
  }

  function persistPomodoro() {
    persist(STORAGE_KEYS.pomodoro, {
      seconds: state.pomodoro.seconds,
      isRunning: state.pomodoro.isRunning,
      endsAt: state.pomodoro.endsAt
    });
  }

  function renderPomodoro() {
    const secondsLeft = getPomodoroSecondsLeft();
    state.pomodoro.seconds = secondsLeft;

    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    ui.pomodoroDisplay.textContent = `${minutes}:${seconds}`;
  }

  function persistNormalizedState() {
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
    localStorage.setItem(STORAGE_KEYS.language, state.language);
    persist(STORAGE_KEYS.profile, state.profile);
    persist(STORAGE_KEYS.tasks, state.tasks);
    persist(STORAGE_KEYS.goals, state.goals);
    persist(STORAGE_KEYS.notes, state.notes);
    persist(STORAGE_KEYS.sessions, state.sessions);
    persist(STORAGE_KEYS.wellbeing, state.wellbeing);
    persist(STORAGE_KEYS.exam, state.exam);
    persistPomodoro();
  }

  function getMessages() {
    return I18N[state.language] || I18N.en;
  }

  function t(key, params = {}) {
    const messages = getMessages();
    const fallback = I18N.en;
    const template = messages[key] || fallback[key] || key;

    if (typeof template !== "string") {
      return key;
    }

    return Object.entries(params).reduce((result, [paramKey, value]) => {
      return result.replaceAll(`{${paramKey}}`, String(value));
    }, template);
  }

  function normalizeLanguage(value) {
    return Object.prototype.hasOwnProperty.call(I18N, value) ? value : "en";
  }

  function getLocaleCode() {
    return LOCALE_MAP[state.language] || LOCALE_MAP.en;
  }

  // Shared utility helpers for persistence, date handling, and sanitization.
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
      return;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
      return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.error(`Failed to parse localStorage key: ${key}`, error);
      return fallback;
    }
  }

  function persist(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to save localStorage key: ${key}`, error);
    }
  }

  function getTodayKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return getLocalDateString(date);
  }

  function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseDateLocal(dateString) {
    return new Date(`${dateString}T23:59:59`);
  }

  function migrateProfile(profile) {
    return {
      name: typeof profile?.name === "string" && profile.name.trim() ? profile.name.trim() : DEFAULT_PROFILE.name,
      avatar:
        typeof profile?.avatar === "string" && profile.avatar.trim() ? profile.avatar : DEFAULT_PROFILE.avatar
    };
  }

  function migrateTasks(tasks) {
    if (!Array.isArray(tasks)) {
      return [];
    }

    return tasks.map((task) => {
      const statusFromLegacy = task?.completed ? "done" : "todo";
      const status = ["todo", "inprogress", "done"].includes(task?.status) ? task.status : statusFromLegacy;
      const deadline = isValidDateString(task?.deadline) ? task.deadline : getDateAfterDays(3);

      return {
        id: typeof task?.id === "string" ? task.id : cryptoRandomId(),
        title:
          typeof task?.title === "string" && task.title.trim()
            ? task.title.trim()
            : typeof task?.text === "string" && task.text.trim()
              ? task.text.trim()
              : "Untitled task",
        subject: typeof task?.subject === "string" && task.subject.trim() ? task.subject.trim() : "General",
        deadline,
        status,
        createdAt: typeof task?.createdAt === "string" ? task.createdAt : new Date().toISOString(),
        completedDate:
          status === "done"
            ? typeof task?.completedDate === "string" && isValidDateString(task.completedDate)
              ? task.completedDate
              : getTodayKey()
            : ""
      };
    });
  }

  function migrateGoals(goals) {
    if (!Array.isArray(goals)) {
      return [];
    }

    return goals.map((goal) => ({
      id: typeof goal?.id === "string" ? goal.id : cryptoRandomId(),
      title:
        typeof goal?.title === "string" && goal.title.trim()
          ? goal.title.trim()
          : "Untitled goal",
      type: goal?.type === "long" ? "long" : "short",
      progress: clamp(Number(goal?.progress) || 0, 0, 100)
    }));
  }

  function migrateNotes(notes) {
    if (!Array.isArray(notes)) {
      return [];
    }

    return notes
      .map((note) => {
        if (typeof note === "string") {
          return {
            id: cryptoRandomId(),
            text: note.trim(),
            createdAt: new Date().toISOString()
          };
        }

        return {
          id: typeof note?.id === "string" ? note.id : cryptoRandomId(),
          text: typeof note?.text === "string" ? note.text.trim() : "",
          createdAt: typeof note?.createdAt === "string" ? note.createdAt : new Date().toISOString()
        };
      })
      .filter((note) => note.text);
  }

  function migrateSessions(sessions) {
    const validDayValues = DAYS.map((day) => day.value);

    if (!Array.isArray(sessions)) {
      return [];
    }

    return sessions
      .map((session) => ({
        id: typeof session?.id === "string" ? session.id : cryptoRandomId(),
        topic:
          typeof session?.topic === "string" && session.topic.trim()
            ? session.topic.trim()
            : "Study Session",
        day: validDayValues.includes(session?.day) ? session.day : validDayValues[0],
        time: TIME_SLOTS.includes(session?.time) ? session.time : TIME_SLOTS[0],
        duration: clamp(Number(session?.duration) || 25, 15, 180)
      }))
      .filter((session) => session.topic);
  }

  function migrateWellbeing(wellbeing) {
    return {
      date: isValidDateString(wellbeing?.date) ? wellbeing.date : getTodayKey(),
      mood: typeof wellbeing?.mood === "string" ? wellbeing.mood : "",
      water: Math.max(0, Number(wellbeing?.water) || 0),
      sleep: clamp(Number(wellbeing?.sleep) || 0, 0, 14)
    };
  }

  function migrateExam(exam) {
    return {
      name: typeof exam?.name === "string" && exam.name.trim() ? exam.name.trim() : DEFAULT_EXAM.name,
      date: isValidDateString(exam?.date) ? exam.date : DEFAULT_EXAM.date
    };
  }

  function migratePomodoro(pomodoro) {
    const hasValidEndsAt = typeof pomodoro?.endsAt === "number" && Number.isFinite(pomodoro.endsAt);

    return {
      seconds: Math.max(0, Number(pomodoro?.seconds) || POMODORO_DURATION_SECONDS),
      isRunning: Boolean(pomodoro?.isRunning) && hasValidEndsAt,
      endsAt: hasValidEndsAt ? pomodoro.endsAt : null
    };
  }

  function getDaysUntil(dateString) {
    const todayStart = new Date(`${getTodayKey()}T00:00:00`);
    const target = parseDateLocal(dateString);
    const diffMs = target - todayStart;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  function formatDate(dateString) {
    if (!isValidDateString(dateString)) {
      return t("noDate");
    }

    const date = parseDateLocal(dateString);
    return new Intl.DateTimeFormat(getLocaleCode(), {
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(getLocaleCode(), {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isValidDateString(value) {
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cryptoRandomId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }

  init();
})();
