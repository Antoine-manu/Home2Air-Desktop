export function getColor(percent){
    let color = ''

    if(percent<60){
        color = 'danger'
    } else if(percent>=60 && percent<80){
        color = 'info'
    } else if(percent>=80){
        color = 'success'
    }
    return color;
}