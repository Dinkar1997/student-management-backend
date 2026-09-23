const authService = require("../services/authService");

const signup = async (req, res, next) => {
    try {
       const { name, email, password } = req.body;

       if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required",
        });
       };

       if(password.length <6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
       };

       const user = await authService.signup(name, email, password);

       return res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user
       })

    } catch (error) {
       next(error);
    }
};

const login = async (req, res, next) =>  {
   try {

    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(400).json({
            status: false,
            message: "Email or password is required"
        })
    };

    const result = await authService.login(email, password);

    return res.status(200).json({
        status: true,
        message: "Login successful",
        data: result,
    })

   } catch (error) {
     next(error);
   }
};

module.exports = {signup, login};