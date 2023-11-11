



const jwtDecode = (t: string) => {
  let token: any = {};
  token["raw"] = t;
  token["header"] = JSON.parse(window.atob(t.split('.')[0]));
  token["payload"] = JSON.parse(window.atob(t.split('.')[1]));
  return (token)
}

const setToCookie = (name : string, value: string) => {
    let cookieString = `${name} = ${value};`
    document.cookie = cookieString
}

const searchInCookie = (variableName:any) => {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${variableName}=`);
    let poppedEl = parts.pop()
    if(poppedEl){
      return poppedEl.split(';').shift();
    } else{
      return null;
    }
    
  } catch (e) {
    alert(e)
  }
}

const isTokenValid = (expDate : any) => {
  return (new Date() as any) <= ((expDate * 1000));
}

const deleteACookie = (cookieName : string) => {
  document.cookie = cookieName +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const tokenHandler = {
  jwtDecode,
  setToCookie,
  searchInCookie,
  isTokenValid,
  deleteACookie
}

export default tokenHandler