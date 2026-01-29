export function validateIdentity(confirmed:boolean){
    if(!confirmed){
        return{valid:false,meessage:'please confirm identity'};
    }
    return {valid:true,message:''};

}