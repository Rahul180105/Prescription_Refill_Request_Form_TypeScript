export function validateReason(reason:string){
  if(!reason){
    return {valid:false,message:'please select a reason'};
  }
  return {valid:true,message:''};
}