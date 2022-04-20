
export function days() {
    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ];
    
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); 
    let year = today.getFullYear();
    
    let n = today.getDay();
    
    today = day + '/' + month + '/' + year;
    
    return days[n];
}