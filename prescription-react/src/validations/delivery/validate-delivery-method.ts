export function validateDeliveryMethod(method:string){
  if(!method){
    return {
        valid:false,
        message:'please select delivery method'
    };
  }
  return {valid:true,message:''};
}