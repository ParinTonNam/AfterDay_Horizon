// Keep each desktop icon's existing action while making its whole tile clickable.
document.querySelectorAll('#game-page .group_file .icon_wrapper').forEach(tile => {
  tile.addEventListener('click', event => {
    if (event.target.closest('img.icon')) return;
    tile.querySelector('img.icon')?.click();
  });
});

document.addEventListener('click', event => {
  const tile = event.target.closest('#game-page .window-body .icon_wrapper');
  if (tile && !event.target.closest('img.icon')) tile.querySelector('img.icon')?.click();
});

// Emergency codes work with typing, paste, arrow keys, or the on-screen controls.
document.querySelectorAll('#game-page .emergency-code').forEach(dialog => {
  const digits = [...dialog.querySelectorAll('.input_box_pass_code')];
  digits.forEach((input, index) => {
    input.addEventListener('focus', () => input.select());
    input.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        input.value = event.key;
        (digits[index + 1] || input).focus();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        (digits[index + 1] || input).focus();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        (digits[index - 1] || input).focus();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        (event.key === 'ArrowUp' ? up_num : down_num)(input.id);
        input.select();
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        input.value = '0';
        (digits[index - 1] || input).focus();
      } else if (event.key === 'Delete') {
        event.preventDefault();
        input.value = '0';
        input.select();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        check_pass_code(dialog.id);
      } else if (event.key.length === 1) {
        event.preventDefault();
      }
    });
    input.addEventListener('input', () => {
      const value = input.value.replace(/\D/g, '').slice(-1);
      input.value = value || '0';
      if (value) (digits[index + 1] || input).focus();
    });
    input.addEventListener('paste', event => {
      const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, digits.length - index);
      if (!pasted) return;
      event.preventDefault();
      [...pasted].forEach((value, offset) => { digits[index + offset].value = value; });
      (digits[Math.min(index + pasted.length, digits.length - 1)]).focus();
    });
    input.parentElement.querySelectorAll('.button_press').forEach((button, buttonIndex) => {
      button.type = 'button';
      button.textContent = buttonIndex === 0 ? '↑' : '↓';
      button.setAttribute('aria-label', `${buttonIndex === 0 ? 'Increase' : 'Decrease'} digit ${index + 1}`);
      button.addEventListener('click', () => input.focus());
    });
  });
});
