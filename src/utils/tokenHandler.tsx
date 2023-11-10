const jwtDecode = (t : string) => {
    let token : any = {};
    token["raw"] = t;
    token["header"] = JSON.parse(window.atob(t.split('.')[0]));
    token["payload"] = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
  }

  export default jwtDecode;