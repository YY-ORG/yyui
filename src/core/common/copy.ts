/**
 * // Copy text as text
 * @param text copy的文字
 * @param target? 鼠标点击的HTMLElement 传进来可以避免滚动条滚动
 */
export function executeCopy (text: string, target?: HTMLElement) {
  var input = document.createElement('textarea')
  target = (target || document.body)
  target.appendChild(input)
  input.value = text
  input.focus()
  input.select()
  document.execCommand('Copy')
  input.remove()
}

// Copy HTML as text (without HTML tags)
export function executeCopy2 (html: string) {
  var doc = new DOMParser().parseFromString(html, 'text/html')
  var text = doc.body.textContent || ''
  return executeCopy(text)
}
