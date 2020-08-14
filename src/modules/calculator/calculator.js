import { CountUp } from 'countup.js';

const $calc = $('.calculator');
if ($calc.length) {
  const config = window.CALCULATOR_CONFIG;
  const $equipment = $calc.find('[name="equipment"]');
  const $material = $calc.find('[name="material"]');
  const $s = $calc.find('[name="s"]');
  const $options = $calc.find('.calculator__checkbox input');

  const getValue = () => {
    const equipment = $equipment.val().toLowerCase();
    const material = $material.val().toLowerCase();
    const materialPrice = config[material][equipment];
    const s = +$s.val() || 0;
    let value = +materialPrice * s;

    $options.each(( i, el ) => {
      const v = el.dataset.value;
      if (el.checked && v) value += +el.dataset.value;
    });

    $options.attr('checked', false);
    $options.filter(`[data-${equipment}]`).attr('checked', true);

    return [+materialPrice, value];
  };

  let [equipmentEndVal, finalEndVal] = getValue();
  const finalPrice = new CountUp('calc', finalEndVal, {
    duration:  1,
    separator: ' ',
    suffix:    ' р',
  });
  finalPrice.start(( e ) => {
    if (finalEndVal !== finalPrice.endVal) {
      finalPrice.update(finalEndVal);
    }
  });

  const meterPrice = new CountUp('calc-meter', equipmentEndVal, {
    duration:  1,
    separator: '&nbsp;',
    suffix:    ' руб./&nbsp;м<sup>2</sup>',
  });
  meterPrice.start(( e ) => {
    if (equipmentEndVal !== meterPrice.endVal) {
      meterPrice.update(equipmentEndVal);
    }
  });

  const recalc = () => {
    const [equipmentValue, finalValue] = getValue();
    finalPrice.update(finalValue);
    meterPrice.update(equipmentValue);
    equipmentEndVal = equipmentValue;
    finalEndVal = finalValue;
  };

  $equipment.on('change', () => {
    recalc();
    // const equipment = $equipment.val().toLowerCase();
    // const value = window.CALCULATOR_PRICES[equipment];
  });
  $material.on('change', recalc);
  $s.on('input', ( e ) => {
    e.target.value = e.target.value.trim().replace(/\D/g, '');
    recalc();
  });
}

