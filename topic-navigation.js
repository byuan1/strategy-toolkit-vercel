document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    document.getElementById('theme-toggle')?.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
    });
    
    // Mobile sidebar toggle
    document.getElementById('mobile-sidebar-toggle')?.addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('fixed');
            sidebar.classList.toggle('inset-0');
            sidebar.classList.toggle('z-50');
            sidebar.classList.toggle('lg:block');
            sidebar.classList.toggle('lg:static');
            sidebar.classList.toggle('lg:inset-auto');
            sidebar.classList.toggle('lg:z-auto');
        }
    });

    // Back to modules button
    document.getElementById('back-to-modules')?.addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    // Update active state in sidebar based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.topic-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-primary/10', 'dark:bg-primary/20');
        } else {
            link.classList.remove('bg-primary/10', 'dark:bg-primary/20');
        }
    });
}); 