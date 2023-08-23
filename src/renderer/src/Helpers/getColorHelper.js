export function getColor(percent){
    let color = ''

    if(percent<33){
        color = 'danger'
    } else if(percent>=33 && percent<66){
        color = 'warning'
    } else if(percent>=66){
        color = 'success'
    }
    return color;
}
