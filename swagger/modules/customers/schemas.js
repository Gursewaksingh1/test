const CustomerSchema = {
    title: "",
    type: "object",
    properties: {
        name:{
            title: "name",
            type: "string"
        },
        password:{
            title: "password",
            type: "string"
        },email:{
            title: "email",
            type: "string"
        },phone:{
            title: "name",
            type: "number"
        },disable:{
            title: "disable",
            type: "string"
        },
    }
}

module.exports = {
    CustomerSchema,
  };