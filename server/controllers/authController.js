import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { v4 as uuid4 } from 'uuid';
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'mihir190801@gmail.com',
        pass: "oxedsjyxgzgdljea"
    }
})


export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password"
            })
        }
        // existing user
        const existing_user = await userModel.findOne({ email });
        if (existing_user) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            })
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        // create new user
        const user = await userModel.create({
            id: uuid4(),
            name,
            email,
            password: hashedPassword,
            payment: {
                id: uuid4(),
                order_id: uuid4(),
                status: "pending",
                amount: 0,
            }
        }).then((user) => {
            return res.status(200).send({
                success: true,
                message: "User created successfully",
                user
            })
        }).catch((error) => {
            return res.status(500).send({
                success: false,
                message: "Error in creating user",
                error: error.message
            })
        });
    } catch (error) {
        console.log(error + " in registerController".bgRed.white);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message
        })
    }
}


// POST LOGIN

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password"
            })
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "User does not exist"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Incorrect password"
            })
        }

        // token
        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email
            },
            token
        })

    } catch (error) {
        console.log(error + " in loginController".bgRed.white);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message
        })
    }
}

// PASSWORD RESET
export const passwordresetController = async (req, res) => {
    // console.log(req.body.email.bgWhite.red);
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({
            success: false,
            message: "Please provide email"
        })
    }

    try {

        const userFind = await userModel.findOne({ email: email });
        if (!userFind) {
            return res.status(200).send({
                success: false,
                message: "User does not exist"
            })
        }
        // console.log("Userfind",userFind);

        //token generate for reset password
        const token = JWT.sign({ id: userFind.id }, process.env.JWT_SECRET, { expiresIn: "120s" });
        console.log("token", token);
        const setusertoken = await userModel.findByIdAndUpdate(userFind._id, { verifytoken: token }, { new: true });
        // console.log("setusertoken",setusertoken);
        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Password Reset",
                html: `
                <!--[if IE]><div class="ie-container"><![endif]-->
                <!--[if mso]><div class="mso-container"><![endif]-->
                <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9ff;width:100%" cellpadding="0" cellspacing="0">
                <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9ff;"><![endif]-->
                  
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
                
              <table id="u_content_image_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
                      
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right: 0px;padding-left: 0px;" align="center">
                    
                    <img align="center" border="0" src="https://img.freepik.com/premium-vector/security-password-concept-illustration_251005-470.jpg?w=826" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 35%;max-width: 203px;" width="203" class="v-src-width v-src-max-width"/>
                    
                  </td>
                </tr>
              </table>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_heading_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:'Raleway',sans-serif;" align="left">
                      
                <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 28px; "><strong>Forget password ?</strong></h1>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table id="u_content_heading_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 60px 10px;font-family:'Raleway',sans-serif;" align="left">
                      
                <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 16px; ">If you've lost your password or wish to reset it, use the link below to get started:</h1>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_text_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:'Raleway',sans-serif;" align="left">
                      
                <div class="v-font-size" style="color: #1386e5; line-height: 140%; text-align: left; word-wrap: break-word;">
                  <p style="line-height: 140%;">
                  <a href="http://localhost:${process.env.FRONTEND_PORT}/forgotpassword/${userFind._id}/${setusertoken.verifytoken}" target="_blank" rel="noopener" style="text-decoration:none">
                  <span style="text-decoration: underline; line-height: 19.6px;">
                  <span style="line-height: 19.6px;">
                  <strong>
                  Password Reset Link
                  </strong>
                  </span>
                  </span>
                  </a>
                  </p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_heading_3" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:'Raleway',sans-serif;" align="left">
                      
                <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; "><strong>Note - </strong>This link will be valid for <strong>2 minutes only</strong></h1>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table id="u_content_button_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 40px;font-family:'Raleway',sans-serif;" align="left">
                      
                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
              <div align="center">
                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.unlayer.com" style="height:37px; v-text-anchor:middle; width:220px;" arcsize="67.5%"  stroke="f" fillcolor="#C8FCF5"><w:anchorlock/><center style="color:#000000;font-family:'Raleway',sans-serif;"><![endif]-->  
                  <a href="http://localhost:${process.env.FRONTEND_PORT}/forgotpassword/${userFind._id}/${setusertoken.verifytoken}" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;font-family:'Raleway',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #C8FCF5; border-radius: 25px;-webkit-border-radius: 25px; -moz-border-radius: 25px; width:38%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                    <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Reset Your Password</span></span>
                  </a>
                <!--[if mso]></center></v:roundrect><![endif]-->
              </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
              
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                    
              <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
                
              <table id="u_content_text_deprecated_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 30px;font-family:'Raleway',sans-serif;" align="left">
                      
                <div class="v-font-size" style="line-height: 170%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 170%;">If you are not the one to do this, report at <a rel="noopener" href="mailto:mihir190801@gmail.com?subject=Password%20reset%20mail%20wrongly%20received" target="_blank">here</a></p>
                </div>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;" align="left">
                      
                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                    <tr style="vertical-align: top">
                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              
                <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                </div>
              </div>
              <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              
              
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]></div><![endif]-->
              
                `
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                        success: false,
                        message: "Error in sending email",
                        // error: "Error in sending email"
                        error: error.message
                    })
                }
                console.log("Email sent: " + info.response);
                return res.status(200).send({
                    success: true,
                    message: "Email sent successfully",
                    info
                })
            })

        }


    } catch (error) {
        console.log(error + " in passwordresetController".bgRed.white);
        res.status(500).send({
            success: false,
            message: "Error in password reset",
            error: error.message
        })
    }
}

