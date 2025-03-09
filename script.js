document.addEventListener('DOMContentLoaded', function() {
    const artworkGrid = document.querySelector('.artwork-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const worksSection = document.getElementById('works');
    let isExpanded = false;

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
            }
        ],
        "2023": []
    };

    // 初始化显示2024年的作品
    function initializeArtworks(year) {
        if (!artworkGrid || !artworksData[year]) {
            console.warn('Missing elements or data');
            return;
        }

        try {
            artworkGrid.innerHTML = artworksData[year]
                .filter(artwork => artwork && artwork.image) // 过滤无效数据
                .map(artwork => createArtworkHTML(artwork))
                .join('');
            
            // 初始化作品预览
            initializeArtworkPreviews();
        } catch (error) {
            console.error('Error initializing artworks:', error);
            artworkGrid.innerHTML = '<p class="error-message">加载作品时出现错误，请稍后再试。</p>';
        }
    }

    // 展开/收起功能
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            try {
                const hiddenArtworks = artworkGrid.querySelectorAll('.artwork.hidden');
                const allArtworks = artworkGrid.querySelectorAll('.artwork');
                isExpanded = !isExpanded;
                
                if (isExpanded) {
                    expandArtworks(hiddenArtworks);
                } else {
                    collapseArtworks(allArtworks);
                }
            } catch (error) {
                console.error('Error in expand/collapse:', error);
            }
        });
    }

    function expandArtworks(hiddenArtworks) {
        worksSection.classList.add('expanded');
        loadMoreBtn.textContent = '收起';
        
        hiddenArtworks.forEach((artwork, index) => {
            artwork.classList.remove('hidden');
            setTimeout(() => {
                artwork.style.opacity = '1';
                artwork.style.visibility = 'visible';
                artwork.style.position = 'relative';
            }, index * 100);
        });

        setTimeout(() => {
            window.scrollTo({
                top: window.scrollY + window.innerHeight * 0.3,
                behavior: 'smooth'
            });
        }, 100);

        setTimeout(() => {
            initializeArtworkPreviews();
        }, 500);
    }

    function collapseArtworks(allArtworks) {
        loadMoreBtn.textContent = '展开';
        
        allArtworks.forEach((artwork, index) => {
            if (index >= 6) {
                artwork.style.opacity = '0';
                artwork.style.visibility = 'hidden';
                artwork.style.position = 'absolute';
                artwork.classList.add('hidden');
            }
        });

        setTimeout(() => {
            window.scrollTo({
                top: worksSection.offsetTop,
                behavior: 'smooth'
            });
        }, 100);
        
        setTimeout(() => {
            worksSection.classList.remove('expanded');
        }, 500);
    }

    // 初始化
    initializeArtworks("2024");
    if (loadMoreBtn) loadMoreBtn.textContent = '展开';

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
    const yearButtons = document.querySelectorAll('.year-btn');
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.dataset.year;
            if (artworksData[year]) {
                artworkGrid.innerHTML = artworksData[year]
                    .map(artwork => createArtworkHTML(artwork))
                    .join('');
                
                // 更新按钮状态
                yearButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 作品预览功能
    function initializeArtworkPreviews() {
        const preview = document.getElementById('artworkPreview');
        const previewImage = document.getElementById('previewImage');
        const previewTitle = document.getElementById('previewTitle');
        const previewMaterial = document.getElementById('previewMaterial');
        const previewSize = document.getElementById('previewSize');
        const previewYear = document.getElementById('previewYear');
        const closePreview = document.querySelector('.close-preview');

        // 为所有作品添加点击事件
        document.querySelectorAll('.artwork').forEach(artwork => {
            artwork.addEventListener('click', function(e) {
                // 防止触发作品信息的显示/隐藏
                e.preventDefault();
                e.stopPropagation();

                const img = this.querySelector('img');
                const info = this.querySelector('.artwork-info');
                
                previewImage.src = img.src;
                previewImage.alt = img.alt;
                previewTitle.textContent = info.querySelector('h2').textContent;
                previewMaterial.textContent = info.querySelector('p:nth-child(2)').textContent;
                previewSize.textContent = info.querySelector('p:nth-child(3)').textContent;
                previewYear.textContent = info.querySelector('p:nth-child(4)').textContent;
                
                preview.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        // 关闭预览
        closePreview.addEventListener('click', () => {
            preview.style.display = 'none';
            document.body.style.overflow = '';
        });

        // 点击背景关闭预览
        preview.addEventListener('click', (e) => {
            if (e.target === preview) {
                preview.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // 初始化预览功能
    initializeArtworkPreviews();

    // ESC键关闭预览
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && preview.style.display === 'flex') {
            preview.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}); 