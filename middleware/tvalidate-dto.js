const tajvInstance = require('../Schema/tajv-instance');

function tvalidateDto(tschema, data){
    
        const validate = tajvInstance.compile(tschema);
        const valid= validate(data);
        console.log(valid);
        if(!valid) {
            console.log(validate.errors);
            return(false);
        }
        return(true);
};
module.exports=tvalidateDto;