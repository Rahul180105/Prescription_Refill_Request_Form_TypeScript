export function validateEmail(email:string){
    if(!email){
        return {valid:false,message:'Email is required'};
    }

    if(email.includes(' ')){
        return {valid:false,message:'Email cannot have spaces'};
    }
    const parts=email.split('@');
    if(parts.length!==2){
        return {valid:false,message:'Invalid email format'};
    }
    const [local,domain]=parts;
    if(!local || local.startsWith('.') || local.endsWith('.') || local.includes('..')){
        return {valid:false,message:'Invalid username'};
    }
    if(!domain || domain.startsWith('.') || domain.endsWith('.') || domain.includes('..') ||!domain.includes('.')){
        return {valid:false,message:'Invalid domain'};
    }
    
    return {valid:true};
}