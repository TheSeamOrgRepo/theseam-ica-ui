export const pdfMakeGetBuffer = async (pdfMakeRef) => {
  return new Promise((resolve, reject) => {
    pdfMakeRef.getBuffer((buf) => {
      resolve(buf)
    })
  })
}
