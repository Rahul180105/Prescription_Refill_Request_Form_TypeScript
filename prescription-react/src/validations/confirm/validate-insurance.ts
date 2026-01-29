export function validateInsurance(hasInsurance:boolean,insuranceNumber:string){
    if(hasInsurance&&!insuranceNumber.trim()){
        return {
            valid:false,
            message:'insurance number is required'
        };
    }
    return {valid:true,message:''};
}