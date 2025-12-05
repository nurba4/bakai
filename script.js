//Данные заданий 
const tasks = [
  { id: 1, title: "Познакомиться с коллегами", completed: false },
  { id: 2, title: "Пройти вводный онлайн-курс", completed: false },
  { id: 3, title: "Настроить рабочее место", completed: false },
  { id: 4, title: "Присоединиться к чату команды", completed: false }
];

let score = 0;

//  Данные сотрудников 
const employees = [
  { name: "Айжан Бакытова", position: "Менеджер проектов", description: "Поможет с управлением задач и проектами", photo:"img/жж.jpg" },
  { name: "Иван Смирнов", position: "Разработчик", description: "Отвечает за интеграцию систем", photo:"img/1.png" },
  { name: "Эляман Султанович", position: "HR", description: "Поможет с адаптацией в команде", photo:"img/1.png" },
  { name: "Дмитрий Орлов", position: "Финансовый консультант", description: "Консультации по продуктам банка", photo:"img/1.png" },
  { name: "Екатерина Фролова", position: "UX/UI дизайнер", description: "Поможет с интерфейсами и дизайном", photo:"img/жж.jpg" },
  { name: "Токтогулов Амир", position: "Разработчик", description: "Поддержка внутренних сервисов", photo:"img/1.png" },
  { name: "Александр Соколов", position: "Маркетинг", description: "Советы по продвижению продуктов", photo:"img/1.png" },
  { name: "Наталья Крылова", position: "Бухгалтер", description: "Вопросы по финансам и отчетности", photo:"img/жж.jpg" },
  { name: "Виктор Беляев", position: "Разработчик", description: "Техническая поддержка проектов", photo:"img/1.png" },
  { name: "Павел Морозов", position: "Менеджер по продуктам", description: "Объяснит логику продуктов банка", photo:"img/1.png" }
];

let currentEmployeeIndex = 0;

// Функция входа 
function login() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("dashboard-screen").style.display = "block";
  loadTasks();
}

// Загрузка заданий 
function loadTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.title));
    taskList.appendChild(li);
  });
}

// Изменение задачи 
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  if (task.id === 1 && task.completed === false) {
    currentEmployeeIndex = 0;
    showEmployeeModal();
  }
  updateProgress();
}

//  Обновление прогресса 
function updateProgress() {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const percent = Math.round((completedTasks / totalTasks) * 100);

  const progressPath = document.querySelector(".progress");
  const progressText = document.getElementById("progress-text");
  progressPath.setAttribute("stroke-dasharray", `${percent},100`);
  progressText.textContent = `${percent}%`;

  if (percent === 100) score = 5000;
  else if (percent >= 70) score = Math.round(5000/2);
  else score = 0;

  document.getElementById("score").textContent = score;
}

//  Модальное окно 
function showEmployeeModal() {
  if (currentEmployeeIndex >= employees.length) {
    const task = tasks.find(t => t.id === 1);
    task.completed = true;
    updateProgress();
    loadTasks();
    return;
  }
  const modal = document.getElementById("employee-modal");
  modal.style.display = "flex";
  showEmployee(currentEmployeeIndex);
}

function showEmployee(index) {
  const emp = employees[index];
  document.getElementById("emp-photo").src = emp.photo;
  document.getElementById("emp-name").textContent = emp.name;
  document.getElementById("emp-position").textContent = emp.position;
  document.getElementById("emp-desc").textContent = emp.description;
}

function closeModal() {
  const modal = document.getElementById("employee-modal");
  modal.style.display = "none";
  currentEmployeeIndex++;
  showEmployeeModal();
}

// Автозапуск для первой задачи 
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("task-list").addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT") {
      const liText = e.target.nextSibling.textContent;
      if (liText === "Познакомиться с коллегами") {
        currentEmployeeIndex = 0;
        showEmployeeModal();
      }
    }
  });
});
// Советы для новичка 
const tips = [
  "Познакомься со своей командой",
  "Пройди вводный курс по продуктам банка",
  "Настрой рабочее место",
  "Присоединись к чату команды",
  "Сохраняй баланс между работой и отдыхом"
];

function loadTips() {
  const tipsList = document.getElementById("tips-list");
  tipsList.innerHTML = "";
  tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

//  Прогресс по курсам (демо) 
function updateCoursesProgress() {
  // Пример: рандомная демонстрация прогресса
  document.getElementById("onboarding-progress").style.width = "80%";
  document.getElementById("security-progress").style.width = "50%";
  document.getElementById("products-progress").style.width = "30%";
}

// Вызываем после входа 
function login() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("dashboard-screen").style.display = "block";
  loadTasks();
  loadTips();
  updateCoursesProgress();
}
// Обратная связь 
function submitFeedback() {
  const rating = document.getElementById("feedback-rating").value;
  const comment = document.getElementById("feedback-comment").value;
  if(!rating) {
    alert("Выберите оценку!");
    return;
  }
  console.log("Оценка:", rating, "Комментарий:", comment); // HR видит в консоли (для прототипа)
  document.getElementById("feedback-thanks").style.display = "block";
}

//  Часть-тест 
const testQuestions = [
  { question: "С кем познакомился в первой задаче?", answer: "Мария Петрова" },
  { question: "Сколько заданий на неделю?", answer: "5" },
  { question: "Как начисляются баллы за выполнение?", answer: "1 балл = 1 сом" }
];

function loadTest() {
  const container = document.getElementById("test-questions");
  container.innerHTML = "";
  testQuestions.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${i+1}. ${q.question}</p>
      <input type="text" id="answer-${i}" placeholder="Ваш ответ" style="width: 100%; padding:5px; border-radius:8px; margin-bottom:10px;">
    `;
    container.appendChild(div);
  });
}

function submitTest() {
  let score = 0;
  testQuestions.forEach((q,i) => {
    const userAnswer = document.getElementById(`answer-${i}`).value.trim().toLowerCase();
    if(userAnswer === q.answer.toLowerCase()) score += 1;
  });
  document.getElementById("test-result").style.display = "block";
  document.getElementById("test-result").textContent = `Вы набрали ${score} из ${testQuestions.length} баллов!`;
  updateLeaderboard(score);
}

// Рейтинг сотрудников 
const leaderboard = [
  { name: "Иван", score: 82, time: "10 дней 16 мин", },
  { name: "Мария", score: 74, time: "12 дней 15 мин" },
  { name: "Алексей", score: 74, time: "14 дней 60 мин" }
];

function updateLeaderboard(newScore) {
  // добовление текущего польователя
  leaderboard.push({ name: "Вы", score: newScore, time: "10 мин" });
  leaderboard.sort((a,b) => b.score - a.score); // сортируем по баллам
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = "";
  leaderboard.forEach((u, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${idx+1}</td><td>${u.name}</td><td>${u.score}</td><td>${u.time}</td>`;
    tbody.appendChild(tr);
  });
}

// вход в кабинет
function login() {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("dashboard-screen").style.display = "block";
  loadTasks();
  loadTips();
  updateCoursesProgress();
  loadTest();
  updateLeaderboard(0); // нулевой рейтинг
}

