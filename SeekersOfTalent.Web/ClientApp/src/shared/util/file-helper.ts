export function getBase64(file: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
  
      reader.readAsBinaryString(file)
  
      reader.onload = ev => {
        resolve(btoa((ev.target as any).result))
      }
  
      reader.onerror = function(error) {
        reject(error)
      }
    })
  }
  