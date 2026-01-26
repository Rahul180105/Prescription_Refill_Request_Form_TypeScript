
export function wireCheckbox(
  checkbox: HTMLInputElement,
  getValue: () => boolean,
  setValue: (value: boolean) => void
): void {

  checkbox.checked = getValue();
  checkbox.addEventListener('change', (e): void => {
    const target = e.target as HTMLInputElement;
    setValue(target.checked);
    // renderApp();
  });
}