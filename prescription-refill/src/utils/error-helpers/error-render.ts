export function errorRender(control:HTMLElement,message?:string):void{
    const errorDiv=control.querySelector(".error") as HTMLElement|null;
    if(!errorDiv) return;
    if(message){
        errorDiv.textContent=message;
        control.classList.add('has-error');
    }else{
        errorDiv.textContent='';
        control.classList.remove('has-error');
    }
}