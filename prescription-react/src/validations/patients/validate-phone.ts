export function validatePhone(phone:string){
    if(!phone){
        return{valid:false,message:'phone no. is reqd'};
    }
    if(phone.length!=10){
        return {valid:false,message:'phone no. should be of 10 digits'};
    }
    for(let i:number=0;i<phone.length;i++){
        if(phone[i]>'9' || phone[i]<'0'){
            return {valid:false,message:'phone no. should be of 10 digits'};
        }
    }
    return {valid:true};
}