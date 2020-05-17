import Entity from './entity.js';
import User from './user.js';

const main = async() => {
    try {
        // Creation of the very first user.
        let firstUser = await User.create({ userName: "TheAdmin", 
                                            userPassword: "Th3AdM!N/10!", 
                                            firstName: "Main", 
                                            lastName: "Administrator", 
                                            phoneNumber: "(123) 456-7890", 
                                            emailAddress: "theAdmin@email.com" 
                                        });
                                        
    }
    catch (err) {
        console.log(err);
    }
}

main();