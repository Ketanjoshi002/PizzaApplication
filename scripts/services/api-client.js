// http/https call
import URL from '../utils/constant.js';
async function makeNetworkCall(){
    try{
    const resp= await fetch(URL);
    const data= await resp.json();
    return data;
    }
    catch(err){
        console.log('Some problem in API call ',err);
        throw err;
    }
    // const promise= fetch(URL);
    // promise.then(response=>{
    //     console.log('response is ',response);
    //     const promise2=response.json();
    //     promise2.then(data=>console.log('Data is',data)).catch(e=>console.log('JSON parse ERROR',e));
    // }).catch(err=>{
    //     console.log('ERROR is',err);
    // })
}
export default makeNetworkCall;