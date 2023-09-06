import type { SelectProps } from 'antd'

export const options: SelectProps['options'] = [
  {label: 'HTML', value: 1},
  {label: 'CSS', value: 2},
  {label: 'JS', value: 3},
  {label: 'React', value: 4},
  {label: 'Next', value: 5},
  {label: '已完成', value: 6},
  {label: '未完成', value: 7},
]

export function getOptionLabel(value: number): string {
  const option = options!.filter(o => o.value === value) as any
  return option[0].label
}