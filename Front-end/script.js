document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
  
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('expanded');
    });
  
    modeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        modeToggle.textContent = '☀️';
      } else {
        modeToggle.textContent = '🌙';
      }
    });
  });
  