const db = require('./models/index.js')


class User{
    constructor(name, email, contact){
        this.name = name;
        this.email = email;
        this.contact = contact;
    }

    get_name() {
        return this.name;
    }

    get_email() {
        return this.email;
    }

    get_contact() {
        return this.contact;
    }


// function get_user(req,res){
//     body = req.body
//     // body = {
//     //     name: 'shubham',
//     //     email: 'shubham.mandlas@gmail.com',
//     //     contact: '7727084253'
//     // }
    
//     // contact = req.body.contact
//     const user = User(body.name, body.email, body.contact)
    
    
//     query = 'Insert into User (name, email, contact)'
//     res.send('asda')
}



export default User
// exports.aa = aa