import { cn } from './utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional class names', () => {
    const result = cn('text-red-500', true && 'bg-blue-500', false && 'hidden');
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should merge tailwind classes properly', () => {
    const result = cn('px-2 py-1', 'p-4');
    expect(result).toBe('p-4');
  });
});
