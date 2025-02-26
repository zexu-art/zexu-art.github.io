document.addEventListener('DOMContentLoaded', function() {
    const artworkGrid = document.querySelector('.artwork-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const worksSection = document.getElementById('works');
    let isExpanded = false;

    // 生成新的作品HTML
    function createArtworkHTML(index) {
        const works = {
            1: {
                title: "无题 No.1",
                image: "images/works/2024/work1.jpg",
                material: "布面油画",
                size: "180 × 150",
                year: "2024"
            },
            2: {
                title: "无题 No.2",
                image: "images/works/2024/work2.jpg",
                material: "布面油画",
                size: "160 × 140",
                year: "2024"
            },
            3: {
                title: "无题 No.3",
                image: "images/works/2024/work3.jpg",
                material: "布面油画",
                size: "200 × 180",
                year: "2024"
            },
            4: {
                title: "无题 No.4",
                image: "images/works/2024/work4.jpg",
                material: "布面油画",
                size: "150 × 120",
                year: "2024"
            },
            5: {
                title: "无题 No.5",
                image: "images/works/2024/work5.jpg",
                material: "布面油画",
                size: "180 × 150",
                year: "2024"
            },
            6: {
                title: "无题 No.6",
                image: "images/works/2024/work6.jpg",
                material: "布面油画",
                size: "200 × 160",
                year: "2024"
            },
            7: {
                title: "无题 No.7",
                image: "images/works/2023/work7.jpg",
                material: "布面油画",
                size: "200 × 160",
                year: "2023"
            },
            // 添加更多作品信息...
        };

        const work = works[index];
        return `
            <article class="artwork hidden">
                <img src="${work.image}" alt="${work.title}">
                <div class="artwork-info">
                    <h2>${work.title}</h2>
                    <p>材料：${work.material}</p>
                    <p>尺寸：${work.size} cm</p>
                    <p>年份：${work.year}</p>
                </div>
            </article>
        `;
    }

    // 预先生成额外的作品但隐藏它们
    for (let i = 7; i <= 18; i++) {
        const artworkHTML = createArtworkHTML(i);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = artworkHTML;
        artworkGrid.appendChild(tempDiv.firstElementChild);
    }

    // 展开/收起功能
    loadMoreBtn.addEventListener('click', function() {
        const hiddenArtworks = artworkGrid.querySelectorAll('.artwork.hidden');
        const allArtworks = artworkGrid.querySelectorAll('.artwork');
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // 展开
            worksSection.classList.add('expanded');
            loadMoreBtn.textContent = '收起';
            
            // 逐个显示隐藏的作品
            hiddenArtworks.forEach((artwork, index) => {
                artwork.classList.remove('hidden');
                setTimeout(() => {
                    artwork.style.opacity = '1';
                    artwork.style.visibility = 'visible';
                    artwork.style.position = 'relative';
                }, index * 100);
            });

            // 平滑滚动到新显示的内容
            setTimeout(() => {
                window.scrollTo({
                    top: window.scrollY + window.innerHeight * 0.3,
                    behavior: 'smooth'
                });
            }, 100);

            setTimeout(() => {
                initializeArtworkPreviews();
            }, 500);
        } else {
            // 收起
            loadMoreBtn.textContent = '展开';
            
            // 隐藏额外的作品
            allArtworks.forEach((artwork, index) => {
                if (index >= 6) { // 保持前6个作品可见（2行x3列）
                    artwork.style.opacity = '0';
                    artwork.style.visibility = 'hidden';
                    artwork.style.position = 'absolute';
                    artwork.classList.add('hidden');
                }
            });

            // 滚动回作品区域顶部
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
    });

    // 初始化按钮文本
    loadMoreBtn.textContent = '展开';

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
    const artworks = document.querySelectorAll('.artwork');

    yearBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            yearBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedYear = this.dataset.year;
            
            // 筛选作品
            artworks.forEach(artwork => {
                const artworkYear = artwork.querySelector('.artwork-info p:last-child')
                    .textContent.match(/\d{4}/)[0];
                
                if (artworkYear === selectedYear) {
                    artwork.style.display = '';
                } else {
                    artwork.style.display = 'none';
                }
            });
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