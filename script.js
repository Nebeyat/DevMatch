const devs = [
  { name: "Lena Fischer", role: "React Native Developer", exp: "Senior", skills: ["React Native", "TypeScript", "Mobile"], female: true, avatar: "LF", color: "#FBEAF0", tc: "#72243E", filter: ["mobile", "frontend"] },
  { name: "Ravi Kumar", role: "Backend Engineer", exp: "Mid-level", skills: ["Node.js", "Python", "DevOps"], female: false, avatar: "RK", color: "#EEEDFE", tc: "#3C3489", filter: ["backend"] },
  { name: "Amina Diallo", role: "Full-stack Developer", exp: "Lead", skills: ["React", "Node.js", "AI/ML"], female: true, avatar: "AD", color: "#FBEAF0", tc: "#72243E", filter: ["frontend", "backend"] },
  { name: "James Osei", role: "Flutter Developer", exp: "Junior", skills: ["Flutter", "Dart", "UI/UX"], female: false, avatar: "JO", color: "#E1F5EE", tc: "#085041", filter: ["mobile", "frontend"] },
  { name: "Fatima Al-Zahra", role: "AI/ML Engineer", exp: "Senior", skills: ["Python", "TensorFlow", "AI/ML"], female: true, avatar: "FA", color: "#FBEAF0", tc: "#72243E", filter: ["backend"] },
  { name: "Carlos Mendez", role: "DevOps Engineer", exp: "Mid-level", skills: ["Docker", "AWS", "CI/CD"], female: false, avatar: "CM", color: "#EEEDFE", tc: "#3C3489", filter: ["backend"] },
];

const quotes = [
  { text: "The question isn't who's going to let me — it's who's going to stop me.", author: "Ayn Rand" },
  { text: "I raise up my voice not so I can shout, but so that those without a voice can be heard.", author: "Malala Yousafzai" },
  { text: "If you're not making mistakes, then you're not making decisions.", author: "Grace Hopper, Pioneer of Computer Programming" },
  { text: "One of the most courageous things you can do is identify yourself, know who you are, what you believe in, and where you want to go.", author: "Sheila Murray Bethel" },
  { text: "In tech, we code the future. As a woman, you don't just belong at the table — you build the table.", author: "DevMatch Community" },
];

let activeFilter = 'all';

function renderDevs(containerId, list) {
  const el = document.getElementById(containerId);
  el.innerHTML = list.map(d => `
    <div class="dev-card ${d.female ? 'female' : ''}">
      <div class="avatar" style="background:${d.color}; color:${d.tc}">${d.avatar}</div>
      <div class="dev-name">${d.name}</div>
      <div class="dev-role">${d.role} · ${d.exp}</div>
      <div class="tag-row">
        ${d.skills.map(s => `<span class="tag ${d.female ? 'rose' : ''}">${s}</span>`).join('')}
      </div>
      ${d.female ? '<span class="badge-female">Women in tech</span><br>' : ''}
      <button class="btn connect-btn" onclick="toast('Connection request sent to ${d.name}!')">Connect</button>
    </div>
  `).join('');
}

function filterDevs() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const list = devs.filter(d => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'female' ? d.female : d.filter.includes(activeFilter));
    const matchesSearch =
      d.name.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      d.skills.some(s => s.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });
  renderDevs('find-devs', list);
}

function setFilter(filterName, btnEl) {
  activeFilter = filterName;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  filterDevs();
}

function toggleTag(el) {
  el.classList.toggle('selected');
}

function getSelectedTags(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} .tag-opt.selected`)).map(el => el.textContent);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'find') filterDevs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleRegister() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const gender = document.getElementById('gender').value;
  const role = document.getElementById('role').value.trim();
  const exp = document.getElementById('exp').value;
  const bio = document.getElementById('bio').value.trim();
  const skills = getSelectedTags('skill-tags');
  const looking = getSelectedTags('looking-tags');

  if (!fname || !email) {
    toast('Please fill in your name and email.');
    return;
  }

  const newDeveloper = {
    firstName: fname,
    lastName: lname,
    email,
    gender,
    role,
    experience: exp,
    bio,
    skills,
    lookingFor: looking,
  };

  console.log('New developer registered:', newDeveloper);

  document.getElementById('success-name').textContent = `Welcome, ${fname}!`;

  const femaleWelcome = document.getElementById('female-welcome');
  femaleWelcome.style.display = gender === 'female' ? 'block' : 'none';

  showPage('register-success');
  toast('Profile created successfully!');
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2500);
}

function renderQuotes() {
  const ql = document.getElementById('quotes-list');
  ql.innerHTML = quotes.map(q => `
    <div class="quote-card">
      <p>"${q.text}"</p>
      <div class="author">— ${q.author}</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderDevs('home-devs', devs.slice(0, 4));
  renderDevs('find-devs', devs);
  renderQuotes();
});