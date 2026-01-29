export function validateDeliveryAddress(address:string){
  if(!address.trim()){
    return {
        valid:false,
        message:'Delivery address is required'
    };
  }
  if (address.trim().length<5){
    return{
        valid:false,
        message:'address is too short'
    }
  }
  return {valid:true,message:''};
}