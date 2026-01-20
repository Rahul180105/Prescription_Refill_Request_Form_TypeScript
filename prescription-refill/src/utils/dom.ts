import { renderApp } from "../components/App";

export function wireInput(
  input:HTMLInputElement|HTMLTextAreaElement,
  getValue:()=>string,
  setValue:(value:string)=>void
):void{
    input.value=getValue();
    input.addEventListener('input',(e):void=>{setValue((e.target  as HTMLInputElement).value);
    });
    input.addEventListener('blur',()=>{renderApp();});
}
export function wireRadioGroup<T extends string | null>(
  radios: NodeListOf<HTMLInputElement>,
  getValue: () => T,
  setValue: (value: T) => void
): void {
  radios.forEach((radio) => {
    radio.checked = radio.value === getValue();
    radio.addEventListener('change', () => {
      setValue(radio.value as T);
      renderApp();
    });
  });
}

export function wireCheckbox(
  checkbox: HTMLInputElement,
  getValue: () => boolean,
  setValue: (value: boolean) => void
): void {

  checkbox.checked = getValue();
  checkbox.addEventListener('change', (e): void => {
    const target = e.target as HTMLInputElement;
    setValue(target.checked);
    renderApp();
  });
}