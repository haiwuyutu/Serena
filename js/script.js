// 按钮点击处理
function setupButtons() {
    const buttons = document.querySelectorAll('a, button');
    buttons.forEach(btn => {
        if (btn.textContent.includes('开始') || btn.textContent.includes('练习')) {
            btn.onclick = function(e) {
                if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
                    e.preventDefault();
                    const section = this.closest('div').querySelector('h3').textContent;
                    alert(`正在进入: ${section}\n详细页面开发中...`);
                }
            };
        }
    });
}

// 页面加载后设置
document.addEventListener('DOMContentLoaded', setupButtons);
