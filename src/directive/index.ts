import { decimal, number, oneORzero, percent } from './directives' // 数字指令
import hasPermi from './hasPermi' // 权限指令

const directive: Array<{ name: string; directive: any }> = [
  { name: 'hasPermi', directive: hasPermi },
  { name: 'decimal', directive: decimal },
  { name: 'number', directive: number },
  { name: 'percent', directive: percent },
  { name: 'oneORzero', directive: oneORzero }
]

export default directive
