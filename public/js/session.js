(function () {
  const token = localStorage.getItem('authToken');
  const show = (sel, yes) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.display = yes ? '' : 'none';
  };

  // Example selectors you used in mobile menu
  show('#logoutMenuItem', !!token);
  show('#loginRegisterMenuItem', !token);

  const dropLogout = document.getElementById('dropdownLogoutButton');
  const mobLogout = document.getElementById('mobileLogoutButton');
  const wire = (btn) => btn && btn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    location.reload();
  });
  wire(dropLogout);
  wire(mobLogout);
})();
