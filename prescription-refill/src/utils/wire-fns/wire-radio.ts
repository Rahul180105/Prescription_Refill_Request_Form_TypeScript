
export function wireRadioGroup<r extends string | null>(
  radios: NodeListOf<HTMLInputElement>,
  getValue: () => r,
  setValue: (value: r) => void
): void {
  radios.forEach((radio) => {
    radio.checked = radio.value === getValue();
    radio.addEventListener('change', () => {
      setValue(radio.value as r);
    //   renderApp();
    });
  });
}
