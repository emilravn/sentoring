document.querySelector('#searchJS').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.body.classList.add('bg-active');
    }
    else
    {
        document.body.classList.remove('bg-active');
    }
}); 