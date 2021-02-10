export async function LoadFoodData(){
    const res = await window.fetch('/food-menu.json');
    if(!res.ok){
        throw new Error('API FAILED');
    }

    const data = await res.json();
    return data;
}