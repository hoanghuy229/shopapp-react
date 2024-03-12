export async function Request(url:string){
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`cannot access ${url}`);
    }
    return response.json();
}