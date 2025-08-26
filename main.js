// sidebar 開關功能
document.addEventListener('DOMContentLoaded', function() {
	var sidebar = document.getElementById('sidebar');
	var toggleBtn = document.getElementById('sidebar-toggle');
	if (toggleBtn) {
		toggleBtn.addEventListener('click', function() {
			sidebar.classList.toggle('collapsed');
		});
	}

	// 單頁載入功能
	// 支援所有 data-page 連結（包含動態載入內容內的）
	document.addEventListener('click', function(e) {
		const target = e.target.closest('a[data-page]');
		if (target) {
			e.preventDefault();
			const page = target.getAttribute('data-page');
			fetch(page)
				.then(res => res.text())
				.then(html => {
					const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
					document.getElementById('main-content').innerHTML = match ? match[1] : html;
				});
			// 側邊欄高亮
			document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
			if (target.closest('.sidebar')) {
				target.classList.add('active');
			}
		}
	});
});