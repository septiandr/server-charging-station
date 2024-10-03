export function convertKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(v => convertKeys(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((result: { [key: string]: any }, key: string) => {
        const lowerCase: string = key.toLowerCase();
        result[lowerCase] = convertKeys(obj[key]);
        return result;
      }, {});
    }
    return obj;
  }  

