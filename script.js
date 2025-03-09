document.addEventListener('DOMContentLoaded', function() {
    const artworkGrid = document.querySelector('.artwork-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const worksSection = document.getElementById('works');
    let isExpanded = false;
    const ITEMS_PER_PAGE = 6; // 每页显示的作品数量

    // 生成新的作品HTML
    function createArtworkHTML(artwork) {
        if (!artwork || !artwork.image) {
            console.warn('Invalid artwork data:', artwork);
            return '';
        }
        
        return `
            <article class="artwork">
                <img src="images/works/${artwork.year}/${artwork.image}" 
                     alt="${artwork.title}"
                     onerror="this.onerror=null; this.src='images/placeholder.jpg'; this.classList.add('image-error')"
                >
                <div class="artwork-info">
                    <h2>${artwork.title}</h2>
                    <p>材料：${artwork.material}</p>
                    <p>尺寸：${artwork.size}</p>
                    <p>年份：${artwork.year}</p>
                </div>
            </article>
        `;
    }

    // 作品数据
    const artworksData = {
        "2025": [
            {
                image: "work1.jpg",
                title: "无题 No.1",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2025"
            },
            {
                image: "work2.jpg",
                title: "无题 No.2",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2025"
            },
            {
                image: "work3.jpg",
                title: "无题 No.3",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2025"
            },
            {
                image: "work4.jpg",
                title: "无题 No.4",
                material: "布面油画",
                size: "150 × 120 cm",
                year: "2025"
            }
        ],
        "2024": [
            {
                image: "work1.jpg",
                title: "无题 No.1",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2024"
            },
            {
                image: "work2.jpg",
                title: "无题 No.2",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2024"
            },
            {
                image: "work3.jpg",
                title: "无题 No.3",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2024"
            },
            {
                image: "work4.jpg",
                title: "无题 No.4",
                material: "布面油画",
                size: "150 × 120 cm",
                year: "2024"
            },
            {
                image: "work5.jpg",
                title: "无题 No.5",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2024"
            },
            {
                image: "work6.jpg",
                title: "无题 No.6",
                material: "布面油画",
                size: "200 × 150 cm",
                year: "2024"
            },
            {
                image: "work7.jpg",
                title: "无题 No.7",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2024"
            },
            {
                image: "work8.jpg",
                title: "无题 No.8",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2024"
            },
            {
                image: "work9.jpg",
                title: "无题 No.9",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2024"
            },
            {
                image: "work10.jpg",
                title: "无题 No.10",
                material: "布面油画",
                size: "150 × 120 cm",
                year: "2024"
            },
            {
                image: "work11.jpg",
                title: "无题 No.11",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2024"
            },
            {
                image: "work12.jpg",
                title: "无题 No.12",
                material: "布面油画",
                size: "170 × 140 cm",
                year: "2024"
            },
            {
                image: "work13.jpg",
                title: "无题 No.13",
                material: "布面油画",
                size: "190 × 160 cm",
                year: "2024"
            },
            {
                image: "work14.jpg",
                title: "无题 No.14",
                material: "布面油画",
                size: "160 × 130 cm",
                year: "2024"
            },
            {
                image: "work15.jpg",
                title: "无题 No.15",
                material: "布面油画",
                size: "200 × 170 cm",
                year: "2024"
            },
            {
                image: "work16.jpg",
                title: "无题 No.16",
                material: "布面油画",
                size: "175 × 145 cm",
                year: "2024"
            },
            {
                image: "work17.jpg",
                title: "无题 No.17",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2024"
            },
            {
                image: "work18.jpg",
                title: "无题 No.18",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2024"
            },
            {
                image: "work19.jpg",
                title: "无题 No.19",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2024"
            }
        ],
        "2023": [
            {
                image: "work1.jpg",
                title: "无题 No.1",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2023"
            },
            {
                image: "work2.jpg",
                title: "无题 No.2",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2023"
            },
            {
                image: "work3.jpg",
                title: "无题 No.3",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2023"
            },
            {
                image: "work4.jpg",
                title: "无题 No.4",
                material: "布面油画",
                size: "150 × 120 cm",
                year: "2023"
            },
            {
                image: "work5.jpg",
                title: "无题 No.5",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2023"
            },
            {
                image: "work6.jpg",
                title: "无题 No.6",
                material: "布面油画",
                size: "200 × 150 cm",
                year: "2023"
            },
            {
                image: "work7.jpg",
                title: "无题 No.7",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2023"
            },
            {
                image: "work8.jpg",
                title: "无题 No.8",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2023"
            },
            {
                image: "work9.jpg",
                title: "无题 No.9",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2023"
            },
            {
                image: "work10.jpg",
                title: "无题 No.10",
                material: "布面油画",
                size: "150 × 120 cm",
                year: "2023"
            },
            {
                image: "work11.jpg",
                title: "无题 No.11",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2023"
            },
            {
                image: "work12.jpg",
                title: "无题 No.12",
                material: "布面油画",
                size: "170 × 140 cm",
                year: "2023"
            },
            {
                image: "work13.jpg",
                title: "无题 No.13",
                material: "布面油画",
                size: "190 × 160 cm",
                year: "2023"
            },
            {
                image: "work14.jpg",
                title: "无题 No.14",
                material: "布面油画",
                size: "160 × 130 cm",
                year: "2023"
            },
            {
                image: "work15.jpg",
                title: "无题 No.15",
                material: "布面油画",
                size: "200 × 170 cm",
                year: "2023"
            },
            {
                image: "work16.jpg",
                title: "无题 No.16",
                material: "布面油画",
                size: "175 × 145 cm",
                year: "2023"
            }
        ],
        "2022": [
            {
                image: "work1.jpg",
                title: "无题 No.1",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2022"
            },
            {
                image: "work2.jpg",
                title: "无题 No.2",
                material: "布面油画",
                size: "160 × 140 cm",
                year: "2022"
            },
            {
                image: "work3.jpg",
                title: "无题 No.3",
                material: "布面油画",
                size: "200 × 180 cm",
                year: "2022"
            },
            {
                image: "work4.jpg",
                title: "无题 No.4",
                material: "布面油画",
                size: "150 × 120 cm",
                year: "2022"
            },
            {
                image: "work5.jpg",
                title: "无题 No.5",
                material: "布面油画",
                size: "180 × 150 cm",
                year: "2022"
            }
        ]
    };

    // 展开按钮功能
    function toggleArtworks() {
        const artworks = artworkGrid.querySelectorAll('.artwork');
        const isExpanded = loadMoreBtn.getAttribute('data-expanded') === 'true';
        
        artworks.forEach((artwork, index) => {
            if (index >= ITEMS_PER_PAGE) {
                artwork.style.display = isExpanded ? 'none' : 'flex';
            }
        });
        
        // 更新按钮文本和状态
        loadMoreBtn.textContent = isExpanded ? '展开' : '收起';
        loadMoreBtn.setAttribute('data-expanded', !isExpanded);
    }

    // 初始化显示作品
    function initializeArtworks(year) {
        if (!artworkGrid || !artworksData[year]) {
            console.warn('Missing elements or data');
            return;
        }

        try {
            // 生成所有作品的HTML
            artworkGrid.innerHTML = artworksData[year]
                .filter(artwork => artwork && artwork.image)
                .map(artwork => createArtworkHTML(artwork))
                .join('');
            
            // 重新绑定预览事件
            const newArtworks = artworkGrid.querySelectorAll('.artwork');
            newArtworks.forEach((item, index) => {
                // 默认隐藏超过ITEMS_PER_PAGE的作品
                if (index >= ITEMS_PER_PAGE) {
                    item.style.display = 'none';
                }
                
                item.addEventListener('click', function() {
                    const img = this.querySelector('img');
                    const info = this.querySelector('.artwork-info');
                    
                    previewImage.src = img.src;
                    previewImage.alt = img.alt;
                    previewTitle.textContent = info.querySelector('h2').textContent;
                    previewMaterial.textContent = info.querySelectorAll('p')[0].textContent;
                    previewSize.textContent = info.querySelectorAll('p')[1].textContent;
                    previewYear.textContent = info.querySelectorAll('p')[2].textContent;
                    
                    previewModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // 重置展开按钮状态
            if (loadMoreBtn) {
                loadMoreBtn.textContent = '展开';
                loadMoreBtn.setAttribute('data-expanded', 'false');
                // 只有当作品数量大于ITEMS_PER_PAGE时才显示展开按钮
                loadMoreBtn.style.display = newArtworks.length > ITEMS_PER_PAGE ? 'block' : 'none';
            }
        } catch (error) {
            console.error('Error initializing artworks:', error);
            artworkGrid.innerHTML = '<p class="error-message">加载作品时出现错误，请稍后再试。</p>';
        }
    }

    // 添加简历展开/收起功能
    const toggleResumeBtn = document.querySelector('.toggle-resume');
    const resumeContent = document.querySelector('.resume-content');

    if (toggleResumeBtn && resumeContent) {
        toggleResumeBtn.addEventListener('click', function() {
            const isHidden = resumeContent.classList.contains('hidden');
            resumeContent.classList.toggle('hidden');
            toggleResumeBtn.textContent = isHidden ? '收起' : '查看简历';
        });
    }

    // 年份筛选功能
    const yearBtns = document.querySelectorAll('.year-btn');

    // 初始化第一年的作品
    if (yearBtns.length > 0) {
        const firstYearBtn = yearBtns[0];
        firstYearBtn.classList.add('active');
        const firstYear = firstYearBtn.getAttribute('data-year');
        initializeArtworks(firstYear);
    }

    yearBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            yearBtns.forEach(b => b.classList.remove('active'));
            // 给当前点击的按钮添加active类
            this.classList.add('active');

            const selectedYear = this.getAttribute('data-year');
            initializeArtworks(selectedYear);
        });
    });

    // 作品预览功能
    const artworkItems = document.querySelectorAll('.artwork');
    const previewModal = document.getElementById('artworkPreview');
    const previewContent = previewModal.querySelector('.preview-content');
        const previewImage = document.getElementById('previewImage');
        const previewTitle = document.getElementById('previewTitle');
        const previewMaterial = document.getElementById('previewMaterial');
        const previewSize = document.getElementById('previewSize');
        const previewYear = document.getElementById('previewYear');
        const closePreview = document.querySelector('.close-preview');

    // 添加缩放相关变量
    let scale = 1;
    const ZOOM_SPEED = 0.1; // 缩放速度
    const MAX_SCALE = 3; // 最大缩放倍数
    const MIN_SCALE = 1; // 最小缩放倍数
    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;
    let lastMouseX, lastMouseY;

    // 创建缩放提示元素
    const zoomHint = document.createElement('div');
    zoomHint.className = 'zoom-hint';
    zoomHint.textContent = '使用滚轮缩放图片，按住鼠标拖动查看细节';
    previewModal.appendChild(zoomHint);

    // 显示缩放提示
    function showZoomHint() {
        zoomHint.classList.add('show');
        setTimeout(() => {
            zoomHint.classList.remove('show');
        }, 2000);
    }

    // 重置缩放和位置
    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
        previewContent.classList.remove('zoomed');
    }

    // 计算边界限制
    function getBoundaries() {
        const rect = previewImage.getBoundingClientRect();
        const containerRect = previewModal.getBoundingClientRect();
        
        const maxX = Math.max(0, (rect.width * scale - containerRect.width) / 2);
        const maxY = Math.max(0, (rect.height * scale - containerRect.height) / 2);
        
        return { maxX, maxY };
    }

    // 更新图片变换
    function updateImageTransform() {
        // 限制缩放范围
        scale = Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE);
        
        // 获取边界限制
        const { maxX, maxY } = getBoundaries();
        
        // 限制拖动范围
        if (scale > 1) {
            translateX = Math.min(Math.max(translateX, -maxX), maxX);
            translateY = Math.min(Math.max(translateY, -maxY), maxY);
        } else {
            translateX = 0;
            translateY = 0;
        }

        // 应用变换
        previewImage.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
        
        // 更新鼠标样式和状态
        if (scale > 1) {
            previewContent.style.cursor = isDragging ? 'grabbing' : 'grab';
            previewContent.classList.add('zoomed');
        } else {
            previewContent.style.cursor = 'zoom-in';
            previewContent.classList.remove('zoomed');
        }
    }

    // 处理缩放
    previewModal.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        // 获取鼠标相对于图片的位置
        const rect = previewImage.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 计算缩放前的实际位置
        const pointX = (mouseX - translateX) / scale;
        const pointY = (mouseY - translateY) / scale;
        
        // 计算新的缩放比例
        const delta = -Math.sign(e.deltaY) * ZOOM_SPEED;
        const newScale = scale * (1 + delta);
        
        if (newScale !== scale && newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
            // 更新缩放比例
            scale = newScale;
            
            // 计算新的偏移量，保持鼠标指向的点不变
            translateX = mouseX - pointX * scale;
            translateY = mouseY - pointY * scale;
            
            // 更新变换
            requestAnimationFrame(() => {
                updateImageTransform();
            });
        }
    }, { passive: false });

    // 处理拖动开始
    previewContent.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            previewContent.style.cursor = 'grabbing';
        }
    });

    // 处理拖动过程
    document.addEventListener('mousemove', function(e) {
        if (isDragging && scale > 1) {
            e.preventDefault();
            
            // 计算鼠标移动的距离
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;
            
            // 更新位置
            translateX += deltaX;
            translateY += deltaY;
            
            // 更新上一次鼠标位置
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            
            requestAnimationFrame(() => {
                updateImageTransform();
            });
        }
    });

    // 处理拖动结束
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            previewContent.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
        }
    });

    // 双击切换缩放
    previewContent.addEventListener('dblclick', function(e) {
                e.preventDefault();
        const rect = previewImage.getBoundingClientRect();
        
        if (scale > 1) {
            resetZoom();
        } else {
            scale = 2;
            // 以双击位置为中心进行缩放
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            translateX = (rect.width / 2 - mouseX) * (scale - 1);
            translateY = (rect.height / 2 - mouseY) * (scale - 1);
            updateImageTransform();
        }
    });

    artworkItems.forEach(item => {
        item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const info = this.querySelector('.artwork-info');
                
                previewImage.src = img.src;
                previewImage.alt = img.alt;
                previewTitle.textContent = info.querySelector('h2').textContent;
            previewMaterial.textContent = info.querySelectorAll('p')[0].textContent;
            previewSize.textContent = info.querySelectorAll('p')[1].textContent;
            previewYear.textContent = info.querySelectorAll('p')[2].textContent;
            
            previewModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            resetZoom();
            showZoomHint();
        });
    });

    closePreview.addEventListener('click', function() {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetZoom();
    });

    // 点击预览框外部关闭预览
    previewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            previewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetZoom();
        }
    });

    // ESC键关闭预览
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && previewModal.style.display === 'flex') {
            previewModal.style.display = 'none';
            document.body.style.overflow = '';
            resetZoom();
        }
    });

    // 添加展开按钮点击事件
    loadMoreBtn.addEventListener('click', toggleArtworks);
}); 