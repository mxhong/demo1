// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 头像交互功能
    const profileImg = document.getElementById('profileImg');
    const profileImages = [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face'
    ];
    
    let currentImageIndex = 0;
    
    profileImg.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % profileImages.length;
        profileImg.src = profileImages[currentImageIndex];
        
        // 添加点击动画
        profileImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
            profileImg.style.transform = 'scale(1)';
        }, 150);
    });
    
    // 平滑滚动到各个部分
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            const rect = section.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 100;
            
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        });
    });
    
    // 添加滚动视差效果
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // 头部视差效果
        if (header) {
            const offset = scrollY * 0.5;
            header.style.transform = `translateY(${offset}px)`;
        }
        
        // 各部分的渐入效果
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 为爱好卡片添加点击效果
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加点击动画
            card.style.transform = 'scale(0.95) translateY(-5px)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 150);
            
            // 显示提示信息
            const hobbyName = card.querySelector('h3').textContent;
            showToast(`You clicked: ${hobbyName}`);
        });
    });
    
    // 为想法卡片添加点击效果
    const thoughtCards = document.querySelectorAll('.thought-card');
    thoughtCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加点击动画
            card.style.transform = 'scale(0.95) translateY(-5px)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 150);
            
            // 显示想法内容
            const thoughtTitle = card.querySelector('h3').textContent;
            const thoughtContent = card.querySelector('p').textContent;
            showModal(thoughtTitle, thoughtContent);
        });
    });
    
    // 社交链接点击效果
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加点击动画
            link.style.transform = 'scale(0.8) translateY(-3px)';
            setTimeout(() => {
                link.style.transform = 'translateY(-3px)';
            }, 150);
            
            // 显示社交链接信息
            const icon = link.querySelector('i');
            let platform = '';
            if (icon.classList.contains('fa-github')) platform = 'GitHub';
            else if (icon.classList.contains('fa-linkedin')) platform = 'LinkedIn';
            else if (icon.classList.contains('fa-twitter')) platform = 'Twitter';
            else if (icon.classList.contains('fa-envelope')) platform = 'Email';
            
            showToast(`Redirecting to ${platform}...`);
        });
    });
    
    // 为时间线添加悬停效果
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.transform = 'translateX(0)';
        });
    });
    
    // 打字机效果
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // 为名字添加打字机效果
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 100);
        }, 1000);
    }
    
    // 浮动粒子效果
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: float ${Math.random() * 6 + 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // 添加浮动动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
        
        .toast.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }
        
        .modal.show .modal-content {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }
        
        .modal-close:hover {
            color: #333;
        }
    `;
    document.head.appendChild(style);
    
    // 创建粒子效果
    createParticles();
    
    // 显示提示信息
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // 显示模态框
    function showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="this.parentElement.parentElement.classList.remove('show'); setTimeout(() => document.body.removeChild(this.parentElement.parentElement), 300);">&times;</span>
                <h2 style="margin-bottom: 20px; color: #2c3e50;">${title}</h2>
                <p style="line-height: 1.6; color: #555;">${content}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        // 点击背景关闭模态框
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }
    
    // 添加键盘事件监听
    document.addEventListener('keydown', function(e) {
        // 按 Escape 键关闭模态框
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        }
    });
    
    // 添加鼠标跟踪光标效果
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(102, 126, 234, 0.2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // 初始化动画
    setTimeout(() => {
        showToast('Welcome to my personal homepage!');
    }, 2000);
    
    console.log('🎉 Personal homepage loaded successfully!');
    console.log('💡 Tip: Click the avatar to switch photos, click cards for surprises!');
}); 