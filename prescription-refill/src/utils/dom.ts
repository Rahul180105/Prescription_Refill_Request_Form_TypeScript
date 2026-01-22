import { renderApp } from "../components/App";

export function wireInput(
  input:HTMLInputElement|HTMLTextAreaElement,
  getValue:()=>string,
  setValue:(value:string)=>void
):void{
    input.value=getValue();
    input.addEventListener('input',(e):void=>{setValue((e.target  as HTMLInputElement).value);
    });
}

export function wireRadioGroup<r extends string | null>(
  radios: NodeListOf<HTMLInputElement>,
  getValue: () => r,
  setValue: (value: r) => void
): void {
  radios.forEach((radio) => {
    radio.checked = radio.value === getValue();
    radio.addEventListener('change', () => {
      setValue(radio.value as r);
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