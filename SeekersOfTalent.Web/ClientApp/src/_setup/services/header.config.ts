const config = {
  withCredentials: true,
  crossdomain: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
}

export default config
