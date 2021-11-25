const tschema = {
    type:"object",
    properties: {
        status:{type:"string"},
        firstname:{type:"string"},
        lastname:{type:"string"},
        cname:{type:"string"},
        designation:{type:"string"}
    },
    required: ['status', 'firstname', 'lastname', 'cname', 'designation'],
    additionalProperties: false
};
module.exports=tschema;