document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modeToggle').addEventListener('change', function() {
        document.body.classList.toggle('light-mode');
    });
});
document.getElementById('modeToggle').addEventListener('change', function() {
    document.body.classList.toggle('light-mode');
    document.querySelector('.hero').classList.toggle('light-mode');
});