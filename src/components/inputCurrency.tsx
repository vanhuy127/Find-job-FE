import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

// Format number: 1000000 -> 1.000.000
const formatCurrency = (value: number) => value.toLocaleString('vi-VN');

// Parse input string: "1.000.000" -> 1000000
const parseCurrency = (value: string) => Number(value.replace(/[^\d]/g, '')) || 0;

const CurrencyInput = memo<CurrencyInputProps>(({ value, onChange, placeholder = 'Nhập số tiền...', className }) => {
  const [displayValue, setDisplayValue] = useState(() => formatCurrency(value));
  const lastValueRef = useRef(value);

  // Update displayValue only when `value` actually changes
  useEffect(() => {
    if (lastValueRef.current !== value) {
      const formatted = formatCurrency(value);
      setDisplayValue(formatted);
      lastValueRef.current = value;
    }
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = parseCurrency(e.target.value);

      // Gọi onChange chỉ khi giá trị thay đổi
      if (raw !== lastValueRef.current) {
        onChange(raw);
        lastValueRef.current = raw;
      }

      setDisplayValue(formatCurrency(raw));
    },
    [onChange],
  );

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      inputMode="numeric"
    />
  );
});

CurrencyInput.displayName = 'CurrencyInput';
export default CurrencyInput;
