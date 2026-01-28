export function validateOtherReason(reason:string,otherReason:string){
    if(reason==='OTHER' && !otherReason.trim()){
        return{valid:false,message:'Please specify the other reason'};
}
  return {valid:true,message:''};
}