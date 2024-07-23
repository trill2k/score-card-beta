document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modeToggle').addEventListener('change', function() {
        document.body.classList.toggle('light-mode');
    });
});
document.getElementById('modeToggle').addEventListener('change', function() {
    document.body.classList.toggle('light-mode');
    document.querySelector('.hero').classList.toggle('light-mode');
    document.querySelector('.right-course-box1').classList.toggle('light-mode');
    document.querySelector('.right-course-box2').classList.toggle('light-mode');
    document.querySelector('.right-course-box3').classList.toggle('light-mode');
    
});