export default function useExcel () {
  // 下载excel
  const outputFileExcel = (res: BlobPart, fileName: string) => {
    const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = function (e) {
      const a = document.createElement('a')
      a.download = fileName
      a.href = e.target?.result as string
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
  return {
    outputFileExcel
  }
}