export const verifyuserpasswordresetController = async (req, res) => {
    const { id, token } = req.params;
    // console.log("id",id);
    // console.log("token",token);
    try {
        const validuser = await userModel.findOne({ _id: id, verifytoken: token });
        // console.log(`${validuser} is here`.bgWhite.red);
        const verifyToken = JWT.verify(token, process.env.JWT_SECRET);
        // console.log("<----------------------verifyToken------------------->",verifyToken.id)
        if (validuser && verifyToken.id) {
            // console.log("User verified".bgWhite.red);
            return res.status(201).send({
                success: true,
                message: "Verified"
            })
        } else {
            // console.log("User not verified".bgWhite.red);
            return res.status(201).send({

                success: false,
                message: "Not Verified"
            })
        }
    } catch (error) {
        // console.log(error+" in verifyuserpasswordresetController".bgRed.white);
        return res.status(201).send({
            success: false,
            message: "Error in verifying user",
            // error: error.message
        })
    }
}


export const passwordresetControllerafterverify = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const validuser = await userModel.findOne({ _id: id, verifytoken: token });
        const verifyToken = JWT.verify(token, process.env.JWT_SECRET);

        if (validuser && verifyToken.id) {
            const newpassword = await hashPassword(password);

            const setnewuserpass = await userModel.findByIdAndUpdate({ _id: id }, { password: newpassword, verifytoken: "" }, { new: true });
            console.log("SET NEW USER " + setnewuserpass)
            setnewuserpass.save();
            if (setnewuserpass) {
                return res.status(201).send({
                    success: true,
                    message: "Password reset successful"
                })
            } else {
                return res.status(201).send({
                    success: false,
                    message: "Error in resetting password"
                })
            }
        } else {
            return res.status(201).send({
                success: false,
                message: "Not Verified"
            })
        }

    } catch (error) {
        return res.status(201).send({
            success: false,
            message: "Error in verifying user",
            // error: error.message
        })
    }
}

export const getusersessionleftController = async (req, res) => {
    const { id } = req.params;
    console.log("id-->", id);
    try {
        const user = await userModel.find({ "id": id });
        console.log("user session left-->", user[0].sessionsLeft);
        if (user) {
            let user_session = user[0].sessionsLeft;
            if (user_session > 0) {
                return res.status(200).send({
                    success: true,
                    message: "Session left",
                    user_session
                })
            }
            else {
                return res.status(200).send({
                    success: false,
                    message: "No session left",
                    user_session
                })
            }
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting session left",
            error: error.message
        })
    }
}


export const getuserinfoController = async (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    try {
        let user = await userModel.findOne({ "id": id });
        let user_session = user.sessionsLeft;
        let email = user.email;
        let name = user.name;
        let phone = user.phone;
        let payment = user.payment;

        return res.status(200).send({
            success: true,
            message: "User info",
            user_session,
            email,
            name,
            phone,
            payment
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting user info",
            error: error.message
        })
    }
}

export const sessionleftController = async (req, res) => {
    const { id } = req.params;
    console.log("id session left", id);
    try {
          let user = await userModel.findOne({ "id": id });
          // console.log("user", user);
        let user_session = user.sessionsLeft;
        console.log("user_session", user_session);
        if (user_session > 0) {
            user_session = user_session - 1;
            console.log("user_session", user_session);
        }
        else {
            return res.status(200).send({
                success: false,
                message: "No session left",
                user_session
            })
        }
        const update_session = await userModel.findOneAndUpdate({ "id": id }, { sessionsLeft: user_session }, { new: true });
        console.log("update_session", update_session);
        if (update_session) {
            return res.status(200).send({
                success: true,
                message: `Session left -  ${user_session}`,
                user_session
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "No session left",
                user_session
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting session left",
            error: error.message
        })
    }
}

            

export const testController = async (req, res) => {
    res.send("Protected route")
}

