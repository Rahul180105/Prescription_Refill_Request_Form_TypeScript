export function wireInput(
  input:HTMLInputElement|HTMLTextAreaElement,
  getValue:()=>string,
  setValue:(value:string)=>void
):void{
    input.value=getValue();
    input.addEventListener('input',(e):void=>{setValue((e.target  as HTMLInputElement).value);
    });
}